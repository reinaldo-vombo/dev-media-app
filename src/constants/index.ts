import { bookmark, gallery, homeIcon, people, wallpaper } from "@/assets";

export const sidebarLinks = [
  {
    imgURL: homeIcon,
    route: "/",
    label: "Home",
  },
  {
    imgURL: wallpaper,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: people,
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: gallery,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    imgURL: homeIcon,
    route: "/",
    label: "Home",
  },
  {
    imgURL: wallpaper,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: gallery,
    route: "/create-post",
    label: "Create",
  },
];