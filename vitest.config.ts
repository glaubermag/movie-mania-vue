import { defineConfig } from 'vitest/config';
import viteConfigDefault from './vite.config';

// O Vite espera um objeto ConfigEnv com 'command' e 'mode'
const viteConfig = typeof viteConfigDefault === 'function'
  ? viteConfigDefault({ mode: 'test', command: 'serve' })
  : viteConfigDefault;

export default defineConfig({
  ...viteConfig,
  test: {
    ...viteConfig.test,
    environment: 'jsdom',
    globals: true,
  },
}); 