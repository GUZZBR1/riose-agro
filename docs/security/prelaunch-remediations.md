# Registro das correções de segurança pré-lançamento

## Escopo

Esta branch, `codex/prelaunch-security-fixes`, parte do head remoto `main` `2288fb63e1761b7fa88a1e673ea5a04065f0bede`. As mudanças abaixo corrigem riscos encontrados na auditoria das seis branches remotas. Elas ficam isoladas nesta branch; nenhuma branch existente terá seu histórico reescrito.

## Correções aplicadas

1. **Arquivos XGain e conflito de licença:** removidos desta árvore o ZIP fonte, o Parquet derivado, o manifesto, o relatório de qualidade e o pipeline/teste de processamento. Relatórios de descoberta e prontidão agora marcam a fonte como excluída e não incluem medidas, checksum ou caminhos para dados locais. O `.gitignore` também bloqueia o retorno acidental desses diretórios.
2. **Traversal na rota de arquivos estáticos no Windows:** a rota rejeita separadores `\\` e NUL após decodificação, resolve arquivos de `src/client` a partir da raiz própria e verifica a contenção nessa raiz. Uma URL com `..%5c` não pode alcançar `.env`, `.git/config` ou outros arquivos do checkout.
3. **APIs locais de snapshot e LLM:** `/api/validate-snapshot`, `/api/explain` e `/api/interpret-experiment` agora aceitam somente conexões loopback diretas. `X-Forwarded-For`, `X-Real-IP` e `Forwarded` fazem a requisição ser tratada como encaminhada e bloqueada. A documentação esclarece que essas rotas não devem ser publicadas por proxy sem autenticação e política de proxy confiável.
4. **Executor nativo:** permanece loopback-only e agora executa no máximo uma comparação por vez; chamadas simultâneas recebem HTTP 429. A política de proxy descrita acima também se aplica à rota nativa.
5. **Request-target inválido:** falha ao construir a URL da requisição retorna HTTP 400 em vez de rejeitar o handler sem tratamento.
6. **Aquisição Mendeley:** nomes de arquivos recebidos da API são recusados se contiverem separadores, NUL ou não forem nomes simples. O caminho resolvido deve permanecer diretamente dentro da pasta `raw` antes de leitura, gravação ou remoção após checksum divergente.
7. **CI e instalação de produção:** removida do workflow a chamada `validate:product-scene`, que não existe no `package.json`. `ajv` e `ajv-formats`, importados pelo servidor em runtime, foram movidos para `dependencies`.

## Pendências que esta branch não resolve

- **Histórico Git:** esta branch herda commits que ainda contêm o ZIP XGain e derivados. Os heads remotos `main`, `actiii/145-readme`, `chore/repository-structure-alignment` e `codex/guzz-main-readme` também os contêm. Um merge normal desta branch não apaga objetos de commits ancestrais. Antes de tornar o repositório público, é necessário obter autorização dos titulares ou aprovar e executar uma reescrita coordenada do histórico de todos os refs que serão publicados, seguida de nova auditoria.
- **Proxy público:** as APIs locais bloqueiam cabeçalhos de encaminhamento comuns. Um proxy que não os envie ainda pode parecer loopback ao processo. Não encaminhe as rotas `/api/` publicamente; um backend público precisa de autenticação, quotas e configuração explícita de proxies confiáveis.
- **Verificação:** passaram `node --check src/server/server.js`, `python -m py_compile` nos dois scripts alterados, parsing JSON dos três relatórios, `git diff --check`, os 11 testes Python de prontidão e os dois testes HTTP novos para cabeçalhos de proxy e traversal Windows. `npm audit` reportou zero vulnerabilidades conhecidas na lockfile desta branch. A suíte JavaScript completa foi tentada: 390 de 434 testes passaram. Entre as falhas observadas estão dependências de ferramentas ausentes (`cargo`, `python3`), restrição Git `safe.directory`, incompatibilidade de URL de arquivo no Windows e execução de scripts POSIX; a suíte completa precisa ser repetida em ambiente compatível com CI para triagem conclusiva.

**Estado de publicação:** bloqueado até a pendência de histórico/direitos ser resolvida e o desenho de deployment do proxy ser confirmado.
