document.addEventListener('DOMContentLoaded', function() {
    const searchModal = document.getElementById('search-modal');
    const searchOverlay = document.getElementById('search-modal-overlay');
    const searchInput = document.getElementById('search-modal-input');
    const searchResults = document.getElementById('search-modal-results');
    const closeButton = document.getElementById('close-search-modal');
    const openSearchButton = document.getElementById('open-search-modal');
    
    let fuse;
    let selectedIndex = -1;
    let searchData = [];

    // Carregar dados de busca
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            searchData = data.posts;
            fuse = new Fuse(searchData, {
                keys: ['title', 'content'],
                threshold: 0.3,
                distance: 100
            });
        });

    // Abrir modal
    openSearchButton.addEventListener('click', function(e) {
        e.preventDefault();
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    });

    // Fechar modal
    function closeModal() {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        selectedIndex = -1;
        document.body.style.overflow = '';
    }

    closeButton.addEventListener('click', closeModal);
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            closeModal();
        }
    });

    // Navegação por teclado
    searchInput.addEventListener('keydown', function(e) {
        const results = searchResults.getElementsByTagName('li');
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
                updateSelection(results);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                updateSelection(results);
                break;
                
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && results[selectedIndex]) {
                    results[selectedIndex].querySelector('a').click();
                }
                break;
                
            case 'Escape':
                e.preventDefault();
                closeModal();
                break;
        }
    });

    function updateSelection(results) {
        Array.from(results).forEach((result, index) => {
            if (index === selectedIndex) {
                result.classList.add('selected');
                result.scrollIntoView({ block: 'nearest' });
            } else {
                result.classList.remove('selected');
            }
        });
    }

    // Busca
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const results = fuse.search(query).slice(0, 10);
        renderResults(results);
        selectedIndex = -1;
    });

    function renderResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<li class="no-results">Nenhum resultado encontrado</li>';
            return;
        }

        results.forEach(result => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            const title = document.createElement('div');
            const subtitle = document.createElement('div');
            
            title.className = 'result-title';
            title.textContent = result.item.title;
            
            subtitle.className = 'result-subtitle';
            subtitle.textContent = new Date(result.item.date).toLocaleDateString('pt-BR');
            
            a.href = result.item.url;
            a.appendChild(title);
            a.appendChild(subtitle);
            li.appendChild(a);
            searchResults.appendChild(li);
        });
    }
}); 