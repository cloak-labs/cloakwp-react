"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockPreview = void 0;
const cloakwp_1 = require("cloakwp");
const react_1 = require("react");
function BlockPreview({ data, config = {}, cmsName, }) {
    const [blockData, setBlockData] = (0, react_1.useState)(data);
    const rendered = (0, react_1.useMemo)(() => (0, cloakwp_1.getCMSInstance)(cmsName)
        .blockRenderer.mergeConfigWith(config)
        .render([blockData], { customProps: { isIframePreview: true } }), [blockData, config, cmsName]);
    const handleMessages = (event) => {
        (0, cloakwp_1.handleWPBlockIframeMessage)(event, {
            onBlockDataReceipt: (blockData) => {
                setBlockData(blockData);
            },
        });
    };
    (0, react_1.useEffect)(() => {
        // prevent running the following client code on server:
        if (typeof window !== "undefined") {
            // don't wait for parent to ask for iframe height, or for ResizeObserver to kick in, just send the height immediately on initial render
            (0, cloakwp_1.sendBlockHeightToWP)();
            // Add a message event listener to receive messages from the parent website (i.e. WP Block Editor)
            window.addEventListener("message", handleMessages);
            // Tell WP we're ready to receive messages:
            window.parent?.postMessage("ready", "*");
            // continuously watch for document height resizes, and send new height to WP when necessary:
            const heightObserver = (0, cloakwp_1.watchForDocumentHeightChanges)();
            // Cleanup function to remove event listeners
            return () => {
                window.removeEventListener("message", handleMessages);
                heightObserver?.disconnect();
            };
        }
    }, []);
    return rendered;
}
exports.BlockPreview = BlockPreview;
