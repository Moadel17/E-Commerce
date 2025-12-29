import { Route, Routes } from "react-router-dom";
import Register from "./Pages/WebSites/Logs/register";
import LogIn from "./Pages/WebSites/Logs/login";
import Home from "./Pages/WebSites/Page/home";
import Users from "./Pages/DashBoard/Page/Users/users";
import DashBoard from "./Pages/DashBoard/Page/DashBoard";
import EditUser from "./Pages/DashBoard/Page/Users/editUser";
import NewUser from "./Pages/DashBoard/Page/Users/newUser";
import Categories from "./Pages/DashBoard/Page/Categories/categories";
import NewCategory from "./Pages/DashBoard/Page/Categories/newCategory";
import EditCategory from "./Pages/DashBoard/Page/Categories/editCategory";
import NewProduct from "./Pages/DashBoard/Page/Products/newProduct";
import EditProduct from "./Pages/DashBoard/Page/Products/editProduct";
import RequireAuth from "./Pages/WebSites/Auth/requireAuth";
import GoogleCallBack from "./Pages/WebSites/Logs/googleCallBack";
import RequireBack from "./Pages/WebSites/Auth/requireBack";
import CategoriesPage from "./Pages/WebSites/Page/categoriesPage";
import ReCallCategory from "./Pages/WebSites/Auth/reCallCategory";
import Auth404 from "./Components/WebSites/Page/Auth/auth404";
import Products from './Pages/DashBoard/Page/Products/products'
import SingleProduct from "./Components/WebSites/Page/SingleProduct/singleProduct";
import CartPage from "./Components/WebSites/Page/CartPage/cartPage";

export default function App() {
  return (
    <Routes>
      {/* Normal Routes */}
      <Route element={<ReCallCategory />}>
        <Route path="/" element={<Home />} />
        <Route path="/categoriesPage" element={<CategoriesPage />} />
        <Route path="product/:id" element={<SingleProduct />} />
        <Route path="/cartPage" element={<CartPage />} />
      </Route>
      <Route element={<RequireBack />}>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/auth/google/callback" element={<GoogleCallBack />} />
      <Route path="/*" element={<Auth404 />} />
      {/* Protected Routes */}
      <Route element={<RequireAuth allawedRole={["1995", "1996", "1999"]} />}>
        {/* DashBoard */}
        <Route path="/dashboard" element={<DashBoard />}>
          {/* Users */}
          <Route element={<RequireAuth allawedRole={["1995"]} />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<EditUser />} />
            <Route path="user/add" element={<NewUser />} />
          </Route>
          <Route element={<RequireAuth allawedRole={["1999", "1995"]} />}>
            {/* Categories */}
            <Route path="categories" element={<Categories />} />
            <Route path="category/add" element={<NewCategory />} />
            <Route path="categories/:id" element={<EditCategory />} />

            {/* Products */}
            <Route path="products" element={<Products />} />
            <Route path="product/add" element={<NewProduct />} />
            <Route path="products/:id" element={<EditProduct />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
