export type Link = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
};

export type GetLinksResponse = {
  links: Link[];
};

export type CreateLinkDTO = {
  originalUrl: string;
  slug: string;
};

export type GetLinkBySlugResponse = {
  originalUrl: string;
};

export type ExportLinksResponse = {
  reportUrl: string;
};

export type ApiError = {
  message: string;
};

export interface MutationError {
  body?: ApiError;
}
