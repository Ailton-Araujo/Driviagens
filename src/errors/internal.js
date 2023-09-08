export function internal(resource) {
  console.log(resource);
  return {
    type: "internal",
    detail: resource,
  };
}
