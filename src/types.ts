export interface Character {
    id: number;
    name: string;
    status: Status;
    species: Species;
    type: string;
    gender: Gender;
    origin: Origin;
    image: string;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
    Unknown = "unknown",
}

export interface Origin {
    name: string;
    url: string;
}

export enum Species {
    Alien = "Alien",
    Human = "Human",
}

export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}




export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: number;
    season: number;
}


export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
}


export interface EnrichedLocation {
    id: number;
    name: string;
    type: string;
    dimension: string;
    characters?: number[]; // Optional property for character IDs
}
