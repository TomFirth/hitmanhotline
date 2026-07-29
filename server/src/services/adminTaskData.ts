export interface AdminTaskOption {
  label: string;
  impact: {
    cash?: number;
    reputation?: number;
    morale?: number;
    heat?: number;
    intel?: number;
  };
  flavourResponse: string;
}

export interface AdminTaskTemplate {
  id: string;
  category: 'HR' | 'FINANCE' | 'LEGAL' | 'MARKETING' | 'NEWS';
  sender: string;
  subject: string;
  content: string;
  options: AdminTaskOption[];
}

export const ADMIN_TASK_TEMPLATES: AdminTaskTemplate[] = [
  {
    id: 'stapler-gate',
    category: 'HR',
    sender: 'HR Department',
    subject: 'The Missing Stapler',
    content: "An operative claims a junior asset stole their favorite 'silenced' stapler. Tensions are rising in the breakroom.",
    options: [
      {
        label: 'Buy a new one ($50)',
        impact: { cash: -50, morale: 2 },
        flavourResponse: 'A new silenced stapler has been issued. Tensions have subsided.'
      },
      {
        label: 'Mandatory frisking',
        impact: { heat: 1, morale: -5 },
        flavourResponse: 'The stapler was not found, but everyone is now very uncomfortable.'
      },
      {
        label: 'Tell them to "handle it"',
        impact: { morale: -10 },
        flavourResponse: 'They handled it. There is now a suspicious hole in the breakroom drywall.'
      }
    ]
  },
  {
    id: 'weaponised-umbrella',
    category: 'FINANCE',
    sender: 'R&D Lead',
    subject: 'Expense Report: Tactical Umbrella',
    content: "A researcher wants to expense a 'self-deploying tactical umbrella' for 'field testing' in London.",
    options: [
      {
        label: 'Approve ($200)',
        impact: { cash: -200, intel: 5 },
        flavourResponse: 'Approved. R&D is delighted. It works well, even in light drizzle.'
      },
      {
        label: 'Deny',
        impact: { cash: 0 },
        flavourResponse: 'Denied. The researcher is now sulking in the server room.'
      }
    ]
  },
  {
    id: 'noise-complaint',
    category: 'LEGAL',
    sender: 'Legal Counsel',
    subject: 'Urgent: Noise Complaint',
    content: 'Neighbors at the HQ annex heard "suppressed pops" at 2 AM last night. They are threatening to call the authorities.',
    options: [
      {
        label: 'Send gift basket ($100)',
        impact: { cash: -100, heat: -5 },
        flavourResponse: 'A basket of premium muffins has silenced the neighbors. For now.'
      },
      {
        label: 'Threaten them',
        impact: { heat: 10 },
        flavourResponse: 'They have withdrawn the complaint, but are now staring at the HQ from behind their curtains.'
      }
    ]
  },
  {
    id: 'agency-motto',
    category: 'MARKETING',
    sender: 'CMO Office',
    subject: 'Brand Refresh: New Motto',
    content: 'Marketing wants to update the agency slogan to better reflect our corporate values.',
    options: [
      {
        label: '"We Hit Different"',
        impact: { reputation: 5 },
        flavourResponse: 'The new slogan is a hit. Prestige increased.'
      },
      {
        label: '"Satisfaction... or Else"',
        impact: { heat: 2, reputation: 2 },
        flavourResponse: 'A bit aggressive, but people are certainly paying attention.'
      }
    ]
  },
  {
    id: 'news-raid',
    category: 'NEWS',
    sender: 'Media Watch',
    subject: 'Breaking News: Local Tech Firm Raided',
    content: 'A competitor "tech firm" was raided this morning. Global markets are reacting to the instability.',
    options: [
      {
        label: 'Acknowledge',
        impact: { intel: 2 },
        flavourResponse: 'Logged. We should keep an eye on their remaining assets.'
      }
    ]
  }
];
