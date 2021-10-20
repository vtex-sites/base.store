<p align="center">
  <a href="https://github.com/vtex/faststore">
    <img alt="Store Framework" src="https://emoji.slack-edge.com/T02BCPD0X/store-framework/7547b127e929c376.png" width="75" />
  </a>
</p>
<h1 align="center">
  A starter powered by Faststore and Gatsby
</h1> 

Kickoff your store with this boilerplate. This starter ships with the main Faststore configuration files you might need to get up and running blazing fast with the blazing-fast store for React. 

## 🚀 Quick start

0. **Clone this repo**

    Get up and running by cloning this repo.

    ```shell
    # Clone this repo into your machine
    npx degit vtex-sites/base.store awesome.store
    ```

1.  **Install dependencies**

    Install dependencies with yarn

    ```shell
    cd awesome.store/
    yarn
    ```

2.  **Setup env vars**

    Choose the ecommerce platform provider of your choice in the `vtex.env` file and set the corresponding options. For instance, to connect to the VTEX platform on the store `fashioneurope`:

    ```
    GATSBY_STORE_ID=fashioneurope
    GATSBY_VTEX_ENVIRONMENT=vtexcommercestable
    ```

3.  **Start developing**

    Navigate into your new site’s directory and start it up.

    ```shell
    yarn develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

> Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/docs/tutorial/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries).

    Open the `awesome.store` directory in your code editor of choice and edit `src/pages/index.tsx`. Save your changes and the browser will update in real-time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    ./
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .eslintignore
    ├── .prettierignore
    ├── .prettierrrc
    ├── .eslintrc
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── LICENSE
    └── yarn.lock
    ├── package.json
    ├── tsconfig.json
    ├── vtex.env
    ├── README.md
    ├── __generated__
    ├── babel.config.js
    ├── cypress
    ├── cypress.json
    ├── gatsby-browser.js
    ├── gatsby-ssr.js
    ├── lighthouserc.js
    ├── public
    ├── pull_request_template.md
    ├── renovate.json

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`.eslintrc.js`**: This is a configuration file for [ESLint](https://eslint.org/). ESlint is a tool to find and fix problems in your JavaScript code.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`LICENSE`**: Gatsby is licensed under the MIT license.

9. **`yarn.lock`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

10. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

11. **`tsconfig.json`**: The configuration file for the typescript compiler. This will statically analyze your code for errors and bugs before releasing them into production

12. **`vtex.env`**: Environment variables needed for accessing your account in VTEX

13. **`README.md`**: A text file containing useful reference information about your project.

14. **`__generated__`**: Where TypeScript typings are generated for your GraphQL queries. You can use these files for strongly typing your App

15. **`babel.config.js`**: [Babel configurations](https://babeljs.io/docs/en/configuration#babelrcjson) for you app. This is where you can change the targeted browsers.

16. **`cypress`**: End to End(e2e) tests using Cypress. Most of the scenarios are covered here. Add your custom flows to avoid regressions

17. **`cypress.json`**: [Cypress configuration file](https://docs.cypress.io/guides/references/configuration)

18. **`gatsby-browser.js`**: Lets you respond to Gatsby-specific events within the browser, and wrap your page components in additional global components. The Gatsby Browser API gives you many options for interacting with the client-side of Gatsby. More info at: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/

19. **`gatsby-ssr.js`**: Lets you respond to Gatsby-specific events during SSG and SSR, and wrap your page components in additional global components. More info at: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/

20. **`lighthouserc.js`**: Configures [Google Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci). This is where you can turn on/off lighthouse assertions to be used by Lighthouse CI Bot/hook

21. **`pull_request_template.md`**: Template used when creating your Pull Requests
    
22. **`renovate.json`**: Renovate configuration file to keep your store always fresh with Faststore's latest versions

23. **`.prettierignore`**: Ignore listed files when applying prettier rules

24. **`.eslintignore`**: Ignore listed files when applying eslint rules

## 💻 Code Structure

All code is inside the `src` folder. The code is split into folders that implement an MVC-like architecture.

The `controller` is inside the `src/sdk` folder. This is where you will find most logic for the application. This folder contains hooks for adding items to cart, making graphql queries, resizing images, etc. If you need to write a custom business logic this is probably the place to put this logic.

The `views` are written in the `src/components` folder and are subdivided into domain-specific components. Cart related items are inside the `src/components/cart` folder. Search and Product related components like facets, product summary, and search results are in their respective folders. Basic building blocks components are inside the UI folder. Components like button, checkbox, and modal are good candidates for the UI folder. 
Section components are those components that occupy a whole slice on the webpage and are desirable to be changed by a CMS. Section components are Product Gallery, Carousel, Shelf and Product description.

The `model`, in a website, is where the data fetching occurs. Since this project uses Jamstack, a crucial design decision was made to explicitly split where Static and Dynamic data are fetched. The files inside the `src/pages` folder use [Gatsby's File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/) to declare routes and fetch static data. The files inside the `src/views` folder revalidate and enrich static data with dynamic attributes.

To summarize:
1. `src/pages`: Routes are declared and static data is fetched.
2. `src/views`: Receives static data from `src/pages`, enriches this data with dynamic attributes, and render section components along with SEO tags.
3. `src/components/sections`: Receives necessary data and use domain-specific components (cart/product/search/ui) for rendering a slice on the web page.

## ✏️ Adding Components

What better than an example for learning the best practices while adding components? In this example, we will add a button component. 
Components live on the `src/components` folder. Each component may have, at most, 3 files: a component file, an export file, and a styling file.
First, let's create a folder and the files. 

```sh
mkdir src/components/ui/Button
touch src/components/ui/Button/Button.tsx
touch src/components/ui/Button/index.tsx
```

The `index.tsx` is just an export file, so its content is simple:

```tsx
export { default } from './Button'
```

The real thing happens on `Button.tsx`. On this file let's define the component like:

```tsx
import React from 'react'

