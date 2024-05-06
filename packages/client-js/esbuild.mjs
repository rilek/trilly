import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.ts", "./src/react.tsx"],
  outdir: "dist",
  bundle: true,
  sourcemap: true,
  format: "esm",
  target: ["es2020"],
  platform: "node",
  treeShaking: true,

  minify: true,
  jsx: "automatic",
  external: ["react", "react-dom"],
});
