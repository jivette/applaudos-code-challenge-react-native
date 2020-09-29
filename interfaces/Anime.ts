export interface IAnime extends IAnimeDetail {
    id: number;
    type: string;
    attributes: IAnimeDetail;
}

export interface IAnimeDetail {
    titles: {
        en: string;
    }
    description: string;
    synopsis: string;
    slug: string;
    startDate: string;
    endDate: string;
    canonicalTitle: string;
    ageRatingGuide: string;
    status: string;
    episodeLength: number;
    posterImage: {
        large: string;
    }
}