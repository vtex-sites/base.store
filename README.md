# Intro

Esse é o nosso teste de temificação e customização da FastStore para frete de lojas.

- Sua missão é aplicar um tema nessa homepage [/theming-poc-homepage](https://8000-vtexsites-basestore-6ikje0f3a5e.ws-us32.gitpod.io/theming-poc-homepage/).
- Sinta-se livre para mexer nos tokens que achar necessário.
- Você também pode aplicar mudanças diretamente nos arquivos listados abaixo.

# Arquivos para customização

## Homepage

- [theming-poc-homepage.tsx](./src/pages/theming-poc-homepage.tsx)
- [homepage.scss](./src/styles/pages/homepage.scss)

## Global Design Tokens

- [global.scss](./src/styles/global.scss)
- [typography.scss](./src/styles/typography.scss)
- [default.scss](./src/styles/themes/default.scss) -> `Arquivo principal para customização`
- [nucommerce.scss](./src/styles/themes/nucommerce.scss)
- [grocery.scss](./src/styles/themes/grocery.scss)

## Componentes & Design Tokens Escopados

### Button

- [Button.tsx](./src/components/ui/Button/Button.tsx)
- [Button.scss](./src/components/ui/Button/buttons.scss)

### Hero

- [Hero.tsx](./src/components/sections/Hero/Hero.tsx)
- [Hero.scss](./src/components/sections/Hero/hero.scss)

### Incentives

- [Incentives.tsx](./src/components/sections/Incentives/Incentives.tsx)
- [Incentives.scss](./src/components/sections/Incentives/incentives.scss)

### Product Shelf

- [ProductShelf.tsx](./src/components/sections/ProductShelf/ProductShelf.tsx)
- [ProductShelf.scss](./src/components/sections/ProductShelf/product-shelf.scss)

### Product Card

- [ProductCard.tsx](./src/components/product/ProductCard/ProductCard.tsx)
- [ProductCard.scss](./src/components/product/ProductCard/product-card.scss)

### Banner Text

- [BannerText.tsx](./src/components/sections/BannerText/BannerText.tsx)
- [BannerText.scss](./src/components/sections/BannerText/banner-text.scss)
