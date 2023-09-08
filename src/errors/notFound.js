export function notFound(resource = "Element") {
  return {
    type: "notFound",
    detail: `${resource} not found!`,
  };
}
