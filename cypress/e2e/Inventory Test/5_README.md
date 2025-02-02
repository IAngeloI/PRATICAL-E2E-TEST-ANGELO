# 📋 Testes Automatizados - [PRATICAL-E2E-TEST]

## 📝 Descrição

Este documento contém informações sobre os testes automatizados realizados no projeto, incluindo os cenários testados e os bugs encontrados.

---

## 🧪 Cenários Testados

| ID  | Cenário | Resultado Esperado | Resultado Obtido | Status |
|-----|---------|-------------------|------------------|--------|
| 01  | Login sem nome de usuário | Deve exibir erro de campo obrigatório | Erro exibido corretamente | ✅ Passou |
| 02  | Login sem senha | Deve exibir erro de campo obrigatório | Erro exibido corretamente | ✅ Passou |
| 03  | Remover um produto do carrinho | Produto deve ser removido | Produto removido com sucesso | ✅ Passou |
| 04  | Ordenar produtos de A-Z | Os produtos devem ser ordenados corretamente | Ordenação correta | ✅ Passou |
| 05  | Ordenar produtos de Z-A | Os produtos devem ser ordenados corretamente | Ordenação correta | ✅ Passou |
| 06  | Adicionar múltiplos produtos ao carrinho | O badge do carrinho deve mostrar o número correto | Badge exibe corretamente o número de itens | ✅ Passou |
| 07  | Verificar a quantidade de itens no carrinho | O número deve ser igual aos produtos adicionados | Quantidade correta exibida | ✅ Passou |
| 08  | Manter produtos no carrinho após recarregar a página | O carrinho deve continuar com os produtos | Produtos mantidos no carrinho | ✅ Passou |
| 09  | Adicionar item ao carrinho, fazer logout e login novamente | Produto deve continuar no carrinho | Produto presente no carrinho | ✅ Passou |
| 10  | Redirecionar para inventário após finalizar checkout | Deve voltar para a página de inventário | Redirecionamento correto | ✅ Passou |
| 11  | Usuário `error_user` não consegue remover produto do carrinho | Produto deve continuar no carrinho após tentativa de remoção | Produto permanece no carrinho | ✅ Passou |
| 12  | Usuário `error_user` não consegue alterar a ordenação dos produtos | Ordem deve continuar a mesma | Ordem mantida | ✅ Passou |
| 13  | Usuário `error_user` vê uma descrição errada ao clicar no produto | A descrição deve ser diferente depois de clicar | Descrição diferente detectada | ✅ Passou |

---

## 🐞 Bugs Encontrados

| ID  | Cenário em que ocorreu | Descrição | Passos para reproduzir | Severidade | Status |
|-----|--------------------------|------------|---------------------|------------|--------|
| 01  | Usuário `error_user` tentando remover um item do carrinho | Ao clicar em "Remover", o item não é removido e um erro `(uncaught exception)Error: Failed to remove item from cart.` é lançado | 1. Logar como `error_user` <br> 2. Adicionar um item ao carrinho a partir da página de produtos <br> 3. Tentar remover o item | Alta | Aberto |
| 02  | Usuário `error_user` tentando ordenar os produtos | A ordenação não muda, mesmo ao selecionar uma nova opção | 1. Logar como `error_user` <br> 2. Selecionar uma opção de ordenação <br> 3. Verificar que a ordem permanece a mesma | Alta | Aberto |
| 03  | Usuário `error_user` clicando em um produto | A descrição do produto muda ao clicar nele | 1. Logar como `error_user` <br> 2. Pegar a descrição de um item na tela principal <br> 3. Clicar no item <br> 4. Verificar que a descrição é diferente | Média | Aberto |

---
