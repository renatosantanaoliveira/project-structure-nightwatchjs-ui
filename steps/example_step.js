const { client } = require('nightwatch-api')
const { Given, When, Then } = require('cucumber');
const { store } = require('../hooks/store');

Given('que acesso Demo QA', function () {
    const loginPage = client.page.login()

    return loginPage.navigate()
});

When('eu faço login com o username e a senha válida', function () {
    const { username, password } = store.secrets;
    const loginPage = client.page.login()

    return loginPage
        .signIn(username, password)
});

Then('devo realizar o login com sucesso', function () {
    const loginPage = client.page.login()
    loginPage.verifyLoginSuccessfully()

    const logoutPage = client.page.logout()
    logoutPage
        .pause(3000)
        .logout()
});