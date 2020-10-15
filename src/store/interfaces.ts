export interface IAlert {
    type: string;
    msg: string;
}

export interface IRGetTopArtist {
    country: string;
    limit?: number;
    page?: number;
}

export interface IRGetTopTracks {
    country: string;
    location?: string;
    limit?: number; 
    page?: number;
}


export interface IArtist  {
    name : string;
    listeners: string;
    mbid: string;
    url: string;
    streamable: string;
    image : any;
};

export interface ITrack {
    name: string;
    duration: string;
    listeners: string;
    mbid: string;
    url: string;
    streamable: object;
    artist: object;
    image: object;
}