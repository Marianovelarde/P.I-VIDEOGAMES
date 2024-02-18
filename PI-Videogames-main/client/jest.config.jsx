module.exports = {
  "jest": {
    "moduleNameMapper": {
      "\\.(css|less|sass|scss)$": "<rootDir>/mocks/cssMock.js"
    }
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};