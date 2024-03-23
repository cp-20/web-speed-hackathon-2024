import fs from 'node:fs';
import path from 'node:path';

import { pnpmWorkspaceRoot as findWorkspaceDir } from '@node-kit/pnpm-workspace-root';
import react from '@vitejs/plugin-react-swc';
import findPackageDir from 'pkg-dir';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;
const WORKSPACE_DIR = (await findWorkspaceDir(process.cwd()))!;

const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist');

const SEED_IMAGE_DIR = path.resolve(WORKSPACE_DIR, './workspaces/server/seeds/images');
const IMAGE_PATH_LIST = fs.readdirSync(SEED_IMAGE_DIR).map((file) => `/images/${file}`);

process.env = {
  ...process.env,
  API_URL: '',
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  PATH_LIST: IMAGE_PATH_LIST.join(',') || '',
};

export default defineConfig({
  build: {
    minify: true,
    outDir: OUTPUT_DIR,
    rollupOptions: {
      external: [/^@jsquash\/jxl.*/, 'fs/promises'],
      input: {
        client: path.resolve(PACKAGE_DIR, './src/index.tsx'),
        serviceworker: path.resolve(PACKAGE_DIR, './src/serviceworker/index.ts'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true,
    target: 'esnext',
  },
  mode: 'production',
  plugins: [react(), tsconfigPaths(), topLevelAwait(), wasm(), nodePolyfills({})],
});
