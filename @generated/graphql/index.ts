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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type BooleanQueryOperatorInput = {
  eq: Maybe<Scalars['Boolean']>
  in: Maybe<Array<Maybe<Scalars['Boolean']>>>
  ne: Maybe<Scalars['Boolean']>
  nin: Maybe<Array<Maybe<Scalars['Boolean']>>>
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

export type JsonQueryOperatorInput = {
  eq: Maybe<Scalars['JSON']>
  glob: Maybe<Scalars['JSON']>
  in: Maybe<Array<Maybe<Scalars['JSON']>>>
  ne: Maybe<Scalars['JSON']>
  nin: Maybe<Array<Maybe<Scalars['JSON']>>>
  regex: Maybe<Scalars['JSON']>
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
  allCollections: StoreCollectionConnection
  allDirectory: DirectoryConnection
  allFile: FileConnection
  allProducts: StoreProductConnection
  allSite: SiteConnection
  allSiteBuildMetadata: SiteBuildMetadataConnection
  allSiteFunction: SiteFunctionConnection
  allSitePage: SitePageConnection
  allSitePlugin: SitePluginConnection
  collection: StoreCollection
  directory: Maybe<Directory>
  file: Maybe<File>
  product: StoreProduct
  search: StoreSearchResult
  site: Maybe<Site>
  siteBuildMetadata: Maybe<SiteBuildMetadata>
  siteFunction: Maybe<SiteFunction>
  sitePage: Maybe<SitePage>
  sitePlugin: Maybe<SitePlugin>
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

export type QueryCollectionArgs = {
  slug: Scalars['String']
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
  jsxRuntime: Maybe<StringQueryOperatorInput>
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
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  internalComponentName: Maybe<StringQueryOperatorInput>
  matchPath: Maybe<StringQueryOperatorInput>
  pageContext: Maybe<JsonQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  path: Maybe<StringQueryOperatorInput>
  pluginCreator: Maybe<SitePluginFilterInput>
}

export type QuerySitePluginArgs = {
  browserAPIs: Maybe<StringQueryOperatorInput>
  children: Maybe<NodeFilterListInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  name: Maybe<StringQueryOperatorInput>
  nodeAPIs: Maybe<StringQueryOperatorInput>
  packageJson: Maybe<JsonQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  pluginFilepath: Maybe<StringQueryOperatorInput>
  pluginOptions: Maybe<JsonQueryOperatorInput>
  resolve: Maybe<StringQueryOperatorInput>
  ssrAPIs: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
}

export type Site = Node & {
  buildTime: Maybe<Scalars['Date']>
  children: Array<Node>
  flags: Maybe<SiteFlags>
  host: Maybe<Scalars['String']>
  id: Scalars['ID']
  internal: Internal
  jsxRuntime: Maybe<Scalars['String']>
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
  | 'flags___FAST_DEV'
  | 'flags___PARALLEL_SOURCING'
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
  | 'jsxRuntime'
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
  jsxRuntime: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  pathPrefix: Maybe<StringQueryOperatorInput>
  polyfill: Maybe<BooleanQueryOperatorInput>
  port: Maybe<IntQueryOperatorInput>
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>
}

export type SiteFlags = {
  FAST_DEV: Maybe<Scalars['Boolean']>
  PARALLEL_SOURCING: Maybe<Scalars['Boolean']>
}

export type SiteFlagsFilterInput = {
  FAST_DEV: Maybe<BooleanQueryOperatorInput>
  PARALLEL_SOURCING: Maybe<BooleanQueryOperatorInput>
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
  id: Scalars['ID']
  internal: Internal
  internalComponentName: Scalars['String']
  matchPath: Maybe<Scalars['String']>
  pageContext: Maybe<Scalars['JSON']>
  parent: Maybe<Node>
  path: Scalars['String']
  pluginCreator: Maybe<SitePlugin>
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
  | 'matchPath'
  | 'pageContext'
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
  | 'pluginCreator___packageJson'
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
  | 'pluginCreator___pluginOptions'
  | 'pluginCreator___resolve'
  | 'pluginCreator___ssrAPIs'
  | 'pluginCreator___version'

export type SitePageFilterInput = {
  children: Maybe<NodeFilterListInput>
  component: Maybe<StringQueryOperatorInput>
  componentChunkName: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  internal: Maybe<InternalFilterInput>
  internalComponentName: Maybe<StringQueryOperatorInput>
  matchPath: Maybe<StringQueryOperatorInput>
  pageContext: Maybe<JsonQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  path: Maybe<StringQueryOperatorInput>
  pluginCreator: Maybe<SitePluginFilterInput>
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
  packageJson: Maybe<Scalars['JSON']>
  parent: Maybe<Node>
  pluginFilepath: Maybe<Scalars['String']>
  pluginOptions: Maybe<Scalars['JSON']>
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
  | 'packageJson'
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
  | 'pluginOptions'
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
  packageJson: Maybe<JsonQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  pluginFilepath: Maybe<StringQueryOperatorInput>
  pluginOptions: Maybe<JsonQueryOperatorInput>
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
}

export type StoreAggregateRating = {
  ratingValue: Scalars['Float']
  reviewCount: Scalars['Int']
}

export type StoreAuthor = {
  name: Scalars['String']
}

export type StoreBrand = {
  name: Scalars['String']
}

export type StoreBreadcrumbList = {
  itemListElement: Array<StoreListItem>
  numberOfItems: Scalars['Int']
}

export type StoreCart = {
  messages: Array<StoreCartMessage>
  order: StoreOrder
}

export type StoreCartMessage = {
  status: StoreStatus
  text: Scalars['String']
}

export type StoreCollection = {
  breadcrumbList: StoreBreadcrumbList
  id: Scalars['ID']
  meta: StoreCollectionMeta
  seo: StoreSeo
  slug: Scalars['String']
  type: StoreCollectionType
}

export type StoreCollectionConnection = {
  edges: Array<StoreCollectionEdge>
  pageInfo: StorePageInfo
}

export type StoreCollectionEdge = {
  cursor: Scalars['String']
  node: StoreCollection
}

export type StoreCollectionFacet = {
  key: Scalars['String']
  value: Scalars['String']
}

export type StoreCollectionMeta = {
  selectedFacets: Array<StoreCollectionFacet>
}

export type StoreCollectionType =
  | 'Brand'
  | 'Category'
  | 'Cluster'
  | 'Department'

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
  url: Scalars['String']
}

export type StoreListItem = {
  item: Scalars['String']
  name: Scalars['String']
  position: Scalars['Int']
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
  seller: StoreOrganization
  sellingPrice: Scalars['Float']
}

export type StoreOrder = {
  acceptedOffer: Array<StoreOffer>
  orderNumber: Scalars['String']
}

export type StoreOrganization = {
  identifier: Scalars['String']
}

export type StorePageInfo = {
  endCursor: Scalars['String']
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor: Scalars['String']
  totalCount: Scalars['Int']
}

export type StoreProduct = {
  aggregateRating: StoreAggregateRating
  brand: StoreBrand
  breadcrumbList: StoreBreadcrumbList
  description: Scalars['String']
  gtin: Scalars['String']
  image: Array<StoreImage>
  isVariantOf: StoreProductGroup
  name: Scalars['String']
  offers: StoreAggregateOffer
  productID: Scalars['String']
  review: Array<StoreReview>
  seo: StoreSeo
  sku: Scalars['String']
  slug: Scalars['String']
}

export type StoreProductConnection = {
  edges: Array<StoreProductEdge>
  pageInfo: StorePageInfo
}

export type StoreProductEdge = {
  cursor: Scalars['String']
  node: StoreProduct
}

export type StoreProductGroup = {
  hasVariant: Array<StoreProduct>
  name: Scalars['String']
  productGroupID: Scalars['String']
}

export type StoreReview = {
  author: StoreAuthor
  reviewRating: StoreReviewRating
}

export type StoreReviewRating = {
  bestRating: Scalars['Float']
  ratingValue: Scalars['Float']
}

export type StoreSearchResult = {
  facets: Array<StoreFacet>
  products: StoreProductConnection
}

export type StoreSeo = {
  canonical: Scalars['String']
  description: Scalars['String']
  title: Scalars['String']
  titleTemplate: Scalars['String']
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

export type CollectionPageQueryQueryVariables = Exact<{ [key: string]: never }>

export type CollectionPageQueryQuery = {
  site: {
    siteMetadata: {
      titleTemplate: string | null
      title: string | null
      description: string | null
    } | null
  } | null
}

export type ServerCollectionPageQueryQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type ServerCollectionPageQueryQuery = {
  collection: {
    canonical: string
    meta: { selectedFacets: Array<{ key: string; value: string }> }
    seo: { title: string; description: string }
    breadcrumbList: {
      itemListElement: Array<{ item: string; name: string; position: number }>
    }
  }
}

export type ProductPageQueryQueryVariables = Exact<{ [key: string]: never }>

export type ProductPageQueryQuery = {
  site: {
    siteMetadata: {
      title: string | null
      description: string | null
      titleTemplate: string | null
      siteUrl: string | null
    } | null
  } | null
}

export type ServerProductPageQueryQueryVariables = Exact<{
  locator: Array<IStoreSelectedFacet> | IStoreSelectedFacet
}>

export type ServerProductPageQueryQuery = {
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
  canonical: string
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
