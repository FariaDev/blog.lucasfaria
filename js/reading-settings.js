class ReadingSettings {
  constructor() {
    this.settings = {
      theme: 'light',
      fontSize: 1,
      lineHeight: 'default',
      fontFamily: 'serif',
      contentWidth: 'default'
    };

    this.init();
  }

  init() {
    // Carregar configurações salvas
    this.loadSettings();
    
    // Inicializar elementos do DOM
    this.initElements();
    
    // Adicionar event listeners
    this.addEventListeners();
    
    // Aplicar configurações iniciais
    this.applySettings();
  }

  initElements() {
    // Criar elementos do DOM
    this.createSettingsPanel();
    
    // Referências aos elementos
    this.trigger = document.querySelector('.settings-trigger');
    this.panel = document.querySelector('.settings-panel');
    this.overlay = document.querySelector('.settings-overlay');
    this.closeButton = document.querySelector('.settings-close');
    
    // Referências aos botões de configuração
    this.themeButtons = document.querySelectorAll('[data-setting="theme"]');
    this.fontSizeButtons = document.querySelectorAll('[data-setting="fontSize"]');
    this.lineHeightButtons = document.querySelectorAll('[data-setting="lineHeight"]');
    this.fontFamilyButtons = document.querySelectorAll('[data-setting="fontFamily"]');
    this.contentWidthButtons = document.querySelectorAll('[data-setting="contentWidth"]');
  }

  createSettingsPanel() {
    const panelHTML = `
      <div class="settings-overlay"></div>
      <button class="settings-trigger">⚙️</button>
      <div class="settings-panel">
        <button class="settings-close">×</button>
        
        <div class="settings-section">
          <h3>Tema</h3>
          <div class="settings-buttons">
            <button class="settings-button" data-setting="theme" data-value="light">Claro</button>
            <button class="settings-button" data-setting="theme" data-value="dark">Escuro</button>
          </div>
        </div>

        <div class="settings-section">
          <h3>Tamanho da Fonte</h3>
          <div class="settings-buttons">
            <button class="settings-button" data-setting="fontSize" data-value="decrease">A-</button>
            <button class="settings-button" data-setting="fontSize" data-value="increase">A+</button>
          </div>
        </div>

        <div class="settings-section">
          <h3>Altura da Linha</h3>
          <div class="settings-buttons">
            <button class="settings-button" data-setting="lineHeight" data-value="default">Padrão</button>
            <button class="settings-button" data-setting="lineHeight" data-value="medium">Média</button>
            <button class="settings-button" data-setting="lineHeight" data-value="wide">Ampla</button>
          </div>
        </div>

        <div class="settings-section">
          <h3>Fonte</h3>
          <div class="settings-buttons">
            <button class="settings-button" data-setting="fontFamily" data-value="serif">Serif</button>
            <button class="settings-button" data-setting="fontFamily" data-value="sans-serif">Sans-serif</button>
          </div>
        </div>

        <div class="settings-section">
          <h3>Largura do Texto</h3>
          <div class="settings-buttons">
            <button class="settings-button" data-setting="contentWidth" data-value="default">Padrão</button>
            <button class="settings-button" data-setting="contentWidth" data-value="wide">Larga</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', panelHTML);
  }

  addEventListeners() {
    // Toggle do painel
    this.trigger.addEventListener('click', () => this.togglePanel());
    this.closeButton.addEventListener('click', () => this.togglePanel());
    this.overlay.addEventListener('click', () => this.togglePanel());

    // Event listeners para os botões de configuração
    document.querySelectorAll('.settings-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const setting = e.target.dataset.setting;
        const value = e.target.dataset.value;
        this.updateSetting(setting, value);
      });
    });
  }

  togglePanel() {
    this.panel.classList.toggle('active');
    this.overlay.classList.toggle('active');
  }

  loadSettings() {
    const savedSettings = localStorage.getItem('readingSettings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
  }

  saveSettings() {
    localStorage.setItem('readingSettings', JSON.stringify(this.settings));
  }

  updateSetting(setting, value) {
    switch (setting) {
      case 'theme':
        this.settings.theme = value;
        document.documentElement.classList.toggle('dark-mode', value === 'dark');
        break;

      case 'fontSize':
        if (value === 'increase') {
          this.settings.fontSize = Math.min(this.settings.fontSize + 0.1, 1.5);
        } else {
          this.settings.fontSize = Math.max(this.settings.fontSize - 0.1, 0.8);
        }
        document.documentElement.style.setProperty('--font-size-base', `${this.settings.fontSize}rem`);
        break;

      case 'lineHeight':
        this.settings.lineHeight = value;
        const lineHeights = {
          default: '1.6',
          medium: '1.8',
          wide: '2'
        };
        document.documentElement.style.setProperty('--line-height-base', lineHeights[value]);
        break;

      case 'fontFamily':
        this.settings.fontFamily = value;
        document.documentElement.style.setProperty('--font-family-base', 
          value === 'serif' ? 'Merriweather, serif' : 'system-ui, sans-serif');
        break;

      case 'contentWidth':
        this.settings.contentWidth = value;
        document.documentElement.style.setProperty('--content-width', 
          value === 'wide' ? '90ch' : '70ch');
        break;
    }

    this.saveSettings();
    this.updateActiveButtons();
  }

  updateActiveButtons() {
    document.querySelectorAll('.settings-button').forEach(button => {
      const setting = button.dataset.setting;
      const value = button.dataset.value;
      
      if (setting === 'fontSize') {
        button.classList.toggle('active', 
          (value === 'increase' && this.settings.fontSize > 1) ||
          (value === 'decrease' && this.settings.fontSize < 1));
      } else {
        button.classList.toggle('active', this.settings[setting] === value);
      }
    });
  }

  applySettings() {
    // Aplicar tema
    document.documentElement.classList.toggle('dark-mode', this.settings.theme === 'dark');
    
    // Aplicar tamanho da fonte
    document.documentElement.style.setProperty('--font-size-base', `${this.settings.fontSize}rem`);
    
    // Aplicar altura da linha
    const lineHeights = {
      default: '1.6',
      medium: '1.8',
      wide: '2'
    };
    document.documentElement.style.setProperty('--line-height-base', lineHeights[this.settings.lineHeight]);
    
    // Aplicar família da fonte
    document.documentElement.style.setProperty('--font-family-base', 
      this.settings.fontFamily === 'serif' ? 'Merriweather, serif' : 'system-ui, sans-serif');
    
    // Aplicar largura do conteúdo
    document.documentElement.style.setProperty('--content-width', 
      this.settings.contentWidth === 'wide' ? '90ch' : '70ch');
    
    // Atualizar botões ativos
    this.updateActiveButtons();
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new ReadingSettings();
}); 