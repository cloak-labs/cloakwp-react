/// <reference types="react" />
export type LoginFormProps = {
    /** `credentials` posts to the Backend For Frontend (BFF). `redirect` is reserved for a later WP login bounce. */
    strategy?: "credentials" | "redirect";
    action?: string;
    redirect?: string;
    className?: string;
};
export declare function LoginForm({ strategy, action, redirect, className, }: LoginFormProps): import("react").JSX.Element;
//# sourceMappingURL=LoginForm.d.ts.map