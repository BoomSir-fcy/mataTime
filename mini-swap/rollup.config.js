import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import url from "@rollup/plugin-url";
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: "src/main.ts",
    output: [
      { file: `${pkg.rollupPath}/index.cjs.js`, format: "cjs" },
      { file: `${pkg.rollupPath}/index.min.js`, format: "cjs", plugins: [terser()] },
    ],
    plugins: [json(), commonjs(), image(), url(), typescript()],
    external: ["ethers", "graphql", "dsgswap-sdk", "tslib", "graphql-request"],
  },
  {
    input: "src/build-import.js",
    output: [
      { file: `${pkg.rollupPath}/index.js`, format: "cjs" },
    ],
  },
];
