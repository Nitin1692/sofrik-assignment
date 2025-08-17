export function getPagination(query) {
  const page = Math.max(parseInt(query.page || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit || '10', 10), 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function makePageResponse({ items, total, page, limit }) {
  const pages = Math.ceil(total / limit) || 1;
  return {
    data: items,
    pagination: { total, page, limit, pages }
  };
}
