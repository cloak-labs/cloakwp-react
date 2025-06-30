/// <reference types="react" />
import { type ReactStylePropsWithCx } from "@cloakui/react-primitives";
export type SoftPageRefreshButtonProps = ReactStylePropsWithCx & {
    isRefreshing: boolean;
    onClick: () => void;
};
export declare const SoftPageRefreshButton: React.FC<SoftPageRefreshButtonProps>;
