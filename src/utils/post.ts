export function getPostSlug(id: string) {
  return id
    .replace(/\\/g, '/')
    .replace(/\.(md|mdx)$/, '')
    .replace(/\/index$/, '');
}

export function getPostUrl(id: string) {
  return `/blog/${getPostSlug(id)}`;
}

export function getPostCategory(id: string) {
  const slug = getPostSlug(id);
  const parts = slug.split('/');

  if (parts.length <= 1) {
    return 'general';
  }

  return parts.slice(0, -1).join('/');
}