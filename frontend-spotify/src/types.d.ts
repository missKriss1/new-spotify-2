export interface Artists{
  _id: string;
  name: string;
  image: File | null;
  information: string;
  isPublished: boolean;
  username: string;
}

export interface IArtistMutation{
  name: string;
  image: File | null;
  information: string;
}


export interface Album{
  _id: string;
  title: string;
  artist: Artists;
  date: string;
  image: File | null;
}

export interface IAlbumMutation{
  title: string;
  image: File | null;
  date: string
  artist: string;
}

export interface Track{
  _id: string;
  title: string;
  album: Album;
  continuance: string;
  number: number;
}

export interface TrackHistory{
  _id: string;
  user: User;
  track: Track;
  datetime: string
}

export interface RegisterMutation{
  username: string;
  password: string;
}

export interface LogInMutation {
  username: string;
  password: string;
}

export interface User{
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse{
  user:User;
  message:string;
}

export interface ValidationError{
  errors: {
    [key: string]:{
      message: string;
      name: string;
    }
  },
  name: string;
  message: string;
}

export interface GlobalError{
  error: string;
}