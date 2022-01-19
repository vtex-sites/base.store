export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
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
  eq: InputMaybe<Scalars['Boolean']>
  in: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  ne: InputMaybe<Scalars['Boolean']>
  nin: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
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
  eq: InputMaybe<Scalars['Date']>
  gt: InputMaybe<Scalars['Date']>
  gte: InputMaybe<Scalars['Date']>
  in: InputMaybe<Array<InputMaybe<Scalars['Date']>>>
  lt: InputMaybe<Scalars['Date']>
  lte: InputMaybe<Scalars['Date']>
  ne: InputMaybe<Scalars['Date']>
  nin: InputMaybe<Array<InputMaybe<Scalars['Date']>>>
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
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type DirectoryAtimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type DirectoryBirthTimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type DirectoryChangeTimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type DirectoryCtimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type DirectoryModifiedTimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type DirectoryMtimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  absolutePath: InputMaybe<StringQueryOperatorInput>
  accessTime: InputMaybe<DateQueryOperatorInput>
  atime: InputMaybe<DateQueryOperatorInput>
  atimeMs: InputMaybe<FloatQueryOperatorInput>
  base: InputMaybe<StringQueryOperatorInput>
  birthTime: InputMaybe<DateQueryOperatorInput>
  birthtime: InputMaybe<DateQueryOperatorInput>
  birthtimeMs: InputMaybe<FloatQueryOperatorInput>
  changeTime: InputMaybe<DateQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  ctime: InputMaybe<DateQueryOperatorInput>
  ctimeMs: InputMaybe<FloatQueryOperatorInput>
  dev: InputMaybe<IntQueryOperatorInput>
  dir: InputMaybe<StringQueryOperatorInput>
  ext: InputMaybe<StringQueryOperatorInput>
  extension: InputMaybe<StringQueryOperatorInput>
  gid: InputMaybe<IntQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  ino: InputMaybe<FloatQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  mode: InputMaybe<IntQueryOperatorInput>
  modifiedTime: InputMaybe<DateQueryOperatorInput>
  mtime: InputMaybe<DateQueryOperatorInput>
  mtimeMs: InputMaybe<FloatQueryOperatorInput>
  name: InputMaybe<StringQueryOperatorInput>
  nlink: InputMaybe<IntQueryOperatorInput>
  parent: InputMaybe<NodeFilterInput>
  prettySize: InputMaybe<StringQueryOperatorInput>
  rdev: InputMaybe<IntQueryOperatorInput>
  relativeDirectory: InputMaybe<StringQueryOperatorInput>
  relativePath: InputMaybe<StringQueryOperatorInput>
  root: InputMaybe<StringQueryOperatorInput>
  size: InputMaybe<IntQueryOperatorInput>
  sourceInstanceName: InputMaybe<StringQueryOperatorInput>
  uid: InputMaybe<IntQueryOperatorInput>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  fields: InputMaybe<Array<InputMaybe<DirectoryFieldsEnum>>>
  order: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
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
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type FileAtimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type FileBirthTimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type FileChangeTimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type FileCtimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type FileModifiedTimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type FileMtimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  absolutePath: InputMaybe<StringQueryOperatorInput>
  accessTime: InputMaybe<DateQueryOperatorInput>
  atime: InputMaybe<DateQueryOperatorInput>
  atimeMs: InputMaybe<FloatQueryOperatorInput>
  base: InputMaybe<StringQueryOperatorInput>
  birthTime: InputMaybe<DateQueryOperatorInput>
  birthtime: InputMaybe<DateQueryOperatorInput>
  birthtimeMs: InputMaybe<FloatQueryOperatorInput>
  changeTime: InputMaybe<DateQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  ctime: InputMaybe<DateQueryOperatorInput>
  ctimeMs: InputMaybe<FloatQueryOperatorInput>
  dev: InputMaybe<IntQueryOperatorInput>
  dir: InputMaybe<StringQueryOperatorInput>
  ext: InputMaybe<StringQueryOperatorInput>
  extension: InputMaybe<StringQueryOperatorInput>
  gid: InputMaybe<IntQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  ino: InputMaybe<FloatQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  mode: InputMaybe<IntQueryOperatorInput>
  modifiedTime: InputMaybe<DateQueryOperatorInput>
  mtime: InputMaybe<DateQueryOperatorInput>
  mtimeMs: InputMaybe<FloatQueryOperatorInput>
  name: InputMaybe<StringQueryOperatorInput>
  nlink: InputMaybe<IntQueryOperatorInput>
  parent: InputMaybe<NodeFilterInput>
  prettySize: InputMaybe<StringQueryOperatorInput>
  rdev: InputMaybe<IntQueryOperatorInput>
  relativeDirectory: InputMaybe<StringQueryOperatorInput>
  relativePath: InputMaybe<StringQueryOperatorInput>
  root: InputMaybe<StringQueryOperatorInput>
  size: InputMaybe<IntQueryOperatorInput>
  sourceInstanceName: InputMaybe<StringQueryOperatorInput>
  uid: InputMaybe<IntQueryOperatorInput>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  fields: InputMaybe<Array<InputMaybe<FileFieldsEnum>>>
  order: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type FloatQueryOperatorInput = {
  eq: InputMaybe<Scalars['Float']>
  gt: InputMaybe<Scalars['Float']>
  gte: InputMaybe<Scalars['Float']>
  in: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  lt: InputMaybe<Scalars['Float']>
  lte: InputMaybe<Scalars['Float']>
  ne: InputMaybe<Scalars['Float']>
  nin: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
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
  eq: InputMaybe<Scalars['Int']>
  gt: InputMaybe<Scalars['Int']>
  gte: InputMaybe<Scalars['Int']>
  in: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  lt: InputMaybe<Scalars['Int']>
  lte: InputMaybe<Scalars['Int']>
  ne: InputMaybe<Scalars['Int']>
  nin: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
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
  content: InputMaybe<StringQueryOperatorInput>
  contentDigest: InputMaybe<StringQueryOperatorInput>
  description: InputMaybe<StringQueryOperatorInput>
  fieldOwners: InputMaybe<StringQueryOperatorInput>
  ignoreType: InputMaybe<BooleanQueryOperatorInput>
  mediaType: InputMaybe<StringQueryOperatorInput>
  owner: InputMaybe<StringQueryOperatorInput>
  type: InputMaybe<StringQueryOperatorInput>
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
  children: InputMaybe<NodeFilterListInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  parent: InputMaybe<NodeFilterInput>
}

