import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This helps resolve the "@/lib/utils" import in your components
      "@": path.resolve(__dirname, "./client"), 
    },
  },
  server: {
    fs: {
      // This tells Vite it is allowed to serve files from your root directory
      allow: ["."] 
    }
  }
})