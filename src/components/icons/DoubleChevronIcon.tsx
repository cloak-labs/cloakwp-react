import { cx } from "@cloakui/styles";
import { AdminBarIconProps } from "../..";

export const DoubleChevronIcon: React.FC<AdminBarIconProps> = ({
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={cx("size-4", className)}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
    ></path>
  </svg>
);
