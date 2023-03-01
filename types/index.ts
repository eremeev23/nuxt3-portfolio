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
  icon?: string;
  caption: string;
  link: string;
  repository: string | null;
  commerce: boolean;
  slides: string[];
  description?: string,
  designed: string
}

export interface ICareer {
  id: number;
  title: string;
  link: string;
  from: string;
  to: string;
  role: string;
  summary: string;
  list: string[];
  order: number
}

export interface IPageBlock<T> {
  title: string;
  list: T[]
}
