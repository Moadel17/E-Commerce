import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CAT } from "../../../Api/api";
import SkeleTon from "../../../data/skeleton/skeleton";
import "../../../style/categoryPage.css";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  const showCategories = categories.map((category) => {
    return (
      <Link className="category-item">
        <img
          style={{ width: "25px", height: "25px" }}
          src={require("../../../images/google-icon.png")}
          alt="."
        />
        <p>
          {category.title.length > 10
            ? category.title.slice(1, 10) + " ...."
            : category.title}
        </p>
      </Link>
    );
  });

  return (
    <>
      <div className="categoriesPage-con">
        {loading ? (
          <SkeleTon
            height="50px"
            length="50"
            width="180px"
            classes="col-12 col-lg-2 col-md-3 col-sm-6"
          />
        ) : (
          showCategories
        )}
      </div>
    </>
  );
}
