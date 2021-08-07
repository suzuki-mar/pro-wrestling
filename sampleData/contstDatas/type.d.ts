export type ContestParams = {
  day: string;
  title: string;
  firstNames: WrestlerFirstName[];
};

export const WrestlerFirstNames = {
  TAKUMI: 'takumi',
  MIO: 'mio',
  RIN: 'rin',
  MIKOTO: 'mikoto',
  MEI: 'mei',
  MARIA: 'maria',
  AI: 'ai',
} as const;

export type WrestlerFirstName = typeof WrestlerFirstNames[keyof typeof WrestlerFirstNames];
