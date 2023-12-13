interface MenuItemsProps {
  id: number;
  novidade?: any;
  label: string;
  icon?: string;
  link?: string;
  badge?: string;
  badgecolor?: string;
  subItems?: any;
  isHeader?: boolean;
}

const menuItems: Array<MenuItemsProps> = [
  {
    id: 1,
    novidade: false,
    label: "Desktop",
    icon: "monitor",
    link: "/#",
  },
  {
    id: 2,
    novidade: false,
    label: "Workspaces",
    icon: "settings",
    link: "/#",
    subItems: [
      {
        id: 1,
        label: "Workspace 1",
        link: "/workspace/1",
        parentId: 2,
      },
      {
        id: 2,
        label: "Workspace 2",
        link: "/workspace/2",
        parentId: 2,
      },
      {
        id: 3,
        label: "Workspace 3",
        link: "/workspace/3",
        parentId: 2,
      },
    ],
  },
];

export { menuItems };
