import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Custom remark plugin to transform GitHub-style alert blockquotes
 * (> [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION])
 * into semantic styled callout cards.
 */
function remarkGithubCallouts() {
  const CALLOUT_TYPES = {
    NOTE: { label: 'Note', cls: 'note' },
    TIP: { label: 'Tip', cls: 'tip' },
    IMPORTANT: { label: 'Important', cls: 'important' },
    WARNING: { label: 'Warning', cls: 'warning' },
    CAUTION: { label: 'Caution', cls: 'caution' },
  };

  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'blockquote' && Array.isArray(node.children) && node.children.length > 0) {
      const firstPara = node.children[0];
      if (firstPara?.type === 'paragraph' && Array.isArray(firstPara.children) && firstPara.children.length > 0) {
        const firstChild = firstPara.children[0];
        if (firstChild?.type === 'text' && typeof firstChild.value === 'string') {
          const match = firstChild.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(?:\r?\n)?/i);
          if (match) {
            const typeKey = match[1].toUpperCase();
            const meta = CALLOUT_TYPES[typeKey];
            firstChild.value = firstChild.value.slice(match[0].length);
            if (!firstChild.value && firstPara.children.length > 1) {
              firstPara.children.shift();
            }
            node.data = node.data || {};
            node.data.hName = 'aside';
            node.data.hProperties = {
              className: ['callout', `callout-${meta.cls}`],
              'data-callout': meta.cls,
            };
            node.children.unshift({
              type: 'paragraph',
              data: {
                hName: 'div',
                hProperties: { className: ['callout-title'] },
              },
              children: [{ type: 'text', value: meta.label }],
            });
          }
        }
      }
    }
    if (Array.isArray(node.children)) {
      for (const child of node.children) visit(child);
    }
  }

  return (tree) => {
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://nfgodin.github.io',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkGithubCallouts],
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
    },
  },
  build: {
    format: 'directory',
  },
});
