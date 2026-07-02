# Qualiconsul — Site Institucional

Site estático da **Qualiconsul** (Engenharia & Montagens Industriais), baseado no template [Constr](https://thememarch.com) da Thememarch.

## Estrutura do projeto

```
qualiconsul/
├── index.html                  # Página inicial
├── about.html                  # Sobre nós
├── service.html                # Serviços
├── contact.html                # Contato (formulário WhatsApp)
├── projects.html               # Portfólio de projetos
├── project-details-1..6.html   # Detalhes de cada projeto
├── project-details.html        # Redirect → projects.html
├── [outras páginas template]   # blog, faq, team, etc.
│
└── assets/
    ├── css/
    │   ├── style.css           # CSS principal (servido em produção)
    │   ├── contact-form.css    # Estilos do formulário de contato
    │   └── plugins/            # Bootstrap, LightGallery, Swiper, AOS
    ├── js/
    │   ├── main.js             # Lógica do tema (menu, sliders, GSAP, etc.)
    │   ├── contact-form.js     # Validação e envio do formulário WhatsApp
    │   └── plugins/            # jQuery, GSAP, Swiper, Masonry, etc.
    ├── img/                    # Imagens, logos e ícones SVG
    ├── fonts/                  # Flaticon (ícones) e LightGallery
    └── sass/                   # Fonte SCSS do tema (33 partials)
```

## Páginas ativas (conteúdo Qualiconsul)

| Página | Descrição |
|--------|-----------|
| `index.html` | Home |
| `about.html` | Sobre nós |
| `service.html` | Serviços |
| `contact.html` | Contato |
| `projects.html` | Portfólio (4 projetos listados) |
| `project-details-1..4.html` | Detalhes dos projetos do portfólio |

As demais páginas HTML na raiz são do template original (blog, equipe, FAQ, etc.) e mantêm conteúdo em inglês.

## Desenvolvimento local

1. Abra a pasta do projeto no VS Code.
2. Use a extensão **Live Server** (porta configurada: `5501` em `.vscode/settings.json`).
3. Acesse `http://localhost:5501`.

Não há `package.json` nem pipeline de build. O CSS servido é `assets/css/style.css`.

## Convenções

- **Logos:** `LogoQualiConsul.png` (header) e `iconQuali.png` (footer/favicon).
- **Imagens de serviços:** pasta `assets/img/serv.QualiConsul/` (nomes com acentos — não renomear sem atualizar todas as referências).
- **Cache busting:** `style.css?v=N` — incrementar ao alterar o CSS principal.
- **Paths:** todos os HTML estão na raiz; assets usam caminhos relativos (`assets/css/...`).

## Dependências (vendors)

Referenciadas em `assets/css/plugins/` e `assets/js/plugins/`:

| Biblioteca | CSS | JS |
|------------|-----|-----|
| Bootstrap 5 | Sim | — |
| jQuery 3.7 | — | Sim |
| Swiper | Sim | Sim |
| AOS | Sim | Sim |
| GSAP + plugins | — | Sim |
| Masonry | — | Sim |
| LightGallery | Sim | Sim |
| Flaticon | `assets/fonts/flaticon.css` | — |

> Alguns arquivos de vendor e imagens podem existir apenas no deploy de produção e não no repositório local.

## Manutenção do formulário de contato

O formulário WhatsApp em `contact.html` usa arquivos dedicados:

- `assets/css/contact-form.css` — estilos de validação visual
- `assets/js/contact-form.js` — máscara de telefone, validação e redirecionamento WhatsApp

## Melhorias futuras (não implementadas)

- Reorganizar `plugins/` em `assets/vendors/` (requer atualizar ~297 referências nos HTML).
- Renomear `assets/img/` para `assets/images/` (requer atualizar ~363 referências).
- Introduzir build tool (11ty, Vite) para partials de header/footer.
- Pipeline SCSS automatizado (`sass/` → `css/style.css`).
- Restaurar vendors ausentes no repositório local (jQuery, Swiper, AOS, Masonry).
- Unificar páginas template ou removê-las após decisão de conteúdo.
