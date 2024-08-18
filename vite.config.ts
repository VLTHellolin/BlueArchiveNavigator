import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuePugSyntax from 'vue-pug-syntax';

import { execSync } from 'node:child_process';
import dayjs from 'dayjs';
import { version } from './package.json';

const AppInfo = {
  AppVersion: version,
  AppGitVersion: execSync('git show -s --format=%H').toString().trim(),
  AppGitShortVersion: execSync('git show -s --format=%h').toString().trim(),
  AppCommitDate: dayjs(
    execSync('git show -s --format=%cd').toString().trim()
  ).format('YY/MM/DD HH:mm:ss'),
  AppBuildDate: dayjs().format('YY/MM/DD HH:mm:ss'),
  AppEnv: process.env.NODE_ENV,
};

export default defineConfig({
  plugins: [
    vue({
      template: {
        preprocessOptions: {
          plugins: [vuePugSyntax],
        },
      },
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    AppInfo: JSON.stringify(AppInfo),
  },
});
