import { defineConfig, mergeConfig } from "vite";
import { tanstackBuildConfig } from "@tanstack/config/build";
import react from "@vitejs/plugin-react";

const config = defineConfig({
  plugins: [react()],
});

export default mergeConfig(
  config,
  tanstackBuildConfig({
    entry: "./src/index.ts",
    srcDir: "./src",
  })
);
