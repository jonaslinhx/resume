(function () {
  function escapeHtml(str) {
    return str
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function parseFrontmatter(text) {
    const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!frontmatterMatch) {
      return { metadata: {}, body: text };
    }

    const metadata = {};
    frontmatterMatch[1].split('\n').forEach(function (line) {
      const sep = line.indexOf(':');
      if (sep === -1) return;
      const key = line.slice(0, sep).trim();
      const rawValue = line.slice(sep + 1).trim();
      metadata[key] = rawValue;
    });

    const body = text.slice(frontmatterMatch[0].length);
    return { metadata: metadata, body: body };
  }

  function parseInlineMarkdown(text) {
    return text
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  }

  function markdownToHtml(markdown) {
    const escaped = escapeHtml(markdown);
    const lines = escaped.split('\n');
    const html = [];
    let inList = false;
    let inCodeBlock = false;

    function closeListIfOpen() {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
    }

    lines.forEach(function (line) {
      if (line.startsWith('```')) {
        closeListIfOpen();
        if (!inCodeBlock) {
          html.push('<pre><code>');
          inCodeBlock = true;
        } else {
          html.push('</code></pre>');
          inCodeBlock = false;
        }
        return;
      }

      if (inCodeBlock) {
        html.push(line + '\n');
        return;
      }

      if (!line.trim()) {
        closeListIfOpen();
        return;
      }

      if (line.startsWith('### ')) {
        closeListIfOpen();
        html.push('<h3>' + parseInlineMarkdown(line.slice(4)) + '</h3>');
        return;
      }

      if (line.startsWith('## ')) {
        closeListIfOpen();
        html.push('<h2>' + parseInlineMarkdown(line.slice(3)) + '</h2>');
        return;
      }

      if (line.startsWith('# ')) {
        closeListIfOpen();
        html.push('<h1>' + parseInlineMarkdown(line.slice(2)) + '</h1>');
        return;
      }

      if (line.startsWith('- ')) {
        if (!inList) {
          html.push('<ul>');
          inList = true;
        }
        html.push('<li>' + parseInlineMarkdown(line.slice(2)) + '</li>');
        return;
      }

      if (line.startsWith('> ')) {
        closeListIfOpen();
        html.push('<blockquote>' + parseInlineMarkdown(line.slice(2)) + '</blockquote>');
        return;
      }

      closeListIfOpen();
      html.push('<p>' + parseInlineMarkdown(line) + '</p>');
    });

    if (inCodeBlock) html.push('</code></pre>');
    if (inList) html.push('</ul>');

    return html.join('');
  }

  window.MarkdownUtils = {
    parseFrontmatter: parseFrontmatter,
    markdownToHtml: markdownToHtml
  };
})();
