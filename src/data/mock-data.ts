import { App } from "../components/app-card";

export const mockApps: App[] = [
  {
    id: "1",
    name: "Slack",
    description: "Team communication and collaboration platform for messaging, file sharing, and project coordination.",
    rating: 4,
    category: "HR",
    hasAccess: true,
    icon: "💬",
    features: [
      "Real-time messaging",
      "File sharing and storage",
      "Video and voice calls",
      "App integrations"
    ],
    accessRequirements: [
      "Manager approval required",
      "Complete security training"
    ]
  },
  {
    id: "2",
    name: "Jira",
    description: "Project management and issue tracking software for agile development teams and workflows.",
    rating: 4,
    category: "Engineering",
    hasAccess: false,
    icon: "🔧",
    features: [
      "Issue tracking",
      "Agile project management",
      "Custom workflows",
      "Reporting and analytics"
    ],
    accessRequirements: [
      "Engineering team member",
      "IT approval required",
      "Project lead endorsement"
    ]
  },
  {
    id: "3",
    name: "Salesforce",
    description: "Customer relationship management platform for sales, marketing, and customer service teams.",
    rating: 5,
    category: "Sales",
    hasAccess: true,
    icon: "☁️",
    features: [
      "Lead management",
      "Sales pipeline tracking",
      "Customer data management",
      "Sales analytics"
    ],
    accessRequirements: [
      "Sales team member",
      "CRM training completion"
    ]
  },
  {
    id: "4",
    name: "Figma",
    description: "Collaborative design platform for creating user interfaces, prototypes, and design systems.",
    rating: 5,
    category: "Design",
    hasAccess: false,
    icon: "🎨",
    features: [
      "Real-time collaboration",
      "Prototyping tools",
      "Design systems",
      "Developer handoff"
    ],
    accessRequirements: [
      "Design team member",
      "Creative license approval"
    ]
  },
  {
    id: "5",
    name: "GitHub",
    description: "Version control and code collaboration platform for software development and project management.",
    rating: 5,
    category: "Engineering",
    hasAccess: false,
    icon: "🐙",
    features: [
      "Git repository hosting",
      "Code review tools",
      "Issue tracking",
      "CI/CD integration"
    ],
    accessRequirements: [
      "Engineering team member",
      "Security clearance",
      "Git training completion"
    ]
  },
  {
    id: "6",
    name: "HubSpot",
    description: "Marketing automation and customer service platform for inbound marketing and sales.",
    rating: 4,
    category: "Marketing",
    hasAccess: true,
    icon: "📈",
    features: [
      "Email marketing",
      "Lead scoring",
      "Marketing automation",
      "Analytics dashboard"
    ],
    accessRequirements: [
      "Marketing team member"
    ]
  },
  {
    id: "7",
    name: "Workday",
    description: "Human capital management software for HR, payroll, and workforce planning.",
    rating: 3,
    category: "HR",
    hasAccess: true,
    icon: "👥",
    features: [
      "Employee management",
      "Payroll processing", 
      "Performance tracking",
      "Time and attendance"
    ],
    accessRequirements: [
      "HR team member",
      "Confidentiality agreement"
    ]
  },
  {
    id: "8",
    name: "QuickBooks",
    description: "Accounting software for financial management, invoicing, and expense tracking.",
    rating: 4,
    category: "Finance",
    hasAccess: false,
    icon: "💰",
    features: [
      "Invoice management",
      "Expense tracking",
      "Financial reporting",
      "Tax preparation"
    ],
    accessRequirements: [
      "Finance team member",
      "Accounting certification",
      "CFO approval"
    ]
  },
  {
    id: "9",
    name: "Zoom",
    description: "Video conferencing and online meeting platform for remote communication.",
    rating: 4,
    category: "IT",
    hasAccess: true,
    icon: "📹",
    features: [
      "HD video conferencing",
      "Screen sharing",
      "Recording capabilities",
      "Webinar hosting"
    ],
    accessRequirements: [
      "Basic user agreement"
    ]
  },
  {
    id: "10",
    name: "Notion",
    description: "All-in-one workspace for notes, tasks, wikis, and databases.",
    rating: 5,
    category: "IT",
    hasAccess: false,
    icon: "📝",
    features: [
      "Note-taking",
      "Task management",
      "Database creation",
      "Team collaboration"
    ],
    accessRequirements: [
      "Team lead approval",
      "Data handling training"
    ]
  },
  {
    id: "11",
    name: "Adobe Creative Suite",
    description: "Professional creative software suite for design, video editing, and digital content creation.",
    rating: 5,
    category: "Design",
    hasAccess: false,
    icon: "🎭",
    features: [
      "Photo editing (Photoshop)",
      "Vector graphics (Illustrator)",
      "Video editing (Premiere)",
      "PDF creation (Acrobat)"
    ],
    accessRequirements: [
      "Creative team member",
      "Expensive license approval",
      "Training certification"
    ]
  },
  {
    id: "12",
    name: "Tableau",
    description: "Data visualization and business intelligence platform for creating interactive dashboards.",
    rating: 4,
    category: "Finance",
    hasAccess: false,
    icon: "📊",
    features: [
      "Data visualization",
      "Interactive dashboards",
      "Advanced analytics",
      "Data connection"
    ],
    accessRequirements: [
      "Data analyst role",
      "BI training completion",
      "Department head approval"
    ]
  }
];

export const mockPendingRequests = [
  {
    id: "req-1",
    appName: "Figma",
    appIcon: "🎨",
    requestDate: "Dec 10, 2024",
    status: "pending" as const
  },
  {
    id: "req-2", 
    appName: "GitHub",
    appIcon: "🐙",
    requestDate: "Dec 8, 2024",
    status: "pending" as const
  },
  {
    id: "req-3",
    appName: "Notion",
    appIcon: "📝", 
    requestDate: "Dec 5, 2024",
    status: "approved" as const
  }
];

// Role-specific app recommendations
export const getRecommendedAppsForRole = (role: "General" | "Engineering", allApps: App[]) => {
  const engineeringApps = ["Jira", "GitHub", "Figma", "Notion"];
  const generalApps = ["Slack", "Zoom", "Notion", "HubSpot"];
  
  const targetApps = role === "Engineering" ? engineeringApps : generalApps;
  
  return allApps.filter(app => 
    targetApps.includes(app.name) && !app.hasAccess
  );
};