import typescript from "@rollup/plugin-typescript";

export default {
    input: 'src/main.ts',
    output: {
        file: './output/bundle.js',
        format: 'iife'
    },
    plugins: [typescript({ lib: ["es5", "es6", "dom", "es2018"], target: "es6"})]
};