export type NodeFilterListInput = {
  elemMatch: InputMaybe<NodeFilterInput>
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
  collection: StoreCollection
  directory: Maybe<Directory>
  file: Maybe<File>
  product: StoreProduct
  search: StoreSearchResult
  shipping: Scalars['String']
  site: Maybe<Site>
  siteBuildMetadata: Maybe<SiteBuildMetadata>
  siteFunction: Maybe<SiteFunction>
  sitePage: Maybe<SitePage>
  sitePlugin: Maybe<SitePlugin>
  storeCollection: Maybe<StoreCollection>
  storeProduct: Maybe<StoreProduct>
}

export type QueryAllCollectionsArgs = {
  after: InputMaybe<Scalars['String']>
  first: Scalars['Int']
}

export type QueryAllDirectoryArgs = {
  filter: InputMaybe<DirectoryFilterInput>
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
  sort: InputMaybe<DirectorySortInput>
}

export type QueryAllFileArgs = {
  filter: InputMaybe<FileFilterInput>
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
  sort: InputMaybe<FileSortInput>
}

export type QueryAllProductsArgs = {
  after: InputMaybe<Scalars['String']>
  first: Scalars['Int']
}

export type QueryAllSiteArgs = {
  filter: InputMaybe<SiteFilterInput>
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
  sort: InputMaybe<SiteSortInput>
}

export type QueryAllSiteBuildMetadataArgs = {
  filter: InputMaybe<SiteBuildMetadataFilterInput>
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
  sort: InputMaybe<SiteBuildMetadataSortInput>
}

export type QueryAllSiteFunctionArgs = {
  filter: InputMaybe<SiteFunctionFilterInput>
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
  sort: InputMaybe<SiteFunctionSortInput>
}

export type QueryAllSitePageArgs = {
  filter: InputMaybe<SitePageFilterInput>
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
  sort: InputMaybe<SitePageSortInput>
}

export type QueryAllSitePluginArgs = {
  filter: InputMaybe<SitePluginFilterInput>
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
  sort: InputMaybe<SitePluginSortInput>
}

export type QueryAllStoreCollectionArgs = {
  filter: InputMaybe<StoreCollectionFilterInput>
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
  sort: InputMaybe<StoreCollectionSortInput>
}

export type QueryAllStoreProductArgs = {
  filter: InputMaybe<StoreProductFilterInput>
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
  sort: InputMaybe<StoreProductSortInput>
}

export type QueryCollectionArgs = {
  slug: Scalars['String']
}

export type QueryDirectoryArgs = {
  absolutePath: InputMaybe<StringQueryOperatorInput>
  accessTime: InputMaybe<DateQueryOperatorInput>
  atime: InputMaybe<DateQueryOperatorInput>
  atimeMs: InputMaybe<FloatQueryOperatorInput>
  base: InputMaybe<StringQueryOperatorInput>
  birthTime: InputMaybe<DateQueryOperatorInput>
  birthtime: InputMaybe<DateQueryOperatorInput>
  birthtimeMs: InputMaybe<FloatQueryOperatorInput>
  changeTime: InputMaybe<DateQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  ctime: InputMaybe<DateQueryOperatorInput>
  ctimeMs: InputMaybe<FloatQueryOperatorInput>
  dev: InputMaybe<IntQueryOperatorInput>
  dir: InputMaybe<StringQueryOperatorInput>
  ext: InputMaybe<StringQueryOperatorInput>
  extension: InputMaybe<StringQueryOperatorInput>
  gid: InputMaybe<IntQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  ino: InputMaybe<FloatQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  mode: InputMaybe<IntQueryOperatorInput>
  modifiedTime: InputMaybe<DateQueryOperatorInput>
  mtime: InputMaybe<DateQueryOperatorInput>
  mtimeMs: InputMaybe<FloatQueryOperatorInput>
  name: InputMaybe<StringQueryOperatorInput>
  nlink: InputMaybe<IntQueryOperatorInput>
  parent: InputMaybe<NodeFilterInput>
  prettySize: InputMaybe<StringQueryOperatorInput>
  rdev: InputMaybe<IntQueryOperatorInput>
  relativeDirectory: InputMaybe<StringQueryOperatorInput>
  relativePath: InputMaybe<StringQueryOperatorInput>
  root: InputMaybe<StringQueryOperatorInput>
  size: InputMaybe<IntQueryOperatorInput>
  sourceInstanceName: InputMaybe<StringQueryOperatorInput>
  uid: InputMaybe<IntQueryOperatorInput>
}

