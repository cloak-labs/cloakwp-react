import {
  RestApiBlockData,
  BlockRendererConfig,
  WPBlockRenderer,
} from "cloakwp";
import React = require("react");

/**
 * A tiny wrapper around the BlockRenderer class from `render-blocks`, simply
 * for the purposes of tailoring the type parameter defaults for React + CloakWP,
 * saving users from having to manually specify these type params.
 */
export class WPReactBlockRenderer<
  TBlockData = RestApiBlockData
> extends WPBlockRenderer<
  React.ComponentType<any>,
  React.ReactNode,
  TBlockData
> {
  constructor(
    config: BlockRendererConfig<
      React.ComponentType<any>,
      React.ReactNode,
      Partial<TBlockData>
    >
  ) {
    // We specify a default React-based `render` function, which users can override:
    let configWithDefaults: BlockRendererConfig<
      React.ComponentType<any>,
      React.ReactNode,
      Partial<TBlockData>
    > = {
      render: (components) =>
        components.map(({ Component, props }, idx) => {
          const componentProps = {
            key: idx,
            ...(props ?? {}),
          } as React.ComponentProps<React.ComponentType<any>>;

          return <Component {...componentProps} />;
        }),
      ...config,
    };

    super(configWithDefaults);
  }
}
