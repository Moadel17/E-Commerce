// import { useEffect, useState } from "react";
// import HomeProducts from "../../../Pages/WebSites/Page/Deals";
// import { Axios } from "../../Api/axios";
// import LatestProducts from "./LatestProducts/latestProducts";
// import { Latest } from "../../Api/api";

// export default function LatestProductSale() {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     Axios.get(`${Latest}`).then((res) => setProducts(res.data));
//   }, []);

//    const showProducts = products.map((product) => (
//      <HomeProducts tilte={product.title} description={product.description} />
//    ));

//   console.log(products);
//   return <div style={{ marginTop: "30px" }}>{showProducts}</div>;
// }
