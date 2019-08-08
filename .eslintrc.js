module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/await-thenable": "warn",
        "@typescript-eslint/ban-types": "error",
        "@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "overrides": {
                    "constructors": "off"
                }
            }
        ],

        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/no-angle-bracket-type-assertion": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-triple-slash-reference": "error",
        "@typescript-eslint/no-use-before-declare": "off",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-interface": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/promise-function-async": [
            "warn",
            {
                "allowAny": true
            }
        ],
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "off",
        "indent": ["warn", 2, {
            "SwitchCase": 1
        }],
        "max-len": ["warn", 120],
        "semi": ["error", "always"],
        "semi-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "semi-style": ["error", "last"],
        "keyword-spacing": ["warn", {
            "before": true,
            "after": true
        }],
        "key-spacing": ["warn", {
            "beforeColon": false,
            "afterColon": true,
            "mode": "strict"
        }],
        "comma-spacing": ["warn", {
            "before": false,
            "after": true,
        }],
        "no-extra-semi": "error",
        "quotes": ["warn", "single", {
            "allowTemplateLiterals": true
        }],
        "one-var-declaration-per-line": ["error", "always"],
        "no-trailing-spaces": "warn",
        "arrow-body-style": "error",
        "arrow-parens": [
            "error",
            "always"
        ],
        "complexity": "off",
        "constructor-super": "error",
        "curly": "error",
        "dot-notation": "error",
        "eol-last": "error",
        "guard-for-in": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "max-classes-per-file": "off",
        "new-parens": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "warn",
        "no-debugger": "error",
        "no-empty": "error",
        "no-empty-functions": "off",
        "no-eval": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-undef-init": "error",
        "no-unsafe-finally": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "one-var": ["error", "never"],
        "prefer-const": "error",
        "quote-props": [
            "warn",
            "as-needed"
        ],
        "radix": "error",
        "space-before-function-paren": "off",
        "use-isnan": "error",
        "valid-typeof": "off",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                "rules": {
                    "align": [
                        true,
                        "parameters",
                        "statements"
                    ],
                    "comment-format": [
                        true,
                        "check-space"
                    ],
                    "deprecation": true,
                    "encoding": true,
                    "file-name-casing": [
                        true,
                        "camel-case"
                    ],
                    "import-spacing": true,
                    "jsdoc-format": true,
                    "newline-before-return": true,
                    "no-duplicate-imports": true,
                    "no-implicit-dependencies": [
                        true,
                        "dev"
                    ],
                    "no-reference-import": true,
                    "no-shadowed-variable": true,
                    "no-unused-expression": true,
                    "no-unused-variable": true,
                    "number-literal-format": true,
                    "one-line": [
                        true,
                        "check-catch",
                        "check-else",
                        "check-finally",
                        "check-open-brace",
                        "check-whitespace"
                    ],
                    "only-arrow-functions": [
                        true,
                        "allow-declarations",
                        "allow-named-functions"
                    ],
                    "ordered-imports": true,
                    "prefer-method-signature": true,
                    "return-undefined": true,
                    "trailing-comma": [
                        true,
                        {
                            "singleline": "never",
                            "multiline": "never"
                        }
                    ],
                    "triple-equals": [
                        true,
                        "allow-null-check"
                    ],
                    "variable-name": [
                        true,
                        "ban-keywords",
                        "check-format",
                        "allow-leading-underscore",
                        "require-const-for-all-caps",
                        "allow-pascal-case"
                    ],
                    "whitespace": [
                        true,
                        "check-branch",
                        "check-operator",
                        "check-separator",
                        "check-preblock",
                        "check-branch",
                        "check-module"
                    ]
                }
            }
        ]
    }
};
