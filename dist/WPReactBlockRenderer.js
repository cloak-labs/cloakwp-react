"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WPReactBlockRenderer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cloakwp_1 = require("cloakwp");
/**
 * A tiny wrapper around the BlockRenderer class from `render-blocks`, simply
 * for the purposes of tailoring the type parameter defaults for React + CloakWP,
 * saving users from having to manually specify these type params.
 */
class WPReactBlockRenderer extends cloakwp_1.WPBlockRenderer {
    constructor(config) {
        // We specify a default React-based `render` function, which users can override:
        let configWithDefaults = {
            render: (components) => components.map(({ Component, props }, idx) => {
                const componentProps = {
                    key: idx,
                    ...(props ?? {}),
                };
                return (0, jsx_runtime_1.jsx)(Component, { ...componentProps });
            }),
            ...config,
        };
        super(configWithDefaults);
    }
}
exports.WPReactBlockRenderer = WPReactBlockRenderer;
