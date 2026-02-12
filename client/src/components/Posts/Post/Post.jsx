import React from 'react';

function Post({
  title = 'Title',
  content = 'Content',
  author = 'unknown@email.com',
}) {
  return (
    <article
      className="
        group w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm
        transition hover:-translate-y-0.5 hover:shadow-md
        sm:w-[calc(50%-0.5rem)]
        lg:w-[calc(33.333%-0.67rem)]
      "
    >
      <div className="flex h-full flex-col">
        <header className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800">
            {title}
          </h3>
        </header>

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {content}
        </p>

        <footer className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-500">Created by</span>
          <span className="text-xs font-medium text-gray-800">{author}</span>
        </footer>
      </div>
    </article>
  );
}

export default Post;
