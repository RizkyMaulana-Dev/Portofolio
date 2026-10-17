import { Projects } from "./projects";

export const profile = {
  name: "Rizky Maulana - Junior Fullstack Developer",
  role: "Junior Fullstack Developer",
  email: "maulana.rizky.connect@gmail.com",
  location: "Bandung, Jawa Barat (WFO) / Remote",

  bio: "Junior Fullstack Developer dengan pengalaman membangun dashboard admin, sistem inventory, dan REST API — kuat di desain skema database mandiri, Laravel, dan TypeScript.",

  builds: ["School management system", "Book API"],

  availability: "Open to Work — WFO Bandung / Remote",

  // Sesuaikan angka ini dengan pengalaman aktualmu
  yearsExperience: 1,
  // Derived so it can never drift from the entries in projects.ts
  projectsCount: Projects.length,

  stack: [
  "TypeScript",
  "React",
  "Laravel",
  "Tailwind CSS",
  "MySQL"
  ],
};