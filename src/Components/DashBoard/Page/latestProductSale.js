import { Axios } from "axios";
import { useEffect, useState } from "react";
import { LatestProducts } from "../../../Api/api";
import HomeProducts from "../../../Pages/WebSites/Page/Deals";

export default function LatestProductSale() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Axios.get(`${LatestProducts}`).then((res) => setProducts(res.data));
  }, []);

  const showProducts = products.map((product) => (
    <HomeProducts tilte={product.title} description={product.description} />
  ));

  console.log(products);
  return <div style={{ marginTop: "30px" }}>{showProducts}</div>;
}
