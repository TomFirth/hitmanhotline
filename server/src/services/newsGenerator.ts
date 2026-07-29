const WORLD_EVENTS = [
  "United Nations General Assembly",
  "G20 Summit",
  "World Economic Forum",
  "Munich Security Conference",
  "Asean Summit",
  "Olympic Games",
  "Nato Summit",
  "Bilateral State Visit",
  "Government Funeral",
  "Global Health Summit",
  "National Day Parade"
];

const NEWS_TEMPLATES = [
  "Security tightened ahead of {event}.",
  "Speculation rises over clandestine meetings at {event}.",
  "Unexplained technical glitch disrupts {event} communications.",
  "High-profile asset spotted near {event} venue.",
  "Global markets react to opening statements at {event}."
];

export const generateNewsHeadline = () => {
  const event = WORLD_EVENTS[Math.floor(Math.random() * WORLD_EVENTS.length)];
  const template = NEWS_TEMPLATES[Math.floor(Math.random() * NEWS_TEMPLATES.length)];
  return {
    id: Math.random().toString(36).substr(2, 9),
    headline: template.replace("{event}", event),
    timestamp: new Date(),
    priority: Math.random() > 0.8 ? 'HIGH' : 'LOW'
  };
};

export const generateNewsFeed = (count: number = 5) => {
  return Array.from({ length: count }).map(() => generateNewsHeadline());
};