interface Props {}

function Button (props: Props) {
  return <button {...props} />
}

export default Button
```

And, that's it! Now you have a working button that you can use anywhere on your project. Faststore, however, brings a handy library called `@vtex/store-ui` with built-in components to help you speed up your development. To use it, just change `Button.tsx` to:

```tsx
import React from 'react'
import { Button as UIButton } from '@vtex/store-ui'
import type { ButtonProps } from '@vtex/store-ui'

interface Props extends ButtonProps {}

function Button (props: Props) {
  return <UIButton {...props} />
}

export default Button
```

Now, your Button component is powered by Store UI. However, if you try to use this on your app you will see that the button is lacking styles. To add styles, we will use CSS modules because they allow us to target data attributes. On your terminal, type:
```sh
touch src/components/ui/Button/Button.module.css
```

Now, on `Button.module.css`:
```css
[data-store-button]: {
  @apply p-0 bg-primary-100;
}
```

The `@apply` directive exists because we are using [Tailwind CSS](https://tailwindcss.com/). To learn more about tailwind, [see their docs](https://tailwindcss.com/docs). To know more about our best practices on using tailwind, see the [Styling Components](#%EF%B8%8F-styling-components) section.
This `data-store-button` is a CSS data attribute selector. To know which selectors are available, check [store-ui docs](https://storeui.netlify.app/).

Now, open `Button.tsx` and import this CSS with:
```tsx
import React from 'react'
import { Button as UIButton } from '@vtex/store-ui'
import type { ButtonProps } from '@vtex/store-ui'

import './Button.module.css'

interface Props extends ButtonProps {}

function Button (props: Props) {
  return <UIButton {...props} />
}

export default Button
```

For most components, you would stop here. However, buttons can have different variants. For instance, suppose you want to have a button component with primary and muted variants. To add variants to the component, update `Button.tsx`:
```tsx
import React from 'react'
import { Button as UIButton } from '@vtex/store-ui'
import type { ButtonProps } from '@vtex/store-ui'

import './Button.module.css'

interface Props extends ButtonProps {
  variant: 'muted' | 'primary'
}

function Button ({variant, ...props}: Props) {
  return <UIButton className={variant} {...props} />
}

export default Button
```

and then, on `Button.module.css`:
```css
.primary [data-store-button]: {
  @apply p-0 bg-primary-100;
}

.muted [data-store-button]: {
  @apply p-0 bg-muted-100;
}
```

Now we have a styled Button component that accepts different variants!! 🎉

The aforementioned guide works well for UI components. However, sections are more complex and usually don't have variants, since they usually serve a single responsibility on the page. For sections, you can use tailwind natively like:

```tsx
// components/sections/MySection/MySection.tsx
...
function MySection {
  return (
    <>
      <div className="p-2 flex items-center">
        <p className="h-4 p-5 mx-2">Hello World</p>
        <Button variant="muted">
      </div>
    </>
  )
}
...
```

## 🖊️ Styling Components
This starter uses [Tailwind CSS](https://tailwindcss.com/) for styling. If you want, you can remove it and use other solutions. Both Gatsby and Store UI support many different CSS frameworks, like [emotion](https://emotion.sh/docs/introduction), [stitches](https://stitches.dev/docs/introduction) or even no CSS framework at all. Check the supported frameworks at [the Gatsby website](https://www.gatsbyjs.com/docs/how-to/styling/built-in-css/#other-css-options)
This guide covers best practices and patterns to use when styling with Tailwind.

Tailwind is a utility-first CSS framework. The goal of this starter is to make it possible for developers to use Tailwind themes to change the look of the store. To accomplish this, a few things need to be respected:

1. Do never use hard coded colors/padings/spacings etc, e.g., `px-[10px]`, `bg-[#fff]`.
2. Do never use named colors, but use alias colors instead, e.g., `bg-primary` instead of `bg-blue`.

> :warning: CSS modules generate extra classes in your final CSS sheet. Use them with caution.

## 🍒 Adding queries
We use [graphql-codegen](https://www.graphql-code-generator.com/) to pre-process GraphQL queries. This compilation generates TypeScript typings and configurations for our graphql server under the folder `@generated/graphql`. 
This means we can staticaly analyse your code in search of bugs and secure your graphql server before each deploy. If, however you need to change any GraphQL Fragment, Query or Mutation, you will need to regenerate the whole thing. To do this, open your terminal and type

```sh
$ yarn develop
```

Now, after the gatsby development server is up and running, open another terminal and run

```sh
$ yarn generate
```

That's it! you have just regenerated all graphql queries/fragments for your application and the new data you requested should be available to your component.

> Pro tip: Pass `-w` to the `yarn generate` command so it watches for changes and you don't need to run this command multiple times

## 🎓 Learning the Frameworks

Looking for more guidance? Full documentation for Faststore lives [on this GitHub repository](https://github.com/vtex/faststore). Also, for learning Gatsby, take a look at the [Gatsby Website](https://www.gatsbyjs.com/), they have plenty of tutorials and examples in there.

## ⚡ Performance & QA

This project has strict performance budgets. Right out of the box, this project performs around 95 on Google's Page Speed Insights website, which usually is way more strict than your laptop's chrome lighthouse. Every time you commit to the repository, our QA bots will run and evaluate your code quality. We recommend you NEVER put in production a code that breaks any of the bots. If a bot breaks and still you need to put the code into production, change the bot config (`lighthouserc.js`, `cypress.json`) to make it pass and merge. This way you ensure your website will keep performing well during the years to come.
