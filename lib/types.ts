export type WildStage = {
  level: number;
  image: string;
  caption: string;
};

export type WildSighting = {
  id: string;
  text: string;
  url: string;
  at: string;
};

export type WildData = {
  wildCount: number;
  lastUpdated: string;
  currentImage: string;
  stages: WildStage[];
  sightings: WildSighting[];
  meta?: {
    avatarSource?: string;
    avatarResolved?: string;
    avatarNote?: string;
    scrapeSources?: string[];
    wildCountNote?: string;
  };
};
