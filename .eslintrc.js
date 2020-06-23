const eslintrc = require('@triones/fabric').eslint;

eslintrc.rules['no-useless-constructor'] = 0;
eslintrc.rules['no-extra-boolean-cast'] = 0;
eslintrc.rules['no-lonely-if'] = 0;
eslintrc.rules['no-use-before-define'] = 0;
eslintrc.rules['@typescript-eslint/no-use-before-define'] = 0;
eslintrc.rules['global-require'] = 0;
eslintrc.rules['guard-for-in'] = 0;
eslintrc.rules['import/no-cycle'] = 0;
eslintrc.rules['import/extensions'] = 0;
eslintrc.rules['import/no-duplicates'] = 0;
eslintrc.rules['operator-assignment'] = 0;

module.exports = eslintrc;
