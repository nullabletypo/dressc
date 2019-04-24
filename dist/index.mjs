import hash from '@emotion/hash';

var REFS = /&/g;
var BREAKPOINTS = /(;|{|}|\*\/)(?!\n)/g;
var split = function (s) { return s.replace(BREAKPOINTS, '$&' + '\n').split('\n'); };
var reduce = function (id, rows) {
  var acc = '';
  var buf = '';

  var preform = function (line) { return line.trim().replace(REFS, id); };

  var commit = function (line) {
    acc += (buf.length > 0 ? (id + "{" + buf + "}") : '') + line;
    buf = '';
  };

  for (var i = 0; i < rows.length; i++) {
    var line = preform(rows[i]); // empty line

    if (line === '') {
      continue;
    } // open brace
    else if (line.endsWith('{')) {
        // open at-rule
        if (line.startsWith('@')) {
          commit(line);
        } // open puseudo
        else {
            commit(line); // accumulate until close puseudo

            for (i = i + 1; i < rows.length; i++) {
              acc += line = preform(rows[i]);

              if (line.endsWith('}')) {
                break;
              }
            }
          }
      } // close brace
      else if (line.endsWith('}')) {
          // close at-rule
          commit(line);
        } // open comment
        else if (line.startsWith('/*')) {
            commit(line); // close comment

            if (!line.endsWith('*/')) {
              // accumulate until close comment
              for (i = i + 1; i < rows.length; i++) {
                acc += line = preform(rows[i]);

                if (line.endsWith('*/')) {
                  break;
                }
              }
            }
          } // buffer
          else {
              buf += line;
            }
  }

  commit('');
  return acc;
};
var compile = function (id, template) { return reduce(id, split(template)); };

var index = (function (option) {
  if ( option === void 0 ) option = {};

  var compile$$1 = option.compile || compile;
  var prefix = option.prefix || 'dress';
  var cache = {}; // {template: id}

  var cssText = '';

  var css = function (strings) {
    var values = [], len = arguments.length - 1;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

    var template = String.raw.apply(String, [ strings ].concat( values ));
    var id = cache[template];

    if (id === undefined) {
      id = cache[template] = prefix + '-' + hash(template);
      cssText += compile$$1('.' + id, template);
    }

    return id;
  };

  var keyframes = function (string) {
    var values = [], len = arguments.length - 1;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

    var template = String.raw.apply(String, [ string ].concat( values ));
    var id = cache[template];

    if (id === undefined) {
      id = cache[template] = prefix + '-' + hash(template);
      cssText += "@keyframes " + id + "{" + (template.replace(/\s+/g, ' ')) + "}";
    }

    return id;
  };

  var extract = function () { return cssText; };

  return {
    css: css,
    keyframes: keyframes,
    extract: extract
  };
});

export default index;
//# sourceMappingURL=index.mjs.map
