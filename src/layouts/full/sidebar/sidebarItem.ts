import {
  DashboardIcon,
  SettingsIcon,
  HistoryIcon,
  ListIcon,
  ListCheckIcon,
  AdIcon,
  LocationIcon,
  UsersIcon,
  MessageIcon,
  BuildingIcon,
  CategoryIcon,
  Category2Icon,
  MenuIcon,
  PackagesIcon,
  RouteIcon,
  TrainIcon,
  ServicemarkIcon,
  StarIcon
} from 'vue-tabler-icons';
// import { isSuperAdmin } from '@/utils/api';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

// Define all menu items, including those that should be restricted
const allMenuItems: menu[] = [
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    to: '/dashboard',
  },

  {
    title: 'Vehicles',
    icon: TrainIcon,
    to: '/vehicles',
  },
  
  

  {
    title: 'Services',
    icon: ListIcon,
    to: '/services',
  },
  {
    title: 'Services Categories',
    icon: CategoryIcon,
    to: '/services-categories',
  },
  {
    title: 'City To City Routes',
    icon: RouteIcon,
    to: '/city-to-city-routes',
  },
  {
    title: 'Guidelines',
    icon: ListIcon,
    to: '/guidelines',
  },
  {
    title: 'Reviews',
    icon: StarIcon,
    to: '/reviews',
  },
  {
    title: 'Settings',
    icon: SettingsIcon,
    to: '/settings',
  },
  
  
];

// Filter the menu items based on the user's role
// const sidebarItem: menu[] = isSuperAdmin()
//   ? allMenuItems // Show all items to super admin
//   : allMenuItems.filter((item: any) =>
//       ['Dashboard', 'Create Quote', 'Quote History'].includes(item.title)
//     );
const sidebarItem: menu[] = allMenuItems;

export default sidebarItem;
