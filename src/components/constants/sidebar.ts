import { CalendarDays, Calendar, LayoutGrid, Hash } from "lucide-react";

export const sidebarLinks = [
  {
    Icon: Calendar,
    href: "/today",
    title: "Today",
  },
  {
    Icon: CalendarDays,
    href: "/upcoming",
    title: "Upcoming",
  },
  {
    Icon: LayoutGrid,
    href: "/filters-labels",
    title: "Filters & Labels",
  },
];

export const favoriteLinks = [
  {
    Icon: Hash,
    href: "/project/home",
    title: "Home",
  },
];

export const projectsLinks = [
  {
    Icon: Hash,
    href: "/project/home",
    title: "Home",
  },
  {
    Icon: Hash,
    href: "/project/education",
    title: "Education",
  },
];
