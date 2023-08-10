import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";

const libraryHeader = `/*! ${pkg.name} v${pkg.version} ${new Date().toISOString().split("T")[0]} */`;
const useStrictHeader = "'use strict';";
const fileHeader = `${libraryHeader}\n${useStrictHeader}`;

export default [
  {
    input: 'src/index.tsx',
    output:
    {
      dir: "dist",
      preserveModules: true,
      preserveModulesRoot: "src",
      format: "es",
      entryFileNames: "[name].mjs",      
      banner: fileHeader,
      sourcemap: true,
    },
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false
    },
    plugins: [
      typescript({
        typescript: require("typescript"),
      })
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ]

  },
  {
    input: "src/index.tsx",
    output: [
      {
        dir: "dist",
        format: "cjs",
        banner: fileHeader,
        sourcemap: true,
        entryFileNames: "[name].cjs",      
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      typescript({
        typescript: require("typescript"),
        sourceMap: true
      })
    ]
  }]
