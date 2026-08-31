import { type ReactNode } from "react";
import { type RestApiBlockData } from "cloakwp/blocks";
export type RenderPreviewBlock = (blockData: RestApiBlockData, pathname: string) => ReactNode | Promise<ReactNode>;
export type BlockPreviewFrameProps = {
    pathname?: string;
    previewKey: string;
    renderBlock: RenderPreviewBlock;
    initialContent?: ReactNode;
    targetOrigin?: string;
    renderContainer?: (content: ReactNode) => ReactNode;
};
/**
 * Framework-neutral React client for CloakWP's block-preview iframe protocol.
 * Framework adapters provide the renderer and optional application shell.
 */
export declare function BlockPreviewFrame({ pathname, previewKey, renderBlock, initialContent, targetOrigin: configuredTargetOrigin, renderContainer, }: BlockPreviewFrameProps): ReactNode;
//# sourceMappingURL=BlockPreviewFrame.d.ts.map