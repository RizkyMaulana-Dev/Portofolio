export interface Skill {
    name: string;
    level: number; // 0-100
    icon: string;
    description: string;
    color: string;
}

export interface TechCategory {
    label: string;
    items: string[];
}

export const techCategories: TechCategory[] = [
    {
        label: "Frontend",
        items: ["JavaScript", "TypeScript", "React", "Tailwind CSS"],
    },
    {
        label: "Backend",
        items: ["Node.js", "PHP", "Laravel"],
    },
    {
        label: "DevOps, Server & Security",
        items: ["Server Deployment", "Linux / VPS", "CI/CD Automation"],
    },
    {
        label: "Tools & Design Platform",
        items: ["Git", "GitHub", "Figma", "Canva", "VS Code", "Linux"],
    },
    {
        label: "AI & Automation",
        items: ["Prompt Engineering", "ChatGPT / Claude / Gemini", "Antigravity / Cline"],
    },
    {
        label: "Soft Skills",
        items: ["Debugging & Troubleshooting", "Deep Thinking"],
    },
];

export const skills: Skill[] = [
    {
        name: "TypeScript",
        level: 85,
        icon: "simple-icons:typescript",
        description: "Strongly-typed architecture, generics, and modern ES features for scalable apps.",
        color: "#3178c6",
    },
    {
        name: "React",
        level: 80,
        icon: "simple-icons:react",
        description: "Component-driven UIs, hooks, state management, and performance optimization.",
        color: "#61dafb",
    },
    {
        name: "Laravel",
        level: 85,
        icon: "simple-icons:laravel",
        description: "MVC architecture, Eloquent ORM, migrations, queues, and RESTful APIs.",
        color: "#ff2d20",
    },
    {
        name: "Node.js",
        level: 80,
        icon: "simple-icons:nodedotjs",
        description: "Express, REST APIs, middleware, and server-side tooling.",
        color: "#339933",
    },
    {
        name: "PHP",
        level: 85,
        icon: "simple-icons:php",
        description: "Native PHP, OOP, PDO, and legacy codebase modernization.",
        color: "#777bb4",
    },
    {
        name: "Tailwind CSS",
        level: 90,
        icon: "simple-icons:tailwindcss",
        description: "Utility-first styling, design systems, and responsive layouts.",
        color: "#06b6d4",
    },
    {
        name: "MySQL",
        level: 85,
        icon: "simple-icons:mysql",
        description: "Schema design, indexing, complex queries, and data integrity.",
        color: "#4479a1",
    },
    {
        name: "PostgreSQL",
        level: 75,
        icon: "simple-icons:postgresql",
        description: "Relational modeling, advanced queries, and Prisma integration.",
        color: "#4169e1",
    },
    {
        name: "Git & GitHub",
        level: 85,
        icon: "simple-icons:github",
        description: "Version control, branching strategies, CI/CD, and code review.",
        color: "#181717",
    },
    {
        name: "Docker & Deployment",
        level: 70,
        icon: "simple-icons:docker",
        description: "Containerization, VPS deployment, and Linux server management.",
        color: "#2496ed",
    },
    {
        name: "AI & Automation",
        level: 75,
        icon: "simple-icons:openai",
        description: "Prompt engineering, AI-assisted workflows, and agent automation.",
        color: "#412991",
    },
    {
        name: "UI/UX Design",
        level: 70,
        icon: "simple-icons:figma",
        description: "Wireframes, prototyping, and pixel-perfect implementation.",
        color: "#f24e1e",
    },
];
