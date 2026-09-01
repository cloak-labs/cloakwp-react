import { forwardRef } from "react";

export type LogoutFormProps = {
  action?: string;
  redirect?: string;
  className?: string;
  children?: React.ReactNode;
};

export const LogoutForm = forwardRef<HTMLFormElement, LogoutFormProps>(
  function LogoutForm(
    {
      action = "/api/cloakwp/auth/logout",
      redirect = "/",
      className,
      children = "Log Out",
    },
    ref,
  ) {
    return (
      <form ref={ref} method="POST" action={action} className={className}>
        <input type="hidden" name="redirect" value={redirect} />
        <button type="submit">{children}</button>
      </form>
    );
  },
);
