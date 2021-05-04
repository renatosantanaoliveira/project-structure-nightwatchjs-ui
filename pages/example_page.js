const elements = {
    form: '#kc-content',
    userNameInput: '',
    passInput: '',
    loginButton: '',
    mensagemDash: '',
    mensagemErro: ''
};

const commands = [
    {
        signIn(user, pass) {
            this.validateFormLogin()
            this.inputUserName(user)
            this.inputPassword(pass)
            this.clickButtonEnter()
        },
        fastLogin: function(user, pass) {
            return this
                .waitForElementVisible('@form', 3000)
                .setValue('@userNameInput', user)
                .setValue('@passInput', pass)
                .click('@loginButton')
        },

        validateFormLogin(){
            return this
                .waitForElementVisible('@form', 3000)
        },

        verifyLoginSuccessfully() {
            return this
                .getTitle(function (title) {
                    this.assert.equal(typeof title, 'string');
                    this.assert.equal(title, 'Demo');
                });
        },
        expectMensagemErro(texto) {
            return this
                .waitForElementVisible('@mensagemErro', 3000)
                .assert.containsText('@mensagemErro', texto)
        },

        inputUserName(user) {
            return this
                .waitForElementVisible('@userNameInput', 3000)
                .setValue('@userNameInput', user)
        },

        inputPassword(pass) {
            return this
                .waitForElementVisible('@passInput', 3000)
                .setValue('@passInput', pass)
        },

        clickButtonEnter() {
            return this
                .click('@loginButton')
        }
    }
];

module.exports = {
    elements: elements,
    commands: commands,
    url: function () {
        return `${this.api.launchUrl}/login`
    }
}