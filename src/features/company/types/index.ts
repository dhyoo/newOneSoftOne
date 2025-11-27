// Company feature 타입 정의
export interface CEOData {
    title: string;
    subtitle: string;
    content: string;
    sign: string;
}

export interface IntroData {
    headline: string;
    desc: string[];
}

export interface StatusItem {
    label: string;
    value: string;
    icon: string;
}

export interface StatusData {
    title: string;
    items: StatusItem[];
}

export interface PhilosophyItem {
    title: string;
    desc: string;
}

export interface PhilosophyData {
    title: string;
    items: PhilosophyItem[];
}

export interface BusinessArea {
    title: string;
    desc: string;
}

export interface BusinessData {
    title: string;
    desc: string;
    areas: BusinessArea[];
}

export interface VisionData {
    title: string;
    desc: string;
}

export interface AboutData {
    title: string;
    intro: IntroData;
    status: StatusData;
    philosophy: PhilosophyData;
    business: BusinessData;
    vision: VisionData;
}

export interface HistoryEvent {
    year: string;
    events: string[];
}

export interface HistoryTab {
    label: string;
    years: HistoryEvent[];
}

export interface HistoryData {
    title: string;
    tabs: HistoryTab[];
}

export interface OrganizationFeature {
    icon: 'synergy' | 'flat' | 'quality' | 'freelancer';
    title: string;
    description?: string;
}

export interface PersonnelStat {
    label: string;
    count: number;
}

export interface OrganizationData {
    title: string;
    description: string;
    intro: {
        title: string;
        desc: string;
    };
    structure: {
        root: string;
        special: string[];
        divisions: {
            name: string;
            teams: string[];
        }[];
    };
    features: OrganizationFeature[];
    personnel: {
        title: string;
        description: string;
        subtitle: string;
        stats: PersonnelStat[];
    };
}

export interface ColorPalette {
    name: string;
    hex: string;
    cmyk: string;
    rgb: string;
}

export interface CIData {
    title: string;
    logo: {
        alt: string;
        desc: string;
    };
    meaning: {
        left: {
            title: string;
            subtitle: string;
            desc: string;
        };
        right: {
            title: string;
            subtitle: string;
            desc: string;
        };
    };
    color: {
        desc: string;
        palette: ColorPalette[];
    };
}

export interface PartnerData {
    title: string;
    description: string;
    list: string[];
}

export interface LocationData {
    title: string;
    address: string;
    addressDetail: string;
    phone: string;
    subway: {
        line: string;
        station: string;
        exit: string;
        distance: string;
    };
    bus: {
        간선: string[];
        지선: string[];
        광역: string[];
        마을: string[];
    };
    mapUrl: string;
}

export interface CompanyData {
    ceo: CEOData;
    about: AboutData;
    history: HistoryData;
    organization: OrganizationData;
    ci: CIData;
    partner: PartnerData;
    location: LocationData;
}

