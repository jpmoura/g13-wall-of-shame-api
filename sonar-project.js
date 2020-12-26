/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const scanner = require('sonarqube-scanner');
const dotenv = require('dotenv');

const loadDotEnv = dotenv.config();

if (loadDotEnv.error) {
  throw loadDotEnv.error;
}

scanner(
  {
    serverUrl: process.env.SONAR_HOST,
    token: process.env.SONAR_TOKEN,
    options: {
      'sonar.projectName': 'G13 Wall Of Shame - API',
      'sonar.projectDescription': 'API for G13 Wall of Shame application',
      'sonar.sources': 'src',
      'sonar.exclusions': '**/test/*spec.ts',
      'sonar.tests': 'test',
      'sonar.coverage.exclusions': 'src/main.ts',
      'sonar.typescript.lcov.reportPaths': 'coverage-e2e/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage-e2e/sonar-report.xml',
      'sonar.sourceEncoding': 'UTF-8',
    },
  },
  () => {
    console.info('>> Sonar analysis is done!');
    process.exit();
  },
);
