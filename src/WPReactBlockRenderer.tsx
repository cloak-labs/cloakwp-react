import React from "react";
import { type BlockRendererConfig } from "cloakwp/cms";
import { type RestApiBlockData, WPBlockRenderer } from "cloakwp/blocks";

/**
 * A tiny wrapper around the BlockRenderer class from `render-blocks`, simply
 * for the purposes of tailoring the type parameter defaults for React + CloakWP,
 * saving users from having to manually specify these type params.
 */
export class WPReactBlockRenderer<
  TBlockData = RestApiBlockData
> extends WPBlockRenderer<React.FC<any>, React.ReactNode, TBlockData> {
  constructor(
    config: BlockRendererConfig<
      React.FC<any>,
      React.ReactNode,
      Partial<TBlockData>
    >
  ) {
    // We specify a default React-based `render` function, which users can override:
    let configWithDefaults: BlockRendererConfig<
      React.FC<any>,
      React.ReactNode,
      Partial<TBlockData>
    > = {
      renderBlock: ({ Component, props }) => <Component {...props} />,
      combineBlocks: (renderedBlocks) => <>{renderedBlocks}</>,
      // render: (components) =>
      //   components.map(({ Component, props }, idx) => {
      //     const componentProps = {
      //       key: idx,
      //       ...(props ?? {}),
      //     } as React.ComponentProps<typeof Component>;

      //     return <Component {...componentProps} />;
      //   }),
      ...config,
    };

    super(configWithDefaults);
  }
}
