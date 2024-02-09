import { BlockRendererConfig } from "cloakwp/cms";
import { RestApiBlockData, WPBlockRenderer } from "cloakwp/blocks";
import React from "react";
/**
 * A tiny wrapper around the BlockRenderer class from `render-blocks`, simply
 * for the purposes of tailoring the type parameter defaults for React + CloakWP,
 * saving users from having to manually specify these type params.
 */
export declare class WPReactBlockRenderer<TBlockData = RestApiBlockData> extends WPBlockRenderer<React.ComponentType<any>, React.ReactNode, TBlockData> {
    constructor(config: BlockRendererConfig<React.ComponentType<any>, React.ReactNode, Partial<TBlockData>>);
}
