// module.exports = {
//   env: {
//     es6: true,
//     node: true,
//   },
//   parserOptions: {
//     "ecmaVersion": 2018,
//   },
//   extends: [
//     "eslint:recommended",
//     "google",
//   ],
//   rules: {
//     "no-restricted-globals": ["error", "name", "length"],
//     "prefer-arrow-callback": "error",
//     "quotes": ["error", "double", {"allowTemplateLiterals": true}],
//   },
//   overrides: [
//     {
//       files: ["**/*.spec.*"],
//       env: {
//         mocha: true,
//       },
//       rules: {},
//     },
//   ],
//   globals: {},
// };
// module.exports = {
//   env: {
//     es2020: true,
//     node: true, // Enable Node.js global variables and scoping
//   },
//   extends: "eslint:recommended",
//   parserOptions: {
//     ecmaVersion: 12,
//   },
//   rules: {
//     "no-unused-vars": "off", // Disable unused variable warnings
//     "no-undef": "off",       // Disable undefined variable warnings for Node.js globals
//   },
// };

module.exports = {
  env: {
    es2020: true, // Use ES2020 syntax
    node: true,   // Enable Node.js global variables
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-unused-vars": "warn", // Downgrade unused variables to warnings
    "no-undef": "off",       // Disable undefined variable errors for Node.js globals
  },
};


