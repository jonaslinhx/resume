(function () {
  async function loadPosts() {
    const postListEl = document.getElementById('post-list');
    const postHeadingEl = document.getElementById('post-heading');
    const postMetaEl = document.getElementById('post-meta');
    const postContentEl = document.getElementById('post-content');
    const homeReaderEl = document.querySelector('.home-reader');
    const backBtnEl = document.getElementById('back-to-list');

    if (!postListEl || !postHeadingEl || !postContentEl) return;

    let posts = [];
    try {
      const siteResponse = await fetch('content/site.json');
      if (!siteResponse.ok) throw new Error('Unable to load content/site.json');
      const siteConfig = await siteResponse.json();
      const postFiles = Array.isArray(siteConfig.posts) ? siteConfig.posts : [];

      posts = await Promise.all(postFiles.map(async function (file) {
        const response = await fetch('posts/' + file);
        if (!response.ok) {
          return {
            file: file,
            title: file,
            date: '',
            category: 'general',
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
          category: parsed.metadata.category || 'general',
          summary: parsed.metadata.summary || '',
          tags: parsed.metadata.tags || '',
          html: window.MarkdownUtils.markdownToHtml(parsed.body)
        };
      }));
    } catch (error) {
      postListEl.innerHTML = '<p>Writing section is ready, but posts could not be loaded.</p>';
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
      postMetaEl.textContent = [post.date, post.category].filter(Boolean).join(' · ');
      postContentEl.innerHTML = post.html;

      if (homeReaderEl) {
        homeReaderEl.classList.add('reading');
      }
    }

    if (backBtnEl && homeReaderEl) {
      backBtnEl.addEventListener('click', function () {
        homeReaderEl.classList.remove('reading');
      });
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
          '<div class="post-head">',
          '<span class="post-category">' + post.category + '</span>',
          '<span class="post-meta">' + (post.date || 'Undated') + '</span>',
          '</div>',
          '<div class="post-title">' + post.title + '</div>',
          '<div class="post-summary">' + (post.summary || '') + '</div>',
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
