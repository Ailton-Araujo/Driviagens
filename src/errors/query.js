export function query(resource) {
  return {
    type: "query",
    detail: resource,
  };
}