export type QueryFileArgs = {
  absolutePath: InputMaybe<StringQueryOperatorInput>
  accessTime: InputMaybe<DateQueryOperatorInput>
  atime: InputMaybe<DateQueryOperatorInput>
  atimeMs: InputMaybe<FloatQueryOperatorInput>
  base: InputMaybe<StringQueryOperatorInput>
  birthTime: InputMaybe<DateQueryOperatorInput>
  birthtime: InputMaybe<DateQueryOperatorInput>
  birthtimeMs: InputMaybe<FloatQueryOperatorInput>
  changeTime: InputMaybe<DateQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  ctime: InputMaybe<DateQueryOperatorInput>
  ctimeMs: InputMaybe<FloatQueryOperatorInput>
  dev: InputMaybe<IntQueryOperatorInput>
  dir: InputMaybe<StringQueryOperatorInput>
  ext: InputMaybe<StringQueryOperatorInput>
  extension: InputMaybe<StringQueryOperatorInput>
  gid: InputMaybe<IntQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  ino: InputMaybe<FloatQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  mode: InputMaybe<IntQueryOperatorInput>
  modifiedTime: InputMaybe<DateQueryOperatorInput>
  mtime: InputMaybe<DateQueryOperatorInput>
  mtimeMs: InputMaybe<FloatQueryOperatorInput>
  name: InputMaybe<StringQueryOperatorInput>
  nlink: InputMaybe<IntQueryOperatorInput>
  parent: InputMaybe<NodeFilterInput>
  prettySize: InputMaybe<StringQueryOperatorInput>
  rdev: InputMaybe<IntQueryOperatorInput>
  relativeDirectory: InputMaybe<StringQueryOperatorInput>
  relativePath: InputMaybe<StringQueryOperatorInput>
  root: InputMaybe<StringQueryOperatorInput>
  size: InputMaybe<IntQueryOperatorInput>
  sourceInstanceName: InputMaybe<StringQueryOperatorInput>
  uid: InputMaybe<IntQueryOperatorInput>
}

export type QueryProductArgs = {
  locator: Array<IStoreSelectedFacet>
}

export type QuerySearchArgs = {
  after: InputMaybe<Scalars['String']>
  first: Scalars['Int']
  selectedFacets: InputMaybe<Array<IStoreSelectedFacet>>
  sort?: InputMaybe<StoreSort>
  term?: InputMaybe<Scalars['String']>
}

export type QueryShippingArgs = {
  name: Scalars['String']
}

export type QuerySiteArgs = {
  buildTime: InputMaybe<DateQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  flags: InputMaybe<SiteFlagsFilterInput>
  host: InputMaybe<StringQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  parent: InputMaybe<NodeFilterInput>
  pathPrefix: InputMaybe<StringQueryOperatorInput>
  polyfill: InputMaybe<BooleanQueryOperatorInput>
  port: InputMaybe<IntQueryOperatorInput>
  siteMetadata: InputMaybe<SiteSiteMetadataFilterInput>
}

export type QuerySiteBuildMetadataArgs = {
  buildTime: InputMaybe<DateQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  parent: InputMaybe<NodeFilterInput>
}

export type QuerySiteFunctionArgs = {
  absoluteCompiledFilePath: InputMaybe<StringQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  functionRoute: InputMaybe<StringQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  matchPath: InputMaybe<StringQueryOperatorInput>
  originalAbsoluteFilePath: InputMaybe<StringQueryOperatorInput>
  originalRelativeFilePath: InputMaybe<StringQueryOperatorInput>
  parent: InputMaybe<NodeFilterInput>
  pluginName: InputMaybe<StringQueryOperatorInput>
  relativeCompiledFilePath: InputMaybe<StringQueryOperatorInput>
}

export type QuerySitePageArgs = {
  children: InputMaybe<NodeFilterListInput>
  component: InputMaybe<StringQueryOperatorInput>
  componentChunkName: InputMaybe<StringQueryOperatorInput>
  context: InputMaybe<SitePageContextFilterInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  internalComponentName: InputMaybe<StringQueryOperatorInput>
  isCreatedByStatefulCreatePages: InputMaybe<BooleanQueryOperatorInput>
  matchPath: InputMaybe<StringQueryOperatorInput>
  parent: InputMaybe<NodeFilterInput>
  path: InputMaybe<StringQueryOperatorInput>
  pluginCreator: InputMaybe<SitePluginFilterInput>
  pluginCreatorId: InputMaybe<StringQueryOperatorInput>
}

