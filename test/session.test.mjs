import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test } from "node:test";
import { LoginForm } from "../dist/components/LoginForm.js";

test("LoginForm posts credentials to the Backend For Frontend (BFF) and does not fetch WordPress", () => {
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (...args) => {
    calls.push(args);
    throw new Error("LoginForm must not fetch");
  };

  try {
    const html = renderToStaticMarkup(
      createElement(LoginForm, { redirect: "/work" }),
    );
    assert.match(html, /action="\/api\/cloakwp\/auth\/authorize"/);
    assert.match(html, /name="grant_type" value="password"/);
    assert.match(html, /name="redirect" value="\/work"/);
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
