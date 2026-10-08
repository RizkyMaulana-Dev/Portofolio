export interface NavigationItem {
  title: string;
  href: string;
}

const base = import.meta.env.BASE_URL;

export const navigation: NavigationItem[] = [
  {
    title: "Home",
    href: base,
  },
  {
    title: "About",
    href: `${base}#about`,
  },
  {
    title: "Skills",
    href: `${base}#skills`,
  },
  {
    title: "Projects",
    href: `${base}#projects`,
  },
  {
    title: "Experience",
    href: `${base}#work`,
  },
  {
    title: "Certificates",
    href: `${base}#certificates`,
  },
  {
    title: "Contact",
    href: `${base}#contact`,
  },
];