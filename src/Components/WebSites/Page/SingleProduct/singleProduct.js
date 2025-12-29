import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faL, faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../../../Api/axios";
import { CART, Pro } from "../../../../Api/api";
import "./singleProduct.css";
import Skeleton from "react-loading-skeleton";
import PlusAndMinus from "../plus&minusBtn";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const round = Math.round(product.rating);
  const stars = Math.min(round, 5);
  const goldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon
      key={key}
      style={{ cursor: "pointer", color: "gold" }}
      icon={solid}
    />
  ));
  const emptyStars = Array.from({ length: 5 - stars }).map((_, key) => (
    <FontAwesomeIcon key={key} style={{ cursor: "pointer" }} icon={regular} />
  ));

  useEffect(() => {
    Axios.get(`${Pro}/${id}`)
      .then((res) => {
        setImages(
          res.data[0].images.map((img) => {
            return { original: img.image, thumbnail: img.image };
          })
        );
        setProduct(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  async function checkStorage() {
    try {
      setLoading(true);
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function addToCart() {
    const check = await checkStorage();
    if (check) {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const itemExist = getItems.findIndex((pro) => pro.id == id);
      if (itemExist !== -1) {
        if (getItems[itemExist].count) {
          getItems[itemExist].count = count;
        } else {
          getItems[itemExist].count = count;
        }
      } else {
        product.count = count;
        getItems.push(product);
      }
      localStorage.setItem("product", JSON.stringify(getItems));
    }
  }

  return (
    <>
      {loading ? (
        <div className="d-flex">
          <div className="col-lg-5 col-md-6 col-12">
            <Skeleton
              className="col-12"
              style={{ height: "250px", margin: "0 40px" }}
            />
            <div
              className="d-flex col-lg-6 col-md-6 col-12 gap-2"
              style={{ margin: "0 50px" }}>
              <Skeleton
                className="col-lg-4 col-md-6 col-12"
                style={{ height: "125px", width: "120px" }}
              />
              <Skeleton
                className="col-lg-4 col-md-6 col-12"
                style={{ height: "125px", width: "120px" }}
              />
              <Skeleton
                className="col-lg-4 col-md-6 col-12"
                style={{ height: "125px", width: "120px" }}
              />
              <Skeleton
                className="col-lg-4 col-md-6 col-12"
                style={{ height: "125px", width: "120px" }}
              />
            </div>
          </div>
          <div
            className="col-lg-5 col-md-6 col-12"
            style={{ margin: "0 100px" }}>
            <Skeleton
              className="col-12"
              style={{ height: "50px", marginBottom: "8px" }}
            />
            <Skeleton
              className="col-12"
              style={{ height: "30px", marginBottom: "8px" }}
            />
            <Skeleton
              className="col-12"
              style={{ height: "80px", marginBottom: "8px" }}
            />
            <Skeleton
              className="col-4"
              style={{ height: "30px", marginBottom: "8px" }}
            />
            <Skeleton
              className="col-4"
              style={{ height: "30px", marginBottom: "8px" }}
            />
            <Skeleton
              className="col-12"
              style={{ height: "40px", marginBottom: "8px" }}
            />
            <Skeleton
              className="col-12"
              style={{ height: "40px", marginBottom: "8px" }}
            />
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-between w-100"
          style={{ padding: "20px 40px" }}>
          <div className="pro-image col-lg-6 col-md-6 col-12">
            <ImageGallery originalClass="image-gallery" items={images} />
          </div>
          <div className="pro-detail col-lg-6 col-md-6 col-12">
            <h2>{product.title}</h2>
            <p>{product.About}</p>
            <h4>{product.description}</h4>
            <div style={{ marginTop: "20px" }}>
              {goldStars}
              {emptyStars}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "space-between",
              }}>
              <p style={{ fontSize: "20px", fontWeight: "500", color: "blue" }}>
                {product.discount}$
                <span
                  style={{
                    paddingLeft: "20px",
                    fontSize: "16px",
                    color: "black",
                    textDecoration: "line-through",
                  }}>
                  {product.price} $
                </span>
              </p>
            </div>
            {product.stock === 0 ? (
              <p style={{ color: "red" }}>There Is Not Available Product.</p>
            ) : product.stock === 1 ? (
              <p
                style={{
                  color: "red",
                  marginTop: "10px",
                }}>
                This is only 1 left.
              </p>
            ) : (
              <PlusAndMinus setBTN={(data) => setCount(data)} />
            )}
            {product.stock < count && (
              <p style={{ color: "red", marginTop: "5px" }}>
                There is only {product.stock} left.
              </p>
            )}
            <button className="cart-btn" onClick={addToCart}>
              Add to Cart
            </button>
            <Link className="buy-btn">Buy Now</Link>
          </div>
        </div>
      )}
    </>
  );
}
