const alias = require('rollup-plugin-alias')
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
      alias({
        'rxjs/operators': 'src/umd-aliases/operators.js',
        'rxjs': 'src/umd-aliases/rxjs.js'
      })
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
      alias({
        'rxjs/operators': 'src/umd-aliases/operators.js',
        'rxjs': 'src/umd-aliases/rxjs.js'
      })
    ]
  }
]