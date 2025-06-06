# FariaBlog

![Licença](https://img.shields.io/badge/licença-MIT-blue.svg)
![Hugo](https://img.shields.io/badge/Hugo-v0.127.0-blue.svg)
![Último%20Commit](https://img.shields.io/github/last-commit/FariaDev/blog.lucasfaria.svg)

Um blog pessoal moderno e elegante construído com Hugo e o tema PaperMod. Este é o espaço onde compartilho insights, reflexões e descobertas, documentando meus estudos, leituras e pensamentos.

## ✨ Destaques

-   **🎨 Interface e Design:** Design minimalista e responsivo com suporte a modo claro/escuro, tipografia otimizada e animações suaves.
-   **🔍 Navegação e Busca:** Sistema de busca em tempo real (Fuse.js), breadcrumbs e uma organização de conteúdo por categorias e tags.
-   **💬 Interatividade:** Sistema de comentários leve com [Cusdis](https://cusdis.com/) e botões de compartilhamento social.
-   **⚡ Otimização:** Foco em performance com SEO otimizado, carregamento progressivo de imagens, compressão de assets e suporte a PWA (Progressive Web App).

## 🛠️ Tecnologias Utilizadas

-   **[Hugo](https://gohugo.io/):** Gerador de sites estáticos de alta performance escrito em Go.
-   **[PaperMod](https://github.com/adityatelange/hugo-PaperMod):** Tema Hugo minimalista, rápido e responsivo.
-   **[Cusdis](https://cusdis.com/):** Alternativa de código aberto e focada em privacidade para sistemas de comentários como o Disqus.

## 🚀 Executando Localmente

### Pré-requisitos

-   [Git](https://git-scm.com/)
-   [Hugo](https://gohugo.io/getting-started/installing/) (versão estendida)

### Passos

1.  Clone o repositório:
    ```bash
    git clone https://github.com/FariaDev/blog.lucasfaria.git
    ```

2.  Entre no diretório do projeto:
    ```bash
    cd blog.lucasfaria
    ```

3.  Inicie o servidor de desenvolvimento do Hugo:
    ```bash
    hugo server -D
    ```

4.  Abra seu navegador e acesse `http://localhost:1313`.

## 📂 Estrutura do Projeto

```text
.
├── archetypes/     # Templates para novos conteúdos (posts)
├── content/        # Todo o conteúdo do blog em Markdown
├── data/           # Arquivos de dados (ex: JSON, YAML)
├── layouts/        # Layouts e templates HTML personalizados
├── public/         # Diretório de saída do site gerado (não versionado)
├── static/         # Arquivos estáticos (CSS, JS, imagens)
└── themes/         # Tema PaperMod como um submódulo Git
```

## 🔧 Configuração

O arquivo `config.yml` centraliza todas as configurações do site, permitindo ajustar:

-   Informações do site (título, URL base)
-   Parâmetros do tema PaperMod
-   Menus de navegação
-   Links para redes sociais
-   Configurações do sistema de comentários

## 🎯 Roadmap

-   [ ] Implementação de um sistema de newsletter.
-   [ ] Melhorias na interface de busca.
-   [ ] Otimizações contínuas de performance e acessibilidade.
-   [ ] Expansão dos recursos de personalização.

## 🤝 Contribuições

Contribuições são bem-vindas! Para bugs ou sugestões, por favor, abra uma [issue](https://github.com/FariaDev/blog.lucasfaria/issues). Para adicionar funcionalidades, sinta-se à vontade para enviar um [pull request](https://github.com/FariaDev/blog.lucasfaria/pulls).

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📫 Contato

-   **Email:** fariablog1@gmail.com
-   **GitHub:** [@FariaDev](https://github.com/FariaDev)