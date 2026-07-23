import { useEffect, useState } from "react";
import { PlusAndMinus } from "../../../data";
import formGround from "../../../images/formBackground.jpg";

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(items);
  }, []);

  function handleDelete(id) {
    const filterdProducts = products.filter((product) => product.id !== id);
    setProducts(filterdProducts);
    localStorage.removeItem("product");
  }

  function changeCount(id, btnCount) {
    const items = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = items.find((product) => product.id === id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(items));
  }
  const showProducts = products.map((pro) => (
    <div
      key={pro.id}
      className="d-flex"
      style={{
        margin: "20px 40px",
        border: "1px solid gray",
        borderRadius: "20px",
        padding: "15px",
        background: "#e0dcdc",
        height: "250px",
      }}>
      <img
        style={{ width: "200px", height: "100%" }}
        src={formGround}
        //   src={pro.images[0].image}
      />
      <div style={{ margin: "0 40px" }}>
        <h3>{pro.title}</h3>
        <p>{pro.description}</p>
        <p>
          <span style={{ margin: "0 30px 0 0", color: "blue" }}>
            {pro.price}$
          </span>
          <span style={{ textDecoration: "line-through", color: "red" }}>
            {pro.discount}$
          </span>
        </p>
        <PlusAndMinus
          id={pro.id}
          changeCount={changeCount}
          Count={pro.count}
          setBTN={(data) => setCount(data)}
        />
        <div>
          <button
            style={{
              margin: "10px 50px 0 0",
              padding: "8px 20px",
              outline: "none",
              borderRadius: "20px",
            }}>
            Countinue Buying
          </button>
          <button
            style={{
              padding: "8px 20px",
              outline: "none",
              borderRadius: "20px",
            }}
            onClick={() => handleDelete(pro.id)}>
            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  ));
  return showProducts;
}
