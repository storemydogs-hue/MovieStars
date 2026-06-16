export interface Film {
  title: string;
  year: number;
  genre: string;
  youtubeId: string;
  poster?: string;
  duration?: string;
}

export interface Star {
  id: string;
  name: string;
  nationality: string;
  career: string;
  photo: string;
  bio: string;
  films: Film[];
}
