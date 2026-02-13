import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost, deletePost } from '../api';
import { useAuth } from '../contexts/AuthContext';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', content: '' });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPost(id);
        setPost(data.post);
        setEditForm({
          title: data.post.title,
          content: data.post.content,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      title: post.title,
      content: post.content,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const data = await updatePost(id, {
        title: editForm.title,
        content: editForm.content,
      });
      setPost(data.post);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      await deletePost(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  const isOwner = user && post && post.author && (
    post.author._id === user.id || 
    post.author.id === user.id ||
    (typeof post.author === 'object' && post.author._id && post.author._id.toString() === user.id) ||
    (typeof post.author === 'object' && post.author.id && post.author.id.toString() === user.id)
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6">
        <p className="text-center text-gray-600">Loading post...</p>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6">
        <p className="text-center text-red-600">Error: {error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Back to Posts
        </button>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <button
        onClick={() => navigate('/')}
        className="mb-4 text-sm font-medium text-gray-600 transition hover:text-gray-900"
      >
        ← Back to Posts
      </button>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          ❌ {error}
        </div>
      )}

      {isEditing ? (
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">Edit Post</h2>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                maxLength={80}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Content</label>
              <textarea
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                rows={10}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-gray-900 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <article className="rounded-2xl bg-white p-6 shadow-md">
          <header className="mb-4">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Created by <span className="font-medium text-gray-900">{post.author?.email || 'Unknown'}</span>
              </p>
              {post.createdAt && (
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </header>

          <div className="mb-6 border-t border-gray-200 pt-4">
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{post.content}</p>
          </div>

          {isOwner && (
            <footer className="flex gap-3 border-t border-gray-200 pt-4">
              <button
                onClick={handleEdit}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </footer>
          )}
        </article>
      )}
    </div>
  );
}

export default PostDetail;
