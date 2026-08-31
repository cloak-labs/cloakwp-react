"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { getConfiguredWpOrigin, handleWPBlockIframeMessage, sendPreviewReadyToWp, watchForDocumentHeightChanges, } from "cloakwp/editor";
/**
 * Framework-neutral React client for CloakWP's block-preview iframe protocol.
 * Framework adapters provide the renderer and optional application shell.
 */
export function BlockPreviewFrame({ pathname = "", previewKey, renderBlock, initialContent = null, targetOrigin: configuredTargetOrigin, renderContainer = (content) => _jsx("div", { id: "root", children: content }), }) {
    const [content, setContent] = useState(initialContent);
    const renderBlockRef = useRef(renderBlock);
    const pathnameRef = useRef(pathname);
    useEffect(() => {
        renderBlockRef.current = renderBlock;
    }, [renderBlock]);
    useEffect(() => {
        pathnameRef.current = pathname;
    }, [pathname]);
    useEffect(() => {
        const styleTag = document.createElement("style");
        styleTag.innerHTML = "body { background-color: transparent; }";
        document.head.appendChild(styleTag);
        document.body.classList.add("gutenberg-preview");
        return () => {
            document.head.removeChild(styleTag);
            document.body.classList.remove("gutenberg-preview");
        };
    }, []);
    useEffect(() => {
        const targetOrigin = configuredTargetOrigin ?? getConfiguredWpOrigin();
        if (!targetOrigin) {
            console.error("[BlockPreviewFrame] Cannot resolve the configured WordPress origin");
            return;
        }
        let renderGeneration = 0;
        const handleMessages = (event) => {
            try {
                handleWPBlockIframeMessage(event, {
                    previewKey,
                    targetOrigin,
                    onBlockDataReceipt: (blockData) => {
                        renderGeneration += 1;
                        const generation = renderGeneration;
                        void Promise.resolve(renderBlockRef.current(blockData, pathnameRef.current))
                            .then((rendered) => {
                            if (generation === renderGeneration) {
                                setContent(rendered);
                            }
                        })
                            .catch((error) => {
                            if (generation === renderGeneration) {
                                console.error("[BlockPreviewFrame] Block rendering failed", error);
                            }
                        });
                    },
                });
            }
            catch (error) {
                console.error("[BlockPreviewFrame] Preview message handling failed", error);
            }
        };
        window.addEventListener("message", handleMessages);
        sendPreviewReadyToWp(previewKey, targetOrigin);
        const heightObserver = watchForDocumentHeightChanges({
            previewKey,
            targetOrigin,
        });
        return () => {
            renderGeneration += 1;
            window.removeEventListener("message", handleMessages);
            heightObserver?.disconnect();
        };
    }, [configuredTargetOrigin, previewKey]);
    return renderContainer(content);
}
