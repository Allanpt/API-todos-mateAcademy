module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // suas regras personalizadas
  },
  ignorePatterns: [
    // Ignorar arquivos JavaScript que não precisam ser verificados
    'app-back.js'
  ],
};
