import { useEffect, useState } from "react";
import SkeleTon from "../skeleton";
import { Axios } from "../../../../Api/axios";
import { Latest, TOPRate } from "../../../../Api/api";
import LatestProductsCon from "./latestProductsCon";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${Latest}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const showProduct = products.map((product, index) => (
    <LatestProductsCon
      key={index}
      title={product.title}
      description={product.description}
      //   img={product.images[0].image}
      discount={product.discount}
      price={product.price}
      rating={product.rating}
      to={product.id}
    />
  ));

  return (
    <>
      <h2
        style={{
          margin: "30px 50px 0",
          background: "#d1d0d0",
          borderRadius: "20px",
          padding: "10px 20px",
        }}
      >
        Latest Products
      </h2>
      <div
        style={{
          margin: "40px 0",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          height: "410px",
        }}
      >
        {loading ? (
          <SkeleTon
            classes="col-12 col-lg-2 col-md-3 col-sm-6"
            length={4}
            height="410px"
            width="300px"
          />
        ) : (
          showProduct
        )}
      </div>
    </>
  );
}
