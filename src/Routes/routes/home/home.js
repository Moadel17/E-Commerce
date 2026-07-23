import { LatestProducts, SaleProducts, TopRate } from "../../../Components";
import { Logout } from "../../../data";

export default function Home() {
  return (
    <div>
      <div className="main">
        <div>
          <h2>
            <p style={{ color: "white" }}>Shampoo</p>
            <p style={{ color: "white" }}>Nice</p>
          </h2>
          <p
            style={{
              display: "flex",
              width: "300px",
              flexWrap: "wrap",
              color: "white",
            }}>
            HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH.
          </p>
          <button className="btn btn-primary">Shop Now</button>
        </div>
      </div>
      <SaleProducts />
      <TopRate />
      <LatestProducts />
      {/* <Logout /> */}
    </div>
  );
}
