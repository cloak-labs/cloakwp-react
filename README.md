# @cloakwp/react

React components and hooks built on the framework-neutral `cloakwp` package.

`BlockPreviewFrame` implements CloakWP's secure iframe message, render-race,
ready-handshake, and height-reporting behavior. Applications provide their own
sync or async block renderer, so the component works with any React framework.

`LoginForm` posts credentials to the Backend for Frontend (BFF) (`strategy="credentials"`).
`useUser` / `AdminBar` read the `cloakwp_ui` hint cookie and never fetch
WordPress for anonymous visitors. Dashboard and Edit links go through
`/api/cloakwp/auth/wp-admin` so wp-admin cookies can be refreshed.
