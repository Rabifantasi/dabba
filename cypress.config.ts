import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "dhvhhi", // Add your project ID here
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});
