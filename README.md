## ✅ ChecklistV2

### 🔍 Descrição

**ChecklistV2** é uma aplicação web desenvolvida para auxiliar técnicos no gerenciamento e execução de testes por meio de checklists organizados por grupo e subgrupo. O sistema permite o cadastro, visualização, edição e finalização de testes, com controle de usuários autenticados.

---

### ⚙️ Tecnologias Utilizadas

*   **React** com **Vite** – Interface moderna e performance otimizada
*   **TypeScript** – Tipagem estática para maior segurança
*   **Tailwind CSS** – Estilização ágil com classes utilitárias
*   **MongoDB** – Banco de dados NoSQL para armazenar usuários e testes
*   **Zod + React Hook Form** – Validação e controle de formulários
*   **Cookies** – Para controle de autenticação e sessões

---

### 🔐 Funcionalidades

*   Autenticação de usuários (login, persistência com cookies)
*   Cadastro e edição de testes com validação
*   Organização de testes por **grupo** e **subgrupo**
*   Sessão de testes por técnico (início e finalização com controle individual)
*   Filtros e busca dinâmica
*   Interface responsiva e modular

---

### 🚀 Como Rodar Localmente

1.  Clone o repositório
    
    `git clone https://github.com/guilhermers23/checklistv2 cd checklistv2`
    
2.  Instale as dependências:
    
    `npm install`
    
3.  Configure as variáveis de ambiente (`.env`) com os dados do MongoDB e token secreto de autenticação.
4.  Inicie o projeto:
    
    `npm run dev`
    
5.  Acesse `http://localhost:5173` no navegador.

---

### 📌 Possibilidades de Expansão

*   Geração de relatórios em PDF
*   Dashboard com estatísticas por técnico
*   Atribuição de responsáveis por teste
*   Notificações de pendências

---

### 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para contribuir!
