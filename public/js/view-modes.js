document.addEventListener('DOMContentLoaded', function() {
    const viewControls = document.querySelector('.view-controls');
    const postEntries = document.querySelector('.post-entries');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    if (!viewControls || !postEntries || !viewButtons.length) {
        console.error('Elementos necessários não encontrados');
        return;
    }
    
    // Função para aplicar a visualização
    function applyView(view) {
        // Remove todas as classes de visualização
        postEntries.classList.remove('view-list', 'view-grid', 'view-compact');
        // Adiciona a classe da visualização selecionada
        postEntries.classList.add(`view-${view}`);
        
        // Atualiza os botões
        viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Salva a preferência no localStorage
        localStorage.setItem('preferredView', view);
    }
    
    // Carrega a preferência salva ou usa o modo lista como padrão
    const savedView = localStorage.getItem('preferredView') || 'list';
    applyView(savedView);
    
    // Adiciona os event listeners aos botões
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            applyView(btn.dataset.view);
        });
    });
}); 