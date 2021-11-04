export interface GalleryImage {
  url: string;
  title: string;
  desc: string;
  sort: number;
}

export interface Gallery {
  images: GalleryImage[];
}