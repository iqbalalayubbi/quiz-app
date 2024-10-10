import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = (): ReturnType<typeof defineConfig> => {
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [{ find: "~", replacement: "/src" }],
    },
  });
};

export default config;
