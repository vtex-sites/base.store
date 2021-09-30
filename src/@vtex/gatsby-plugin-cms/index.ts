/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ContentTypes,
  BuilderConfig,
  Schema,
} from '@vtex/gatsby-plugin-cms'
import { PLP } from '@vtex/gatsby-plugin-cms'

const widgets = {
  imageUploader: {
    widget: {
      'ui:widget': 'image-uploader',
    },
  },
  googleSEOPreview: {
    widget: {
      'ui:ObjectFieldTemplate': 'GoogleSeoPreview',
    },
  },
  facebookSEOPreview: {
    widget: {
      'ui:ObjectFieldTemplate': 'FacebookPreview',
    },
  },
}

const siteMetadata: Schema = {
  title: 'Site Metadata',
  description: 'Configure meta dados do site global',
  type: 'object',
  ...widgets.googleSEOPreview,
  properties: {
    title: {
      title: 'Titulo padrao da pagina',
      description:
        'Titulo para mostrar quando a pagina nao tem um titulo mais especifico',
      type: 'string',
      default: 'Marin Brasil Tramontina',
    },
    description: {
      title: 'Meta tag description',
      type: 'string',
      default:
        'Cubas, Tanques, Cadeiras, Lixeiras, Eletrodomésticos, Utilidades Domésticas Tramontina você encontra na Marin Brasil, loja Exclusiva Tramontina. Confira!',
    },
    titleTemplate: {
      title: 'Template para gerar o titulo nas paginas de produto/categoria',
      type: 'string',
      default: '%s | Marin Brasil Tramontina',
    },
  },
}

const facebook: Schema = {
  title: 'Facebook',
  description: 'Como o Facebook compartilha a sua loja',
  type: 'object',
  required: ['thumbnail'],
  ...widgets.facebookSEOPreview,
  properties: {
    title: {
      type: 'string',
      title: 'Titulo',
      description: 'Titulo da loja que aparece no Facebook',
      default: 'Marin Brasil Tramontina',
    },
    thumbnail: {
      type: 'string',
      title: 'Thumbnail',
      description:
        'Qual imagem vai aparecer quando alguem compartilhar sua loja no Facebook. A imagem deve ser maior que 200px/200px',
      ...widgets.imageUploader,
    },
    description: {
      type: 'string',
      title: 'Descricao',
      description:
        'A descricao de seu site quando alguem compartilha no facebook',
      default:
        'Cubas, Tanques, Cadeiras, Lixeiras, Eletrodomésticos, Utilidades Domésticas Tramontina você encontra na Marin Brasil, loja Exclusiva Tramontina. Confira!',
    },
  },
}

const SearchBanner: Schema = {
  title: 'Banner de Categoria',
  description: 'Banner da pagina de Categoria',
  type: 'object',
  required: ['desktop', 'mobile', 'alt'],
  properties: {
    alt: {
      title: 'alt text da imagem',
      type: 'string',
    },
    desktop: {
      title: 'Desktop Banner',
      type: 'object',
      required: ['srcSet'],
      properties: {
        srcSet: {
          title: 'Desktop Image',
          type: 'string',
          ...widgets.imageUploader,
        },
      },
    },
    mobile: {
      title: 'Mobile Banner',
      type: 'object',
      required: ['srcSet'],
      properties: {
        srcSet: {
          title: 'Mobile Image',
          type: 'string',
          ...widgets.imageUploader,
        },
      },
    },
  },
}

