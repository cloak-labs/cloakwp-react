export type LoginFormProps = {
  /** `credentials` posts to the Backend For Frontend (BFF). `redirect` is reserved for a later WP login bounce. */
  strategy?: "credentials" | "redirect";
  action?: string;
  redirect?: string;
  className?: string;
};

export function LoginForm({
  strategy = "credentials",
  action = "/api/cloakwp/auth/authorize",
  redirect = "/",
  className,
}: LoginFormProps) {
  if (strategy === "redirect") {
    return (
      <p>
        Redirect login is not implemented yet. Use{" "}
        <code>strategy=&quot;credentials&quot;</code>.
      </p>
    );
  }

  return (
    <form method="POST" action={action} className={className}>
      <input type="hidden" name="grant_type" value="password" />
      <input type="hidden" name="redirect" value={redirect} />
      <div>
        <label htmlFor="cloakwp-username">Username</label>
        <input
          id="cloakwp-username"
          name="username"
          type="text"
          autoComplete="username"
          required
        />
      </div>
      <div>
        <label htmlFor="cloakwp-password">Password</label>
        <input
          id="cloakwp-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
}
