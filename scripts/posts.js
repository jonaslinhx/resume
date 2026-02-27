(function () {
  async function loadPosts() {
    const postListEl = document.getElementById('post-list');
    const postHeadingEl = document.getElementById('post-heading');
    const postContentEl = document.getElementById('post-content');
    let posts = [];

    try {
      const indexResponse = await fetch('posts/index.json');
      if (!indexResponse.ok) throw new Error('Unable to load posts/index.json');
      const postFiles = await indexResponse.json();

      posts = await Promise.all(postFiles.map(async function (file) {
        const response = await fetch('posts/' + file);
        if (!response.ok) {
          return {
            file: file,
            title: file,
            date: '',
            summary: 'Unable to load post.',
            tags: '',
            html: '<p>Unable to load this post.</p>'
          };
        }

        const raw = await response.text();
        const parsed = window.MarkdownUtils.parseFrontmatter(raw);
        return {
          file: file,
          title: parsed.metadata.title || file,
          date: parsed.metadata.date || '',
          summary: parsed.metadata.summary || '',
          tags: parsed.metadata.tags || '',
          html: window.MarkdownUtils.markdownToHtml(parsed.body)
        };
      }));
    } catch (error) {
      postListEl.innerHTML = '<p>Writing section is ready, but no posts were found.</p>';
      return;
    }

    if (!posts.length) {
      postListEl.innerHTML = '<p>No posts yet. Add markdown files in <code>posts/</code>.</p>';
      return;
    }

    function renderPost(post, buttonEl) {
      document.querySelectorAll('.post-item').forEach(function (item) {
        item.classList.remove('active');
      });

      if (buttonEl) buttonEl.classList.add('active');
      postHeadingEl.textContent = post.title;
      postContentEl.innerHTML = post.html;
    }

    postListEl.innerHTML = '';
    posts
      .sort(function (a, b) {
        return a.date < b.date ? 1 : -1;
      })
      .forEach(function (post, idx) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'post-item';
        btn.innerHTML = [
          '<div class="post-title">' + post.title + '</div>',
          '<div class="post-meta">' + (post.date || 'Undated') + '</div>',
          '<div>' + (post.summary || '') + '</div>',
          '<div class="post-tags">' + (post.tags || '') + '</div>'
        ].join('');

        btn.addEventListener('click', function () {
          renderPost(post, btn);
        });

        postListEl.appendChild(btn);
        if (idx === 0) renderPost(post, btn);
      });
  }

  window.addEventListener('DOMContentLoaded', loadPosts);
})();