const Carousel: Schema = {
  title: 'Carousel',
  description: 'Um carousel de imagens',
  type: 'object',
  properties: {
    allItems: {
      type: 'array',
      minItems: 1,
      items: {
        title: 'Imagens',
        type: 'object',
        properties: {
          desktop: {
            title: 'Mobile Image',
            type: 'object',
            properties: {
              srcSet: {
                title: 'Imagem',
                type: 'string',
                ...widgets.imageUploader,
              },
            },
          },
          mobile: {
            title: 'Desktop Image',
            type: 'object',
            properties: {
              srcSet: {
                title: 'Imagem',
                type: 'string',
                ...widgets.imageUploader,
              },
            },
          },
          href: {
            title: 'Link',
            description:
              'Apos clicada a imagem, o usuario vai navegar para este link',
            type: 'string',
          },
          alt: {
            title: 'Descricao da imagem',
            description:
              'Como usuarios que nao podem abrir a imagem leem o link',
            type: 'string',
          },
        },
      },
    },
  },
}

const Banners: Schema = {
  title: 'Home Banners',
  description: 'Par de baners da Home',
  type: 'object',
  properties: {
    banners: {
      type: 'array',
      maxItems: 2,
      minItems: 2,
      items: {
        type: 'object',
        title: 'Par',
        properties: {
          src: {
            title: 'Imagem responsiva',
            type: 'string',
            ...widgets.imageUploader,
          },
          href: {
            title: 'Link do banner',
            description:
              'Apos clicada a imagem, o usuario vai navegar para este link',
            type: 'string',
          },
          alt: {
            title: 'Descricao da imagem',
            description:
              'Como usuarios que nao podem abrir a imagem leem o link',
            type: 'string',
          },
        },
      },
    },
  },
}

const Fold: Schema = {
  title: 'Fold',
  description:
    'Componentes embaixo deste serao renderizados apos a dobra da pagina',
  type: 'null',
}

const DynamicShelf: Schema = {
  title: 'Vitrine de Produtos',
  description: 'Configure uma vitrine de produtos',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'Titulo da Vitrine',
    },
    searchParams: {
      type: 'object',
      title: 'Parametros de busca da Vitrine',
      properties: {
        from: {
          type: 'number',
          title: 'de',
        },
        to: {
          type: 'number',
          title: 'ate',
        },
        collection: {
          type: 'string',
          title: 'Colecao',
        },
        hideUnavailableItems: {
          default: true,
          type: 'boolean',
          title: 'Esconder items indisponiveis',
        },
        orderBy: {
          type: 'string',
          enum: [
            'OrderByScoreDESC',
            'OrderByPriceDESC',
            'OrderByPriceASC',
            'OrderByTopSaleDESC',
            'OrderByReviewRateDESC',
            'OrderByNameDESC',
            'OrderByNameASC',
            'OrderByReleaseDateDESC',
            'OrderByBestDiscountDESC',
          ],
          enumNames: [
            'Relevance',
            'Price: High to Low',
            'Price: Low to High',
            'Sales',
            'Reviews',
            'Name, ascending',
            'Name, descending',
            'Release date',
            'Discount',
          ],
          title: 'Orderne Por',
        } as any,
      },
    },
  },
}

export const contentTypes: ContentTypes = {
  home: {
    name: 'Home Page',
    extraBlocks: {},
  },
  ...PLP({}),
  seo: {
    name: 'SEO global do site',
    extraBlocks: {
      SEO: {
        siteMetadata,
        facebook,
      },
    },
  },
}

export const builderConfig: BuilderConfig = {
  blocks: {
    SearchBanner,
    Carousel,
    Banners,
    Fold,
    DynamicShelf,
  },
  contentTypes,
  messages: {
    'admin/socialmediaTitle': 'Social Media',
    'admin/meta/socialmediaTitleFieldTitle': 'Title',
    'admin/meta/socialmediaTitleFieldDescription':
      'Appears when a link to this page is shared on social media',
    'admin/meta/socialmediaDescriptionFieldTitle': 'Description',
    'admin/meta/socialmediaDescriptionFieldDescription':
      'Appears when a link to this page is shared on social media',
    'admin/meta/socialmediaImageFieldTitle': 'Thumbnail',
    'admin/meta/socialmediaImageFieldDescription':
      'Appears when the page is shared on social media',
  },
}