export type QuerySitePluginArgs = {
  browserAPIs: InputMaybe<StringQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  name: InputMaybe<StringQueryOperatorInput>
  nodeAPIs: InputMaybe<StringQueryOperatorInput>
  packageJson: InputMaybe<SitePluginPackageJsonFilterInput>
  parent: InputMaybe<NodeFilterInput>
  pluginFilepath: InputMaybe<StringQueryOperatorInput>
  pluginOptions: InputMaybe<SitePluginPluginOptionsFilterInput>
  resolve: InputMaybe<StringQueryOperatorInput>
  ssrAPIs: InputMaybe<StringQueryOperatorInput>
  version: InputMaybe<StringQueryOperatorInput>
}

export type QueryStoreCollectionArgs = {
  breadcrumbList: InputMaybe<StoreBreadcrumbListFilterInput>
  children: InputMaybe<NodeFilterListInput>
  gatsbyPath: InputMaybe<StringQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  meta: InputMaybe<StoreCollectionMetaFilterInput>
  parent: InputMaybe<NodeFilterInput>
  remoteId: InputMaybe<DateQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
  seo: InputMaybe<StoreSeoFilterInput>
  slug: InputMaybe<StringQueryOperatorInput>
  type: InputMaybe<StoreCollectionTypeQueryOperatorInput>
}

export type QueryStoreProductArgs = {
  aggregateRating: InputMaybe<StoreAggregateRatingFilterInput>
  brand: InputMaybe<StoreBrandFilterInput>
  breadcrumbList: InputMaybe<StoreBreadcrumbListFilterInput>
  children: InputMaybe<NodeFilterListInput>
  description: InputMaybe<StringQueryOperatorInput>
  gtin: InputMaybe<StringQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  image: InputMaybe<StoreImageFilterListInput>
  internal: InputMaybe<InternalFilterInput>
  isVariantOf: InputMaybe<StoreProductGroupFilterInput>
  name: InputMaybe<StringQueryOperatorInput>
  offers: InputMaybe<StoreAggregateOfferFilterInput>
  parent: InputMaybe<NodeFilterInput>
  productID: InputMaybe<StringQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
  review: InputMaybe<StoreReviewFilterListInput>
  seo: InputMaybe<StoreSeoFilterInput>
  sku: InputMaybe<StringQueryOperatorInput>
  slug: InputMaybe<StringQueryOperatorInput>
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
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
}

export type SiteBuildMetadata = Node & {
  buildTime: Maybe<Scalars['Date']>
  children: Array<Node>
  id: Scalars['ID']
  internal: Internal
  parent: Maybe<Node>
}

export type SiteBuildMetadataBuildTimeArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  buildTime: InputMaybe<DateQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  parent: InputMaybe<NodeFilterInput>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  fields: InputMaybe<Array<InputMaybe<SiteBuildMetadataFieldsEnum>>>
  order: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  buildTime: InputMaybe<DateQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  flags: InputMaybe<SiteFlagsFilterInput>
  host: InputMaybe<StringQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  parent: InputMaybe<NodeFilterInput>
  pathPrefix: InputMaybe<StringQueryOperatorInput>
  polyfill: InputMaybe<BooleanQueryOperatorInput>
  port: InputMaybe<IntQueryOperatorInput>
  siteMetadata: InputMaybe<SiteSiteMetadataFilterInput>
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
  DEV_SSR: InputMaybe<BooleanQueryOperatorInput>
  FAST_DEV: InputMaybe<BooleanQueryOperatorInput>
  LMDB_STORE: InputMaybe<BooleanQueryOperatorInput>
  PARALLEL_QUERY_RUNNING: InputMaybe<BooleanQueryOperatorInput>
  PARALLEL_SOURCING: InputMaybe<BooleanQueryOperatorInput>
  PRESERVE_FILE_DOWNLOAD_CACHE: InputMaybe<BooleanQueryOperatorInput>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  absoluteCompiledFilePath: InputMaybe<StringQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  functionRoute: InputMaybe<StringQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  matchPath: InputMaybe<StringQueryOperatorInput>
  originalAbsoluteFilePath: InputMaybe<StringQueryOperatorInput>
  originalRelativeFilePath: InputMaybe<StringQueryOperatorInput>
  parent: InputMaybe<NodeFilterInput>
  pluginName: InputMaybe<StringQueryOperatorInput>
  relativeCompiledFilePath: InputMaybe<StringQueryOperatorInput>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  fields: InputMaybe<Array<InputMaybe<SiteFunctionFieldsEnum>>>
  order: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  _xparams: InputMaybe<SitePageContext_XparamsFilterInput>
  id: InputMaybe<StringQueryOperatorInput>
  slug: InputMaybe<StringQueryOperatorInput>
}

export type SitePageContext_Xparams = {
  slug: Maybe<Scalars['String']>
}

