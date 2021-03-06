const fs = require('fs');
const path = require('path');
const faker = require('faker');
const { setDefaultTimeout, After, Before, AfterAll, BeforeAll } = require('cucumber');
const { client, createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api');
const reporter = require('cucumber-html-reporter');
const { getAwsSecretAsync } = require('./hooks/secrets');
const { store } = require('./hooks/store');

setDefaultTimeout(60000);

// Hooks do Cucumber.js

BeforeAll(async () => {
  await startWebDriver();
  await createSession();
  
});

Before(async () => {
  if(!store.secrets){
    await getAwsSecretAsync()
  }
  client.resizeWindow(1440, 1000)
})

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
  setTimeout(() => {
    reporter.generate({
      theme: 'bootstrap',
      jsonFile: 'report/cucumber_report.json',
      output: 'report/cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
      metadata: {
        'App Version': '0.1.1',
        'Test Environment': 'Ambiente de Teste com Docker'
      }
    });
  }, 0);
});

After(function () {
  let shotPath = path.resolve(`./screenshots/${faker.random.uuid()}.png`);

  return new Promise((resolve, reject) => {
    client
      .saveScreenshot(shotPath)
      .then((res) => {
        resolve(res)
        return this.attach(fs.readFileSync(shotPath), 'image/png');
      })
  })
});
