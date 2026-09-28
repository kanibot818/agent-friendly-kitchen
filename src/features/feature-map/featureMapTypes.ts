export type FeatureMapEntry = {
  id: string;
  path: string;
  publicApi: string;
  testids: string[];
};

export type FeatureMapDocument = {
  source: string;
  features: FeatureMapEntry[];
};
