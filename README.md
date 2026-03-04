# E-commerce StreetWear - Projeto de Testes de Software

Uma aplicação de e-commerce simples e didática de roupas streetwear, desenvolvida para fins educacionais na disciplina de Teste de Software.

## 📋 Estrutura do Projeto

```
e-commerceTeste/
├── frontend/               # Interface do usuário
│   ├── index.html         # Página principal
│   ├── css/
│   │   └── style.css      # Estilos e animações
│   └── js/
│       ├── main.js        # Inicialização e animações
│       ├── api.js         # Funções para comunicar com backend
│       └── carrinho.js    # Lógica do carrinho
├── backend/               # API Rest
│   ├── server.js          # Servidor Express
│   ├── database.db        # Banco SQLite (criado automaticamente)
│   └── package.json       # Dependências
└── README.md
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js instalado (v14 ou superior)
- Um navegador moderno

### 1. Instalar Backend

```bash
cd backend
npm install
npm run dev
```

O servidor rodará em `http://localhost:5000`

### 2. Rodar Frontend

Abra o arquivo `frontend/index.html` no navegador, ou use um servidor local:

```bash
# Opção 1: Python
cd frontend
python -m http.server 8000

# Opção 2: Node (com http-server)
npm install -g http-server
cd frontend
http-server
```

Acesse `http://localhost:8000` (ou a porta indicada)

## 📚 Funcionalidades

- ✅ Listar produtos com imagens
- ✅ Adicionar produtos ao carrinho
- ✅ Remover produtos do carrinho
- ✅ Calcular total do carrinho
- ✅ Animações modernas com scroll
- ✅ Interface responsiva

## 🎨 Tecnologias Utilizadas

**Frontend:**
- HTML5
- CSS3 com animações
- JavaScript puro
- Bootstrap 5
- GSAP (animações de scroll)

**Backend:**
- Node.js
- Express.js
- SQLite3

## 📝 API Endpoints

### Produtos

**GET** `/api/produtos`
- Retorna lista de todos os produtos

**Exemplo de resposta:**
```json
[
  {
    "id": 1,
    "nome": "T-Shirt Oversized Black",
    "descricao": "Camiseta preta oversized 100% algodão",
    "preco": 89.90,
    "categoria": "Camisetas",
    "imagem": "url-da-imagem"
  }
]
```

### Carrinho

**GET** `/api/carrinho`
- Retorna itens do carrinho

**POST** `/api/carrinho`
- Adiciona produto ao carrinho
- Body: `{ "produtoId": 1, "quantidade": 1 }`

**DELETE** `/api/carrinho/:id`
- Remove item do carrinho

## 🧪 Como Usar para Testes

Este projeto é ideal para praticar:

1. **Testes Unitários** - Testar funções JavaScript
2. **Testes de API** - Testar endpoints com Postman
3. **Testes de UI** - Testar fluxo do usuário
4. **Testes de Integração** - Comunicação frontend + backend

### Exemplo: Testar com Postman

1. Importe as requisições abaixo:

```
GET http://localhost:5000/api/produtos
POST http://localhost:5000/api/carrinho
Body: { "produtoId": 1, "quantidade": 1 }
GET http://localhost:5000/api/carrinho
```

## 📸 Screenshots

[Para adicionar prints da aplicação]

## 🔧 Possíveis Melhorias

- [ ] Adicionar autenticação de usuário
- [ ] Implementar persitência de carrinho com LocalStorage
- [ ] Criar página de administrador
- [ ] Adicionar busca e filtros
- [ ] Implementar checkout e pagamento
- [ ] Testes automatizados

## 📖 Documentação Importante

- **Express**: https://expressjs.com/
- **SQLite**: https://www.sqlite.org/docs.html
- **Bootstrap**: https://getbootstrap.com/docs/
- **GSAP**: https://gsap.com/docs/v3/
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## ⚠️ Notas

- O banco de dados SQLite é criado automaticamente na primeira execução
- Produtos de exemplo são inseridos automaticamente
- CORS está habilitado para comunicação entre frontend e backend
- Use `npm run dev` no backend para desenvolvimento (com hot reload)

## 📞 Suporte

Dúvidas? Verifique os logs do console do navegador e do terminal para mensagens de erro.

---

**Desenvolvido para fins educacionais** 🎓
