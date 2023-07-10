export interface Podcast {
  id: string
  title: string
  author: string
  image: string
  description: string
}

export interface PodcastDetailItem {
  id: number
  name: string
  date: Date
  time: number
  description?: string
  audio?: string
}

// iTunes response
export interface ITunesResponse {
  feed: Feed
}

export interface Feed {
  author: Author
  entry: Entry[]
  updated: Icon
  rights: Icon
  title: Icon
  icon: Icon
  link: Link[]
  id: Icon
}

export interface Author {
  name: Icon
  uri: Icon
}

export interface Icon {
  label: string
}

export interface Entry {
  'im:name': Icon
  'im:image': IMImage[]
  summary: Icon
  'im:price': IMPrice
  'im:contentType': IMContentType
  rights?: Icon
  title: Icon
  link: Link
  id: ID
  'im:artist': IMArtist
  category: Category
  'im:releaseDate': IMReleaseDate
}

export interface Category {
  attributes: CategoryAttributes
}

export interface CategoryAttributes {
  'im:id': string
  term: PurpleLabel
  scheme: string
  label: PurpleLabel
}

export enum PurpleLabel {
  Music = 'Music',
  MusicCommentary = 'Music Commentary',
  MusicHistory = 'Music History',
  MusicInterviews = 'Music Interviews',
}

export interface ID {
  label: string
  attributes: IDAttributes
}

export interface IDAttributes {
  'im:id': string
}

export interface IMArtist {
  label: string
  attributes?: IMArtistAttributes
}

export interface IMArtistAttributes {
  href: string
}

export interface IMContentType {
  attributes: IMContentTypeAttributes
}

export interface IMContentTypeAttributes {
  term: FluffyLabel
  label: FluffyLabel
}

export enum FluffyLabel {
  Podcast = 'Podcast',
}

export interface IMImage {
  label: string
  attributes: IMImageAttributes
}

export interface IMImageAttributes {
  height: string
}

export interface IMPrice {
  label: IMPriceLabel
  attributes: IMPriceAttributes
}

export interface IMPriceAttributes {
  amount: string
  currency: Currency
}

export enum Currency {
  Usd = 'USD',
}

export enum IMPriceLabel {
  Get = 'Get',
}

export interface IMReleaseDate {
  label: Date
  attributes: Icon
}

export interface Link {
  attributes: LinkAttributes
}

export interface LinkAttributes {
  rel: Rel
  type?: Type
  href: string
}

export enum Rel {
  Alternate = 'alternate',
  Self = 'self',
}

export enum Type {
  TextHTML = 'text/html',
}

// Podcast detail response
export interface PodcastDetailResponseRaw {
  contents: string
  status: Status
}

export interface Status {
  url: string
  content_type: string
  http_code: number
  response_time: number
  content_length: number
}

export interface PodcastResponseResult {
  resultCount: number
  results: PodcastDetailResponse[]
}

export interface PodcastDetailResponse {
  wrapperType: WrapperType
  kind: Kind
  artistId?: number
  collectionId: number
  trackId: number
  artistName?: string
  collectionName: Name
  trackName: string
  collectionCensoredName?: Name
  trackCensoredName?: Name
  artistViewUrl: string
  collectionViewUrl: string
  feedUrl: string
  trackViewUrl: string
  artworkUrl30?: string
  artworkUrl60: string
  artworkUrl100?: string
  collectionPrice?: number
  trackPrice?: number
  collectionHdPrice?: number
  releaseDate: Date
  collectionExplicitness?: string
  trackExplicitness?: string
  trackCount?: number
  trackTimeMillis: number
  country: Country
  currency?: string
  primaryGenreName?: PrimaryGenreNameEnum
  contentAdvisoryRating: ContentAdvisoryRating
  artworkUrl600: string
  genreIds?: string[]
  genres: Array<GenreClass | string>
  closedCaptioning?: ClosedCaptioning
  description?: string
  shortDescription?: string
  artistIds?: number[]
  episodeContentType?: EpisodeContentType
  artworkUrl160?: string
  episodeFileExtension?: EpisodeFileExtension
  previewUrl?: string
  episodeUrl?: string
  episodeGuid?: string
}

export enum ClosedCaptioning {
  None = 'none',
}

export enum Name {
  TheJoeBuddenPodcast = 'The Joe Budden Podcast',
}

export enum ContentAdvisoryRating {
  Clean = 'Clean',
  Explicit = 'Explicit',
}

export enum Country {
  Usa = 'USA',
}

export enum EpisodeContentType {
  Audio = 'audio',
}

export enum EpisodeFileExtension {
  Mp3 = 'mp3',
}

export interface GenreClass {
  name: PrimaryGenreNameEnum
  id: string
}

export enum PrimaryGenreNameEnum {
  Music = 'Music',
}

export enum Kind {
  Podcast = 'podcast',
  PodcastEpisode = 'podcast-episode',
}

export enum WrapperType {
  PodcastEpisode = 'podcastEpisode',
  Track = 'track',
}
