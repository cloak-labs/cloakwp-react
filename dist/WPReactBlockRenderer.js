import { jsx as _jsx } from "react/jsx-runtime";
import { WPBlockRenderer } from "cloakwp/blocks";
/**
 * A tiny wrapper around the BlockRenderer class from `render-blocks`, simply
 * for the purposes of tailoring the type parameter defaults for React + CloakWP,
 * saving users from having to manually specify these type params.
 */
export class WPReactBlockRenderer extends WPBlockRenderer {
    constructor(config) {
        // We specify a default React-based `render` function, which users can override:
        let configWithDefaults = {
            render: (components) => components.map(({ Component, props }, idx) => {
                const componentProps = {
                    key: idx,
                    ...(props ?? {}),
                };
                return _jsx(Component, { ...componentProps });
            }),
            ...config,
        };
        super(configWithDefaults);
    }
}
