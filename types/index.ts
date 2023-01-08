export interface INavItem {
  id: number;
  text: string;
  href: string;
}

export interface IIcon {
  name?: string;
  icon: string;
  href?: string;
}

export interface ISkill {
  title: string;
  list: string[];
}

export interface IProject {
  slug: string;
  title: string;
  stack: string[];
  image: string;
  caption: string;
  link: string;
  repository: string | null;
  commerce: boolean;
  slides: string[];
  description?: string,
  designed: string
}