export type SitePageContext_XparamsFilterInput = {
  slug: InputMaybe<StringQueryOperatorInput>
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
  children: InputMaybe<NodeFilterListInput>
  component: InputMaybe<StringQueryOperatorInput>
  componentChunkName: InputMaybe<StringQueryOperatorInput>
  context: InputMaybe<SitePageContextFilterInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  internalComponentName: InputMaybe<StringQueryOperatorInput>
  isCreatedByStatefulCreatePages: InputMaybe<BooleanQueryOperatorInput>
  matchPath: InputMaybe<StringQueryOperatorInput>
  parent: InputMaybe<NodeFilterInput>
  path: InputMaybe<StringQueryOperatorInput>
  pluginCreator: InputMaybe<SitePluginFilterInput>
  pluginCreatorId: InputMaybe<StringQueryOperatorInput>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  fields: InputMaybe<Array<InputMaybe<SitePageFieldsEnum>>>
  order: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  | 'pluginOptions___locations___append___children'
  | 'pluginOptions___locations___append___cmd'
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
  browserAPIs: InputMaybe<StringQueryOperatorInput>
  children: InputMaybe<NodeFilterListInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  name: InputMaybe<StringQueryOperatorInput>
  nodeAPIs: InputMaybe<StringQueryOperatorInput>
  packageJson: InputMaybe<SitePluginPackageJsonFilterInput>
  parent: InputMaybe<NodeFilterInput>
  pluginFilepath: InputMaybe<StringQueryOperatorInput>
  pluginOptions: InputMaybe<SitePluginPluginOptionsFilterInput>
  resolve: InputMaybe<StringQueryOperatorInput>
  ssrAPIs: InputMaybe<StringQueryOperatorInput>
  version: InputMaybe<StringQueryOperatorInput>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  name: InputMaybe<StringQueryOperatorInput>
  version: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch: InputMaybe<SitePluginPackageJsonDependenciesFilterInput>
}

export type SitePluginPackageJsonDevDependencies = {
  name: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  name: InputMaybe<StringQueryOperatorInput>
  version: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch: InputMaybe<SitePluginPackageJsonDevDependenciesFilterInput>
}

