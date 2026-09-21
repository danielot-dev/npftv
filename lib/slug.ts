import slugify from "slugify";

export function makeSlug(title: string) {
  return slugify(title, { lower: true, strict: true, trim: true });
}

/**
 * Appends a short random suffix if needed to keep slugs unique — used
 * when a straight slugify() collides with an existing record.
 */
export function makeUniqueSlug(title: string) {
  const base = makeSlug(title);
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base}-${suffix}`;
}
