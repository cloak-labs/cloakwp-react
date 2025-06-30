import { RefreshIcon } from "./icons/RefreshIcon";
import { cx } from "@cloakui/styles";
import { type ReactStylePropsWithCx } from "@cloakui/react-primitives";

export type SoftPageRefreshButtonProps = ReactStylePropsWithCx & {
  isRefreshing: boolean;
  onClick: () => void;
};

export const SoftPageRefreshButton: React.FC<SoftPageRefreshButtonProps> = ({
  isRefreshing,
  onClick,
  className,
  ...props
}) => {
  return (
    <div
      className={cx(
        "fixed bottom-3 right-2 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-root-invert p-1.5 text-root-invert shadow-md hover:bg-root-invert/80",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <RefreshIcon
        className={["pointer-events-none", isRefreshing && "animate-spin"]}
      />
    </div>
  );
};
