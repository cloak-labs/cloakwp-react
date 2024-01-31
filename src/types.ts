/**
 * Wrap all generic WP `@kaelan/render-blocks` types to make them React-specific.
 * Doing so prevents users from having to mess with type parameters all over the place.
 */

import {
  EmptyObjectOrRecord,
  RestApiBlockData,
  WPBlockContext,
  WPBlockDataWithExtraContext,
  WPBlockRendererConfig,
  WPBlocksConfig,
  WPDataRouter,
  WPGlobalDataRouter,
  WPSingleBlockConfig,
  WPSingleBlockConfigWithVariants,
  WPSingleBlockConfigWithoutVariants,
  WPVariantsRouter,
} from "cloakwp";

type ReactComponent = React.ComponentType<any>;

export type WPBlockRendererConfigReact<TBlockData = RestApiBlockData> =
  WPBlockRendererConfig<ReactComponent, TBlockData>;

export type WPDataRouterReact<
  TProps = EmptyObjectOrRecord,
  TBlockData = RestApiBlockData
> = WPDataRouter<TProps, Partial<TBlockData>, ReactComponent>;

export type WPGlobalDataRouterReact<
  TProps = EmptyObjectOrRecord,
  TBlockData = RestApiBlockData
> = WPGlobalDataRouter<TProps, TBlockData, ReactComponent>;

export type WPSingleBlockConfigWithoutVariantsReact<
  TProps = EmptyObjectOrRecord,
  TBlockData = RestApiBlockData
> = WPSingleBlockConfigWithoutVariants<ReactComponent, TProps, TBlockData>;

export type WPVariantsRouterReact<TBlockData = RestApiBlockData> =
  WPVariantsRouter<ReactComponent, TBlockData>;

export type WPSingleBlockConfigWithVariantsReact<
  TBlockData = RestApiBlockData,
  TProps = EmptyObjectOrRecord
> = WPSingleBlockConfigWithVariants<ReactComponent, TProps, TBlockData>;

export type WPSingleBlockConfigReact<TBlockData = RestApiBlockData> =
  WPSingleBlockConfig<ReactComponent, TBlockData>;

export type WPBlocksConfigReact<TBlockData = RestApiBlockData> = WPBlocksConfig<
  ReactComponent,
  TBlockData
>;

export type WPBlockDataWithExtraContextReact<TBlockData = RestApiBlockData> =
  WPBlockDataWithExtraContext<ReactComponent, TBlockData>;

export type WPBlockContextReact<TBlockData = RestApiBlockData> = WPBlockContext<
  ReactComponent,
  TBlockData
>;
// == End WP `render-blocks` wrappers ==
