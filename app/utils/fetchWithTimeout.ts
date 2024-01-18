async function fetchWithTimeout(
  resource: string,
  options: RequestInit & {timeout?: number} = {},
) {
  return new Promise<Response | null>(async resolve => {
    const {timeout = 8000} = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    // TODO: this try catch is for simulate in-memory when the resource is not available
    try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);

      resolve(response);
    } catch (e) {
      clearTimeout(id);
      setTimeout(() => {
        resolve(null);
      }, 1000);
    }
  });
}

export default fetchWithTimeout;
