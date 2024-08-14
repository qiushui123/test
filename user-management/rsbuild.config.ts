import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';
import path from 'path';

export default defineConfig({
  html: {
    title: 'demo',
  },
  plugins: [pluginReact(), pluginLess()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/api': '' },
      }
    },
  },
  source: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // 正确解析路径
    },
  },
});
