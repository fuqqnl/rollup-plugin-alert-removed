import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

const externalDeps = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies));
const nodeDeps = ['path'];

export default {
  input: './src/index.ts',
  external: externalDeps.concat(nodeDeps),
  plugins: [
    typescript()
  ],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
    { file: pkg.module, format: 'esm' }
  ]
};