module.exports = {
  moduleDirectories: ["node_modules", "test-utils", __dirname],
  preset: "@testing-library/react-native",
  setupFiles: ["core-js"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)",
  ],
};
