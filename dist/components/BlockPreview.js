import { useEffect, useState } from "react";
import { sendBlockHeightToWP, handleWPBlockIframeMessage, watchForDocumentHeightChanges, } from "cloakwp/editor";
export function BlockPreview({ data, blockRenderer, }) {
    const [blockData, setBlockData] = useState(data);
    const [rendered, setRendered] = useState(null);
    useEffect(() => {
        const doRender = async () => {
            const result = await blockRenderer.render([blockData], {
                customProps: { isIframePreview: true },
            });
            setRendered(result);
        };
        doRender();
    }, [blockRenderer, blockData]);
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
