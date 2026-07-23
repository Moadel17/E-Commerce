import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CAT, Pro } from "../../../Api/api";
import { Loading } from "../../../data";
import downLoadIcon from "../../../images/DownLoad Icon.png";
import "../../../style/dashboard.css";
import "../../../style/editUser.css";

export default function EditProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const { id } = useParams();
  const [idsFromServer, setIdsFromServer] = useState([]);
  const [categories, setCategories] = useState([]);

  //Ref
  const data = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const imageDelete = useRef([]);

  // LOADING
  const [loading, setLoading] = useState(false);

  //useEffect
  useEffect(() => {
    data.current.focus();
  }, []);

  console.log(form);

  useEffect(() => {
    Axios.get(`/${Pro}/${id}`)
      .then((data) => {
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
      })
      .catch((err) => console.log(err));
  }, []);

  // Get Categories
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  const showCategories = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      for (let i = 0; i < idsFromServer; i++) {
        const res = await Axios.delete(`/product-img/${idsFromServer}`).then(
          (data) => console.log(data),
        );
      }

      await Axios.post(`/${Pro}/edit/${id}`, form);
      setLoading(false);
      window.location.pathname = "/dashboard/products";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // Input Length Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const j = useRef(-1);

  // Get The Photos & Sent Them With Key Number And Progress
  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesASFiles = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesASFiles.length; i++) {
      j.current++;
      data.append("image", imagesASFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            progress.current[j.current].style.width = `${percent}%`;
            progress.current[j.current].setAttribute("percent", `${percent}%`);
          },
        });
        imageDelete.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleDeleteImage(id, img) {
    const idFound = imageDelete.current[id];
    try {
      const res = await Axios.delete(`/product-img/${idFound}`);
      setImages((prev) => prev.filter((image) => image !== img));
      imageDelete.current = imageDelete.current.filter((i) => i !== idFound);
      j.current--;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteImageFromServer(id) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
    setIdsFromServer((prev) => {
      return [...prev, id];
    });
    try {
      const res = await Axios.delete(`/product-img/${id}`).then((data) =>
        console.log(data),
      );
    } catch (err) {
      console.log(err);
    }
  }

  const showImages = images.map((img, key) => (
    <div className="border gap-2 mt-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex gap-3">
          <img
            key={key}
            style={{ width: "80px" }}
            src={`${URL.createObjectURL(img)}`}></img>
          <div>
            <p>{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => handleDeleteImage(key, img)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="costum-progress">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"></span>
      </div>
    </div>
  ));

  const showImagesFromServer = imagesFromServer.map((img, key) => (
    <div key={key} className="border p-2 col-2 position-relative">
      <div className="d-flex align-items-center justify-content-start gap-2">
        <img style={{ width: "100%", height: "150px" }} src={img.image}></img>
      </div>
      <div className="position-absolute top-0 end-0 bg-danger rounded text-white">
        <p
          className="py-1 px-2 m-0"
          onClick={() => handleDeleteImageFromServer(img.id)}
          style={{ cursor: "pointer" }}>
          x
        </p>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}

      <div style={{ width: "fit-content", flex: "1" }}>
        <Form
          onSubmit={handleEdit}
          style={{
            background: "none",
            boxShadow: "none",
            margin: "0",
            padding: "10px 20px",
          }}>
          <h1 style={{ padding: "0", fontSize: "25px" }}>New Product</h1>
          <Form.Group>
            <Form.Label style={{ marginBottom: "3px" }}>Category</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              onChange={handleChange}
              ref={data}>
              <option disabled selected>
                Select Category
              </option>
              {showCategories}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ marginBottom: "3px" }}>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title}
              placeholder="Enter Title..."
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ marginBottom: "3px" }}>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={form.description}
              placeholder="Enter Description..."
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ marginBottom: "3px" }}>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={form.price}
              placeholder="Enter Price..."
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ marginBottom: "3px" }}>Discount</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              value={form.discount}
              placeholder="Enter Discount..."
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ marginBottom: "3px" }}>About</Form.Label>
            <Form.Control
              type="text"
              name="About"
              value={form.About}
              placeholder="Enter About..."
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ marginBottom: "3px" }}>Images</Form.Label>
            <Form.Control
              ref={openImage}
              multiple
              hidden
              type="file"
              onChange={handleImagesChange}
            />
          </Form.Group>
          <div
            onClick={() => openImage.current.click()}
            className="d-flex align-items-center justify-content-center rounded flex-column"
            style={{
              border: "2px dashed #0086fe",
              cursor: "pointer",
            }}>
            <img
              style={{
                width: "120px",
                marginTop: "5px",
              }}
              src={downLoadIcon}
            />
            <p className="mb-1 fw-bold" style={{ color: "#0086fe" }}>
              Upload Images
            </p>
          </div>
          <div className="d-flex align-items-start flex-wrap gap-2 mt-3">
            {showImagesFromServer}
          </div>
          <div>{showImages}</div>
          <button
            className="btn-user"
            style={{ fontFamily: "monospace", marginTop: "10px" }}
            disabled={form.title.length > 1 ? false : true}>
            Add
          </button>
        </Form>
      </div>
    </>
  );
}
