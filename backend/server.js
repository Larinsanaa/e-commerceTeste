const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Banco de dados
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err);
  } else {
    console.log('Conectado ao SQLite');
    initDatabase();
  }
});

// Inicializar banco de dados com produtos
function initDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL NOT NULL,
      imagem TEXT,
      categoria TEXT
    )
  `, (err) => {
    if (err) console.error(err);

    // Inserir produtos de exemplo
    db.get("SELECT COUNT(*) as count FROM produtos", (err, row) => {
      if (row.count === 0) {
        const produtos = [
          { nome: 'T-Shirt Oversized Black', descricao: 'Camiseta preta oversized 100% algodão', preco: 89.90, categoria: 'Camisetas', imagem: 'https://via.placeholder.com/300x400?text=T-Shirt+Black' },
          { nome: 'Hoodie Cinza', descricao: 'Moletom cinza confortável', preco: 159.90, categoria: 'Hoodies', imagem: 'https://via.placeholder.com/300x400?text=Hoodie+Cinza' },
          { nome: 'Calça Cargo Bege', descricao: 'Calça cargo com vários bolsos', preco: 199.90, categoria: 'Calças', imagem: 'https://via.placeholder.com/300x400?text=Cargo+Bege' },
          { nome: 'Jaqueta Denim', descricao: 'Jaqueta jeans clássica', preco: 279.90, categoria: 'Jaquetas', imagem: 'https://via.placeholder.com/300x400?text=Denim+Jacket' },
          { nome: 'Calça Jeans Azul', descricao: 'Jeans azul escuro premium', preco: 169.90, categoria: 'Calças', imagem: 'https://via.placeholder.com/300x400?text=Jeans+Azul' },
          { nome: 'Camiseta Branca', descricao: 'T-shirt branca básica', preco: 69.90, categoria: 'Camisetas', imagem: 'https://via.placeholder.com/300x400?text=T-Shirt+White' },
        ];

        produtos.forEach(p => {
          db.run(
            "INSERT INTO produtos (nome, descricao, preco, categoria, imagem) VALUES (?, ?, ?, ?, ?)",
            [p.nome, p.descricao, p.preco, p.categoria, p.imagem]
          );
        });
        console.log('Produtos de exemplo inseridos');
      }
    });
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS carrinho (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produtoId INTEGER NOT NULL,
      quantidade INTEGER DEFAULT 1,
      FOREIGN KEY (produtoId) REFERENCES produtos(id)
    )
  `, (err) => {
    if (err) console.error(err);
  });
}

// ROTAS

// GET - Listar todos os produtos
app.get('/api/produtos', (req, res) => {
  db.all("SELECT * FROM produtos", (err, rows) => {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else {
      res.json(rows);
    }
  });
});

// GET - Listar itens do carrinho
app.get('/api/carrinho', (req, res) => {
  db.all(`
    SELECT c.id, p.id as produtoId, p.nome, p.preco, p.imagem, c.quantidade
    FROM carrinho c
    JOIN produtos p ON c.produtoId = p.id
  `, (err, rows) => {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else {
      res.json(rows);
    }
  });
});

// POST - Adicionar ao carrinho
app.post('/api/carrinho', (req, res) => {
  const { produtoId, quantidade } = req.body;

  db.get("SELECT * FROM carrinho WHERE produtoId = ?", [produtoId], (err, row) => {
    if (row) {
      // Produto já existe no carrinho, aumenta quantidade
      db.run(
        "UPDATE carrinho SET quantidade = quantidade + ? WHERE produtoId = ?",
        [quantidade, produtoId],
        (err) => {
          if (err) {
            res.status(500).json({ erro: err.message });
          } else {
            res.json({ mensagem: 'Quantidade atualizada' });
          }
        }
      );
    } else {
      // Novo produto no carrinho
      db.run(
        "INSERT INTO carrinho (produtoId, quantidade) VALUES (?, ?)",
        [produtoId, quantidade],
        (err) => {
          if (err) {
            res.status(500).json({ erro: err.message });
          } else {
            res.json({ mensagem: 'Produto adicionado ao carrinho' });
          }
        }
      );
    }
  });
});

// DELETE - Remover item do carrinho
app.delete('/api/carrinho/:id', (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM carrinho WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else {
      res.json({ mensagem: 'Produto removido do carrinho' });
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
