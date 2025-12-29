import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pro, PRO } from "../../../../Api/api";
import { Axios } from "../../../../Api/axios";
import TableShow from "../../../../Components/DashBoard/Page/nn";

export default function Products() {
  // Stats
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Get Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRO}?page=${page}&limit=${limit}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    { key: "images", name: "Images" },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
  ];

  async function handleDelete(id) {
    try {
      await Axios.delete(`${Pro}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="p-2 bg-white" style={{ flex: "1" }}>
      <div className="d-flex align-item-center justify-content-between mb-2">
        <h2>Products Page</h2>
        <Link className="btn btn-primary" to="/dashboard/product/add">
          Add Product
        </Link>
      </div>
      <TableShow
        header={header}
        data={products}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        delete={handleDelete}
        loading={loading}
        total={total}
        search="title"
        searchLin={Pro}
      />
    </div>
  );
}
