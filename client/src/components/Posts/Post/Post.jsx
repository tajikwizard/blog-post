import React from 'react';

function Post({
  title = 'Title',
  content = 'Content',
  author = 'unknown@email.com',
}) {
  return (
    <article
      className="
        group w-full rounded-xl border border-gray-200 bg-white shadow-sm
        transition hover:-translate-y-1 hover:shadow-lg
        flex flex-col h-full
        min-h-[280px]
      "
    >
      <div className="flex flex-col h-full p-6">
        <header className="mb-4 flex-shrink-0">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-800 line-clamp-2 min-h-[3rem]">
            {title}
          </h3>
        </header>

        <div className="flex-1 mb-4 min-h-[120px] overflow-hidden">
          <p className="text-sm leading-relaxed text-gray-600 line-clamp-4">
            {content}
          </p>
        </div>

        <footer className="mt-auto flex-shrink-0 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-xs text-gray-500">Created by</span>
          <span className="text-xs font-medium text-gray-800 truncate ml-2 max-w-[180px]" title={author}>
            {author}
          </span>
        </footer>
      </div>
    </article>
  );
}

export default Post;
