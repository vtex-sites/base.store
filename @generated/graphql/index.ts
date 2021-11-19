export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
}

export type BooleanQueryOperatorInput = {
  eq: Maybe<Scalars['Boolean']>
  in: Maybe<Array<Maybe<Scalars['Boolean']>>>
  ne: Maybe<Scalars['Boolean']>
  nin: Maybe<Array<Maybe<Scalars['Boolean']>>>
}

export type BrowserStoreCollectionConnection = {
  edges: Array<StoreCollectionEdge>
  pageInfo: StorePageInfo
}

export type BrowserStoreProductConnection = {
  edges: Array<StoreProductEdge>
  pageInfo: StorePageInfo
}

export type DateQueryOperatorInput = {
  eq: Maybe<Scalars['Date']>
  gt: Maybe<Scalars['Date']>
  gte: Maybe<Scalars['Date']>
  in: Maybe<Array<Maybe<Scalars['Date']>>>
  lt: Maybe<Scalars['Date']>
  lte: Maybe<Scalars['Date']>
  ne: Maybe<Scalars['Date']>
  nin: Maybe<Array<Maybe<Scalars['Date']>>>
}

export type Directory = Node & {
  absolutePath: Scalars['String']
  accessTime: Scalars['Date']
  atime: Scalars['Date']
  atimeMs: Scalars['Float']
  base: Scalars['String']
  birthTime: Scalars['Date']
  /** @deprecated Use `birthTime` instead */
  birthtime: Maybe<Scalars['Date']>
  /** @deprecated Use `birthTime` instead */
  birthtimeMs: Maybe<Scalars['Float']>
  changeTime: Scalars['Date']
  children: Array<Node>
  ctime: Scalars['Date']
  ctimeMs: Scalars['Float']
  dev: Scalars['Int']
  dir: Scalars['String']
  ext: Scalars['String']
  extension: Scalars['String']
  gid: Scalars['Int']
  id: Scalars['ID']
  ino: Scalars['Float']
  internal: Internal
  mode: Scalars['Int']
  modifiedTime: Scalars['Date']
  mtime: Scalars['Date']
  mtimeMs: Scalars['Float']
  name: Scalars['String']
  nlink: Scalars['Int']
  parent: Maybe<Node>
  prettySize: Scalars['String']
  rdev: Scalars['Int']
  relativeDirectory: Scalars['String']
  relativePath: Scalars['String']
  root: Scalars['String']
  size: Scalars['Int']
  sourceInstanceName: Scalars['String']
  uid: Scalars['Int']
}

