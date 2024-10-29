/**
 * Wrap all generic WP `@kaelan/render-blocks` types to make them React-specific.
 * Doing so prevents users from having to mess with type parameters all over the place.
 */
/// <reference types="react" />
import { EmptyObjectOrRecord } from "cloakwp/cms";
import { RestApiBlockData, WPBlockContext, WPBlockDataWithExtraContext, WPBlockRendererConfig, WPBlocksConfig, WPDataRouter, WPGlobalDataRouter, WPSingleBlockConfig, WPSingleBlockConfigWithVariants, WPSingleBlockConfigWithoutVariants, WPVariantsRouter } from "cloakwp/blocks";
type ReactComponent = React.FC<any>;
export type WPBlockRendererConfigReact<TBlockData = RestApiBlockData> = WPBlockRendererConfig<ReactComponent, React.ReactNode, TBlockData>;
export type WPDataRouterReact<TProps = EmptyObjectOrRecord, TBlockData = RestApiBlockData> = WPDataRouter<TProps, Partial<TBlockData>, ReactComponent>;
export type WPGlobalDataRouterReact<TProps = EmptyObjectOrRecord, TBlockData = RestApiBlockData> = WPGlobalDataRouter<TProps, TBlockData>;
export type WPSingleBlockConfigWithoutVariantsReact<TProps = EmptyObjectOrRecord, TBlockData = RestApiBlockData> = WPSingleBlockConfigWithoutVariants<ReactComponent, TProps, TBlockData>;
export type WPVariantsRouterReact<TBlockData = RestApiBlockData> = WPVariantsRouter<TBlockData>;
export type WPSingleBlockConfigWithVariantsReact<TBlockData = RestApiBlockData, TProps = EmptyObjectOrRecord> = WPSingleBlockConfigWithVariants<ReactComponent, TProps, TBlockData>;
export type WPSingleBlockConfigReact<TBlockData = RestApiBlockData> = WPSingleBlockConfig<ReactComponent, TBlockData>;
export type WPBlocksConfigReact<TBlockData = RestApiBlockData> = WPBlocksConfig<ReactComponent, TBlockData>;
export type WPBlockDataWithExtraContextReact<TBlockData = RestApiBlockData> = WPBlockDataWithExtraContext<TBlockData>;
export type WPBlockContextReact<TBlockData = RestApiBlockData> = WPBlockContext<TBlockData>;
export {};
