import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import wasmPack from "vite-plugin-wasm-pack";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  const API_KEY = process.env.VITE_API_KEY;

  return {
    plugins: [wasmPack([], ['@course-scheduler-app/scheduler-wasm']), svelte()],
    resolve: {
      alias: {
        'scheduler-wasm': '@course-scheduler-app/scheduler-wasm',
      }
    },
    server: {
      proxy: {
        "/api": {
          target: `https://itbagw.itba.edu.ar/api/v1/courseCommissions/${API_KEY}`,
          changeOrigin: true,
          //rewrite: (path) => path.replace(/^\/api/, '')
          rewrite: (path) => path.replace(/^\/api\?/, "?level=GRADUATE&"),
        },
      },
    },
  };
});
