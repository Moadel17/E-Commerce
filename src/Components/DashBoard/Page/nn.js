import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../../Pagination/pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";

// Table File
export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };

  const [search, setSearch] = useState("");
  const [filteredData, setFilitred] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const switchData = search.length > 0 ? filteredData : props.data;

  async function handleGetSearch() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilitred(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? handleGetSearch() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  const headerShow = props.header.map((item) => <th>{item.name}</th>);
  const dataShow = switchData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "images" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item[item2.key].map((img) => (
                <img width="40px" height="25px" src={img.image} alt="" />
              ))}
            </div>
          ) : item2.key === "image" ? (
            <img width="40px" height="25px" src={item[item2.key]} alt="" />
          ) : item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1996" ? (
            "Writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[item2.key]
          )}
          {currentUser && currentUser.name === item[item2.key] && " (You)"}
        </td>
      ))}
      <td
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "100%",
        }}
      >
        <Link to={`${item.id}`}>
          <FontAwesomeIcon
            fontSize={"19px"}
            color="blue"
            icon={faPenToSquare}
          />
        </Link>
        {currentUser.id !== item.id && (
          <FontAwesomeIcon
            onClick={() => props.delete(item.id)}
            fontSize={"19px"}
            cursor={"pointer"}
            color="red"
            icon={faTrash}
          />
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <Form.Control
        type="search"
        onChange={(e) => {
          setSearch(e.target.value);
          setSearchLoading(true);
        }}
        style={{ width: "250px", margin: "20px 10px" }}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr className="text-center">
              <td colSpan={12} style={{ fontSize: "18px", fontWeight: "600" }}>
                Loading ...
              </td>
            </tr>
          ) : searchLoading ? (
            <tr className="text-center">
              <td colSpan={12} style={{ fontSize: "18px", fontWeight: "600" }}>
                Searching ...
              </td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <Form.Select
          onChange={(e) => props.setLimit(e.target.value)}
          style={{ width: "100px", cursor: "pointer" }}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Form.Select>
        <PaginatedItems
          setPage={props.setPage}
          data={props.data}
          itemsPerPage={props.limit}
          total={props.total}
        />
      </div>
    </>
  );
}
