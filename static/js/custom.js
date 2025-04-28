document.addEventListener('DOMContentLoaded', function() {
    // Modal de busca
    const openSearchBtn = document.getElementById('open-search-modal');
    const searchModalOverlay = document.getElementById('search-modal-overlay');
    const closeSearchBtn = document.getElementById('close-search-modal');
    const searchInput = document.getElementById('search-modal-input');
    const searchResults = document.getElementById('search-modal-results');
    let fuse = null;
    let dataLoaded = false;
    let posts = [];

    // Carregar index.json e inicializar Fuse.js
    function loadSearchData() {
        if (dataLoaded) return;
        fetch('/index.json')
            .then(res => res.json())
            .then(data => {
                posts = data;
                fuse = new window.Fuse(posts, {
                    keys: ['title'],
                    threshold: 0.4,
                    ignoreLocation: true,
                });
                dataLoaded = true;
            });
    }

    function openModal() {
        searchModalOverlay.classList.add('active');
        document.body.classList.add('search-modal-open');
        if (document.documentElement.classList.contains('dark')) {
            document.getElementById('search-modal').classList.add('dark');
        } else {
            document.getElementById('search-modal').classList.remove('dark');
        }
        setTimeout(() => searchInput.focus(), 100);
        loadSearchData();
    }

    function closeModal() {
        searchModalOverlay.classList.remove('active');
        document.body.classList.remove('search-modal-open');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }

    openSearchBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });
    closeSearchBtn?.addEventListener('click', closeModal);
    searchModalOverlay?.addEventListener('click', function(e) {
        if (e.target === searchModalOverlay) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Busca instantânea
    searchInput?.addEventListener('input', function() {
        if (!fuse || !this.value.trim()) {
            searchResults.innerHTML = '';
            return;
        }
        const results = fuse.search(this.value.trim(), { limit: 10 });
        if (results.length === 0) {
            searchResults.innerHTML = '<li>Nenhum resultado encontrado.</li>';
            return;
        }
        searchResults.innerHTML = results.map((r, i) =>
            `<li class="search-result-item${i === 0 ? ' selected' : ''}" tabindex="0" data-url="${r.item.permalink}"><span>${r.item.title}</span></li>`
        ).join('');
    });

    // Tornar o bloco inteiro clicável
    searchResults?.addEventListener('click', function(e) {
        let li = e.target.closest('.search-result-item');
        if (li && li.dataset.url) {
            window.location.href = li.dataset.url;
        }
    });

    // Destacar sugestão ao passar o mouse
    searchResults?.addEventListener('mouseover', function(e) {
        let li = e.target.closest('.search-result-item');
        if (!li) return;
        searchResults.querySelectorAll('.search-result-item').forEach(item => item.classList.remove('selected'));
        li.classList.add('selected');
    });
    searchResults?.addEventListener('mouseleave', function(e) {
        // Volta a selecionar o primeiro item ao sair do mouse
        const first = searchResults.querySelector('.search-result-item');
        if (first) {
            searchResults.querySelectorAll('.search-result-item').forEach(item => item.classList.remove('selected'));
            first.classList.add('selected');
        }
    });

    // Abrir o primeiro resultado ao pressionar Enter
    searchInput?.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const selected = searchResults.querySelector('.search-result-item.selected') || searchResults.querySelector('.search-result-item');
            if (selected && selected.dataset.url) {
                window.location.href = selected.dataset.url;
            }
        }
    });

    // Menu hambúrguer mobile
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const btnNewsletterMobile = document.getElementById('btn-newsletter-mobile');
    const openSearchMobile = document.getElementById('open-search-modal-mobile');
    const btnNewsletter = document.getElementById('btn-newsletter');

    hamburger?.addEventListener('click', function() {
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('search-modal-open');
        } else {
            mobileMenu.classList.add('active');
            document.body.classList.add('search-modal-open');
        }
    });
    mobileMenu?.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('search-modal-open');
        }
    });
    // Newsletter mobile
    btnNewsletterMobile?.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.remove('active');
        document.body.classList.remove('search-modal-open');
        btnNewsletter?.click();
    });
    // Pesquisa mobile
    openSearchMobile?.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.remove('active');
        document.body.classList.remove('search-modal-open');
        openSearchBtn?.click();
    });

    // Loader de carregamento no topo
    const loaderBar = document.getElementById('top-loader-bar');
    function startLoader() {
        if (!loaderBar) return;
        loaderBar.style.width = '0%';
        loaderBar.classList.remove('hide');
        setTimeout(() => {
            loaderBar.style.width = '80%';
        }, 10);
    }
    function finishLoader() {
        if (!loaderBar) return;
        loaderBar.style.width = '100%';
        setTimeout(() => {
            loaderBar.classList.add('hide');
            loaderBar.style.width = '0%';
        }, 400);
    }
    // Inicia loader ao clicar em links internos
    document.addEventListener('click', function(e) {
        const a = e.target.closest('a');
        if (a && a.href && a.origin === window.location.origin && !a.hasAttribute('target') && !a.href.startsWith('mailto:') && !a.href.startsWith('tel:')) {
            if (a.getAttribute('href').startsWith('#')) return;
            startLoader();
        }
    }, true);
    // Finaliza loader ao carregar página
    window.addEventListener('pageshow', finishLoader);
    window.addEventListener('DOMContentLoaded', finishLoader);
    window.addEventListener('load', finishLoader);
}); 