export type SitePluginPackageJsonFilterInput = {
  dependencies: InputMaybe<SitePluginPackageJsonDependenciesFilterListInput>
  description: InputMaybe<StringQueryOperatorInput>
  devDependencies: InputMaybe<SitePluginPackageJsonDevDependenciesFilterListInput>
  keywords: InputMaybe<StringQueryOperatorInput>
  license: InputMaybe<StringQueryOperatorInput>
  main: InputMaybe<StringQueryOperatorInput>
  name: InputMaybe<StringQueryOperatorInput>
  peerDependencies: InputMaybe<SitePluginPackageJsonPeerDependenciesFilterListInput>
  version: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonPeerDependencies = {
  name: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name: InputMaybe<StringQueryOperatorInput>
  version: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch: InputMaybe<SitePluginPackageJsonPeerDependenciesFilterInput>
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
  locations: Maybe<SitePluginPluginOptionsLocations>
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
  policy: InputMaybe<SitePluginPluginOptionsEnvBranch_DeployPolicyFilterListInput>
}

export type SitePluginPluginOptionsEnvBranch_DeployPolicy = {
  disallow: Maybe<Array<Maybe<Scalars['String']>>>
  userAgent: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsEnvBranch_DeployPolicyFilterInput = {
  disallow: InputMaybe<StringQueryOperatorInput>
  userAgent: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsEnvBranch_DeployPolicyFilterListInput = {
  elemMatch: InputMaybe<SitePluginPluginOptionsEnvBranch_DeployPolicyFilterInput>
}

export type SitePluginPluginOptionsEnvDeploy_Preview = {
  policy: Maybe<Array<Maybe<SitePluginPluginOptionsEnvDeploy_PreviewPolicy>>>
}

export type SitePluginPluginOptionsEnvDeploy_PreviewFilterInput = {
  policy: InputMaybe<SitePluginPluginOptionsEnvDeploy_PreviewPolicyFilterListInput>
}

export type SitePluginPluginOptionsEnvDeploy_PreviewPolicy = {
  disallow: Maybe<Array<Maybe<Scalars['String']>>>
  userAgent: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsEnvDeploy_PreviewPolicyFilterInput = {
  disallow: InputMaybe<StringQueryOperatorInput>
  userAgent: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsEnvDeploy_PreviewPolicyFilterListInput = {
  elemMatch: InputMaybe<SitePluginPluginOptionsEnvDeploy_PreviewPolicyFilterInput>
}

export type SitePluginPluginOptionsEnvFilterInput = {
  branch_deploy: InputMaybe<SitePluginPluginOptionsEnvBranch_DeployFilterInput>
  deploy_preview: InputMaybe<SitePluginPluginOptionsEnvDeploy_PreviewFilterInput>
  production: InputMaybe<SitePluginPluginOptionsEnvProductionFilterInput>
}

export type SitePluginPluginOptionsEnvProduction = {
  policy: Maybe<Array<Maybe<SitePluginPluginOptionsEnvProductionPolicy>>>
}

export type SitePluginPluginOptionsEnvProductionFilterInput = {
  policy: InputMaybe<SitePluginPluginOptionsEnvProductionPolicyFilterListInput>
}

export type SitePluginPluginOptionsEnvProductionPolicy = {
  allow: Maybe<Scalars['String']>
  disallow: Maybe<Array<Maybe<Scalars['String']>>>
  userAgent: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsEnvProductionPolicyFilterInput = {
  allow: InputMaybe<StringQueryOperatorInput>
  disallow: InputMaybe<StringQueryOperatorInput>
  userAgent: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsEnvProductionPolicyFilterListInput = {
  elemMatch: InputMaybe<SitePluginPluginOptionsEnvProductionPolicyFilterInput>
}

export type SitePluginPluginOptionsFilterInput = {
  _generated: InputMaybe<StringQueryOperatorInput>
  allExtensions: InputMaybe<BooleanQueryOperatorInput>
  appendScript: InputMaybe<StringQueryOperatorInput>
  background_color: InputMaybe<StringQueryOperatorInput>
  baseline: InputMaybe<BooleanQueryOperatorInput>
  cache_busting_mode: InputMaybe<StringQueryOperatorInput>
  color: InputMaybe<StringQueryOperatorInput>
  compare: InputMaybe<BooleanQueryOperatorInput>
  crossOrigin: InputMaybe<StringQueryOperatorInput>
  defer: InputMaybe<BooleanQueryOperatorInput>
  display: InputMaybe<StringQueryOperatorInput>
  env: InputMaybe<SitePluginPluginOptionsEnvFilterInput>
  html: InputMaybe<BooleanQueryOperatorInput>
  httpOptions: InputMaybe<StringQueryOperatorInput>
  icon: InputMaybe<StringQueryOperatorInput>
  include_favicon: InputMaybe<BooleanQueryOperatorInput>
  isTSX: InputMaybe<BooleanQueryOperatorInput>
  json: InputMaybe<BooleanQueryOperatorInput>
  jsxPragma: InputMaybe<StringQueryOperatorInput>
  legacy: InputMaybe<BooleanQueryOperatorInput>
  locations: InputMaybe<SitePluginPluginOptionsLocationsFilterInput>
  maxNumCollections: InputMaybe<IntQueryOperatorInput>
  maxNumProducts: InputMaybe<IntQueryOperatorInput>
  name: InputMaybe<StringQueryOperatorInput>
  outDir: InputMaybe<StringQueryOperatorInput>
  path: InputMaybe<StringQueryOperatorInput>
  pathCheck: InputMaybe<BooleanQueryOperatorInput>
  precachePages: InputMaybe<StringQueryOperatorInput>
  server: InputMaybe<StringQueryOperatorInput>
  serverOptions: InputMaybe<StringQueryOperatorInput>
  short_name: InputMaybe<StringQueryOperatorInput>
  showSpinner: InputMaybe<BooleanQueryOperatorInput>
  sourceCollections: InputMaybe<BooleanQueryOperatorInput>
  sourceProducts: InputMaybe<BooleanQueryOperatorInput>
  src: InputMaybe<StringQueryOperatorInput>
  start_url: InputMaybe<StringQueryOperatorInput>
  stats: InputMaybe<SitePluginPluginOptionsStatsFilterInput>
  theme_color: InputMaybe<StringQueryOperatorInput>
  theme_color_in_head: InputMaybe<BooleanQueryOperatorInput>
  workboxConfig: InputMaybe<SitePluginPluginOptionsWorkboxConfigFilterInput>
}

export type SitePluginPluginOptionsLocations = {
  append: Maybe<SitePluginPluginOptionsLocationsAppend>
}

export type SitePluginPluginOptionsLocationsAppend = {
  children: Maybe<Array<Maybe<SitePluginPluginOptionsLocationsAppendChildren>>>
  cmd: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SitePluginPluginOptionsLocationsAppendChildren = {
  cmd: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SitePluginPluginOptionsLocationsAppendChildrenFilterInput = {
  cmd: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsLocationsAppendChildrenFilterListInput = {
  elemMatch: InputMaybe<SitePluginPluginOptionsLocationsAppendChildrenFilterInput>
}

export type SitePluginPluginOptionsLocationsAppendFilterInput = {
  children: InputMaybe<SitePluginPluginOptionsLocationsAppendChildrenFilterListInput>
  cmd: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsLocationsFilterInput = {
  append: InputMaybe<SitePluginPluginOptionsLocationsAppendFilterInput>
}

export type SitePluginPluginOptionsStats = {
  context: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsStatsFilterInput = {
  context: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsWorkboxConfig = {
  globPatterns: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SitePluginPluginOptionsWorkboxConfigFilterInput = {
  globPatterns: InputMaybe<StringQueryOperatorInput>
}

export type SitePluginSortInput = {
  fields: InputMaybe<Array<InputMaybe<SitePluginFieldsEnum>>>
  order: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type SiteSiteMetadata = {
  author: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  siteUrl: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  titleTemplate: Maybe<Scalars['String']>
}

export type SiteSiteMetadataFilterInput = {
  author: InputMaybe<StringQueryOperatorInput>
  description: InputMaybe<StringQueryOperatorInput>
  siteUrl: InputMaybe<StringQueryOperatorInput>
  title: InputMaybe<StringQueryOperatorInput>
  titleTemplate: InputMaybe<StringQueryOperatorInput>
}

export type SiteSortInput = {
  fields: InputMaybe<Array<InputMaybe<SiteFieldsEnum>>>
  order: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
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
  highPrice: InputMaybe<FloatQueryOperatorInput>
  lowPrice: InputMaybe<FloatQueryOperatorInput>
  offerCount: InputMaybe<IntQueryOperatorInput>
  offers: InputMaybe<StoreOfferFilterListInput>
  priceCurrency: InputMaybe<StringQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
}

export type StoreAggregateRating = {
  ratingValue: Scalars['Float']
  remoteTypeName: Maybe<Scalars['String']>
  reviewCount: Scalars['Int']
}

export type StoreAggregateRatingFilterInput = {
  ratingValue: InputMaybe<FloatQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
  reviewCount: InputMaybe<IntQueryOperatorInput>
}

export type StoreAuthor = {
  name: Scalars['String']
}

export type StoreAuthorFilterInput = {
  name: InputMaybe<StringQueryOperatorInput>
}

export type StoreBrand = {
  name: Scalars['String']
  remoteTypeName: Maybe<Scalars['String']>
}

export type StoreBrandFilterInput = {
  name: InputMaybe<StringQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
}

export type StoreBreadcrumbList = {
  itemListElement: Array<StoreListItem>
  numberOfItems: Scalars['Int']
  remoteTypeName: Maybe<Scalars['String']>
}

export type StoreBreadcrumbListFilterInput = {
  itemListElement: InputMaybe<StoreListItemFilterListInput>
  numberOfItems: InputMaybe<IntQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
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
  gatsbyPath: Maybe<Scalars['String']>
  id: Scalars['ID']
  internal: Internal
  meta: StoreCollectionMeta
  parent: Maybe<Node>
  remoteId: Maybe<Scalars['Date']>
  remoteTypeName: Maybe<Scalars['String']>
  seo: StoreSeo
  slug: Scalars['String']
  type: StoreCollectionType
}

export type StoreCollectionGatsbyPathArgs = {
  filePath: InputMaybe<Scalars['String']>
}

export type StoreCollectionRemoteIdArgs = {
  difference: InputMaybe<Scalars['String']>
  formatString: InputMaybe<Scalars['String']>
  fromNow: InputMaybe<Scalars['Boolean']>
  locale: InputMaybe<Scalars['String']>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  key: InputMaybe<StringQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
  value: InputMaybe<StringQueryOperatorInput>
}

export type StoreCollectionFacetFilterListInput = {
  elemMatch: InputMaybe<StoreCollectionFacetFilterInput>
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
  | 'gatsbyPath'
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
  breadcrumbList: InputMaybe<StoreBreadcrumbListFilterInput>
  children: InputMaybe<NodeFilterListInput>
  gatsbyPath: InputMaybe<StringQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  internal: InputMaybe<InternalFilterInput>
  meta: InputMaybe<StoreCollectionMetaFilterInput>
  parent: InputMaybe<NodeFilterInput>
  remoteId: InputMaybe<DateQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
  seo: InputMaybe<StoreSeoFilterInput>
  slug: InputMaybe<StringQueryOperatorInput>
  type: InputMaybe<StoreCollectionTypeQueryOperatorInput>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
  selectedFacets: InputMaybe<StoreCollectionFacetFilterListInput>
}

export type StoreCollectionSortInput = {
  fields: InputMaybe<Array<InputMaybe<StoreCollectionFieldsEnum>>>
  order: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type StoreCollectionType =
  | 'Brand'
  | 'Category'
  | 'Cluster'
  | 'Department'

export type StoreCollectionTypeQueryOperatorInput = {
  eq: InputMaybe<StoreCollectionType>
  in: InputMaybe<Array<InputMaybe<StoreCollectionType>>>
  ne: InputMaybe<StoreCollectionType>
  nin: InputMaybe<Array<InputMaybe<StoreCollectionType>>>
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
  alternateName: InputMaybe<StringQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
  url: InputMaybe<StringQueryOperatorInput>
}

export type StoreImageFilterListInput = {
  elemMatch: InputMaybe<StoreImageFilterInput>
}

export type StoreListItem = {
  item: Scalars['String']
  name: Scalars['String']
  position: Scalars['Int']
  remoteTypeName: Maybe<Scalars['String']>
}

export type StoreListItemFilterInput = {
  item: InputMaybe<StringQueryOperatorInput>
  name: InputMaybe<StringQueryOperatorInput>
  position: InputMaybe<IntQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
}

export type StoreListItemFilterListInput = {
  elemMatch: InputMaybe<StoreListItemFilterInput>
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
  availability: InputMaybe<StringQueryOperatorInput>
  itemCondition: InputMaybe<StringQueryOperatorInput>
  itemOffered: InputMaybe<StoreProductFilterInput>
  listPrice: InputMaybe<FloatQueryOperatorInput>
  price: InputMaybe<FloatQueryOperatorInput>
  priceCurrency: InputMaybe<StringQueryOperatorInput>
  priceValidUntil: InputMaybe<StringQueryOperatorInput>
  quantity: InputMaybe<IntQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
  seller: InputMaybe<StoreOrganizationFilterInput>
  sellingPrice: InputMaybe<FloatQueryOperatorInput>
}

export type StoreOfferFilterListInput = {
  elemMatch: InputMaybe<StoreOfferFilterInput>
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
  identifier: InputMaybe<StringQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  aggregateRating: InputMaybe<StoreAggregateRatingFilterInput>
  brand: InputMaybe<StoreBrandFilterInput>
  breadcrumbList: InputMaybe<StoreBreadcrumbListFilterInput>
  children: InputMaybe<NodeFilterListInput>
  description: InputMaybe<StringQueryOperatorInput>
  gtin: InputMaybe<StringQueryOperatorInput>
  id: InputMaybe<StringQueryOperatorInput>
  image: InputMaybe<StoreImageFilterListInput>
  internal: InputMaybe<InternalFilterInput>
  isVariantOf: InputMaybe<StoreProductGroupFilterInput>
  name: InputMaybe<StringQueryOperatorInput>
  offers: InputMaybe<StoreAggregateOfferFilterInput>
  parent: InputMaybe<NodeFilterInput>
  productID: InputMaybe<StringQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
  review: InputMaybe<StoreReviewFilterListInput>
  seo: InputMaybe<StoreSeoFilterInput>
  sku: InputMaybe<StringQueryOperatorInput>
  slug: InputMaybe<StringQueryOperatorInput>
}

export type StoreProductFilterListInput = {
  elemMatch: InputMaybe<StoreProductFilterInput>
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
  limit: InputMaybe<Scalars['Int']>
  skip: InputMaybe<Scalars['Int']>
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
  hasVariant: InputMaybe<StoreProductFilterListInput>
  name: InputMaybe<StringQueryOperatorInput>
  productGroupID: InputMaybe<StringQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
}

export type StoreProductSortInput = {
  fields: InputMaybe<Array<InputMaybe<StoreProductFieldsEnum>>>
  order: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type StoreReview = {
  author: StoreAuthor
  reviewRating: StoreReviewRating
}

export type StoreReviewFilterInput = {
  author: InputMaybe<StoreAuthorFilterInput>
  reviewRating: InputMaybe<StoreReviewRatingFilterInput>
}

export type StoreReviewFilterListInput = {
  elemMatch: InputMaybe<StoreReviewFilterInput>
}

export type StoreReviewRating = {
  bestRating: Scalars['Float']
  ratingValue: Scalars['Float']
}

export type StoreReviewRatingFilterInput = {
  bestRating: InputMaybe<FloatQueryOperatorInput>
  ratingValue: InputMaybe<FloatQueryOperatorInput>
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
  canonical: InputMaybe<StringQueryOperatorInput>
  description: InputMaybe<StringQueryOperatorInput>
  remoteTypeName: InputMaybe<StringQueryOperatorInput>
  title: InputMaybe<StringQueryOperatorInput>
  titleTemplate: InputMaybe<StringQueryOperatorInput>
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
  eq: InputMaybe<Scalars['String']>
  glob: InputMaybe<Scalars['String']>
  in: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  ne: InputMaybe<Scalars['String']>
  nin: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  regex: InputMaybe<Scalars['String']>
}

export type ShippingQueryVariables = Exact<{
  name: Scalars['String']
}>

export type ShippingQuery = { shipping: string }

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

export type HomePageQueryQueryVariables = Exact<{ [key: string]: never }>

export type HomePageQueryQuery = {
  site:
    | {
        siteMetadata:
          | {
              title: string | null | undefined
              description: string | null | undefined
              titleTemplate: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type SearchPageQueryQueryVariables = Exact<{ [key: string]: never }>

export type SearchPageQueryQuery = {
  site:
    | {
        siteMetadata:
          | {
              titleTemplate: string | null | undefined
              title: string | null | undefined
              description: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type CollectionPageQueryQueryVariables = Exact<{
  id: Scalars['String']
}>

export type CollectionPageQueryQuery = {
  site:
    | {
        siteMetadata:
          | {
              titleTemplate: string | null | undefined
              title: string | null | undefined
              description: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
  collection:
    | {
        seo: { title: string; description: string }
        breadcrumbList: {
          itemListElement: Array<{
            item: string
            name: string
            position: number
          }>
        }
        meta: { selectedFacets: Array<{ key: string; value: string }> }
      }
    | null
    | undefined
}

export type ProductPageQueryQueryVariables = Exact<{
  id: Scalars['String']
}>

export type ProductPageQueryQuery = {
  site:
    | {
        siteMetadata:
          | {
              title: string | null | undefined
              description: string | null | undefined
              titleTemplate: string | null | undefined
              siteUrl: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
  product:
    | {
        slug: string
        sku: string
        gtin: string
        name: string
        description: string
        id: string
        seo: { title: string; description: string }
        brand: { name: string }
        breadcrumbList: {
          itemListElement: Array<{
            item: string
            name: string
            position: number
          }>
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
    | null
    | undefined
}

export type ValidateCartMutationMutationVariables = Exact<{
  cart: IStoreCart
}>

export type ValidateCartMutationMutation = {
  validateCart:
    | {
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
      }
    | null
    | undefined
}

export type BrowserProductQueryQueryVariables = Exact<{
  locator: Array<IStoreSelectedFacet> | IStoreSelectedFacet
}>

export type BrowserProductQueryQuery = {
  product: {
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
