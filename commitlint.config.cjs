const ISSUE_PREFIXES = "qa";

const config = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      issuePrefixes: [`${ISSUE_PREFIXES}-`],
    },
  },
  rules: {
    "references-empty": [2, "never"],
  },
};

module.exports = config;
