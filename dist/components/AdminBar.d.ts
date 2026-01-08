import React from "react";
import { type ClassValue } from "@cloakui/styles";
export type AdminBarProps = {
    /** Add custom classes to the AdminBar's outermost div. */
    className?: ClassValue;
    /** When true, a link to the current page's WP REST API endpoint will render. */
    enableRestApiLink?: boolean;
    /** When true, AdminBar will be visible to non-logged-in users; you likely only want to use this during testing/development, if at all. */
    alwaysVisible?: boolean;
};
export declare const AdminBar: React.FC<AdminBarProps>;
//# sourceMappingURL=AdminBar.d.ts.map