import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";
import pkg from './package.json';

export default [
    // browser-friendly UMD build
    {
        input: 'dist/index.js',
        output: {
            name: 'BigNumber',
            file: pkg.browser.replace('umd.min', 'umd'),
            format: 'umd'
        },
        plugins: [
            resolve(),   // so Rollup can find `ms`
            commonjs(),  // so Rollup can convert `ms` to an ES module
        ]
    },
    {
        input: 'dist/index.js',
        output: {
            name: 'BigNumber',
            file: pkg.browser,
            format: 'umd'
        },
        plugins: [
            resolve(),   // so Rollup can find `ms`
            commonjs(),  // so Rollup can convert `ms` to an ES module
            uglify()
        ]
    }
];