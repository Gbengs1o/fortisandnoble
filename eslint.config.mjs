import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript"],
    rules: {
      "react/no-unescaped-entities": "off", // Ignore unescaped JSX characters
      "@next/next/no-page-custom-font": "off", // Ignore custom font warnings
      "@typescript-eslint/no-unused-vars": "off", // Ignore unused variables
      "@typescript-eslint/ban-ts-comment": "off", // Allow "@ts-ignore"
      "@typescript-eslint/no-explicit-any": "off", // Allow "any" type
      "@next/next/no-img-element": "off", // Allow <img> instead of <Image />
    },
  }),
];

export default eslintConfig;
