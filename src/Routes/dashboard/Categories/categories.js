import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { Cat, CAT } from "../../../Api/api";
import TableShow from "../../../Components/component/table/table";
// import Loading from '../../../../Components/WebSites/Page/Auth/loading'

export default function Categories() {
  // Stats
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Get Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
  ];

  async function handleDelete(id) {
    try {
      await Axios.delete(`${Cat}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="p-2 bg-white" style={{ flex: "1" }}>
      <div className="d-flex align-item-center justify-content-between mb-2">
        <h2>Categories Page</h2>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Category
        </Link>
      </div>

      <TableShow
        limit={limit}
        page={page}
        header={header}
        data={categories}
        setLimit={setLimit}
        delete={handleDelete}
        setPage={setPage}
        loading={loading}
        total={total}
        search="title"
        searchLink={Cat}
      />
    </div>
  );
}
