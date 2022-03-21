# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Sections component with `content-visibility: auto`
- Webpack Bundle analyzer
- `GatsbyLink` to `Link` ui component.
- `Skeleton` loading components.
- `SuggestionsTopSearch` component
- `PostalCodeInput` component and `usePostalCode` hook.
- `SuggestionProductCard` component.
- `EmptyState` component.
- `EmptyState` at the `ProductGallery` section.
- `IconSVG` component to load SVG Icons.
- `Suggestions` component.
- `SearchHistory` component.

### Changed
- Moved all icons to use Icon component
- Moved common/IconsSVG to ui/Icons
- Moved EmptyState from common to ui folder
- Removed fit-in property from image component
- Sections are now self-contained
- Moves icons to `/static/icons` folder
- Replaces page type redirects, a.k.a. `/account`, `/login` to a corresponding file in `/pages` folder
- Replaces `let` declarations for `useRef` for better React compatibility
- Refactors cart sidebar
- `BreadcrumbWrapper` from components/ui folder to `Breadcrumb` at components/sections
- Replace relative stylesheets imports with absolute path
- Moves some `Filter` component logic to the API
- `Sort` and `Button Filter` (Mobile) `Skeleton's` loading criteria
- Keep the latest `Filter` component state (Mobile)
- Implements the expanded mode of `Searchbar` in mobile devices.
- Updates Lighthouse and Cypress URL with valid product links
- `Hero` image responsive sizes for mobile and desktop.
- `Badge` variants names
- `Tiles` and `Tile` to use semantic list elements.

### Deprecated

- useWindowDimensions hook

### Removed
- Removing hooks folder and migrating these hooks to sdk ou inline them on components
- gatsby-plugin-offline due to CLS on recurrent users
- useWindowDimensions hook
- Removes unused `<FacetedFilter/>` component
- Unnecessary map at hooks
- API style redirects from `/_v/private/graphql` since they have no effect
- Display box from `<ProductCard/>` component
- `useTotalCount` hook
- Phosphor-react library

### Fixed

- Fix border style for Product Card and its skeleton on mobile
- The divisor for the `Breadcrumb` component not rendering valid HTML.
- useBuyButton/useRemoveButton hooks with inconsistent typings/behaviors
- React tree re-rendering
- Footer rendering pipeline
- Scroll lock when transitioning pages on mobile via `SlideOver` component navigation
- Filter Button specificity on desktop
- Filter facets are not being selected on mobile

### Security

## [0.1.1] - 2022-02-07

### Added

- Feat: Style IconButton (#290)

### Changed

- Chore: tweaks search page (#293)
- Extract UISelect from Sort to its own component (#299)
- Feat: lazy loading and improvements (CLS) (#300)

### Fixed

- SonarQube warning (#297)
- General fixes on Beta component (#287)
- Fix/Adjust inappropriate rerenders (#304)

## [0.1.0] - 2022-02-01

Version released for the Closed Beta

### Added

- This changelog
