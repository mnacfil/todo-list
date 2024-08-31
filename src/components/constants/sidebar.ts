import { CalendarDays, Calendar, LayoutGrid, Hash, Inbox } from "lucide-react";

export const sidebarLinks = [
  {
    Icon: Inbox,
    href: "/inbox",
    title: "Inbox",
  },
  {
    Icon: Calendar,
    href: "/",
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
