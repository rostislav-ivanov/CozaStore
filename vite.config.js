import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [basicSsl()],
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.crt")),
    },
  },
});

//openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