export type DirectoryAccessTimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryAtimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryBirthTimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryChangeTimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryCtimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryModifiedTimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryMtimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<DirectoryEdge>
  group: Array<DirectoryGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<Directory>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionGroupArgs = {
  field: DirectoryFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type DirectoryConnectionMaxArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionMinArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionSumArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryEdge = {
  next: Maybe<Directory>
  node: Directory
  previous: Maybe<Directory>
}

export type DirectoryFieldsEnum =
  | 'absolutePath'
  | 'accessTime'
  | 'atime'
  | 'atimeMs'
  | 'base'
  | 'birthTime'
  | 'birthtime'
  | 'birthtimeMs'
  | 'changeTime'
  | 'children'
  | 'children___children'
  | 'children___children___children'
  | 'children___children___children___children'
  | 'children___children___children___id'
  | 'children___children___id'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___children___parent___children'
  | 'children___children___parent___id'
  | 'children___id'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'children___parent___children'
  | 'children___parent___children___children'
  | 'children___parent___children___id'
  | 'children___parent___id'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___parent___parent___children'
  | 'children___parent___parent___id'
  | 'ctime'
  | 'ctimeMs'
  | 'dev'
  | 'dir'
  | 'ext'
  | 'extension'
  | 'gid'
  | 'id'
  | 'ino'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'mode'
  | 'modifiedTime'
  | 'mtime'
  | 'mtimeMs'
  | 'name'
  | 'nlink'
  | 'parent___children'
  | 'parent___children___children'
  | 'parent___children___children___children'
  | 'parent___children___children___id'
  | 'parent___children___id'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___children___parent___children'
  | 'parent___children___parent___id'
  | 'parent___id'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'parent___parent___children'
  | 'parent___parent___children___children'
  | 'parent___parent___children___id'
  | 'parent___parent___id'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___parent___parent___children'
  | 'parent___parent___parent___id'
  | 'prettySize'
  | 'rdev'
  | 'relativeDirectory'
  | 'relativePath'
  | 'root'
  | 'size'
  | 'sourceInstanceName'
  | 'uid'

export type DirectoryFilterInput = {
  absolutePath: Maybe<StringQueryOperatorInput>
  accessTime: Maybe<DateQueryOperatorInput>
  atime: Maybe<DateQueryOperatorInput>
  atimeMs: Maybe<FloatQueryOperatorInput>
  base: Maybe<StringQueryOperatorInput>
  birthTime: Maybe<DateQueryOperatorInput>
  birthtime: Maybe<DateQueryOperatorInput>
  birthtimeMs: Maybe<FloatQueryOperatorInput>
  changeTime: Maybe<DateQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  ctime: Maybe<DateQueryOperatorInput>
  ctimeMs: Maybe<FloatQueryOperatorInput>
  dev: Maybe<IntQueryOperatorInput>
  dir: Maybe<StringQueryOperatorInput>
  ext: Maybe<StringQueryOperatorInput>
  extension: Maybe<StringQueryOperatorInput>
  gid: Maybe<IntQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  ino: Maybe<FloatQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  mode: Maybe<IntQueryOperatorInput>
  modifiedTime: Maybe<DateQueryOperatorInput>
  mtime: Maybe<DateQueryOperatorInput>
  mtimeMs: Maybe<FloatQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  nlink: Maybe<IntQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  prettySize: Maybe<StringQueryOperatorInput>
  rdev: Maybe<IntQueryOperatorInput>
  relativeDirectory: Maybe<StringQueryOperatorInput>
  relativePath: Maybe<StringQueryOperatorInput>
  root: Maybe<StringQueryOperatorInput>
  size: Maybe<IntQueryOperatorInput>
  sourceInstanceName: Maybe<StringQueryOperatorInput>
  uid: Maybe<IntQueryOperatorInput>
}

export type DirectoryGroupConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<DirectoryEdge>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
  group: Array<DirectoryGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<Directory>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type DirectoryGroupConnectionDistinctArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionGroupArgs = {
  field: DirectoryFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type DirectoryGroupConnectionMaxArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionMinArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionSumArgs = {
  field: DirectoryFieldsEnum
}

export type DirectorySortInput = {
  fields: Maybe<Array<Maybe<DirectoryFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type File = Node & {
  absolutePath: Scalars['String']
  accessTime: Scalars['Date']
  atime: Scalars['Date']
  atimeMs: Scalars['Float']
  base: Scalars['String']
  birthTime: Scalars['Date']
  /** @deprecated Use `birthTime` instead */
  birthtime: Maybe<Scalars['Date']>
  /** @deprecated Use `birthTime` instead */
  birthtimeMs: Maybe<Scalars['Float']>
  changeTime: Scalars['Date']
  children: Array<Node>
  ctime: Scalars['Date']
  ctimeMs: Scalars['Float']
  dev: Scalars['Int']
  dir: Scalars['String']
  ext: Scalars['String']
  extension: Scalars['String']
  gid: Scalars['Int']
  id: Scalars['ID']
  ino: Scalars['Float']
  internal: Internal
  mode: Scalars['Int']
  modifiedTime: Scalars['Date']
  mtime: Scalars['Date']
  mtimeMs: Scalars['Float']
  name: Scalars['String']
  nlink: Scalars['Int']
  parent: Maybe<Node>
  prettySize: Scalars['String']
  rdev: Scalars['Int']
  relativeDirectory: Scalars['String']
  relativePath: Scalars['String']
  root: Scalars['String']
  size: Scalars['Int']
  sourceInstanceName: Scalars['String']
  uid: Scalars['Int']
}

export type FileAccessTimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type FileAtimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type FileBirthTimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type FileChangeTimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type FileCtimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type FileModifiedTimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type FileMtimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type FileConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<FileEdge>
  group: Array<FileGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<File>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum
}

export type FileConnectionGroupArgs = {
  field: FileFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type FileConnectionMaxArgs = {
  field: FileFieldsEnum
}

export type FileConnectionMinArgs = {
  field: FileFieldsEnum
}

export type FileConnectionSumArgs = {
  field: FileFieldsEnum
}

export type FileEdge = {
  next: Maybe<File>
  node: File
  previous: Maybe<File>
}

export type FileFieldsEnum =
  | 'absolutePath'
  | 'accessTime'
  | 'atime'
  | 'atimeMs'
  | 'base'
  | 'birthTime'
  | 'birthtime'
  | 'birthtimeMs'
  | 'changeTime'
  | 'children'
  | 'children___children'
  | 'children___children___children'
  | 'children___children___children___children'
  | 'children___children___children___id'
  | 'children___children___id'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___children___parent___children'
  | 'children___children___parent___id'
  | 'children___id'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'children___parent___children'
  | 'children___parent___children___children'
  | 'children___parent___children___id'
  | 'children___parent___id'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___parent___parent___children'
  | 'children___parent___parent___id'
  | 'ctime'
  | 'ctimeMs'
  | 'dev'
  | 'dir'
  | 'ext'
  | 'extension'
  | 'gid'
  | 'id'
  | 'ino'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'mode'
  | 'modifiedTime'
  | 'mtime'
  | 'mtimeMs'
  | 'name'
  | 'nlink'
  | 'parent___children'
  | 'parent___children___children'
  | 'parent___children___children___children'
  | 'parent___children___children___id'
  | 'parent___children___id'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___children___parent___children'
  | 'parent___children___parent___id'
  | 'parent___id'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'parent___parent___children'
  | 'parent___parent___children___children'
  | 'parent___parent___children___id'
  | 'parent___parent___id'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___parent___parent___children'
  | 'parent___parent___parent___id'
  | 'prettySize'
  | 'rdev'
  | 'relativeDirectory'
  | 'relativePath'
  | 'root'
  | 'size'
  | 'sourceInstanceName'
  | 'uid'

export type FileFilterInput = {
  absolutePath: Maybe<StringQueryOperatorInput>
  accessTime: Maybe<DateQueryOperatorInput>
  atime: Maybe<DateQueryOperatorInput>
  atimeMs: Maybe<FloatQueryOperatorInput>
  base: Maybe<StringQueryOperatorInput>
  birthTime: Maybe<DateQueryOperatorInput>
  birthtime: Maybe<DateQueryOperatorInput>
  birthtimeMs: Maybe<FloatQueryOperatorInput>
  changeTime: Maybe<DateQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  ctime: Maybe<DateQueryOperatorInput>
  ctimeMs: Maybe<FloatQueryOperatorInput>
  dev: Maybe<IntQueryOperatorInput>
  dir: Maybe<StringQueryOperatorInput>
  ext: Maybe<StringQueryOperatorInput>
  extension: Maybe<StringQueryOperatorInput>
  gid: Maybe<IntQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  ino: Maybe<FloatQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  mode: Maybe<IntQueryOperatorInput>
  modifiedTime: Maybe<DateQueryOperatorInput>
  mtime: Maybe<DateQueryOperatorInput>
  mtimeMs: Maybe<FloatQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  nlink: Maybe<IntQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  prettySize: Maybe<StringQueryOperatorInput>
  rdev: Maybe<IntQueryOperatorInput>
  relativeDirectory: Maybe<StringQueryOperatorInput>
  relativePath: Maybe<StringQueryOperatorInput>
  root: Maybe<StringQueryOperatorInput>
  size: Maybe<IntQueryOperatorInput>
  sourceInstanceName: Maybe<StringQueryOperatorInput>
  uid: Maybe<IntQueryOperatorInput>
}

export type FileGroupConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<FileEdge>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
  group: Array<FileGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<File>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type FileGroupConnectionDistinctArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionGroupArgs = {
  field: FileFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type FileGroupConnectionMaxArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionMinArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionSumArgs = {
  field: FileFieldsEnum
}

export type FileSortInput = {
  fields: Maybe<Array<Maybe<FileFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type FloatQueryOperatorInput = {
  eq: Maybe<Scalars['Float']>
  gt: Maybe<Scalars['Float']>
  gte: Maybe<Scalars['Float']>
  in: Maybe<Array<Maybe<Scalars['Float']>>>
  lt: Maybe<Scalars['Float']>
  lte: Maybe<Scalars['Float']>
  ne: Maybe<Scalars['Float']>
  nin: Maybe<Array<Maybe<Scalars['Float']>>>
}

export type GatsbyImageFormat =
  | 'AUTO'
  | 'AVIF'
  | 'JPG'
  | 'NO_CHANGE'
  | 'PNG'
  | 'WEBP'

export type GatsbyImageLayout = 'CONSTRAINED' | 'FIXED' | 'FULL_WIDTH'

export type GatsbyImagePlaceholder =
  | 'BLURRED'
  | 'DOMINANT_COLOR'
  | 'NONE'
  | 'TRACED_SVG'

export type IStoreCart = {
  order: IStoreOrder
}

export type IStoreImage = {
  alternateName: Scalars['String']
  url: Scalars['String']
}

export type IStoreOffer = {
  itemOffered: IStoreProduct
  listPrice: Scalars['Float']
  price: Scalars['Float']
  quantity: Scalars['Int']
  seller: IStoreOrganization
}

export type IStoreOrder = {
  acceptedOffer: Array<IStoreOffer>
  orderNumber: Scalars['String']
}

export type IStoreOrganization = {
  identifier: Scalars['String']
}

export type IStoreProduct = {
  image: Array<IStoreImage>
  name: Scalars['String']
  sku: Scalars['String']
}

export type IStoreSelectedFacet = {
  key: Scalars['String']
  value: Scalars['String']
}

export type IntQueryOperatorInput = {
  eq: Maybe<Scalars['Int']>
  gt: Maybe<Scalars['Int']>
  gte: Maybe<Scalars['Int']>
  in: Maybe<Array<Maybe<Scalars['Int']>>>
  lt: Maybe<Scalars['Int']>
  lte: Maybe<Scalars['Int']>
  ne: Maybe<Scalars['Int']>
  nin: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type Internal = {
  content: Maybe<Scalars['String']>
  contentDigest: Scalars['String']
  description: Maybe<Scalars['String']>
  fieldOwners: Maybe<Array<Maybe<Scalars['String']>>>
  ignoreType: Maybe<Scalars['Boolean']>
  mediaType: Maybe<Scalars['String']>
  owner: Scalars['String']
  type: Scalars['String']
}

export type InternalFilterInput = {
  content: Maybe<StringQueryOperatorInput>
  contentDigest: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
  fieldOwners: Maybe<StringQueryOperatorInput>
  ignoreType: Maybe<BooleanQueryOperatorInput>
  mediaType: Maybe<StringQueryOperatorInput>
  owner: Maybe<StringQueryOperatorInput>
  type: Maybe<StringQueryOperatorInput>
}

export type Mutation = {
  validateCart: Maybe<StoreCart>
}

export type MutationValidateCartArgs = {
  cart: IStoreCart
}

/** Node Interface */
export type Node = {
  children: Array<Node>
  id: Scalars['ID']
  internal: Internal
  parent: Maybe<Node>
}

export type NodeFilterInput = {
  children: Maybe<NodeFilterListInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  parent: Maybe<NodeFilterInput>
}

export type NodeFilterListInput = {
  elemMatch: Maybe<NodeFilterInput>
}

export type PageInfo = {
  currentPage: Scalars['Int']
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  itemCount: Scalars['Int']
  pageCount: Scalars['Int']
  perPage: Maybe<Scalars['Int']>
  totalCount: Scalars['Int']
}

export type Query = {
  allCollections: BrowserStoreCollectionConnection
  allDirectory: DirectoryConnection
  allFile: FileConnection
  allProducts: BrowserStoreProductConnection
  allSite: SiteConnection
  allSiteBuildMetadata: SiteBuildMetadataConnection
  allSiteFunction: SiteFunctionConnection
  allSitePage: SitePageConnection
  allSitePlugin: SitePluginConnection
  allStoreCollection: StoreCollectionConnection
  allStoreProduct: StoreProductConnection
  directory: Maybe<Directory>
  file: Maybe<File>
  product: StoreProduct
  search: StoreSearchResult
  site: Maybe<Site>
  siteBuildMetadata: Maybe<SiteBuildMetadata>
  siteFunction: Maybe<SiteFunction>
  sitePage: Maybe<SitePage>
  sitePlugin: Maybe<SitePlugin>
  storeCollection: Maybe<StoreCollection>
  storeProduct: Maybe<StoreProduct>
}

export type QueryAllCollectionsArgs = {
  after: Maybe<Scalars['String']>
  first: Scalars['Int']
}

export type QueryAllDirectoryArgs = {
  filter: Maybe<DirectoryFilterInput>
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
  sort: Maybe<DirectorySortInput>
}

export type QueryAllFileArgs = {
  filter: Maybe<FileFilterInput>
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
  sort: Maybe<FileSortInput>
}

export type QueryAllProductsArgs = {
  after: Maybe<Scalars['String']>
  first: Scalars['Int']
}

export type QueryAllSiteArgs = {
  filter: Maybe<SiteFilterInput>
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
  sort: Maybe<SiteSortInput>
}

export type QueryAllSiteBuildMetadataArgs = {
  filter: Maybe<SiteBuildMetadataFilterInput>
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
  sort: Maybe<SiteBuildMetadataSortInput>
}

export type QueryAllSiteFunctionArgs = {
  filter: Maybe<SiteFunctionFilterInput>
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
  sort: Maybe<SiteFunctionSortInput>
}

export type QueryAllSitePageArgs = {
  filter: Maybe<SitePageFilterInput>
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
  sort: Maybe<SitePageSortInput>
}

export type QueryAllSitePluginArgs = {
  filter: Maybe<SitePluginFilterInput>
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
  sort: Maybe<SitePluginSortInput>
}

export type QueryAllStoreCollectionArgs = {
  filter: Maybe<StoreCollectionFilterInput>
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
  sort: Maybe<StoreCollectionSortInput>
}

export type QueryAllStoreProductArgs = {
  filter: Maybe<StoreProductFilterInput>
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
  sort: Maybe<StoreProductSortInput>
}

export type QueryDirectoryArgs = {
  absolutePath: Maybe<StringQueryOperatorInput>
  accessTime: Maybe<DateQueryOperatorInput>
  atime: Maybe<DateQueryOperatorInput>
  atimeMs: Maybe<FloatQueryOperatorInput>
  base: Maybe<StringQueryOperatorInput>
  birthTime: Maybe<DateQueryOperatorInput>
  birthtime: Maybe<DateQueryOperatorInput>
  birthtimeMs: Maybe<FloatQueryOperatorInput>
  changeTime: Maybe<DateQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  ctime: Maybe<DateQueryOperatorInput>
  ctimeMs: Maybe<FloatQueryOperatorInput>
  dev: Maybe<IntQueryOperatorInput>
  dir: Maybe<StringQueryOperatorInput>
  ext: Maybe<StringQueryOperatorInput>
  extension: Maybe<StringQueryOperatorInput>
  gid: Maybe<IntQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  ino: Maybe<FloatQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  mode: Maybe<IntQueryOperatorInput>
  modifiedTime: Maybe<DateQueryOperatorInput>
  mtime: Maybe<DateQueryOperatorInput>
  mtimeMs: Maybe<FloatQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  nlink: Maybe<IntQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  prettySize: Maybe<StringQueryOperatorInput>
  rdev: Maybe<IntQueryOperatorInput>
  relativeDirectory: Maybe<StringQueryOperatorInput>
  relativePath: Maybe<StringQueryOperatorInput>
  root: Maybe<StringQueryOperatorInput>
  size: Maybe<IntQueryOperatorInput>
  sourceInstanceName: Maybe<StringQueryOperatorInput>
  uid: Maybe<IntQueryOperatorInput>
}

export type QueryFileArgs = {
  absolutePath: Maybe<StringQueryOperatorInput>
  accessTime: Maybe<DateQueryOperatorInput>
  atime: Maybe<DateQueryOperatorInput>
  atimeMs: Maybe<FloatQueryOperatorInput>
  base: Maybe<StringQueryOperatorInput>
  birthTime: Maybe<DateQueryOperatorInput>
  birthtime: Maybe<DateQueryOperatorInput>
  birthtimeMs: Maybe<FloatQueryOperatorInput>
  changeTime: Maybe<DateQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  ctime: Maybe<DateQueryOperatorInput>
  ctimeMs: Maybe<FloatQueryOperatorInput>
  dev: Maybe<IntQueryOperatorInput>
  dir: Maybe<StringQueryOperatorInput>
  ext: Maybe<StringQueryOperatorInput>
  extension: Maybe<StringQueryOperatorInput>
  gid: Maybe<IntQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  ino: Maybe<FloatQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  mode: Maybe<IntQueryOperatorInput>
  modifiedTime: Maybe<DateQueryOperatorInput>
  mtime: Maybe<DateQueryOperatorInput>
  mtimeMs: Maybe<FloatQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  nlink: Maybe<IntQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  prettySize: Maybe<StringQueryOperatorInput>
  rdev: Maybe<IntQueryOperatorInput>
  relativeDirectory: Maybe<StringQueryOperatorInput>
  relativePath: Maybe<StringQueryOperatorInput>
  root: Maybe<StringQueryOperatorInput>
  size: Maybe<IntQueryOperatorInput>
  sourceInstanceName: Maybe<StringQueryOperatorInput>
  uid: Maybe<IntQueryOperatorInput>
}

export type QueryProductArgs = {
  locator: Array<IStoreSelectedFacet>
}

export type QuerySearchArgs = {
  after: Maybe<Scalars['String']>
  first: Scalars['Int']
  selectedFacets: Maybe<Array<IStoreSelectedFacet>>
  sort?: Maybe<StoreSort>
  term?: Maybe<Scalars['String']>
}

export type QuerySiteArgs = {
  buildTime: Maybe<DateQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  flags: Maybe<SiteFlagsFilterInput>
  host: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  parent: Maybe<NodeFilterInput>
  pathPrefix: Maybe<StringQueryOperatorInput>
  polyfill: Maybe<BooleanQueryOperatorInput>
  port: Maybe<IntQueryOperatorInput>
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>
}

export type QuerySiteBuildMetadataArgs = {
  buildTime: Maybe<DateQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  parent: Maybe<NodeFilterInput>
}

export type QuerySiteFunctionArgs = {
  absoluteCompiledFilePath: Maybe<StringQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  functionRoute: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  matchPath: Maybe<StringQueryOperatorInput>
  originalAbsoluteFilePath: Maybe<StringQueryOperatorInput>
  originalRelativeFilePath: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  pluginName: Maybe<StringQueryOperatorInput>
  relativeCompiledFilePath: Maybe<StringQueryOperatorInput>
}

export type QuerySitePageArgs = {
  children: Maybe<NodeFilterListInput>
  component: Maybe<StringQueryOperatorInput>
  componentChunkName: Maybe<StringQueryOperatorInput>
  context: Maybe<SitePageContextFilterInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  internalComponentName: Maybe<StringQueryOperatorInput>
  isCreatedByStatefulCreatePages: Maybe<BooleanQueryOperatorInput>
  matchPath: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  path: Maybe<StringQueryOperatorInput>
  pluginCreator: Maybe<SitePluginFilterInput>
  pluginCreatorId: Maybe<StringQueryOperatorInput>
}

export type QuerySitePluginArgs = {
  browserAPIs: Maybe<StringQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  name: Maybe<StringQueryOperatorInput>
  nodeAPIs: Maybe<StringQueryOperatorInput>
  packageJson: Maybe<SitePluginPackageJsonFilterInput>
  parent: Maybe<NodeFilterInput>
  pluginFilepath: Maybe<StringQueryOperatorInput>
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>
  resolve: Maybe<StringQueryOperatorInput>
  ssrAPIs: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
}

export type QueryStoreCollectionArgs = {
  breadcrumbList: Maybe<StoreBreadcrumbListFilterInput>
  children: Maybe<NodeFilterListInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  meta: Maybe<StoreCollectionMetaFilterInput>
  parent: Maybe<NodeFilterInput>
  remoteId: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
  seo: Maybe<StoreSeoFilterInput>
  slug: Maybe<StringQueryOperatorInput>
  type: Maybe<StoreCollectionTypeQueryOperatorInput>
}

export type QueryStoreProductArgs = {
  aggregateRating: Maybe<StoreAggregateRatingFilterInput>
  brand: Maybe<StoreBrandFilterInput>
  breadcrumbList: Maybe<StoreBreadcrumbListFilterInput>
  children: Maybe<NodeFilterListInput>
  description: Maybe<StringQueryOperatorInput>
  gtin: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  image: Maybe<StoreImageFilterListInput>
  internal: Maybe<InternalFilterInput>
  isVariantOf: Maybe<StoreProductGroupFilterInput>
  name: Maybe<StringQueryOperatorInput>
  offers: Maybe<StoreAggregateOfferFilterInput>
  parent: Maybe<NodeFilterInput>
  productID: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
  review: Maybe<StoreReviewFilterListInput>
  seo: Maybe<StoreSeoFilterInput>
  sku: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
}

export type Site = Node & {
  buildTime: Maybe<Scalars['Date']>
  children: Array<Node>
  flags: Maybe<SiteFlags>
  host: Maybe<Scalars['String']>
  id: Scalars['ID']
  internal: Internal
  parent: Maybe<Node>
  pathPrefix: Maybe<Scalars['String']>
  polyfill: Maybe<Scalars['Boolean']>
  port: Maybe<Scalars['Int']>
  siteMetadata: Maybe<SiteSiteMetadata>
}

export type SiteBuildTimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type SiteBuildMetadata = Node & {
  buildTime: Maybe<Scalars['Date']>
  children: Array<Node>
  id: Scalars['ID']
  internal: Internal
  parent: Maybe<Node>
}

export type SiteBuildMetadataBuildTimeArgs = {
  difference: Maybe<Scalars['String']>
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  locale: Maybe<Scalars['String']>
}

export type SiteBuildMetadataConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<SiteBuildMetadataEdge>
  group: Array<SiteBuildMetadataGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<SiteBuildMetadata>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionGroupArgs = {
  field: SiteBuildMetadataFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type SiteBuildMetadataConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataEdge = {
  next: Maybe<SiteBuildMetadata>
  node: SiteBuildMetadata
  previous: Maybe<SiteBuildMetadata>
}

export type SiteBuildMetadataFieldsEnum =
  | 'buildTime'
  | 'children'
  | 'children___children'
  | 'children___children___children'
  | 'children___children___children___children'
  | 'children___children___children___id'
  | 'children___children___id'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___children___parent___children'
  | 'children___children___parent___id'
  | 'children___id'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'children___parent___children'
  | 'children___parent___children___children'
  | 'children___parent___children___id'
  | 'children___parent___id'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___parent___parent___children'
  | 'children___parent___parent___id'
  | 'id'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'parent___children'
  | 'parent___children___children'
  | 'parent___children___children___children'
  | 'parent___children___children___id'
  | 'parent___children___id'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___children___parent___children'
  | 'parent___children___parent___id'
  | 'parent___id'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'parent___parent___children'
  | 'parent___parent___children___children'
  | 'parent___parent___children___id'
  | 'parent___parent___id'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___parent___parent___children'
  | 'parent___parent___parent___id'

export type SiteBuildMetadataFilterInput = {
  buildTime: Maybe<DateQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  parent: Maybe<NodeFilterInput>
}

export type SiteBuildMetadataGroupConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<SiteBuildMetadataEdge>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
  group: Array<SiteBuildMetadataGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<SiteBuildMetadata>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type SiteBuildMetadataGroupConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionGroupArgs = {
  field: SiteBuildMetadataFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type SiteBuildMetadataGroupConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataSortInput = {
  fields: Maybe<Array<Maybe<SiteBuildMetadataFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SiteConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<SiteEdge>
  group: Array<SiteGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<Site>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionGroupArgs = {
  field: SiteFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type SiteConnectionMaxArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionMinArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionSumArgs = {
  field: SiteFieldsEnum
}

export type SiteEdge = {
  next: Maybe<Site>
  node: Site
  previous: Maybe<Site>
}

export type SiteFieldsEnum =
  | 'buildTime'
  | 'children'
  | 'children___children'
  | 'children___children___children'
  | 'children___children___children___children'
  | 'children___children___children___id'
  | 'children___children___id'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___children___parent___children'
  | 'children___children___parent___id'
  | 'children___id'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'children___parent___children'
  | 'children___parent___children___children'
  | 'children___parent___children___id'
  | 'children___parent___id'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___parent___parent___children'
  | 'children___parent___parent___id'
  | 'flags___DEV_SSR'
  | 'flags___FAST_DEV'
  | 'flags___LMDB_STORE'
  | 'flags___PARALLEL_QUERY_RUNNING'
  | 'flags___PARALLEL_SOURCING'
  | 'flags___PRESERVE_FILE_DOWNLOAD_CACHE'
  | 'host'
  | 'id'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'parent___children'
  | 'parent___children___children'
  | 'parent___children___children___children'
  | 'parent___children___children___id'
  | 'parent___children___id'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___children___parent___children'
  | 'parent___children___parent___id'
  | 'parent___id'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'parent___parent___children'
  | 'parent___parent___children___children'
  | 'parent___parent___children___id'
  | 'parent___parent___id'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___parent___parent___children'
  | 'parent___parent___parent___id'
  | 'pathPrefix'
  | 'polyfill'
  | 'port'
  | 'siteMetadata___author'
  | 'siteMetadata___description'
  | 'siteMetadata___siteUrl'
  | 'siteMetadata___title'
  | 'siteMetadata___titleTemplate'

export type SiteFilterInput = {
  buildTime: Maybe<DateQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  flags: Maybe<SiteFlagsFilterInput>
  host: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  parent: Maybe<NodeFilterInput>
  pathPrefix: Maybe<StringQueryOperatorInput>
  polyfill: Maybe<BooleanQueryOperatorInput>
  port: Maybe<IntQueryOperatorInput>
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>
}

export type SiteFlags = {
  DEV_SSR: Maybe<Scalars['Boolean']>
  FAST_DEV: Maybe<Scalars['Boolean']>
  LMDB_STORE: Maybe<Scalars['Boolean']>
  PARALLEL_QUERY_RUNNING: Maybe<Scalars['Boolean']>
  PARALLEL_SOURCING: Maybe<Scalars['Boolean']>
  PRESERVE_FILE_DOWNLOAD_CACHE: Maybe<Scalars['Boolean']>
}

export type SiteFlagsFilterInput = {
  DEV_SSR: Maybe<BooleanQueryOperatorInput>
  FAST_DEV: Maybe<BooleanQueryOperatorInput>
  LMDB_STORE: Maybe<BooleanQueryOperatorInput>
  PARALLEL_QUERY_RUNNING: Maybe<BooleanQueryOperatorInput>
  PARALLEL_SOURCING: Maybe<BooleanQueryOperatorInput>
  PRESERVE_FILE_DOWNLOAD_CACHE: Maybe<BooleanQueryOperatorInput>
}

export type SiteFunction = Node & {
  absoluteCompiledFilePath: Scalars['String']
  children: Array<Node>
  functionRoute: Scalars['String']
  id: Scalars['ID']
  internal: Internal
  matchPath: Maybe<Scalars['String']>
  originalAbsoluteFilePath: Scalars['String']
  originalRelativeFilePath: Scalars['String']
  parent: Maybe<Node>
  pluginName: Scalars['String']
  relativeCompiledFilePath: Scalars['String']
}

export type SiteFunctionConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<SiteFunctionEdge>
  group: Array<SiteFunctionGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<SiteFunction>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type SiteFunctionConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionGroupArgs = {
  field: SiteFunctionFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type SiteFunctionConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionMinArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionSumArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionEdge = {
  next: Maybe<SiteFunction>
  node: SiteFunction
  previous: Maybe<SiteFunction>
}

export type SiteFunctionFieldsEnum =
  | 'absoluteCompiledFilePath'
  | 'children'
  | 'children___children'
  | 'children___children___children'
  | 'children___children___children___children'
  | 'children___children___children___id'
  | 'children___children___id'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___children___parent___children'
  | 'children___children___parent___id'
  | 'children___id'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'children___parent___children'
  | 'children___parent___children___children'
  | 'children___parent___children___id'
  | 'children___parent___id'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___parent___parent___children'
  | 'children___parent___parent___id'
  | 'functionRoute'
  | 'id'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'matchPath'
  | 'originalAbsoluteFilePath'
  | 'originalRelativeFilePath'
  | 'parent___children'
  | 'parent___children___children'
  | 'parent___children___children___children'
  | 'parent___children___children___id'
  | 'parent___children___id'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___children___parent___children'
  | 'parent___children___parent___id'
  | 'parent___id'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'parent___parent___children'
  | 'parent___parent___children___children'
  | 'parent___parent___children___id'
  | 'parent___parent___id'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___parent___parent___children'
  | 'parent___parent___parent___id'
  | 'pluginName'
  | 'relativeCompiledFilePath'

export type SiteFunctionFilterInput = {
  absoluteCompiledFilePath: Maybe<StringQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  functionRoute: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  matchPath: Maybe<StringQueryOperatorInput>
  originalAbsoluteFilePath: Maybe<StringQueryOperatorInput>
  originalRelativeFilePath: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  pluginName: Maybe<StringQueryOperatorInput>
  relativeCompiledFilePath: Maybe<StringQueryOperatorInput>
}

export type SiteFunctionGroupConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<SiteFunctionEdge>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
  group: Array<SiteFunctionGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<SiteFunction>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type SiteFunctionGroupConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionGroupArgs = {
  field: SiteFunctionFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type SiteFunctionGroupConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionMinArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionSumArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionSortInput = {
  fields: Maybe<Array<Maybe<SiteFunctionFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SiteGroupConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<SiteEdge>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
  group: Array<SiteGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<Site>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type SiteGroupConnectionDistinctArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionGroupArgs = {
  field: SiteFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type SiteGroupConnectionMaxArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionMinArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionSumArgs = {
  field: SiteFieldsEnum
}

export type SitePage = Node & {
  children: Array<Node>
  component: Scalars['String']
  componentChunkName: Scalars['String']
  context: Maybe<SitePageContext>
  id: Scalars['ID']
  internal: Internal
  internalComponentName: Scalars['String']
  isCreatedByStatefulCreatePages: Maybe<Scalars['Boolean']>
  matchPath: Maybe<Scalars['String']>
  parent: Maybe<Node>
  path: Scalars['String']
  pluginCreator: Maybe<SitePlugin>
  pluginCreatorId: Maybe<Scalars['String']>
}

export type SitePageConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<SitePageEdge>
  group: Array<SitePageGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<SitePage>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionGroupArgs = {
  field: SitePageFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type SitePageConnectionMaxArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionMinArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionSumArgs = {
  field: SitePageFieldsEnum
}

export type SitePageContext = {
  _xparams: Maybe<SitePageContext_Xparams>
  id: Maybe<Scalars['String']>
  slug: Maybe<Scalars['String']>
}

export type SitePageContextFilterInput = {
  _xparams: Maybe<SitePageContext_XparamsFilterInput>
  id: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
}

export type SitePageContext_Xparams = {
  slug: Maybe<Scalars['String']>
}

export type SitePageContext_XparamsFilterInput = {
  slug: Maybe<StringQueryOperatorInput>
}

export type SitePageEdge = {
  next: Maybe<SitePage>
  node: SitePage
  previous: Maybe<SitePage>
}

export type SitePageFieldsEnum =
  | 'children'
  | 'children___children'
  | 'children___children___children'
  | 'children___children___children___children'
  | 'children___children___children___id'
  | 'children___children___id'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___children___parent___children'
  | 'children___children___parent___id'
  | 'children___id'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'children___parent___children'
  | 'children___parent___children___children'
  | 'children___parent___children___id'
  | 'children___parent___id'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___parent___parent___children'
  | 'children___parent___parent___id'
  | 'component'
  | 'componentChunkName'
  | 'context____xparams___slug'
  | 'context___id'
  | 'context___slug'
  | 'id'
  | 'internalComponentName'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'isCreatedByStatefulCreatePages'
  | 'matchPath'
  | 'parent___children'
  | 'parent___children___children'
  | 'parent___children___children___children'
  | 'parent___children___children___id'
  | 'parent___children___id'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___children___parent___children'
  | 'parent___children___parent___id'
  | 'parent___id'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'parent___parent___children'
  | 'parent___parent___children___children'
  | 'parent___parent___children___id'
  | 'parent___parent___id'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___parent___parent___children'
  | 'parent___parent___parent___id'
  | 'path'
  | 'pluginCreatorId'
  | 'pluginCreator___browserAPIs'
  | 'pluginCreator___children'
  | 'pluginCreator___children___children'
  | 'pluginCreator___children___children___children'
  | 'pluginCreator___children___children___id'
  | 'pluginCreator___children___id'
  | 'pluginCreator___children___internal___content'
  | 'pluginCreator___children___internal___contentDigest'
  | 'pluginCreator___children___internal___description'
  | 'pluginCreator___children___internal___fieldOwners'
  | 'pluginCreator___children___internal___ignoreType'
  | 'pluginCreator___children___internal___mediaType'
  | 'pluginCreator___children___internal___owner'
  | 'pluginCreator___children___internal___type'
  | 'pluginCreator___children___parent___children'
  | 'pluginCreator___children___parent___id'
  | 'pluginCreator___id'
  | 'pluginCreator___internal___content'
  | 'pluginCreator___internal___contentDigest'
  | 'pluginCreator___internal___description'
  | 'pluginCreator___internal___fieldOwners'
  | 'pluginCreator___internal___ignoreType'
  | 'pluginCreator___internal___mediaType'
  | 'pluginCreator___internal___owner'
  | 'pluginCreator___internal___type'
  | 'pluginCreator___name'
  | 'pluginCreator___nodeAPIs'
  | 'pluginCreator___packageJson___dependencies'
  | 'pluginCreator___packageJson___dependencies___name'
  | 'pluginCreator___packageJson___dependencies___version'
  | 'pluginCreator___packageJson___description'
  | 'pluginCreator___packageJson___devDependencies'
  | 'pluginCreator___packageJson___devDependencies___name'
  | 'pluginCreator___packageJson___devDependencies___version'
  | 'pluginCreator___packageJson___keywords'
  | 'pluginCreator___packageJson___license'
  | 'pluginCreator___packageJson___main'
  | 'pluginCreator___packageJson___name'
  | 'pluginCreator___packageJson___peerDependencies'
  | 'pluginCreator___packageJson___peerDependencies___name'
  | 'pluginCreator___packageJson___peerDependencies___version'
  | 'pluginCreator___packageJson___version'
  | 'pluginCreator___parent___children'
  | 'pluginCreator___parent___children___children'
  | 'pluginCreator___parent___children___id'
  | 'pluginCreator___parent___id'
  | 'pluginCreator___parent___internal___content'
  | 'pluginCreator___parent___internal___contentDigest'
  | 'pluginCreator___parent___internal___description'
  | 'pluginCreator___parent___internal___fieldOwners'
  | 'pluginCreator___parent___internal___ignoreType'
  | 'pluginCreator___parent___internal___mediaType'
  | 'pluginCreator___parent___internal___owner'
  | 'pluginCreator___parent___internal___type'
  | 'pluginCreator___parent___parent___children'
  | 'pluginCreator___parent___parent___id'
  | 'pluginCreator___pluginFilepath'
  | 'pluginCreator___pluginOptions____generated'
  | 'pluginCreator___pluginOptions___allExtensions'
  | 'pluginCreator___pluginOptions___appendScript'
  | 'pluginCreator___pluginOptions___background_color'
  | 'pluginCreator___pluginOptions___baseline'
  | 'pluginCreator___pluginOptions___cache_busting_mode'
  | 'pluginCreator___pluginOptions___color'
  | 'pluginCreator___pluginOptions___compare'
  | 'pluginCreator___pluginOptions___crossOrigin'
  | 'pluginCreator___pluginOptions___defer'
  | 'pluginCreator___pluginOptions___display'
  | 'pluginCreator___pluginOptions___html'
  | 'pluginCreator___pluginOptions___httpOptions'
  | 'pluginCreator___pluginOptions___icon'
  | 'pluginCreator___pluginOptions___include_favicon'
  | 'pluginCreator___pluginOptions___isTSX'
  | 'pluginCreator___pluginOptions___json'
  | 'pluginCreator___pluginOptions___jsxPragma'
  | 'pluginCreator___pluginOptions___legacy'
  | 'pluginCreator___pluginOptions___maxNumCollections'
  | 'pluginCreator___pluginOptions___maxNumProducts'
  | 'pluginCreator___pluginOptions___name'
  | 'pluginCreator___pluginOptions___outDir'
  | 'pluginCreator___pluginOptions___path'
  | 'pluginCreator___pluginOptions___pathCheck'
  | 'pluginCreator___pluginOptions___precachePages'
  | 'pluginCreator___pluginOptions___server'
  | 'pluginCreator___pluginOptions___serverOptions'
  | 'pluginCreator___pluginOptions___short_name'
  | 'pluginCreator___pluginOptions___showSpinner'
  | 'pluginCreator___pluginOptions___sourceCollections'
  | 'pluginCreator___pluginOptions___sourceProducts'
  | 'pluginCreator___pluginOptions___src'
  | 'pluginCreator___pluginOptions___start_url'
  | 'pluginCreator___pluginOptions___stats___context'
  | 'pluginCreator___pluginOptions___theme_color'
  | 'pluginCreator___pluginOptions___theme_color_in_head'
  | 'pluginCreator___pluginOptions___workboxConfig___globPatterns'
  | 'pluginCreator___resolve'
  | 'pluginCreator___ssrAPIs'
  | 'pluginCreator___version'

export type SitePageFilterInput = {
  children: Maybe<NodeFilterListInput>
  component: Maybe<StringQueryOperatorInput>
  componentChunkName: Maybe<StringQueryOperatorInput>
  context: Maybe<SitePageContextFilterInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  internalComponentName: Maybe<StringQueryOperatorInput>
  isCreatedByStatefulCreatePages: Maybe<BooleanQueryOperatorInput>
  matchPath: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  path: Maybe<StringQueryOperatorInput>
  pluginCreator: Maybe<SitePluginFilterInput>
  pluginCreatorId: Maybe<StringQueryOperatorInput>
}

export type SitePageGroupConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<SitePageEdge>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
  group: Array<SitePageGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<SitePage>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type SitePageGroupConnectionDistinctArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionGroupArgs = {
  field: SitePageFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type SitePageGroupConnectionMaxArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionMinArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionSumArgs = {
  field: SitePageFieldsEnum
}

export type SitePageSortInput = {
  fields: Maybe<Array<Maybe<SitePageFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SitePlugin = Node & {
  browserAPIs: Maybe<Array<Maybe<Scalars['String']>>>
  children: Array<Node>
  id: Scalars['ID']
  internal: Internal
  name: Maybe<Scalars['String']>
  nodeAPIs: Maybe<Array<Maybe<Scalars['String']>>>
  packageJson: Maybe<SitePluginPackageJson>
  parent: Maybe<Node>
  pluginFilepath: Maybe<Scalars['String']>
  pluginOptions: Maybe<SitePluginPluginOptions>
  resolve: Maybe<Scalars['String']>
  ssrAPIs: Maybe<Array<Maybe<Scalars['String']>>>
  version: Maybe<Scalars['String']>
}

export type SitePluginConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<SitePluginEdge>
  group: Array<SitePluginGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<SitePlugin>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionGroupArgs = {
  field: SitePluginFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type SitePluginConnectionMaxArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionMinArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionSumArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginEdge = {
  next: Maybe<SitePlugin>
  node: SitePlugin
  previous: Maybe<SitePlugin>
}

export type SitePluginFieldsEnum =
  | 'browserAPIs'
  | 'children'
  | 'children___children'
  | 'children___children___children'
  | 'children___children___children___children'
  | 'children___children___children___id'
  | 'children___children___id'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___children___parent___children'
  | 'children___children___parent___id'
  | 'children___id'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'children___parent___children'
  | 'children___parent___children___children'
  | 'children___parent___children___id'
  | 'children___parent___id'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___parent___parent___children'
  | 'children___parent___parent___id'
  | 'id'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'name'
  | 'nodeAPIs'
  | 'packageJson___dependencies'
  | 'packageJson___dependencies___name'
  | 'packageJson___dependencies___version'
  | 'packageJson___description'
  | 'packageJson___devDependencies'
  | 'packageJson___devDependencies___name'
  | 'packageJson___devDependencies___version'
  | 'packageJson___keywords'
  | 'packageJson___license'
  | 'packageJson___main'
  | 'packageJson___name'
  | 'packageJson___peerDependencies'
  | 'packageJson___peerDependencies___name'
  | 'packageJson___peerDependencies___version'
  | 'packageJson___version'
  | 'parent___children'
  | 'parent___children___children'
  | 'parent___children___children___children'
  | 'parent___children___children___id'
  | 'parent___children___id'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___children___parent___children'
  | 'parent___children___parent___id'
  | 'parent___id'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'parent___parent___children'
  | 'parent___parent___children___children'
  | 'parent___parent___children___id'
  | 'parent___parent___id'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___parent___parent___children'
  | 'parent___parent___parent___id'
  | 'pluginFilepath'
  | 'pluginOptions____generated'
  | 'pluginOptions___allExtensions'
  | 'pluginOptions___appendScript'
  | 'pluginOptions___background_color'
  | 'pluginOptions___baseline'
  | 'pluginOptions___cache_busting_mode'
  | 'pluginOptions___color'
  | 'pluginOptions___compare'
  | 'pluginOptions___crossOrigin'
  | 'pluginOptions___defer'
  | 'pluginOptions___display'
  | 'pluginOptions___env___branch_deploy___policy'
  | 'pluginOptions___env___deploy_preview___policy'
  | 'pluginOptions___env___production___policy'
  | 'pluginOptions___html'
  | 'pluginOptions___httpOptions'
  | 'pluginOptions___icon'
  | 'pluginOptions___include_favicon'
  | 'pluginOptions___isTSX'
  | 'pluginOptions___json'
  | 'pluginOptions___jsxPragma'
  | 'pluginOptions___legacy'
  | 'pluginOptions___maxNumCollections'
  | 'pluginOptions___maxNumProducts'
  | 'pluginOptions___name'
  | 'pluginOptions___outDir'
  | 'pluginOptions___path'
  | 'pluginOptions___pathCheck'
  | 'pluginOptions___precachePages'
  | 'pluginOptions___server'
  | 'pluginOptions___serverOptions'
  | 'pluginOptions___short_name'
  | 'pluginOptions___showSpinner'
  | 'pluginOptions___sourceCollections'
  | 'pluginOptions___sourceProducts'
  | 'pluginOptions___src'
  | 'pluginOptions___start_url'
  | 'pluginOptions___stats___context'
  | 'pluginOptions___theme_color'
  | 'pluginOptions___theme_color_in_head'
  | 'pluginOptions___workboxConfig___globPatterns'
  | 'resolve'
  | 'ssrAPIs'
  | 'version'

export type SitePluginFilterInput = {
  browserAPIs: Maybe<StringQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  name: Maybe<StringQueryOperatorInput>
  nodeAPIs: Maybe<StringQueryOperatorInput>
  packageJson: Maybe<SitePluginPackageJsonFilterInput>
  parent: Maybe<NodeFilterInput>
  pluginFilepath: Maybe<StringQueryOperatorInput>
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>
  resolve: Maybe<StringQueryOperatorInput>
  ssrAPIs: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
}

export type SitePluginGroupConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<SitePluginEdge>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
  group: Array<SitePluginGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<SitePlugin>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type SitePluginGroupConnectionDistinctArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionGroupArgs = {
  field: SitePluginFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type SitePluginGroupConnectionMaxArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionMinArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionSumArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginPackageJson = {
  dependencies: Maybe<Array<Maybe<SitePluginPackageJsonDependencies>>>
  description: Maybe<Scalars['String']>
  devDependencies: Maybe<Array<Maybe<SitePluginPackageJsonDevDependencies>>>
  keywords: Maybe<Array<Maybe<Scalars['String']>>>
  license: Maybe<Scalars['String']>
  main: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  peerDependencies: Maybe<Array<Maybe<SitePluginPackageJsonPeerDependencies>>>
  version: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonDependencies = {
  name: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonDependenciesFilterInput>
}

export type SitePluginPackageJsonDevDependencies = {
  name: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>
}

export type SitePluginPackageJsonFilterInput = {
  dependencies: Maybe<SitePluginPackageJsonDependenciesFilterListInput>
  description: Maybe<StringQueryOperatorInput>
  devDependencies: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>
  keywords: Maybe<StringQueryOperatorInput>
  license: Maybe<StringQueryOperatorInput>
  main: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  peerDependencies: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>
  version: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonPeerDependencies = {
  name: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>
}

export type SitePluginPluginOptions = {
  _generated: Maybe<Scalars['String']>
  allExtensions: Maybe<Scalars['Boolean']>
  appendScript: Maybe<Scalars['String']>
  background_color: Maybe<Scalars['String']>
  baseline: Maybe<Scalars['Boolean']>
  cache_busting_mode: Maybe<Scalars['String']>
  color: Maybe<Scalars['String']>
  compare: Maybe<Scalars['Boolean']>
  crossOrigin: Maybe<Scalars['String']>
  defer: Maybe<Scalars['Boolean']>
  display: Maybe<Scalars['String']>
  env: Maybe<SitePluginPluginOptionsEnv>
  html: Maybe<Scalars['Boolean']>
  httpOptions: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>
  icon: Maybe<Scalars['String']>
  include_favicon: Maybe<Scalars['Boolean']>
  isTSX: Maybe<Scalars['Boolean']>
  json: Maybe<Scalars['Boolean']>
  jsxPragma: Maybe<Scalars['String']>
  legacy: Maybe<Scalars['Boolean']>
  maxNumCollections: Maybe<Scalars['Int']>
  maxNumProducts: Maybe<Scalars['Int']>
  name: Maybe<Scalars['String']>
  outDir: Maybe<Scalars['String']>
  path: Maybe<Scalars['String']>
  pathCheck: Maybe<Scalars['Boolean']>
  precachePages: Maybe<Array<Maybe<Scalars['String']>>>
  server: Maybe<Scalars['String']>
  serverOptions: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>
  short_name: Maybe<Scalars['String']>
  showSpinner: Maybe<Scalars['Boolean']>
  sourceCollections: Maybe<Scalars['Boolean']>
  sourceProducts: Maybe<Scalars['Boolean']>
  src: Maybe<Scalars['String']>
  start_url: Maybe<Scalars['String']>
  stats: Maybe<SitePluginPluginOptionsStats>
  theme_color: Maybe<Scalars['String']>
  theme_color_in_head: Maybe<Scalars['Boolean']>
  workboxConfig: Maybe<SitePluginPluginOptionsWorkboxConfig>
}

export type SitePluginPluginOptionsEnv = {
  branch_deploy: Maybe<SitePluginPluginOptionsEnvBranch_Deploy>
  deploy_preview: Maybe<SitePluginPluginOptionsEnvDeploy_Preview>
  production: Maybe<SitePluginPluginOptionsEnvProduction>
}

export type SitePluginPluginOptionsEnvBranch_Deploy = {
  policy: Maybe<Array<Maybe<SitePluginPluginOptionsEnvBranch_DeployPolicy>>>
}

export type SitePluginPluginOptionsEnvBranch_DeployFilterInput = {
  policy: Maybe<SitePluginPluginOptionsEnvBranch_DeployPolicyFilterListInput>
}

export type SitePluginPluginOptionsEnvBranch_DeployPolicy = {
  disallow: Maybe<Array<Maybe<Scalars['String']>>>
  userAgent: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsEnvBranch_DeployPolicyFilterInput = {
  disallow: Maybe<StringQueryOperatorInput>
  userAgent: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsEnvBranch_DeployPolicyFilterListInput = {
  elemMatch: Maybe<SitePluginPluginOptionsEnvBranch_DeployPolicyFilterInput>
}

export type SitePluginPluginOptionsEnvDeploy_Preview = {
  policy: Maybe<Array<Maybe<SitePluginPluginOptionsEnvDeploy_PreviewPolicy>>>
}

export type SitePluginPluginOptionsEnvDeploy_PreviewFilterInput = {
  policy: Maybe<SitePluginPluginOptionsEnvDeploy_PreviewPolicyFilterListInput>
}

export type SitePluginPluginOptionsEnvDeploy_PreviewPolicy = {
  disallow: Maybe<Array<Maybe<Scalars['String']>>>
  userAgent: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsEnvDeploy_PreviewPolicyFilterInput = {
  disallow: Maybe<StringQueryOperatorInput>
  userAgent: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsEnvDeploy_PreviewPolicyFilterListInput = {
  elemMatch: Maybe<SitePluginPluginOptionsEnvDeploy_PreviewPolicyFilterInput>
}

export type SitePluginPluginOptionsEnvFilterInput = {
  branch_deploy: Maybe<SitePluginPluginOptionsEnvBranch_DeployFilterInput>
  deploy_preview: Maybe<SitePluginPluginOptionsEnvDeploy_PreviewFilterInput>
  production: Maybe<SitePluginPluginOptionsEnvProductionFilterInput>
}

export type SitePluginPluginOptionsEnvProduction = {
  policy: Maybe<Array<Maybe<SitePluginPluginOptionsEnvProductionPolicy>>>
}

export type SitePluginPluginOptionsEnvProductionFilterInput = {
  policy: Maybe<SitePluginPluginOptionsEnvProductionPolicyFilterListInput>
}

export type SitePluginPluginOptionsEnvProductionPolicy = {
  allow: Maybe<Scalars['String']>
  disallow: Maybe<Array<Maybe<Scalars['String']>>>
  userAgent: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsEnvProductionPolicyFilterInput = {
  allow: Maybe<StringQueryOperatorInput>
  disallow: Maybe<StringQueryOperatorInput>
  userAgent: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsEnvProductionPolicyFilterListInput = {
  elemMatch: Maybe<SitePluginPluginOptionsEnvProductionPolicyFilterInput>
}

export type SitePluginPluginOptionsFilterInput = {
  _generated: Maybe<StringQueryOperatorInput>
  allExtensions: Maybe<BooleanQueryOperatorInput>
  appendScript: Maybe<StringQueryOperatorInput>
  background_color: Maybe<StringQueryOperatorInput>
  baseline: Maybe<BooleanQueryOperatorInput>
  cache_busting_mode: Maybe<StringQueryOperatorInput>
  color: Maybe<StringQueryOperatorInput>
  compare: Maybe<BooleanQueryOperatorInput>
  crossOrigin: Maybe<StringQueryOperatorInput>
  defer: Maybe<BooleanQueryOperatorInput>
  display: Maybe<StringQueryOperatorInput>
  env: Maybe<SitePluginPluginOptionsEnvFilterInput>
  html: Maybe<BooleanQueryOperatorInput>
  httpOptions: Maybe<StringQueryOperatorInput>
  icon: Maybe<StringQueryOperatorInput>
  include_favicon: Maybe<BooleanQueryOperatorInput>
  isTSX: Maybe<BooleanQueryOperatorInput>
  json: Maybe<BooleanQueryOperatorInput>
  jsxPragma: Maybe<StringQueryOperatorInput>
  legacy: Maybe<BooleanQueryOperatorInput>
  maxNumCollections: Maybe<IntQueryOperatorInput>
  maxNumProducts: Maybe<IntQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  outDir: Maybe<StringQueryOperatorInput>
  path: Maybe<StringQueryOperatorInput>
  pathCheck: Maybe<BooleanQueryOperatorInput>
  precachePages: Maybe<StringQueryOperatorInput>
  server: Maybe<StringQueryOperatorInput>
  serverOptions: Maybe<StringQueryOperatorInput>
  short_name: Maybe<StringQueryOperatorInput>
  showSpinner: Maybe<BooleanQueryOperatorInput>
  sourceCollections: Maybe<BooleanQueryOperatorInput>
  sourceProducts: Maybe<BooleanQueryOperatorInput>
  src: Maybe<StringQueryOperatorInput>
  start_url: Maybe<StringQueryOperatorInput>
  stats: Maybe<SitePluginPluginOptionsStatsFilterInput>
  theme_color: Maybe<StringQueryOperatorInput>
  theme_color_in_head: Maybe<BooleanQueryOperatorInput>
  workboxConfig: Maybe<SitePluginPluginOptionsWorkboxConfigFilterInput>
}

export type SitePluginPluginOptionsStats = {
  context: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsStatsFilterInput = {
  context: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsWorkboxConfig = {
  globPatterns: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SitePluginPluginOptionsWorkboxConfigFilterInput = {
  globPatterns: Maybe<StringQueryOperatorInput>
}

export type SitePluginSortInput = {
  fields: Maybe<Array<Maybe<SitePluginFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SiteSiteMetadata = {
  author: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  siteUrl: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  titleTemplate: Maybe<Scalars['String']>
}

export type SiteSiteMetadataFilterInput = {
  author: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
  siteUrl: Maybe<StringQueryOperatorInput>
  title: Maybe<StringQueryOperatorInput>
  titleTemplate: Maybe<StringQueryOperatorInput>
}

export type SiteSortInput = {
  fields: Maybe<Array<Maybe<SiteFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SortOrderEnum = 'ASC' | 'DESC'

export type StoreAggregateOffer = {
  highPrice: Scalars['Float']
  lowPrice: Scalars['Float']
  offerCount: Scalars['Int']
  offers: Array<StoreOffer>
  priceCurrency: Scalars['String']
  remoteTypeName: Maybe<Scalars['String']>
}

export type StoreAggregateOfferFilterInput = {
  highPrice: Maybe<FloatQueryOperatorInput>
  lowPrice: Maybe<FloatQueryOperatorInput>
  offerCount: Maybe<IntQueryOperatorInput>
  offers: Maybe<StoreOfferFilterListInput>
  priceCurrency: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
}

export type StoreAggregateRating = {
  ratingValue: Scalars['Float']
  remoteTypeName: Maybe<Scalars['String']>
  reviewCount: Scalars['Int']
}

export type StoreAggregateRatingFilterInput = {
  ratingValue: Maybe<FloatQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
  reviewCount: Maybe<IntQueryOperatorInput>
}

export type StoreAuthor = {
  name: Scalars['String']
}

export type StoreAuthorFilterInput = {
  name: Maybe<StringQueryOperatorInput>
}

export type StoreBrand = {
  name: Scalars['String']
  remoteTypeName: Maybe<Scalars['String']>
}

export type StoreBrandFilterInput = {
  name: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
}

export type StoreBreadcrumbList = {
  itemListElement: Array<StoreListItem>
  numberOfItems: Scalars['Int']
  remoteTypeName: Maybe<Scalars['String']>
}

export type StoreBreadcrumbListFilterInput = {
  itemListElement: Maybe<StoreListItemFilterListInput>
  numberOfItems: Maybe<IntQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
}

export type StoreCart = {
  messages: Array<StoreCartMessage>
  order: StoreOrder
}

export type StoreCartMessage = {
  status: StoreStatus
  text: Scalars['String']
}

export type StoreCollection = Node & {
  breadcrumbList: StoreBreadcrumbList
  children: Array<Node>
  id: Scalars['ID']
  internal: Internal
  meta: StoreCollectionMeta
  parent: Maybe<Node>
  remoteId: Maybe<Scalars['String']>
  remoteTypeName: Maybe<Scalars['String']>
  seo: StoreSeo
  slug: Scalars['String']
  type: StoreCollectionType
}

export type StoreCollectionConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<StoreCollectionEdge>
  group: Array<StoreCollectionGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<StoreCollection>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type StoreCollectionConnectionDistinctArgs = {
  field: StoreCollectionFieldsEnum
}

export type StoreCollectionConnectionGroupArgs = {
  field: StoreCollectionFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type StoreCollectionConnectionMaxArgs = {
  field: StoreCollectionFieldsEnum
}

export type StoreCollectionConnectionMinArgs = {
  field: StoreCollectionFieldsEnum
}

export type StoreCollectionConnectionSumArgs = {
  field: StoreCollectionFieldsEnum
}

export type StoreCollectionEdge = {
  cursor: Scalars['String']
  node: StoreCollection
}

export type StoreCollectionFacet = {
  key: Scalars['String']
  remoteTypeName: Maybe<Scalars['String']>
  value: Scalars['String']
}

export type StoreCollectionFacetFilterInput = {
  key: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
  value: Maybe<StringQueryOperatorInput>
}

export type StoreCollectionFacetFilterListInput = {
  elemMatch: Maybe<StoreCollectionFacetFilterInput>
}

export type StoreCollectionFieldsEnum =
  | 'breadcrumbList___itemListElement'
  | 'breadcrumbList___itemListElement___item'
  | 'breadcrumbList___itemListElement___name'
  | 'breadcrumbList___itemListElement___position'
  | 'breadcrumbList___itemListElement___remoteTypeName'
  | 'breadcrumbList___numberOfItems'
  | 'breadcrumbList___remoteTypeName'
  | 'children'
  | 'children___children'
  | 'children___children___children'
  | 'children___children___children___children'
  | 'children___children___children___id'
  | 'children___children___id'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___children___parent___children'
  | 'children___children___parent___id'
  | 'children___id'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'children___parent___children'
  | 'children___parent___children___children'
  | 'children___parent___children___id'
  | 'children___parent___id'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___parent___parent___children'
  | 'children___parent___parent___id'
  | 'id'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'meta___remoteTypeName'
  | 'meta___selectedFacets'
  | 'meta___selectedFacets___key'
  | 'meta___selectedFacets___remoteTypeName'
  | 'meta___selectedFacets___value'
  | 'parent___children'
  | 'parent___children___children'
  | 'parent___children___children___children'
  | 'parent___children___children___id'
  | 'parent___children___id'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___children___parent___children'
  | 'parent___children___parent___id'
  | 'parent___id'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'parent___parent___children'
  | 'parent___parent___children___children'
  | 'parent___parent___children___id'
  | 'parent___parent___id'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___parent___parent___children'
  | 'parent___parent___parent___id'
  | 'remoteId'
  | 'remoteTypeName'
  | 'seo___canonical'
  | 'seo___description'
  | 'seo___remoteTypeName'
  | 'seo___title'
  | 'seo___titleTemplate'
  | 'slug'
  | 'type'

export type StoreCollectionFilterInput = {
  breadcrumbList: Maybe<StoreBreadcrumbListFilterInput>
  children: Maybe<NodeFilterListInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  meta: Maybe<StoreCollectionMetaFilterInput>
  parent: Maybe<NodeFilterInput>
  remoteId: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
  seo: Maybe<StoreSeoFilterInput>
  slug: Maybe<StringQueryOperatorInput>
  type: Maybe<StoreCollectionTypeQueryOperatorInput>
}

export type StoreCollectionGroupConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<StoreCollectionEdge>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
  group: Array<StoreCollectionGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<StoreCollection>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type StoreCollectionGroupConnectionDistinctArgs = {
  field: StoreCollectionFieldsEnum
}

export type StoreCollectionGroupConnectionGroupArgs = {
  field: StoreCollectionFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type StoreCollectionGroupConnectionMaxArgs = {
  field: StoreCollectionFieldsEnum
}

export type StoreCollectionGroupConnectionMinArgs = {
  field: StoreCollectionFieldsEnum
}

export type StoreCollectionGroupConnectionSumArgs = {
  field: StoreCollectionFieldsEnum
}

export type StoreCollectionMeta = {
  remoteTypeName: Maybe<Scalars['String']>
  selectedFacets: Array<StoreCollectionFacet>
}

export type StoreCollectionMetaFilterInput = {
  remoteTypeName: Maybe<StringQueryOperatorInput>
  selectedFacets: Maybe<StoreCollectionFacetFilterListInput>
}

export type StoreCollectionSortInput = {
  fields: Maybe<Array<Maybe<StoreCollectionFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type StoreCollectionType =
  | 'Brand'
  | 'Category'
  | 'Cluster'
  | 'Department'

export type StoreCollectionTypeQueryOperatorInput = {
  eq: Maybe<StoreCollectionType>
  in: Maybe<Array<Maybe<StoreCollectionType>>>
  ne: Maybe<StoreCollectionType>
  nin: Maybe<Array<Maybe<StoreCollectionType>>>
}

export type StoreFacet = {
  key: Scalars['String']
  label: Scalars['String']
  type: StoreFacetType
  values: Array<StoreFacetValue>
}

export type StoreFacetType = 'BOOLEAN' | 'RANGE'

export type StoreFacetValue = {
  label: Scalars['String']
  quantity: Scalars['Int']
  selected: Scalars['Boolean']
  value: Scalars['String']
}

export type StoreImage = {
  alternateName: Scalars['String']
  remoteTypeName: Maybe<Scalars['String']>
  url: Scalars['String']
}

export type StoreImageFilterInput = {
  alternateName: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
  url: Maybe<StringQueryOperatorInput>
}

export type StoreImageFilterListInput = {
  elemMatch: Maybe<StoreImageFilterInput>
}

export type StoreListItem = {
  item: Scalars['String']
  name: Scalars['String']
  position: Scalars['Int']
  remoteTypeName: Maybe<Scalars['String']>
}

export type StoreListItemFilterInput = {
  item: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  position: Maybe<IntQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
}

export type StoreListItemFilterListInput = {
  elemMatch: Maybe<StoreListItemFilterInput>
}

export type StoreOffer = {
  availability: Scalars['String']
  itemCondition: Scalars['String']
  itemOffered: StoreProduct
  listPrice: Scalars['Float']
  price: Scalars['Float']
  priceCurrency: Scalars['String']
  priceValidUntil: Scalars['String']
  quantity: Scalars['Int']
  remoteTypeName: Maybe<Scalars['String']>
  seller: StoreOrganization
  sellingPrice: Scalars['Float']
}

export type StoreOfferFilterInput = {
  availability: Maybe<StringQueryOperatorInput>
  itemCondition: Maybe<StringQueryOperatorInput>
  itemOffered: Maybe<StoreProductFilterInput>
  listPrice: Maybe<FloatQueryOperatorInput>
  price: Maybe<FloatQueryOperatorInput>
  priceCurrency: Maybe<StringQueryOperatorInput>
  priceValidUntil: Maybe<StringQueryOperatorInput>
  quantity: Maybe<IntQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
  seller: Maybe<StoreOrganizationFilterInput>
  sellingPrice: Maybe<FloatQueryOperatorInput>
}

export type StoreOfferFilterListInput = {
  elemMatch: Maybe<StoreOfferFilterInput>
}

export type StoreOrder = {
  acceptedOffer: Array<StoreOffer>
  orderNumber: Scalars['String']
}

export type StoreOrganization = {
  identifier: Scalars['String']
  remoteTypeName: Maybe<Scalars['String']>
}

export type StoreOrganizationFilterInput = {
  identifier: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
}

export type StorePageInfo = {
  endCursor: Scalars['String']
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor: Scalars['String']
  totalCount: Scalars['Int']
}

export type StoreProduct = Node & {
  aggregateRating: StoreAggregateRating
  brand: StoreBrand
  breadcrumbList: StoreBreadcrumbList
  children: Array<Node>
  description: Scalars['String']
  gtin: Scalars['String']
  id: Scalars['ID']
  image: Array<StoreImage>
  internal: Internal
  isVariantOf: StoreProductGroup
  name: Scalars['String']
  offers: StoreAggregateOffer
  parent: Maybe<Node>
  productID: Scalars['String']
  remoteTypeName: Maybe<Scalars['String']>
  review: Array<StoreReview>
  seo: StoreSeo
  sku: Scalars['String']
  slug: Scalars['String']
}

export type StoreProductConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<StoreProductEdge>
  group: Array<StoreProductGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<StoreProduct>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type StoreProductConnectionDistinctArgs = {
  field: StoreProductFieldsEnum
}

export type StoreProductConnectionGroupArgs = {
  field: StoreProductFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type StoreProductConnectionMaxArgs = {
  field: StoreProductFieldsEnum
}

export type StoreProductConnectionMinArgs = {
  field: StoreProductFieldsEnum
}

export type StoreProductConnectionSumArgs = {
  field: StoreProductFieldsEnum
}

export type StoreProductEdge = {
  cursor: Scalars['String']
  node: StoreProduct
}

export type StoreProductFieldsEnum =
  | 'aggregateRating___ratingValue'
  | 'aggregateRating___remoteTypeName'
  | 'aggregateRating___reviewCount'
  | 'brand___name'
  | 'brand___remoteTypeName'
  | 'breadcrumbList___itemListElement'
  | 'breadcrumbList___itemListElement___item'
  | 'breadcrumbList___itemListElement___name'
  | 'breadcrumbList___itemListElement___position'
  | 'breadcrumbList___itemListElement___remoteTypeName'
  | 'breadcrumbList___numberOfItems'
  | 'breadcrumbList___remoteTypeName'
  | 'children'
  | 'children___children'
  | 'children___children___children'
  | 'children___children___children___children'
  | 'children___children___children___id'
  | 'children___children___id'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___children___parent___children'
  | 'children___children___parent___id'
  | 'children___id'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'children___parent___children'
  | 'children___parent___children___children'
  | 'children___parent___children___id'
  | 'children___parent___id'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___parent___parent___children'
  | 'children___parent___parent___id'
  | 'description'
  | 'gtin'
  | 'id'
  | 'image'
  | 'image___alternateName'
  | 'image___remoteTypeName'
  | 'image___url'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'isVariantOf___hasVariant'
  | 'isVariantOf___hasVariant___aggregateRating___ratingValue'
  | 'isVariantOf___hasVariant___aggregateRating___remoteTypeName'
  | 'isVariantOf___hasVariant___aggregateRating___reviewCount'
  | 'isVariantOf___hasVariant___brand___name'
  | 'isVariantOf___hasVariant___brand___remoteTypeName'
  | 'isVariantOf___hasVariant___breadcrumbList___itemListElement'
  | 'isVariantOf___hasVariant___breadcrumbList___numberOfItems'
  | 'isVariantOf___hasVariant___breadcrumbList___remoteTypeName'
  | 'isVariantOf___hasVariant___children'
  | 'isVariantOf___hasVariant___children___children'
  | 'isVariantOf___hasVariant___children___id'
  | 'isVariantOf___hasVariant___description'
  | 'isVariantOf___hasVariant___gtin'
  | 'isVariantOf___hasVariant___id'
  | 'isVariantOf___hasVariant___image'
  | 'isVariantOf___hasVariant___image___alternateName'
  | 'isVariantOf___hasVariant___image___remoteTypeName'
  | 'isVariantOf___hasVariant___image___url'
  | 'isVariantOf___hasVariant___internal___content'
  | 'isVariantOf___hasVariant___internal___contentDigest'
  | 'isVariantOf___hasVariant___internal___description'
  | 'isVariantOf___hasVariant___internal___fieldOwners'
  | 'isVariantOf___hasVariant___internal___ignoreType'
  | 'isVariantOf___hasVariant___internal___mediaType'
  | 'isVariantOf___hasVariant___internal___owner'
  | 'isVariantOf___hasVariant___internal___type'
  | 'isVariantOf___hasVariant___isVariantOf___hasVariant'
  | 'isVariantOf___hasVariant___isVariantOf___name'
  | 'isVariantOf___hasVariant___isVariantOf___productGroupID'
  | 'isVariantOf___hasVariant___isVariantOf___remoteTypeName'
  | 'isVariantOf___hasVariant___name'
  | 'isVariantOf___hasVariant___offers___highPrice'
  | 'isVariantOf___hasVariant___offers___lowPrice'
  | 'isVariantOf___hasVariant___offers___offerCount'
  | 'isVariantOf___hasVariant___offers___offers'
  | 'isVariantOf___hasVariant___offers___priceCurrency'
  | 'isVariantOf___hasVariant___offers___remoteTypeName'
  | 'isVariantOf___hasVariant___parent___children'
  | 'isVariantOf___hasVariant___parent___id'
  | 'isVariantOf___hasVariant___productID'
  | 'isVariantOf___hasVariant___remoteTypeName'
  | 'isVariantOf___hasVariant___review'
  | 'isVariantOf___hasVariant___seo___canonical'
  | 'isVariantOf___hasVariant___seo___description'
  | 'isVariantOf___hasVariant___seo___remoteTypeName'
  | 'isVariantOf___hasVariant___seo___title'
  | 'isVariantOf___hasVariant___seo___titleTemplate'
  | 'isVariantOf___hasVariant___sku'
  | 'isVariantOf___hasVariant___slug'
  | 'isVariantOf___name'
  | 'isVariantOf___productGroupID'
  | 'isVariantOf___remoteTypeName'
  | 'name'
  | 'offers___highPrice'
  | 'offers___lowPrice'
  | 'offers___offerCount'
  | 'offers___offers'
  | 'offers___offers___availability'
  | 'offers___offers___itemCondition'
  | 'offers___offers___itemOffered___children'
  | 'offers___offers___itemOffered___description'
  | 'offers___offers___itemOffered___gtin'
  | 'offers___offers___itemOffered___id'
  | 'offers___offers___itemOffered___image'
  | 'offers___offers___itemOffered___name'
  | 'offers___offers___itemOffered___productID'
  | 'offers___offers___itemOffered___remoteTypeName'
  | 'offers___offers___itemOffered___review'
  | 'offers___offers___itemOffered___sku'
  | 'offers___offers___itemOffered___slug'
  | 'offers___offers___listPrice'
  | 'offers___offers___price'
  | 'offers___offers___priceCurrency'
  | 'offers___offers___priceValidUntil'
  | 'offers___offers___quantity'
  | 'offers___offers___remoteTypeName'
  | 'offers___offers___seller___identifier'
  | 'offers___offers___seller___remoteTypeName'
  | 'offers___offers___sellingPrice'
  | 'offers___priceCurrency'
  | 'offers___remoteTypeName'
  | 'parent___children'
  | 'parent___children___children'
  | 'parent___children___children___children'
  | 'parent___children___children___id'
  | 'parent___children___id'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___children___parent___children'
  | 'parent___children___parent___id'
  | 'parent___id'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'parent___parent___children'
  | 'parent___parent___children___children'
  | 'parent___parent___children___id'
  | 'parent___parent___id'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___parent___parent___children'
  | 'parent___parent___parent___id'
  | 'productID'
  | 'remoteTypeName'
  | 'review'
  | 'review___author___name'
  | 'review___reviewRating___bestRating'
  | 'review___reviewRating___ratingValue'
  | 'seo___canonical'
  | 'seo___description'
  | 'seo___remoteTypeName'
  | 'seo___title'
  | 'seo___titleTemplate'
  | 'sku'
  | 'slug'

export type StoreProductFilterInput = {
  aggregateRating: Maybe<StoreAggregateRatingFilterInput>
  brand: Maybe<StoreBrandFilterInput>
  breadcrumbList: Maybe<StoreBreadcrumbListFilterInput>
  children: Maybe<NodeFilterListInput>
  description: Maybe<StringQueryOperatorInput>
  gtin: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  image: Maybe<StoreImageFilterListInput>
  internal: Maybe<InternalFilterInput>
  isVariantOf: Maybe<StoreProductGroupFilterInput>
  name: Maybe<StringQueryOperatorInput>
  offers: Maybe<StoreAggregateOfferFilterInput>
  parent: Maybe<NodeFilterInput>
  productID: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
  review: Maybe<StoreReviewFilterListInput>
  seo: Maybe<StoreSeoFilterInput>
  sku: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
}

export type StoreProductFilterListInput = {
  elemMatch: Maybe<StoreProductFilterInput>
}

export type StoreProductGroup = {
  hasVariant: Array<StoreProduct>
  name: Scalars['String']
  productGroupID: Scalars['String']
  remoteTypeName: Maybe<Scalars['String']>
}

export type StoreProductGroupConnection = {
  distinct: Array<Scalars['String']>
  edges: Array<StoreProductEdge>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
  group: Array<StoreProductGroupConnection>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  nodes: Array<StoreProduct>
  pageInfo: PageInfo
  sum: Maybe<Scalars['Float']>
  totalCount: Scalars['Int']
}

export type StoreProductGroupConnectionDistinctArgs = {
  field: StoreProductFieldsEnum
}

export type StoreProductGroupConnectionGroupArgs = {
  field: StoreProductFieldsEnum
  limit: Maybe<Scalars['Int']>
  skip: Maybe<Scalars['Int']>
}

export type StoreProductGroupConnectionMaxArgs = {
  field: StoreProductFieldsEnum
}

export type StoreProductGroupConnectionMinArgs = {
  field: StoreProductFieldsEnum
}

export type StoreProductGroupConnectionSumArgs = {
  field: StoreProductFieldsEnum
}

export type StoreProductGroupFilterInput = {
  hasVariant: Maybe<StoreProductFilterListInput>
  name: Maybe<StringQueryOperatorInput>
  productGroupID: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
}

export type StoreProductSortInput = {
  fields: Maybe<Array<Maybe<StoreProductFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type StoreReview = {
  author: StoreAuthor
  reviewRating: StoreReviewRating
}

export type StoreReviewFilterInput = {
  author: Maybe<StoreAuthorFilterInput>
  reviewRating: Maybe<StoreReviewRatingFilterInput>
}

export type StoreReviewFilterListInput = {
  elemMatch: Maybe<StoreReviewFilterInput>
}

export type StoreReviewRating = {
  bestRating: Scalars['Float']
  ratingValue: Scalars['Float']
}

export type StoreReviewRatingFilterInput = {
  bestRating: Maybe<FloatQueryOperatorInput>
  ratingValue: Maybe<FloatQueryOperatorInput>
}

export type StoreSearchResult = {
  facets: Array<StoreFacet>
  products: BrowserStoreProductConnection
}

export type StoreSeo = {
  canonical: Scalars['String']
  description: Scalars['String']
  remoteTypeName: Maybe<Scalars['String']>
  title: Scalars['String']
  titleTemplate: Scalars['String']
}

export type StoreSeoFilterInput = {
  canonical: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
  remoteTypeName: Maybe<StringQueryOperatorInput>
  title: Maybe<StringQueryOperatorInput>
  titleTemplate: Maybe<StringQueryOperatorInput>
}

export type StoreSort =
  | 'discount_desc'
  | 'name_asc'
  | 'name_desc'
  | 'orders_desc'
  | 'price_asc'
  | 'price_desc'
  | 'release_desc'
  | 'score_desc'

export type StoreStatus = 'ERROR' | 'INFO' | 'WARNING'

export type StringQueryOperatorInput = {
  eq: Maybe<Scalars['String']>
  glob: Maybe<Scalars['String']>
  in: Maybe<Array<Maybe<Scalars['String']>>>
  ne: Maybe<Scalars['String']>
  nin: Maybe<Array<Maybe<Scalars['String']>>>
  regex: Maybe<Scalars['String']>
}

export type NavlinksQueryQueryVariables = Exact<{ [key: string]: never }>

export type NavlinksQueryQuery = {
  allStoreCollection: { nodes: Array<{ slug: string; seo: { title: string } }> }
}

export type ProductSummary_ProductFragment = {
  slug: string
  sku: string
  name: string
  gtin: string
  id: string
  brand: { name: string; brandName: string }
  isVariantOf: { productGroupID: string; name: string }
  image: Array<{ url: string; alternateName: string }>
  offers: {
    lowPrice: number
    offers: Array<{
      price: number
      listPrice: number
      quantity: number
      seller: { identifier: string }
    }>
  }
}

export type FacetedFilter_FacetsFragment = {
  key: string
  label: string
  type: StoreFacetType
  values: Array<{
    label: string
    value: string
    selected: boolean
    quantity: number
  }>
}

export type ProductDetailsFragment_ProductFragment = {
  sku: string
  name: string
  gtin: string
  id: string
  isVariantOf: { productGroupID: string; name: string }
  image: Array<{ url: string; alternateName: string }>
  brand: { name: string }
  offers: {
    offers: Array<{
      price: number
      listPrice: number
      seller: { identifier: string }
    }>
  }
}

export type ProductGalleryQueryQueryVariables = Exact<{
  first: Scalars['Int']
  after: Scalars['String']
  sort: StoreSort
  term: Scalars['String']
  selectedFacets: Array<IStoreSelectedFacet> | IStoreSelectedFacet
}>

export type ProductGalleryQueryQuery = {
  search: {
    products: {
      pageInfo: { totalCount: number }
      edges: Array<{
        node: {
          slug: string
          sku: string
          name: string
          gtin: string
          id: string
          brand: { name: string; brandName: string }
          isVariantOf: { productGroupID: string; name: string }
          image: Array<{ url: string; alternateName: string }>
          offers: {
            lowPrice: number
            offers: Array<{
              price: number
              listPrice: number
              quantity: number
              seller: { identifier: string }
            }>
          }
        }
      }>
    }
    facets: Array<{
      key: string
      label: string
      type: StoreFacetType
      values: Array<{
        label: string
        value: string
        selected: boolean
        quantity: number
      }>
    }>
  }
}

export type BrowserProductPageQueryQueryVariables = Exact<{
  locator: Array<IStoreSelectedFacet> | IStoreSelectedFacet
}>

export type BrowserProductPageQueryQuery = {
  product: {
    slug: string
    sku: string
    gtin: string
    name: string
    description: string
    id: string
    seo: { title: string; description: string }
    brand: { name: string }
    breadcrumbList: {
      itemListElement: Array<{ item: string; name: string; position: number }>
    }
    image: Array<{ url: string; alternateName: string }>
    offers: {
      lowPrice: number
      highPrice: number
      priceCurrency: string
      offers: Array<{
        price: number
        priceValidUntil: string
        priceCurrency: string
        availability: string
        itemCondition: string
        listPrice: number
        seller: { identifier: string }
      }>
    }
    isVariantOf: { productGroupID: string; name: string }
  }
}

export type ServerProductPageQueryQueryVariables = Exact<{
  [key: string]: never
}>

export type ServerProductPageQueryQuery = {
  site: {
    siteMetadata: {
      title: string | null
      description: string | null
      titleTemplate: string | null
      siteUrl: string | null
    } | null
  } | null
}

export type HomePageQueryQueryVariables = Exact<{ [key: string]: never }>

export type HomePageQueryQuery = {
  site: {
    siteMetadata: {
      title: string | null
      description: string | null
      titleTemplate: string | null
    } | null
  } | null
}

export type SearchPageQueryQueryVariables = Exact<{ [key: string]: never }>

export type SearchPageQueryQuery = {
  site: {
    siteMetadata: {
      titleTemplate: string | null
      title: string | null
      description: string | null
    } | null
  } | null
}

export type CollectionPageQueryQueryVariables = Exact<{
  id: Scalars['String']
}>

export type CollectionPageQueryQuery = {
  site: {
    siteMetadata: {
      titleTemplate: string | null
      title: string | null
      description: string | null
    } | null
  } | null
  storeCollection: {
    meta: { selectedFacets: Array<{ key: string; value: string }> }
    seo: { title: string; description: string }
    breadcrumbList: {
      itemListElement: Array<{ item: string; name: string; position: number }>
    }
  } | null
}

export type ProductPageQueryQueryVariables = Exact<{
  id: Scalars['String']
}>

export type ProductPageQueryQuery = {
  site: {
    siteMetadata: {
      title: string | null
      description: string | null
      titleTemplate: string | null
      siteUrl: string | null
    } | null
  } | null
  product: {
    slug: string
    sku: string
    gtin: string
    name: string
    description: string
    id: string
    seo: { title: string; description: string }
    brand: { name: string }
    breadcrumbList: {
      itemListElement: Array<{ item: string; name: string; position: number }>
    }
    image: Array<{ url: string; alternateName: string }>
    offers: {
      lowPrice: number
      highPrice: number
      priceCurrency: string
      offers: Array<{
        price: number
        priceValidUntil: string
        priceCurrency: string
        availability: string
        itemCondition: string
        listPrice: number
        seller: { identifier: string }
      }>
    }
    isVariantOf: { productGroupID: string; name: string }
  } | null
}

export type ValidateCartMutationMutationVariables = Exact<{
  cart: IStoreCart
}>

export type ValidateCartMutationMutation = {
  validateCart: {
    order: {
      orderNumber: string
      acceptedOffer: Array<{
        quantity: number
        price: number
        listPrice: number
        seller: { identifier: string }
        itemOffered: {
          sku: string
          name: string
          image: Array<{ url: string; alternateName: string }>
        }
      }>
    }
    messages: Array<{ text: string; status: StoreStatus }>
  } | null
}

export type ProductsQueryQueryVariables = Exact<{
  first: Scalars['Int']
  after: Scalars['String']
  sort: StoreSort
  term: Scalars['String']
  selectedFacets: Array<IStoreSelectedFacet> | IStoreSelectedFacet
}>

export type ProductsQueryQuery = {
  search: {
    products: {
      pageInfo: { totalCount: number }
      edges: Array<{
        node: {
          slug: string
          sku: string
          name: string
          gtin: string
          id: string
          brand: { name: string; brandName: string }
          isVariantOf: { productGroupID: string; name: string }
          image: Array<{ url: string; alternateName: string }>
          offers: {
            lowPrice: number
            offers: Array<{
              price: number
              listPrice: number
              quantity: number
              seller: { identifier: string }
            }>
          }
        }
      }>
    }
  }
}

export type CollectionSeoFragment_StoreCollectionFragment = {
  seo: { title: string; description: string }
  breadcrumbList: {
    itemListElement: Array<{ item: string; name: string; position: number }>
  }
}

export type CollectionSeoFragment_SiteFragment = {
  siteMetadata: {
    titleTemplate: string | null
    title: string | null
    description: string | null
  } | null
}

export type ProductSeoFragment_SiteFragment = {
  siteMetadata: {
    title: string | null
    description: string | null
    titleTemplate: string | null
    siteUrl: string | null
  } | null
}

export type ProductSeoFragment_ProductFragment = {
  slug: string
  sku: string
  gtin: string
  name: string
  description: string
  seo: { title: string; description: string }
  brand: { name: string }
  breadcrumbList: {
    itemListElement: Array<{ item: string; name: string; position: number }>
  }
  image: Array<{ url: string; alternateName: string }>
  offers: {
    lowPrice: number
    highPrice: number
    priceCurrency: string
    offers: Array<{
      price: number
      priceValidUntil: string
      priceCurrency: string
      availability: string
      itemCondition: string
      seller: { identifier: string }
    }>
  }
}

export type BrowserProductQueryQueryVariables = Exact<{
  locator: Array<IStoreSelectedFacet> | IStoreSelectedFacet
}>

export type BrowserProductQueryQuery = {
  product: {
    slug: string
    sku: string
    gtin: string
    name: string
    description: string
    id: string
    seo: { title: string; description: string }
    brand: { name: string }
    breadcrumbList: {
      itemListElement: Array<{ item: string; name: string; position: number }>
    }
    image: Array<{ url: string; alternateName: string }>
    offers: {
      lowPrice: number
      highPrice: number
      priceCurrency: string
      offers: Array<{
        price: number
        priceValidUntil: string
        priceCurrency: string
        availability: string
        itemCondition: string
        listPrice: number
        seller: { identifier: string }
      }>
    }
    isVariantOf: { productGroupID: string; name: string }
  }
}

export type ProductViewFragment_ProductFragment = {
  slug: string
  sku: string
  gtin: string
  name: string
  description: string
  id: string
  seo: { title: string; description: string }
  brand: { name: string }
  breadcrumbList: {
    itemListElement: Array<{ item: string; name: string; position: number }>
  }
  image: Array<{ url: string; alternateName: string }>
  offers: {
    lowPrice: number
    highPrice: number
    priceCurrency: string
    offers: Array<{
      price: number
      priceValidUntil: string
      priceCurrency: string
      availability: string
      itemCondition: string
      listPrice: number
      seller: { identifier: string }
    }>
  }
  isVariantOf: { productGroupID: string; name: string }
}

export type SearchSeoFragment_SiteFragment = {
  siteMetadata: {
    titleTemplate: string | null
    title: string | null
    description: string | null
  } | null
}
