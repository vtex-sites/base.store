# Intro

Este é o nosso teste de temificação e customização da FastStore para frente de lojas.

- Sua missão é criar um `novo tema` para essa homepage: [/theming-poc-homepage](https://8000-vtexsites-basestore-6ikje0f3a5e.ws-us33.gitpod.io/theming-poc-homepage/).
- A customização é feita, primariamente, através de design tokens (variáveis CSS).
- O seu ponto de partida será o arquivo do tema [new-theme](./src/styles/themes/new-theme.scss) onde você achará os design tokens globais.
- Dentro dos arquivos CSS de cada componente, você achará os design tokens específicos (escopados).
- Busque expressar seus pensamentos e dúvidas em voz alta.

Vamos lá?

Comece abrindo as [especificações do Figma](https://www.figma.com/file/24H9bpiUDXUtnntdg2kSoU/Theming-POC?node-id=0%3A1) e edite o [new-theme.scss](./src/styles/themes/new-theme.scss) para criar esse novo tema.

**O primeiro passo é colocar sua paleta de cores.**

---

## Arquivos Customizáveis

`Por favor, use apenas os componentes listados abaixo.`

### Design Tokens Primários

- [new-theme.scss](./src/styles/themes/new-theme.scss) -> Arquivo temático: comece por aqui
- [spacing.scss](./src/styles/spacing.scss) -> Tokens de espaçamento
- [typography.scss](./src/styles/typography.scss) -> Tokens tipográficos

### Homepage

- [theming-poc-homepage.tsx](./src/pages/theming-poc-homepage.tsx) -> Página a ser customizada
- [homepage.scss](./src/styles/pages/homepage.scss)

### Button

- [Button.tsx](./src/components/ui/Button/Button.tsx)
- [button.scss](./src/components/ui/Button/buttons.scss)

### Badge

- [Badge.tsx](./src/components/ui/Badge/Badge.tsx)
- [Badge.scss](./src/components/ui/Badge/badge.scss)

### Hero

- [Hero.tsx](./src/components/sections/Hero/Hero.tsx)
- [hero.scss](./src/components/sections/Hero/hero.scss)

### Incentives

- [Incentives.tsx](./src/components/sections/Incentives/Incentives.tsx)
- [incentives.scss](./src/components/sections/Incentives/incentives.scss)

### Product Shelf

- [ProductShelf.tsx](./src/components/sections/ProductShelf/ProductShelf.tsx)
- [product-shelf.scss](./src/components/sections/ProductShelf/product-shelf.scss)

### Product Card

- [ProductCard.tsx](./src/components/product/ProductCard/ProductCard.tsx)
- [product-card.scss](./src/components/product/ProductCard/product-card.scss)

### Banner Text

- [BannerText.tsx](./src/components/sections/BannerText/BannerText.tsx)
- [banner-text.scss](./src/components/sections/BannerText/banner-text.scss)
