import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const seedBoardsData = [
  {
    name: "Platform Launch",
    columns: [
      {
        name: "Todo",
        color: "#49C4E5",
        order: 0,
        tasks: [
          {
            title: "Build UI for onboarding flow",
            description: "Design and build the initial screens for user registration and welcome tutorial walkthrough.",
            order: 0,
            subtasks: [
              { title: "Sign up page", isCompleted: true },
              { title: "Sign in page", isCompleted: false },
              { title: "Welcome screen", isCompleted: false },
            ],
          },
          {
            title: "Build UI for search",
            description: "Implement responsive search bar with autocomplete suggestions and filter chips.",
            order: 1,
            subtasks: [
              { title: "Search component", isCompleted: false },
            ],
          },
          {
            title: "Build settings UI",
            description: "Account settings, notification preferences, profile image upload, and theme selector.",
            order: 2,
            subtasks: [
              { title: "Account settings", isCompleted: false },
              { title: "Billing settings", isCompleted: false },
            ],
          },
          {
            title: "QA and test all major user journeys",
            description: "Once we are ready to launch, we need to test all user journeys to eliminate edge case bugs.",
            order: 3,
            subtasks: [
              { title: "Meet with team for test plan", isCompleted: false },
              { title: "Execute regression tests", isCompleted: false },
            ],
          },
        ],
      },
      {
        name: "Doing",
        color: "#8471F2",
        order: 1,
        tasks: [
          {
            title: "Design settings and search pages",
            description: "High fidelity Figma wireframes and design system components for settings and global search.",
            order: 0,
            subtasks: [
              { title: "Settings - Account", isCompleted: true },
              { title: "Settings - Billing", isCompleted: true },
              { title: "Search UI", isCompleted: false },
            ],
          },
          {
            title: "Add account management endpoints",
            description: "NestJS controller endpoints for updating user passwords, email verification, and deleting account.",
            order: 1,
            subtasks: [
              { title: "Upgrade plan endpoint", isCompleted: true },
              { title: "Cancel plan endpoint", isCompleted: true },
              { title: "Update password endpoint", isCompleted: false },
            ],
          },
          {
            title: "Design onboarding flow",
            description: "Create Figma prototypes for user onboarding step 1 to 4.",
            order: 2,
            subtasks: [
              { title: "Welcome page", isCompleted: true },
              { title: "Profile setup", isCompleted: true },
              { title: "Tutorial screen", isCompleted: false },
            ],
          },
          {
            title: "Add search endpoints",
            description: "Query database with full text search index across boards, columns, and task titles.",
            order: 3,
            subtasks: [
              { title: "Define search DTO", isCompleted: true },
              { title: "Build search service", isCompleted: false },
            ],
          },
          {
            title: "Add authentication endpoints",
            description: "JWT authorization flow with refresh tokens and guest login capability.",
            order: 4,
            subtasks: [
              { title: "Auth service", isCompleted: true },
              { title: "Auth controller", isCompleted: true },
            ],
          },
          {
            title: "Research pricing points of various competitors and trial different business models",
            description: "We know what we are planning to build for version one. Now we need to finalize the first pricing model we will use.",
            order: 5,
            subtasks: [
              { title: "Research competitor pricing and business models", isCompleted: true },
              { title: "Outline a business model that fits our solution", isCompleted: false },
              { title: "Talk to potential customers about our proposed model", isCompleted: false },
            ],
          },
        ],
      },
      {
        name: "Done",
        color: "#67E2AE",
        order: 2,
        tasks: [
          {
            title: "Conduct 5 wireframe tests",
            description: "Ensure the new design changes are intuitive for real users in usability lab testing.",
            order: 0,
            subtasks: [
              { title: "Complete 5 wireframe prototype tests", isCompleted: true },
            ],
          },
          {
            title: "Create wireframe prototype",
            description: "Interactive low-fidelity wireframe prototype in Figma for stakeholder review.",
            order: 1,
            subtasks: [
              { title: "Create prototype", isCompleted: true },
            ],
          },
          {
            title: "Review results of usability tests and iterate",
            description: "Keep iterating through the feedback loops until usability score exceeds 85%.",
            order: 2,
            subtasks: [
              { title: "Analyze usability tests", isCompleted: true },
              { title: "Meet with stakeholders", isCompleted: true },
              { title: "Iterate wireframe design", isCompleted: true },
            ],
          },
          {
            title: "Create paper prototypes and conduct 10 usability tests with potential customers",
            description: "Fast concept validation with clickable paper prototype sessions.",
            order: 3,
            subtasks: [
              { title: "Create paper prototypes", isCompleted: true },
              { title: "Conduct 10 usability tests", isCompleted: true },
            ],
          },
          {
            title: "Market discovery",
            description: "Understand target demographics, persona pain points, and current competitor solutions.",
            order: 4,
            subtasks: [
              { title: "Interview 10 prospective customers", isCompleted: true },
            ],
          },
          {
            title: "Competitor analysis",
            description: "Feature matrix comparison against leading task and project management systems.",
            order: 5,
            subtasks: [
              { title: "Find direct competitors", isCompleted: true },
              { title: "Find indirect competitors", isCompleted: true },
            ],
          },
          {
            title: "Research the market",
            description: "Quantify market size, SAM and TAM estimates for modern productivity tools.",
            order: 6,
            subtasks: [
              { title: "Write up research findings", isCompleted: true },
              { title: "Present findings to executive leadership", isCompleted: true },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Marketing Plan",
    columns: [
      {
        name: "Todo",
        color: "#49C4E5",
        order: 0,
        tasks: [
          {
            title: "Plan Product Hunt Launch",
            description: "Prepare maker comment, gallery GIFs, tagline, and schedule launch date.",
            order: 0,
            subtasks: [
              { title: "Design teaser graphics", isCompleted: false },
              { title: "Draft first comment", isCompleted: false },
            ],
          },
          {
            title: "Write Announcement Blog Post",
            description: "Draft comprehensive release post highlighting key features, architecture, and story.",
            order: 1,
            subtasks: [
              { title: "Outline post", isCompleted: true },
              { title: "First draft", isCompleted: false },
              { title: "Editorial review", isCompleted: false },
            ],
          },
        ],
      },
      {
        name: "Doing",
        color: "#8471F2",
        order: 1,
        tasks: [
          {
            title: "Create Social Media Campaign Assets",
            description: "Short video clips, infographics, and carousel posts for Twitter/X and LinkedIn.",
            order: 0,
            subtasks: [
              { title: "Twitter banner & assets", isCompleted: true },
              { title: "Product demo GIF snippets", isCompleted: false },
            ],
          },
        ],
      },
      {
        name: "Done",
        color: "#67E2AE",
        order: 2,
        tasks: [
          {
            title: "Launch landing page teaser",
            description: "Publish countdown landing page with email capture form.",
            order: 0,
            subtasks: [
              { title: "Deploy landing page", isCompleted: true },
              { title: "Connect Mailchimp form", isCompleted: true },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Roadmap",
    columns: [
      {
        name: "Now",
        color: "#49C4E5",
        order: 0,
        tasks: [
          {
            title: "Offline Sync & Optimistic UI",
            description: "Store local state in IndexedDB and reconcile seamlessly on reconnect.",
            order: 0,
            subtasks: [
              { title: "Service worker setup", isCompleted: true },
              { title: "Conflict resolution strategy", isCompleted: false },
            ],
          },
        ],
      },
      {
        name: "Next",
        color: "#8471F2",
        order: 1,
        tasks: [
          {
            title: "Multiplayer Real-time Collaboration",
            description: "Integrate WebSockets for instant live updates across team members.",
            order: 0,
            subtasks: [
              { title: "WebSocket server gateway", isCompleted: false },
              { title: "Live cursor presence", isCompleted: false },
            ],
          },
        ],
      },
      {
        name: "Later",
        color: "#67E2AE",
        order: 2,
        tasks: [
          {
            title: "AI Smart Task Breakdown",
            description: "Generate subtasks automatically from high-level task descriptions using LLMs.",
            order: 0,
            subtasks: [
              { title: "Prompt engineering", isCompleted: false },
              { title: "Streaming API endpoint", isCompleted: false },
            ],
          },
        ],
      },
    ],
  },
];

export async function createDefaultBoardsForUser(userId: string, tx: any = prisma) {
  for (const boardData of seedBoardsData) {
    const board = await tx.board.create({
      data: {
        name: boardData.name,
        userId: userId,
      },
    });

    for (const colData of boardData.columns) {
      const column = await tx.column.create({
        data: {
          name: colData.name,
          color: colData.color,
          order: colData.order,
          boardId: board.id,
        },
      });

      for (const taskData of colData.tasks) {
        const task = await tx.task.create({
          data: {
            title: taskData.title,
            description: taskData.description,
            status: colData.name,
            order: taskData.order,
            columnId: column.id,
          },
        });

        for (const subtaskData of taskData.subtasks) {
          await tx.subtask.create({
            data: {
              title: subtaskData.title,
              isCompleted: subtaskData.isCompleted,
              taskId: task.id,
            },
          });
        }
      }
    }
  }
}

async function main() {
  console.log("Seeding initial database...");
  const hashedPassword = await bcrypt.hash("password123", 10);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@kanban.dev" },
    update: {},
    create: {
      email: "demo@kanban.dev",
      name: "Demo User",
      password: hashedPassword,
      isGuest: false,
    },
  });

  const existingBoards = await prisma.board.count({ where: { userId: demoUser.id } });
  if (existingBoards === 0) {
    await createDefaultBoardsForUser(demoUser.id);
    console.log("Seeded demo user with Figma Kanban boards!");
  }
  console.log("Seed completed successfully!");
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
