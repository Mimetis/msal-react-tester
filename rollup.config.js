import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [sass({ insert: true }), typescript()],
  external: ['@azure/msal-browser', '@testing-library/react', '@azure/msal-react']
}
