export interface Response<T> {
  body: T;
  headers: Record<string, string>;
  statusCode: number;
}

export interface TrackObjectSimplified {
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  is_playable?: boolean | undefined;
  linked_from?: TrackLinkObject | undefined;
  restrictions?: RestrictionsObject | undefined;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
}

export interface TrackObjectFull extends TrackObjectSimplified {
  album: AlbumObjectSimplified;
  external_ids: ExternalIdObject;
  popularity: number;
  is_local?: boolean | undefined;
  played_at?: string | undefined;
}

export interface PlayHistoryObject {
  track: TrackObjectFull;
  played_at: string;
  context: ContextObject;
}

export interface ContextObject {
  type: "artist" | "playlist" | "album" | "show" | "episode";
  href: string;
  external_urls: ExternalUrlObject;
  uri: string;
}

export interface ArtistObjectSimplified extends ContextObject {
  name: string;
  id: string;
  type: "artist";
}

export interface ArtistObjectFull extends ArtistObjectSimplified {
  followers: FollowersObject;
  genres: string[];
  images: ImageObject[];
  popularity: number;
}

export interface FollowersObject {
  href: null;
  total: number;
}

export interface ImageObject {
  height?: number | undefined;
  url: string;
  width?: number | undefined;
}

export interface AlbumObjectSimplified extends ContextObject {
  album_group?: "album" | "single" | "compilation" | "appears_on" | undefined;
  album_type: "album" | "single" | "compilation";
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: RestrictionsObject | undefined;
  type: "album";
}

export interface AlbumObjectFull extends AlbumObjectSimplified {
  copyrights: CopyrightObject[];
  external_ids: ExternalIdObject;
  genres: string[];
  label: string,
  popularity: number;
  tracks: PagingObject<TrackObjectSimplified>;
}

export interface ExternalUrlObject {
  spotify: string;
}

export interface CopyrightObject {
  text: string;
  type: "C" | "P";
}

export interface ExternalIdObject {
  isrc?: string | undefined;
  ean?: string | undefined;
  upc?: string | undefined;
}

export interface TrackLinkObject {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  type: "track";
  uri: string;
}

export interface RestrictionsObject {
  reason: string;
}

export interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}