# Casos de Teste — Login

| ID | Cenário | Pré-condições | Passos | Resultado Esperado | Resultado Obtido | Prioridade |
| --- | --- | --- | --- | --- | --- | --- |
| TC00001 | Login com credenciais válidas | Usuário existente e ativo; acesso ao ambiente de testes | 1. Acessar a página de Login<br>2. Informar e-mail válido cadastrado<br>3. Informar senha válida<br>4. Clicar em **Acessar** | Usuário autenticado com sucesso e redirecionado para a área logada | N/A (a ser executado) | Alta |
| TC00002 | Login com senha inválida | Usuário existente e ativo | 1. Acessar a página de Login<br>2. Informar e-mail válido cadastrado<br>3. Informar uma senha inválida<br>4. Clicar em **Acessar** | Exibir mensagem de erro de autenticação; usuário não deve ser autenticado; permanecer na tela de Login | N/A (a ser executado) | Alta |
| TC00003 | Login com e-mail não cadastrado | Nenhuma | 1. Acessar a página de Login<br>2. Informar um e-mail não cadastrado<br>3. Informar qualquer senha<br>4. Clicar em **Acessar** | Exibir mensagem de erro de autenticação (sem revelar se o e-mail existe); usuário não deve ser autenticado | N/A (a ser executado) | Alta |
| TC00004 | Tentativa de login com e-mail em formato inválido | Nenhuma | 1. Acessar a página de Login<br>2. Informar e-mail em formato inválido (ex.: `felipe@`)<br>3. Informar qualquer senha<br>4. Clicar em **Acessar** | Bloquear envio e/ou exibir validação de e-mail inválido; não autenticar | N/A (a ser executado) | Média |
| TC00005 | Tentativa de login sem preencher e-mail e senha | Nenhuma | 1. Acessar a página de Login<br>2. Não preencher e-mail<br>3. Não preencher senha<br>4. Clicar em **Acessar** | Exibir validações obrigatórias para e-mail e senha; não autenticar | N/A (a ser executado) | Alta |
| TC00006 | Tentativa de login com e-mail preenchido e senha vazia | Nenhuma | 1. Acessar a página de Login<br>2. Informar um e-mail (qualquer)<br>3. Deixar a senha vazia<br>4. Clicar em **Acessar** | Exibir validação de campo obrigatório para senha; não autenticar | N/A (a ser executado) | Alta |
| TC00007 | Tentativa de login com senha preenchida e e-mail vazio | Nenhuma | 1. Acessar a página de Login<br>2. Deixar o e-mail vazio<br>3. Informar uma senha (qualquer)<br>4. Clicar em **Acessar** | Exibir validação de campo obrigatório para e-mail; não autenticar | N/A (a ser executado) | Alta |
| TC00008 | Remoção de espaços em branco (trim) no e-mail | Usuário existente e ativo | 1. Acessar a página de Login<br>2. Informar e-mail válido com espaços antes/depois (ex.: `  usuario@dominio.com  `)<br>3. Informar senha válida<br>4. Clicar em **Acessar** | E-mail deve ser tratado (trim) e permitir login; autenticar com sucesso | N/A (a ser executado) | Média |
| TC00009 | Campo senha deve mascarar caracteres digitados | Nenhuma | 1. Acessar a página de Login<br>2. Digitar qualquer senha no campo **Senha** | O campo deve exibir caracteres mascarados (ex.: `•`/`*`) e não texto em claro | N/A (a ser executado) | Média |
| TC00010 | Link “Esqueceu a senha?” deve ser acionável | Nenhuma | 1. Acessar a página de Login<br>2. Clicar em **Esqueceu a senha?** | Deve navegar para fluxo/página de recuperação ou exibir comportamento esperado (modal/redirect) sem erro | N/A (a ser executado) | Baixa |

### Padrão BDD

Funcionalidade: Login

Cenário 1: Login com credenciais válidas
```
Dado que estou na página de Login
Quando preencho um e-mail cadastrado e uma senha válida
E clico no botão Acessar
Então devo ser autenticado com sucesso e redirecionado para a área logada
```

Cenário 2: Bloquear login com senha inválida
```
Dado que estou na página de Login
Quando preencho um e-mail cadastrado e uma senha inválida
E clico no botão Acessar
Então devo ver uma mensagem de erro de autenticação
E não devo ser autenticado
```

Cenário 3: Bloquear login com e-mail não cadastrado (sem enumeração de usuários)
```
Dado que estou na página de Login
Quando preencho um e-mail não cadastrado e qualquer senha
E clico no botão Acessar
Então devo ver uma mensagem de erro de autenticação
E o sistema não deve revelar se o e-mail existe
```

Cenário 4: Validar formato do e-mail antes de enviar
```
Dado que estou na página de Login
Quando preencho um e-mail em formato inválido
E preencho uma senha qualquer
E clico no botão Acessar
Então devo ver uma validação de e-mail inválido
E não devo ser autenticado
```

Cenário 5: Validar obrigatoriedade de e-mail e senha
```
Dado que estou na página de Login
Quando tento acessar sem preencher e-mail e senha
Então devo ver mensagens de validação para os campos obrigatórios
E não devo ser autenticado
```

Cenário 6: Validar obrigatoriedade da senha (e-mail preenchido e senha vazia)
```
Dado que estou na página de Login
Quando preencho o e-mail
E deixo a senha em branco
E clico no botão Acessar
Então devo ver uma validação de campo obrigatório para a senha
E não devo ser autenticado
```

Cenário 7: Validar obrigatoriedade do e-mail (senha preenchida e e-mail vazio)
```
Dado que estou na página de Login
Quando deixo o e-mail em branco
E preencho a senha
E clico no botão Acessar
Então devo ver uma validação de campo obrigatório para o e-mail
E não devo ser autenticado
```

Cenário 8: Remover espaços no e-mail (trim) antes de autenticar
```
Dado que estou na página de Login
Quando preencho um e-mail válido com espaços antes e depois
E preencho uma senha válida
E clico no botão Acessar
Então o sistema deve desconsiderar os espaços do e-mail
E devo ser autenticado com sucesso
```

Cenário 9: Mascarar caracteres do campo senha
```
Dado que estou na página de Login
Quando digito uma senha no campo Senha
Então os caracteres devem ser exibidos mascarados
E a senha não deve ficar visível em texto puro
```

Cenário 10: Acessar o fluxo de recuperação de senha pelo link “Esqueceu a senha?”
```
Dado que estou na página de Login
Quando clico no link Esqueceu a senha?
Então devo ser direcionado para o fluxo/página de recuperação de senha ou ver o comportamento esperado (ex.: modal)
E não devo ver erros na navegação
```

Adicionar evidência: prints/vídeos do Cypress após execução (se aplicável)

---
