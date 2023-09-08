export function conflict(resource = "Element is the same") {
  console.log(resource);
  return {
    type: "conflict",
    detail: resource,
  };
}
