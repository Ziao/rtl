/**
 * Note: I quickly generated these using https://app.quicktype.io (and some small tweaks) based on the provided JSON.
 * The quality of these types is lacking (such as enums where realistically it should simply be a string). I would
 * expect either types or an openapi spec to be available for API responses so we can automatically generate these.
 */

export interface BundleResponse {
    bundelItems: BundelItem[];
    title: LabelValueEnum;
    label: string;
    description: string;
    image: Image;
}

export interface BundelItem {
    id: number;
    aangemaaktDatum: KtDatum;
    bijgewerktDatum: KtDatum;
    titel: string;
    urlAlias: string;
    afbeelding: Afbeelding;
    branded: Branded;
    sectie: Sectie;
    overigeSecties: Sectie[];
    labelValue: LabelValueEnum;
    labelType: LabelType;
    metadata: Metadata;
    chapeau: string;
    lead: string;
    showVideoIcon: boolean;
    isPremium: boolean;
    type: BundelItemType;
}

export interface KtDatum {
    timestamp: number;
    formatted: string;
}

export interface Afbeelding {
    bijschrift: null | string;
    copyright: null | string;
    afbeelding: string;
    crops: Crop[];
    type: AfbeeldingType;
}

export interface Crop {
    type: CropType;
    height: number;
    width: number;
    ratio: string;
    path: string;
}

export enum CropType {
    ArtikelTop = "artikel_top",
    InlineSmall = "inline_small",
    Liggend = "liggend",
    LiggendBreed = "liggend_breed",
    LiggendBreedNieuwsopening = "liggend_breed_nieuwsopening",
    SquareMedium = "square_medium",
    SquareSmall = "square_small",
    Staand = "staand",
}

export enum AfbeeldingType {
    MediaAfbeelding = "MediaAfbeelding",
}

export interface Branded {
    status: boolean;
    label: null;
    partnerLogo: null;
    partnerUrl: null;
    clickTracker: null;
    impressieTracker: null;
}

export enum LabelType {
    BundleLabel = "bundleLabel",
}

export enum LabelValueEnum {
    DeUitschietersVan2018 = "De uitschieters van 2018",
}

export interface Metadata {
    entityType: EntityType;
    entityBundle: EntityBundle;
    template: Template;
    theme: Theme;
}

export enum EntityBundle {
    Artikel = "artikel",
    Secties = "secties",
}

export enum EntityType {
    Node = "node",
    TaxonomyTerm = "taxonomy_term",
}

export enum Template {
    Default = "default",
}

export enum Theme {
    Boulevard = "boulevard",
}

export interface Sectie {
    id: number;
    title: SectieTitle;
    beschrijving: null | string;
    woordenboek: EntityBundle;
    url: string;
    analytics: null;
    advertising: null;
    items: null;
    pager: null;
    regions: any[];
    metadata: Metadata;
    type: SectieType;
}

export enum SectieTitle {
    Entertainment = "Entertainment",
    HomeRTLBoulevard = "Home [RTL Boulevard]",
    Music = "Music",
    Showbizz = "Showbizz",
    Tv = "TV",
}

export enum SectieType {
    PageItem = "PageItem",
}

export enum BundelItemType {
    ArtikelReferentie = "ArtikelReferentie",
}

export interface Image {
    imageUrl: string;
    crops: Crop[];
    type: AfbeeldingType;
}
