import {
  Armchair,
  CalendarArrowUp,
  CircleSlash,
  Database,
  Ellipsis,
  Sun,
} from "lucide-react";

export const priorities = [
  {
    color: "red",
    label: "p1",
    value: "Priority 1",
  },
  {
    color: "orange",
    label: "p2",
    value: "Priority 2",
  },
  {
    color: "blue",
    label: "p3",
    value: "Priority 3",
  },
  {
    color: "black",
    label: "p4",
    value: "Priority 4",
  },
];

export const dueDates = [
  {
    value: "Today",
    Icon: Database,
  },
  {
    value: "Tomorrow",
    Icon: Sun,
  },
  {
    value: "This weekend",
    Icon: Armchair,
  },
  {
    value: "Next week",
    Icon: CalendarArrowUp,
  },
  {
    value: "No date",
    Icon: CircleSlash,
  },
  {
    value: "More",
    Icon: Ellipsis,
  },
];
