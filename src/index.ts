/**
 * @file Remove the alert from the code
 */
 import { createFilter } from "rollup-pluginutils";

interface PluginOptions {
    include: string,
    exclude: string,
    extentions?: string[]
}


function extentionsRegExp(extentions: string[]) {
    return new RegExp(`${extentions.join("|")}$`);
}

function alertCodeRemove(options: PluginOptions) {
    const {include, exclude, extentions = ['js']} = options;
    const extentionsReg = extentionsRegExp(extentions);
    const userFilter = createFilter(include, exclude);
    
    const filter = (id: string) => extentionsReg.test(id) && userFilter(id);

    return {
        name: 'alert-code-remove',
        transform(code: string, id: string) {
            if (!filter(id)) {
                return;
            }
            let replacedCode;
            const alertReg = /(\/\/\s?)?(alert\x20*\(['"]?[^'"\)\(]*['"]?\);?)\x20*(\S*)(\s*[\r\n])/g;
            replacedCode = code.replace(alertReg, (match:string, s1:string, s2:string, s3:string) => {
                // console.log('s1..', s1, 's2...', s2, 's3...', s3);
                if(s3) {
                    if(/alert/.test(s3)) {
                        return '\n';
                    }
                    return s1 + s3 + '\n';
                }
                return '';
            })
            return replacedCode;
        }
    }
}

export default alertCodeRemove;
export {alertCodeRemove};
