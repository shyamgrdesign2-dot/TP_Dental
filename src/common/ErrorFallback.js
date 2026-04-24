import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const CHUNK_RELOAD_KEY = "chunk-reload-v1";

const isChunkError = (message = "") =>
  /ChunkLoadError|Loading chunk \d+ failed|Failed to fetch dynamically imported module|Loading CSS chunk|Unable to preload CSS/i.test(message);

export default function ErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();
  const [isRecovering, setIsRecovering] = React.useState(false);

  const message = error?.message || "";
  const isChunk = isChunkError(message);

  React.useEffect(() => {
    if (!isChunk) return;

    const alreadyReloaded =
      sessionStorage.getItem(CHUNK_RELOAD_KEY) === "1";

    if (alreadyReloaded) return;

    const recover = async () => {
      sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
      
      try {
        if ("serviceWorker" in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map((r) => r.unregister()));
        }

        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
      } catch (e) {
        console.warn("Cleanup failed:", e);
      }

      window.location.reload();
    };

    setIsRecovering(true);
    recover();
  }, [isChunk]);

  // Show minimal UI while recovering
  if (isRecovering) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        Updating app… please wait
      </div>
    );
  }

  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle={
        isChunk
          ? "We updated the app. Please refresh to continue."
          : message || "An unexpected error occurred."
      }
      extra={[
        <Button
          type="primary"
          key="retry"
          onClick={() => {
            sessionStorage.removeItem(CHUNK_RELOAD_KEY);
            resetErrorBoundary();
          }}
        >
          Try Again
        </Button>,
        <Button
          key="home"
          onClick={() => {
            sessionStorage.removeItem(CHUNK_RELOAD_KEY);
            resetErrorBoundary();
            navigate("/");
          }}
        >
          Go Home
        </Button>,
        isChunk && (
          <Button key="refresh" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        ),
      ]}
    />
  );
}