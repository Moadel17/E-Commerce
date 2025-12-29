import { faPlus, faShoppingCart, faTruckFast, faUsers } from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: ["1995"],
  },
  {
    name: "New User",
    path: "user/add",
    icon: faPlus,
    role: ["1995"],
  }, 
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: faShoppingCart,
    role: ["1995" , "1999"],
  },
  {
    name: "New Category",
    path: "/dashboard/category/add",
    icon: faPlus,
    role: ["1995" , "1999"],
  },
   {
    name: "Products",
    path: "/dashboard/products",
    icon: faTruckFast,
    role: ["1995" , "1999"],
  },
  {
    name: "New Product",
    path: "/dashboard/product/add",
    icon: faPlus,
    role: ["1995" , "1999"],
  },
];
