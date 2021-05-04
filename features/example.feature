#language: pt
#utf-8

@login
Funcionalidade: Realizar o login

    Contexto:
        Dado que acesso Demo QA

    Cenário: Login com sucesso

        Quando eu faço login com o username e a senha válida
        Então devo realizar o login com sucesso