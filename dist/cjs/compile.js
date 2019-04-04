"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const REFS = /&/g;
const BREAKPOINTS = /(;|{|}|\*\/)(?!\n)/g;
exports.split = (s) => s.replace(BREAKPOINTS, '$&' + '\n').split('\n');
exports.reduce = (id, rows) => {
    let acc = '';
    let buf = '';
    const preform = (line) => line.trim().replace(REFS, id);
    const commit = (line) => {
        acc += (buf.length > 0 ? `${id}{${buf}}` : '') + line;
        buf = '';
    };
    for (let i = 0; i < rows.length; i++) {
        let line = preform(rows[i]);
        // empty line
        if (line === '') {
            continue;
        }
        // open brace
        else if (line.endsWith('{')) {
            // open at-rule
            if (line.startsWith('@')) {
                commit(line);
            }
            // open puseudo
            else {
                commit(line);
                // accumulate until close puseudo
                for (i = i + 1; i < rows.length; i++) {
                    acc += line = preform(rows[i]);
                    if (line.endsWith('}')) {
                        break;
                    }
                }
            }
        }
        // close brace
        else if (line.endsWith('}')) {
            // close at-rule
            commit(line);
        }
        // open comment
        else if (line.startsWith('/*')) {
            commit(line);
            // close comment
            if (!line.endsWith('*/')) {
                // accumulate until close comment
                for (i = i + 1; i < rows.length; i++) {
                    acc += line = preform(rows[i]);
                    if (line.endsWith('*/')) {
                        break;
                    }
                }
            }
        }
        // buffer
        else {
            buf += line;
        }
    }
    commit('');
    return acc;
};
exports.compile = (id, template) => exports.reduce(id, exports.split(template));
//# sourceMappingURL=compile.js.map