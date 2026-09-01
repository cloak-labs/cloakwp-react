"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { BlockPreviewFrame } from "./BlockPreviewFrame";
export const BlockPreview = ({ data, pathname = "", previewKey, blockRenderer, targetOrigin, }) => {
    const initialContent = useMemo(() => {
        if (!data)
            return null;
        return blockRenderer.render([data], {
            fromParent: { isIframePreview: true },
        });
    }, [blockRenderer, data]);
    return (_jsx(BlockPreviewFrame, { pathname: pathname, previewKey: previewKey, targetOrigin: targetOrigin, initialContent: initialContent, renderBlock: (blockData) => blockRenderer.render([blockData], {
            fromParent: { isIframePreview: true },
        }) }));
};
