import { useEffect, useMemo, useState } from "react";
import {
  sendBlockHeightToWP,
  handleWPBlockIframeMessage,
  watchForDocumentHeightChanges,
  type RestApiBlockData,
} from "cloakwp";
import { type WPReactBlockRenderer } from "../WPReactBlockRenderer";

export function BlockPreview({
  data,
  blockRenderer,
}: {
  data: RestApiBlockData;
  blockRenderer: WPReactBlockRenderer;
}) {
  const [blockData, setBlockData] = useState(data);

  const rendered = useMemo(
    () =>
      blockRenderer.render([blockData], {
        customProps: { isIframePreview: true },
      }),
    [blockRenderer, blockData]
  );

  const handleMessages = (event) => {
    handleWPBlockIframeMessage(event, {
      onBlockDataReceipt: (blockData) => {
        setBlockData(blockData);
      },
    });
  };

  useEffect(() => {
    // prevent running the following client code on server:
    if (typeof window !== "undefined") {
      // don't wait for parent to ask for iframe height, or for ResizeObserver to kick in, just send the height immediately on initial render
      sendBlockHeightToWP();

      // Add a message event listener to receive messages from the parent website (i.e. WP Block Editor)
      window.addEventListener("message", handleMessages);

      // Tell WP we're ready to receive messages:
      window.parent?.postMessage("ready", "*");

      // continuously watch for document height resizes, and send new height to WP when necessary:
      const heightObserver = watchForDocumentHeightChanges();

      // Cleanup function to remove event listeners
      return () => {
        window.removeEventListener("message", handleMessages);
        heightObserver?.disconnect();
      };
    }
  }, []);

  return rendered;
}
