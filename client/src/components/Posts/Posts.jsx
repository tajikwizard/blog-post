import React from 'react';
import Post from './Post/Post';

function Posts() {
  const posts = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Post title ${i + 1}`,
    content:
      'Short preview text goes here. This is a clean card layout using Tailwind.',
    author: 'abdulaziz@gmail.com',
  }));

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-5 text-xl font-semibold tracking-tight">
          Latest posts
        </h2>

        <div className="flex flex-wrap gap-4">
          {posts.map((p) => (
            <Post
              key={p.id}
              title={p.title}
              content={p.content}
              author={p.author}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
