# Template de Melhoria

Arquivo: `/improvements/melhoria-001-login-feedback-validacoes.md`

**4. Proposta de Melhoria**

**Título:** Padronizar feedback de erro e validações no Login (mensagens claras + estado de carregamento)

**Descrição:**

Atualmente, em algumas tentativas de autenticação inválida (ex.: e-mail não cadastrado), o usuário pode permanecer na tela de login **sem qualquer mensagem de erro/validação visível**, gerando “falha silenciosa”. Além disso, o usuário não tem indicação clara de processamento (ex.: loading no botão), o que pode causar cliques repetidos e piorar a experiência.

Proposta: garantir que toda falha de autenticação e validação de formulário apresente **feedback consistente e acessível**, com mensagens genéricas (sem revelar se o e-mail existe) e indicação de carregamento durante a requisição.

**Justificativa Técnica:**

- **Usabilidade/UX**: reduz incerteza, diminui tentativas repetidas e melhora a taxa de conclusão do login.
- **Acessibilidade**: mensagens expostas via região de alerta (ex.: `role="alert"`/`aria-live`) permitem leitura por leitor de tela.
- **Segurança**: mensagem genérica (“E-mail ou senha inválidos”) evita enumeração de usuários.
- **Observabilidade**: padronizar o tratamento de erro facilita testes automatizados e suporte (com mensagens rastreáveis/logáveis).

**Sugestão:**

- **Front-end**
  - Validar obrigatoriedade e formato do e-mail **antes** de enviar (mensagens inline abaixo dos campos).
  - Ao receber erro de autenticação (ex.: 401/403), exibir **toast/alert** com mensagem genérica: “E-mail ou senha inválidos”.
  - Implementar estado de **loading** no botão **Acessar** durante a requisição (desabilitar + spinner + evitar múltiplos submits).
  - Expor feedback em componente acessível (ex.: `aria-live="polite"` ou `role="alert"`).
- **Back-end (se aplicável)**
  - Padronizar payload de erro (ex.: `{ code: "AUTH_INVALID", message: "E-mail ou senha inválidos" }`) para evitar casos sem mensagem.

