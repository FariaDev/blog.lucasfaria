// Carregar tema imediatamente para evitar flash de conteúdo
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeButton = document.getElementById('close-settings');
    
    // Theme elements
    const themeLight = document.getElementById('theme-light');
    const themeDark = document.getElementById('theme-dark');
    
    // Font elements
    const fontFamilySelect = document.getElementById('font-family');
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValue = fontSizeSlider.nextElementSibling.nextElementSibling;
    const lineHeightSlider = document.getElementById('line-height');
    const lineHeightValue = lineHeightSlider.nextElementSibling.nextElementSibling;
    const previewBox = document.getElementById('settings-preview');
    
    // Adicionar aviso de teste
    if (settingsModal) {
        const betaWarning = document.createElement('div');
        betaWarning.className = 'beta-warning';
        betaWarning.innerHTML = '⚠️ Este menu está em fase de testes. Em caso de problemas com o tema, tente atualizar a página (Ctrl+R ou F5).';
        settingsModal.insertBefore(betaWarning, settingsModal.firstChild);
    }
    
    // Load saved settings
    function loadSettings() {
        // Theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeDark) themeDark.checked = true;
        } else {
            document.documentElement.classList.remove('dark');
            if (themeLight) themeLight.checked = true;
        }
        
        // Font Family
        const savedFontFamily = localStorage.getItem('fontFamily') || "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", Inter, Arial, sans-serif";
        if (fontFamilySelect) {
            fontFamilySelect.value = savedFontFamily;
            document.documentElement.style.setProperty('--font-body', savedFontFamily);
        }
        
        // Font Size
        const savedFontSize = localStorage.getItem('fontSize') || '18';
        if (fontSizeSlider) {
            fontSizeSlider.value = savedFontSize;
            fontSizeValue.textContent = `${savedFontSize}px`;
            document.documentElement.style.setProperty('--font-size-base', `${savedFontSize}px`);
        }
        
        // Line Height
        const savedLineHeight = localStorage.getItem('lineHeight') || '1.7';
        if (lineHeightSlider) {
            lineHeightSlider.value = (parseFloat(savedLineHeight) * 10).toString();
            lineHeightValue.textContent = savedLineHeight;
            document.documentElement.style.setProperty('--line-height', savedLineHeight);
        }
    }
    
    // Save settings to localStorage
    function saveSetting(key, value) {
        localStorage.setItem(key, value);
    }
    
    // Event Listeners
    if (settingsButton) {
        settingsButton.addEventListener('click', () => {
            settingsModal.classList.add('show');
        });
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            settingsModal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    if (settingsModal) {
        window.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('show');
            }
        });
    }
    
    // Theme toggle
    function handleThemeChange() {
        const isDark = themeDark.checked;
        document.documentElement.classList.toggle('dark', isDark);
        saveSetting('theme', isDark ? 'dark' : 'light');
        updatePreview();
        
        // Forçar atualização do tema em todos os elementos
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        document.querySelectorAll('*').forEach(el => {
            el.style.backgroundColor = '';
            el.style.color = '';
        });
    }
    
    if (themeLight) themeLight.addEventListener('change', handleThemeChange);
    if (themeDark) themeDark.addEventListener('change', handleThemeChange);
    
    // Font Family change
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener('change', function() {
            const fontFamily = this.value;
            document.documentElement.style.setProperty('--font-body', fontFamily);
            saveSetting('fontFamily', fontFamily);
            updatePreview();
        });
    }
    
    // Font Size change
    if (fontSizeSlider) {
        fontSizeSlider.addEventListener('input', function() {
            const size = this.value;
            fontSizeValue.textContent = `${size}px`;
            document.documentElement.style.setProperty('--font-size-base', `${size}px`);
            saveSetting('fontSize', size);
            updatePreview();
        });
    }
    
    // Line Height change
    if (lineHeightSlider) {
        lineHeightSlider.addEventListener('input', function() {
            const lineHeight = (this.value / 10).toFixed(1);
            lineHeightValue.textContent = lineHeight;
            document.documentElement.style.setProperty('--line-height', lineHeight);
            saveSetting('lineHeight', lineHeight);
            updatePreview();
        });
    }
    
    // Update preview box with current settings
    function updatePreview() {
        // The preview box will automatically update due to CSS variables
    }
    
    // Initialize settings
    loadSettings();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close modal on Escape key
        if (e.key === 'Escape' && settingsModal && settingsModal.classList.contains('show')) {
            settingsModal.classList.remove('show');
        }
        
        // Toggle settings modal with 'S' key (when not in an input field)
        if (e.key.toLowerCase() === 's' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            if (settingsModal) settingsModal.classList.toggle('show');
        }
    });
});

// Sync with existing theme toggle if it exists
function setTheme(theme) {
    const htmlElement = document.documentElement;
    const isDark = theme === 'dark';
    
    if (isDark) {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        const themeDark = document.getElementById('theme-dark');
        if (themeDark) themeDark.checked = true;
    } else {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        const themeLight = document.getElementById('theme-light');
        if (themeLight) themeLight.checked = true;
    }
    
    // Forçar atualização do tema em todos os elementos
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    document.querySelectorAll('*').forEach(el => {
        el.style.backgroundColor = '';
        el.style.color = '';
    });
}
