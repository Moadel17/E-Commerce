import { Route, Routes } from "react-router-dom";

// Import From Routes
import {
  Home,
  CategoriesPage,
  DashBoard,
  Categories,
  EditCategory,
  NewCategory,
  Products,
  EditProduct,
  NewProduct,
  Users,
  EditUser,
  NewUser,
} from "./Routes/index";

// Import From Data
import {
  Auth404,
  RequireAuth,
  RequireBack,
  ReCallCategory,
  LogIN,
  Register,
  GoogleCallBack,
} from "./data/index";

// Import From Components
import { SingleProduct, CartPage } from "./Components/index";

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
        <Route path="/login" element={<LogIN />} />
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
