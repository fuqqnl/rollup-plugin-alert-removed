'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rollupPluginutils = require('rollup-pluginutils');

/**
 * @file Remove the alert from the code
 */
function extentionsRegExp(extentions) {
    return new RegExp(`${extentions.join("|")}$`);
}
function alertCodeRemove(options) {
    const { include, exclude, extentions = ['js'] } = options;
    const extentionsReg = extentionsRegExp(extentions);
    const userFilter = rollupPluginutils.createFilter(include, exclude);
    const filter = (id) => extentionsReg.test(id) && userFilter(id);
    return {
        name: 'alert-code-remove',
        transform(code, id) {
            if (!filter(id)) {
                return;
            }
            let replacedCode;
            const alertReg = /(\/\/\s?)?(alert\x20*\(['"]?[^'"\)\(]*['"]?\);?)\x20*(\S*)(\s*[\r\n])/g;
            replacedCode = code.replace(alertReg, (match, s1, s2, s3) => {
                console.log('s1..', s1, 's2...', s2, 's3...', s3);
                if (s3) {
                    if (/alert/.test(s3)) {
                        return '\n';
                    }
                    return s1 + s3 + '\n';
                }
                return '';
            });
            return replacedCode;
        }
    };
}

exports.alertCodeRemove = alertCodeRemove;
exports["default"] = alertCodeRemove;
