import React from "react";
import { type BlockRendererConfig } from "cloakwp/cms";
import { type RestApiBlockData, WPBlockRenderer } from "cloakwp/blocks";
/**
 * A tiny wrapper around the BlockRenderer class from `render-blocks`, simply
 * for the purposes of tailoring the type parameter defaults for React + CloakWP,
 * saving users from having to manually specify these type params.
 */
export declare class WPReactBlockRenderer<TBlockData = RestApiBlockData> extends WPBlockRenderer<React.FC<any>, React.ReactNode, TBlockData> {
    constructor(config: BlockRendererConfig<React.FC<any>, React.ReactNode, Partial<TBlockData>>);
}
//# sourceMappingURL=WPReactBlockRenderer.d.ts.map