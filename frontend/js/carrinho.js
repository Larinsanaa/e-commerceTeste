// Variável para armazenar itens do carrinho
let carrinhoItens = [];

// Atualizar a exibição do carrinho
async function atualizarCarrinho() {
  carrinhoItens = await carregarCarrinho();
  renderizarCarrinho();
  atualizarContadorCarrinho();
}

// Renderizar itens do carrinho
function renderizarCarrinho() {
  const container = document.getElementById('carrinhoItems');
  const totalDiv = document.getElementById('carrinhoTotal');

  if (carrinhoItens.length === 0) {
    container.innerHTML = '<p class="text-muted">Seu carrinho está vazio</p>';
    totalDiv.style.display = 'none';
    return;
  }

  let html = '';
  let total = 0;

  carrinhoItens.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    html += `
      <div class="carrinho-item">
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="carrinho-item-info">
          <div class="carrinho-item-nome">${item.nome}</div>
          <div class="carrinho-item-preco">
            R$ ${item.preco.toFixed(2)} x ${item.quantidade} = R$ ${subtotal.toFixed(2)}
          </div>
        </div>
        <button class="btn-remover" onclick="removerItem(${item.id})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
  document.getElementById('totalPrice').textContent = total.toFixed(2);
  totalDiv.style.display = 'block';
}

// Remover item do carrinho
async function removerItem(carrinhoId) {
  await removerDoCarrinho(carrinhoId);
  await atualizarCarrinho();
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
  const contador = document.getElementById('carrinhoCount');
  let total = 0;
  carrinhoItens.forEach(item => {
    total += item.quantidade;
  });
  contador.textContent = total;
}

// Adicionar produto ao carrinho
async function adicionarProdutoAoCarrinho(produtoId) {
  await adicionarAoCarrinho(produtoId, 1);
  await atualizarCarrinho();

  // Feedback visual
  const btn = event.target;
  btn.textContent = 'Adicionado!';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Adicionar ao Carrinho';
    btn.disabled = false;
  }, 1500);
}
