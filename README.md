# Intro

Este é o nosso teste de temificação e customização da FastStore para frente de lojas.

- Sua missão é criar um [novo tema](https://www.figma.com/file/24H9bpiUDXUtnntdg2kSoU/Theming-POC?node-id=0%3A1) em [/theming-poc-homepage](https://8000-vtexsites-basestore-6ikje0f3a5e.ws-us32.gitpod.io/theming-poc-homepage/).
- A customização é feita, primariamente, através de design tokens (variáveis CSS).
- O seu ponto de partida será o arquivo do tema [default](./src/styles/themes/default.scss).
- Dentro dos arquivos CSS de cada componente, você achará os design tokens específicos (escopados).
- Busque expressar seus pensamentos e dúvidas em voz alta.

Vamos lá?
Comece abrindo as [especificações do tema](https://www.figma.com/file/24H9bpiUDXUtnntdg2kSoU/Theming-POC?node-id=0%3A1) e edite o [default.scss](./src/styles/themes/default.scss) para criar esse novo tema.

# Arquivos Customizáveis

## Homepage

- [theming-poc-homepage.tsx](./src/pages/theming-poc-homepage.tsx) -> Página a ser customizada
- [homepage.scss](./src/styles/pages/homepage.scss)

## Design Tokens Primários

- [global.scss](./src/styles/global.scss)
- [typography.scss](./src/styles/typography.scss)

## Temas & Exemplos

- [default.scss](./src/styles/themes/default.scss) -> Arquivo temático: comece por aqui
- [nucommerce.scss](./src/styles/themes/nucommerce.scss) -> Exemplo de tema #1
- [grocery.scss](./src/styles/themes/grocery.scss) -> Exemplo de tema #2

## Componentes & Design Tokens Escopados

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
