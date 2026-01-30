# Template de Bug

Arquivo: `/bugs/bug-001-login-email-nao-cadastrado-sem-feedback.md`

**Bug:** Login com e-mail não cadastrado não exibe mensagem de erro (falha silenciosa)

**Descrição:**

Ao tentar autenticar com um e-mail inexistente e uma senha qualquer, o sistema mantém o usuário na tela de login, porém **não apresenta nenhuma mensagem de erro/validação**. Isso gera incerteza sobre o motivo da falha e impacta a usabilidade, além de dificultar o suporte.

**Cenário de Reprodução:**

1. Acessar `https://qa.navega.com.vc/login`
2. Preencher o campo **E-mail** com um e-mail não cadastrado (ex.: `nao.existe+123@exemplo.com`)
3. Preencher o campo **Senha** com qualquer valor
4. Clicar em **Acessar**
5. Verificar ausência de feedback de erro (toast/mensagem/validação) na tela

**Resultado Atual:**

- O usuário permanece na tela de login, porém **sem mensagem de erro/feedback visível** indicando que as credenciais são inválidas.

**Resultado Esperado:**

- O sistema deve exibir uma **mensagem de erro genérica de autenticação** (sem revelar se o e-mail existe), por exemplo: “E-mail ou senha inválidos”.
- O usuário deve permanecer na tela de login sem autenticar.

**Evidência:**

- Reprodução manual no ambiente de QA: `https://qa.navega.com.vc/login`
- Observação durante execução do cenário **TC00003** (Login com e-mail não cadastrado) via Cypress.

**Hipótese Técnica:**

- O front-end pode estar recebendo resposta de erro (ex.: HTTP 401/403) e **não está disparando o componente de feedback** (toast/alert), possivelmente por:
  - tratamento de erro no interceptor/handler não cobrindo este caso;
  - mensagem retornando vazia/sem mapeamento para UI;
  - falha em acionar serviço de notificação (toast) na camada de apresentação.

**Ambiente**:

- QA

**Versão:**

- v3.1.1 (exibida na tela de login)

**Sistema Operacional:**

- Windows 10

**Navegador:**

- Google Chrome (última versão instalada no ambiente de teste)

