const PREVIOUS_JOBS = [
  "Professional Mime",
  "Cat Cafe Barista",
  "Extreme Ironing Champion",
  "Safety Inspector for Trampoline Parks",
  "Junior Sous-Chef at a Mafia Front",
  "Struggling Magician",
  "Former Sumo Wrestler",
  "Tax Auditor for Clowns",
  "Competitive Origami Artist",
  "Elevator Music Composer",
];

const QUIRKS = [
  "Allergic to the color blue",
  "Refuses to work on Tuesdays",
  "Speaks only in riddles when stressed",
  "Obsessed with perfect cable management",
  "Always carries a lucky rubber duck",
  "Cannot stand the sound of whistling",
  "Believes they are being followed by a pigeon",
  "Expert at making bird calls",
  "Collects antique spoons",
  "Prone to spontaneous monologuing",
];

const BACKSTORIES = [
  "Fired from their last job for 'excessive competence.'",
  "Decided to join the wetwork industry after a particularly bad breakup.",
  "Mistook the recruitment ad for a 'Hit-Man' (a man who hits things with hammers).",
  "Looking for a job that finally appreciates their unique set of... lethal skills.",
  "Their mother thinks they are a traveling insurance salesman.",
  "Wanted a career with more 'human interaction.'",
  "Trying to pay off a massive debt to a underground Go-Karting league.",
  "Sent here by a career counselor who was clearly terrified of them.",
];

export const generateFlavor = () => {
  const previousJob = PREVIOUS_JOBS[Math.floor(Math.random() * PREVIOUS_JOBS.length)];
  const quirk = QUIRKS[Math.floor(Math.random() * QUIRKS.length)];
  const backstory = BACKSTORIES[Math.floor(Math.random() * BACKSTORIES.length)];

  return {
    previousJob,
    quirk,
    backstory,
    flavorText: `${previousJob}. ${backstory} ${quirk}.`
  };
};
