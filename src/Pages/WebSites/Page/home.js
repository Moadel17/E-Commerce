import LatestProducts from "../../../Components/WebSites/Page/LatestProducts/latestProducts";
import SaleProducts from "../../../Components/WebSites/Page/saleProduct/saleProduct";
import TopRate from "../../../Components/WebSites/Page/TopRating/TopRate";
import Logout from "../Logs/logout";

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
            }}
          >
            HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH.
          </p>
          <button className="btn btn-primary">Shop Now</button>
        </div>
      </div>
      <SaleProducts />
      <TopRate />
      <LatestProducts />
      <Logout />
    </div>
  );
}
