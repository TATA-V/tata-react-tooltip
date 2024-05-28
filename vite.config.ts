import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import libCss from 'vite-plugin-libcss';
import sassDts from 'vite-plugin-sass-dts';
import sass from 'sass';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
        },
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/lib/index.ts'),
        name: 'tata-tooltip',
        fileName: 'index',
        formats: ['es', 'umd', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      commonjsOptions: {
        esmExternals: ['react'],
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react(), dts({ insertTypesEntry: true }), libCss(),
      sassDts({
        enabledMode: ['development', 'production'],
        global: {
          generate: true,
          outputFilePath: path.resolve(__dirname, './src/style.d.ts'),
        },
        sourceDir: path.resolve(__dirname, './src'),
        outputDir: path.resolve(__dirname, './dist'),
      }),
    ],
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
      },
    },
  };
});
