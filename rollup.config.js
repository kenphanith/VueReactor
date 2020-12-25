import resolve from '@rollup/plugin-node-resolve'
const buble = require('rollup-plugin-buble')

module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vue-reactor.esm.js',
      format: 'es'
    },
    plugins: [buble()],
    external: [
      'rxjs',
      'rxjs/operators'
    ]
  },
  {
    input: 'src/operators.js',
    output: {
      file: 'dist/vue-reactor-operators.esm.js',
      format: 'es'
    },
    plugins: [buble()],
    external: [
      'rxjs',
      'rxjs/operators'
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vue-reactor.js',
      format: 'umd',
      name: 'VueReactor'
    },
    plugins: [
      buble(),
      resolve()
    ]
  },
  {
    input: 'src/operators.js',
    output: {
      file: 'dist/vue-reactor-operators.js',
      format: 'umd',
      name: 'VueReactorOperator'
    },
    plugins: [
      buble(),
      resolve()
    ]
  }
]