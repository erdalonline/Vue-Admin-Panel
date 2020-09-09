/**
 * Filename: index.js
 * Author: Yusuf Erdal
 * AuthorUrl : https://github.com/erdalonline
 * Date: 9.09.2020
 * Time: 03:03
 */

const requireModule = require.context(".", false, /\.store\.js$/);
const modules = {};

requireModule.keys().forEach((filename) => {
    if (filename === "./index.js") return;
    const moduleName = filename
        .replace(/(\.\/|\.store\.js)/g, "")
        .replace(/^\w/, (c) => c.toUpperCase());
    modules[moduleName] =
        requireModule(filename).default || requireModule(filename);
});

export default modules;