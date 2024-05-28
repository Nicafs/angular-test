export type TIntervalProcucerMinMax = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

export type TIntervalProcucer = {
  min: TIntervalProcucerMinMax[];
  max: TIntervalProcucerMinMax[];
};
