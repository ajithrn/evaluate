import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
  const config = {
    build: {
      outDir: 'dist',
      emptyOutDir: true
    },
    server: {
      port: 3000,
      open: true
    },
    preview: {
      port: 4173,
      open: true
    }
  }

  // Use root path for custom domain (evaluate.autos) in production
  if (command === 'build' && mode === 'production') {
    config.base = '/' // Custom domain uses root path (use /repo-name/ for normal git pages)
  } else {
    // Development server and preview use root path
    config.base = '/'
  }

  return config
})
