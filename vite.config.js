import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { execSync } from 'child_process'
import dayjs from 'dayjs'

const AppInfo = {
  AppVersion: execSync("git show -s --format=%H").toString().trim(),
  AppShortVersion: execSync("git show -s --format=%h").toString().trim(),
  AppCommitDate: dayjs(execSync("git show -s --format=%cd").toString().trim()).format("YY/MM/DD HH:mm:ss"),
  AppBuildDate: dayjs().format("YY/MM/DD HH:mm:ss"),
  AppEnv: process.env.NODE_ENV
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    global: "globalThis",
    process: '{ "env": {} }',
    AppInfo: JSON.stringify(AppInfo)
  }
})
