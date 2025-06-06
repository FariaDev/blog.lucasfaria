class SearchPalette {
    constructor() {
        this.overlay = document.getElementById('search-palette-overlay');
        this.input = document.getElementById('search-input');
        this.resultsList = document.getElementById('search-results');
        this.fuse = null;
        this.searchData = null;
        this.selectedIndex = -1;
        
        this.init();
    }

    async init() {
        // Carregar dados de busca
        try {
            const response = await fetch('/index.json');
            this.searchData = await response.json();
            this.fuse = new Fuse(this.searchData, {
                keys: ['title', 'content', 'categories'],
                threshold: 0.3,
                includeScore: true
            });
        } catch (error) {
            console.error('Erro ao carregar dados de busca:', error);
        }

        // Event listeners
        this.input.addEventListener('input', () => this.handleSearch());
        this.input.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Atalho de teclado global
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            } else if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) {
                this.close();
            }
        });
    }

    open() {
        this.overlay.classList.remove('hidden');
        this.input.focus();
        this.input.value = '';
        this.resultsList.innerHTML = '';
        this.selectedIndex = -1;
    }

    close() {
        this.overlay.classList.add('hidden');
        this.input.blur();
    }

    handleSearch() {
        const query = this.input.value.trim();
        if (!query) {
            this.resultsList.innerHTML = '';
            return;
        }

        const results = this.fuse.search(query).slice(0, 10);
        this.renderResults(results);
    }

    renderResults(results) {
        this.resultsList.innerHTML = '';
        this.selectedIndex = -1;

        results.forEach((result, index) => {
            const li = document.createElement('li');
            li.className = 'result-item';
            li.innerHTML = `
                <a href="${result.item.url}">
                    <span class="result-title">${result.item.title}</span>
                    <span class="result-subtitle">${result.item.categories?.join(', ') || ''}</span>
                </a>
            `;
            this.resultsList.appendChild(li);
        });
    }

    handleKeyNavigation(e) {
        const items = this.resultsList.getElementsByClassName('result-item');
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
                this.updateSelection(items);
                break;
            
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                this.updateSelection(items);
                break;
            
            case 'Enter':
                if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
                    e.preventDefault();
                    window.location.href = items[this.selectedIndex].querySelector('a').href;
                }
                break;
        }
    }

    updateSelection(items) {
        Array.from(items).forEach((item, index) => {
            item.classList.toggle('active', index === this.selectedIndex);
        });
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new SearchPalette();
}); 