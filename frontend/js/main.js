// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Inicializar aplicação
async function inicializar() {
  console.log('Iniciando aplicação...');

  // Carregar produtos
  const produtos = await carregarProdutos();
  renderizarProdutos(produtos);

  // Carregar carrinho
  await atualizarCarrinho();

  // Configurar animações
  configurarAnimacoesScroll();
}

// Renderizar produtos na página
function renderizarProdutos(produtos) {
  const container = document.getElementById('produtosContainer');

  if (produtos.length === 0) {
    container.innerHTML = '<p class="text-center">Nenhum produto disponível</p>';
    return;
  }

  let html = '';

  produtos.forEach((produto, index) => {
    html += `
      <div class="col-lg-4 col-md-6 col-sm-12 scroll-reveal">
        <div class="card produto-card">
          <div class="produto-img-container">
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
            <span class="produto-categoria">${produto.categoria}</span>
          </div>
          <div class="produto-info">
            <h5 class="produto-nome">${produto.nome}</h5>
            <p class="produto-descricao">${produto.descricao}</p>
            <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
            <button class="btn btn-adicionar" onclick="adicionarProdutoAoCarrinho(${produto.id})">
              <i class="bi bi-cart-plus"></i> Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Animar cards após renderizar
  animarCardsEntrada();
}

// Animação de entrada dos cards
function animarCardsEntrada() {
  const cards = document.querySelectorAll('.scroll-reveal');

  cards.forEach((card, index) => {
    gsap.from(card, {
      duration: 0.6,
      opacity: 0,
      y: 50,
      delay: index * 0.1,
      ease: 'power2.out'
    });
  });
}

// Configurar animações de scroll
function configurarAnimacoesScroll() {
  // Animar seção de produtos ao scroll
  gsap.to('.produtos-section', {
    scrollTrigger: {
      trigger: '.produtos-section',
      start: 'top 80%',
      end: 'top 20%',
      toggleClass: 'active',
      once: true
    }
  });

  // Parallax no hero
  gsap.to('.hero-image', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 100
  });

  // Observador para scroll reveal
  const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observador.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // Observar todos os elementos com classe scroll-reveal
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observador.observe(el);
  });
}

// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializar);
