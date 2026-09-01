import React from "react";
import { type RestApiBlockData } from "cloakwp/blocks";
import { type WPReactBlockRenderer } from "../WPReactBlockRenderer";
export type BlockPreviewProps = {
    data?: RestApiBlockData;
    pathname?: string;
    previewKey: string;
    blockRenderer: WPReactBlockRenderer;
    targetOrigin?: string;
};
export declare const BlockPreview: React.FC<BlockPreviewProps>;
//# sourceMappingURL=BlockPreview.d.ts.map