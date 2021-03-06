// https://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    globals: {
        "$": true
    },
    //此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    extends: [
        'plugin:vue/essential',
        "eslint:recommended"
    ],
    // required to lint *.vue files
    // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
    plugins: [
        "vue"
    ],
    // add your custom rules here
    // 下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    // 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    // "off" -> 0 关闭规则
    // "warn" -> 1 开启警告规则
    //"error" -> 2 开启错误规则
    // 了解了上面这些，下面这些代码相信也看的明白了
    'rules': {
        // 缩进
        "indent": 0,
        // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
        "no-mixed-spaces-and-tabs": 0,
        "semi": 0,
        "no-tabs": 0,
        "space-before-function-paren": 0,
        // 强制在注释中 // 或 /* 使用一致的空格
        "spaced-comment": 0,
        // always-multiline：多行模式必须带逗号，单行模式不能带逗号
        "comma-dangle": 0,
        // 强制使用一致的反勾号、双引号或单引号
        "quotes": 0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        // 'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': 0,
        "no-cond-assign": 0,
        "no-console": 0,
        "no-constant-condition": 0,
        "no-debugger": 0,
        "no-dupe-args": 0,
        "no-dupe-keys": 0,
        "no-duplicate-case": 0,
        "no-empty": 0,
        "no-ex-assign": 0,
        "no-extra-boolean-cast": 0,
        "no-extra-parens": 0,
        "no-extra-semi": 0,
        "no-func-assign": 0,
        "no-inner-declarations": 0,
        "no-irregular-whitespace": 0,
        "no-obj-calls": 0,
        "no-sparse-arrays": 0,
        "no-prototype-builtins": 0,
        "no-unexpected-multiline": 0,
        "no-unreachable": 0,
        "use-isnan": 0,
        "valid-typeof": 0,
        "no-unused-vars": 0,
        "no-undef": 0,
        "no-case-declarations": 0
    }
}


    