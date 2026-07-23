import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USER, USERS } from "../../../Api/api";
import { Axios } from "../../../Api/axios";
import TableShow from "../../../Components/component/table/table";

export default function Users() {
  //Stats
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  //Get Current User
  useEffect(() => {
    Axios.get(`/${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  //Get Users
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?page=${page}&limit=${limit}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    {
      key: "name",
      name: "UserName",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];

  //Delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="p-2 bg-white" style={{ flex: "1" }}>
      <div className="d-flex align-item-center justify-content-between mb-2">
        <h2>Users Page</h2>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add User
        </Link>
      </div>
      <TableShow
        header={header}
        data={users}
        delete={handleDelete}
        currentUser={currentUser}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        search="name"
        searchLink={USER}
      />
    </div>
  );
}
