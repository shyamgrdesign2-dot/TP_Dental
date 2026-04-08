export const lazyRetry = (importFn) =>
    new Promise((resolve, reject) => {
      const hasRefreshed = JSON.parse(
        sessionStorage.getItem("retry-lazy-refreshed") || "false"
      );
  
      importFn()
        .then((module) => {
          sessionStorage.setItem("retry-lazy-refreshed", "false");
          resolve(module);
        })
        .catch((error) => {
          const isChunkError =
            /ChunkLoadError/i.test(error?.name || "") ||
            /Loading chunk [\d]+ failed/i.test(error?.message || "") ||
            /Failed to fetch dynamically imported module/i.test(error?.message || "");
  
          if (isChunkError && !hasRefreshed) {
            sessionStorage.setItem("retry-lazy-refreshed", "true");
            window.location.reload();
            return;
          }
  
          reject(error);
        });
    });