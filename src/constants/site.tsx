import { ChevronDown } from "lucide-react";

export const SITE_LINKS = [
  {
    id: "0",
    path: "features",
    label: "Features",
    icon: null,
    hasMoreLinks: false,
  },
  {
    id: "1",
    path: "teams",
    label: "For Teams",
    icon: null,
    hasMoreLinks: false,
  },
  {
    id: "2",
    path: "",
    label: "Resources",
    icon: <ChevronDown size={18} />,
    hasMoreLinks: true,
  },
  {
    id: "3",
    path: "pricing",
    label: "Pricing",
    icon: null,
    hasMoreLinks: false,
  },
];
