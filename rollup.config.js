import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';


export default [
    {
        input: 'src/index.ts',
        output: {
            name: 'BigNumber',
            file: pkg.browser.replace('umd.min', 'umd'),
            format: 'umd',
            exports: 'named'
        },
        plugins: [
            resolve(),   // so Rollup can find `ms`
            typescript(),
            sizeSnapshot()
        ]
    },
    {
        input: 'src/index.ts',
        output: {
            name: 'BigNumber',
            file: pkg.browser.replace('umd', 'umd'),
            format: 'umd',
            exports: 'named'
        },
        plugins: [
            resolve(),   // so Rollup can find `ms`
            typescript(),
            terser(),
            sizeSnapshot()
        ]
    }
];