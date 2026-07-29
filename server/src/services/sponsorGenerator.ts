export interface SponsorTemplate {
  name: string;
  type: 'KNIVES' | 'PISTOLS' | 'SMGS' | 'RIFLES';
  dailyPayout: number;
}

const SPONSORS: SponsorTemplate[] = [
  { name: 'SOG Cutlery', type: 'KNIVES', dailyPayout: 100 },
  { name: 'Cold Steel', type: 'KNIVES', dailyPayout: 120 },
  { name: 'Glock Industrial', type: 'PISTOLS', dailyPayout: 200 },
  { name: 'Sig Sauer Logistics', type: 'PISTOLS', dailyPayout: 250 },
  { name: 'Heckler & Koch', type: 'SMGS', dailyPayout: 300 },
  { name: 'FN Herstal', type: 'SMGS', dailyPayout: 350 },
  { name: 'Accuracy International', type: 'RIFLES', dailyPayout: 400 },
  { name: 'Barrett Strategic', type: 'RIFLES', dailyPayout: 450 }
];

export const generateSponsor = () => {
  const template = SPONSORS[Math.floor(Math.random() * SPONSORS.length)];
  return {
    ...template,
    id: Math.random().toString(36).substr(2, 9),
    durationDays: Math.random() > 0.5 ? 7 : 1
  };
};

export const generateSponsorPool = (count: number = 10) => {
  return Array.from({ length: count }).map(() => generateSponsor());
};
