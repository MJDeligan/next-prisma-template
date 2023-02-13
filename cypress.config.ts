import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    env: {
      COOKIE_NAME: "next-auth.session-token",
      SITE_NAME: "http://localhost:3000",
      BASE_URL: "http://localhost:3000",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
