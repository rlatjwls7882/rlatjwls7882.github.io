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

export function getCategoryUrl(category: string) {
  return `/categories/${encodeURIComponent(category)}`;
}

export function getTagUrl(tag: string) {
  return `/tags/${encodeURIComponent(tag)}`;
}

export function getSortedTags(posts: any[]) {
  return [...new Set(posts.flatMap((post) => post.data.tags))]
    .sort((a, b) => a.localeCompare(b));
}

export function getSortedCategories(posts: any[]) {
  return [...new Set(posts.map((post) => post.data.category ?? getPostCategory(post.id)))]
    .sort((a, b) => a.localeCompare(b));
}

export function countBy<T extends string>(items: T[]) {
  return items.reduce<Record<T, number>>((result, item) => {
    result[item] = (result[item] ?? 0) + 1;
    return result;
  }, {} as Record<T, number>);
}