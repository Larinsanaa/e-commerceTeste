// Obter ID do produto da URL
const urlParams = new URLSearchParams(window.location.search);
const produtoId = urlParams.get('id');

// Carregar detalhes do produto
async function carregarProduto() {
  try {
    if (!produtoId) {
      document.getElementById('produtoNome').textContent = 'ID do produto não especificado';
      return;
    }

    const response = await fetch(`http://localhost:3000/api/produtos/${produtoId}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const produto = await response.json();

    if (produto.erro) {
      throw new Error(produto.erro);
    }

    // Preencher informações
    document.getElementById('produtoNome').textContent = produto.nome;
    document.getElementById('produtoPreco').textContent = `R$ ${produto.preco.toFixed(2)}`;
    document.getElementById('produtoDescricao').textContent = produto.descricao;
    document.getElementById('produtoCategoria').textContent = produto.categoria;
    document.getElementById('produtoImagem').src = produto.imagem;
    document.getElementById('produtoImagem').alt = produto.nome;

    // Carregar carrinho
    await atualizarCarrinho();
  } catch (erro) {
    console.error('Erro ao carregar produto:', erro);
    document.getElementById('produtoNome').textContent = 'Produto não encontrado';
  }
}

// Adicionar ao carrinho com quantidade
async function adicionarAoCarrinhoDetalhes() {
  const quantidade = parseInt(document.getElementById('quantidade').value) || 1;
  await adicionarAoCarrinho(produtoId, quantidade);
  await atualizarCarrinho();

  // Feedback visual
  const btn = event.target;
  btn.textContent = 'Adicionado ao carrinho!';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="bi bi-cart-plus"></i> Adicionar ao Carrinho';
    btn.disabled = false;
  }, 1500);
}

// Inicializar
document.addEventListener('DOMContentLoaded', carregarProduto);
