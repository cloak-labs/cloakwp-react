/// <reference types="react" />
import { type RestApiBlockData } from "cloakwp";
import { type WPReactBlockRenderer } from "../WPReactBlockRenderer";
export declare function BlockPreview({ data, blockRenderer, }: {
    data: RestApiBlockData;
    blockRenderer: WPReactBlockRenderer;
}): import("react").ReactNode;
