import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../../Style/newUser.css";
import "../../Style/dashboard.css";
import { CAT, Pro } from "../../../../Api/api";
import { Axios } from "../../../../Api/axios";
import Loading from "../../../../Components/WebSites/Page/Auth/loading";


export default function NewProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock:0,
  });
  const formSubmit = {
    category: null,
    title: "DM",
    description: "DM",
    price: 1,
    discount: 0,
    About: "A",
    stock:0,
  };

  const [images, setImages] = useState([]);
  const [sent, setSent] = useState(false);
  const [id, setId] = useState("");
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
      await Axios.post(`/${Pro}/edit/${id}`, form);
      setLoading(false);
      window.location.pathname = "/dashboard/products";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // Sent Empty Form To Back-End
  async function handleFormSubmit() {
    try {
      const res = await Axios.post(`/${Pro}/add`, formSubmit);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  // Input Length Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (sent !== true) {
      setSent(true);
      handleFormSubmit();
    }
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

  console.log(imageDelete);

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

  const showImages = images.map((img, key) => (
    <div className="border gap-2 mt-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex gap-3">
          <img
            key={key}
            style={{ width: "80px" }}
            src={`${URL.createObjectURL(img)}`}
          ></img>
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
          className="inner-progress"
        ></span>
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
          }}
        >
          <h1 style={{ padding: "0", fontSize: "25px" }}>New Product</h1>
          <Form.Group>
            <Form.Label style={{ marginBottom: "3px" }}>Category</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              onChange={handleChange}
              ref={data}
            >
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
              disabled={!sent}
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
              disabled={!sent}
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
              disabled={!sent}
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
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ marginBottom: "3px" }}>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={form.stock}
              placeholder="Enter Stock..."
              onChange={handleChange}
              required
              disabled={!sent}
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
              disabled={!sent}
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
              border: !sent ? "2px dashed gray" : "2px dashed #0086fe",
              cursor: sent && "pointer",
              disabled: !sent && "false",
            }}
          >
            <img
              style={{
                width: "120px",
                marginTop: "5px",
                filter: !sent && "grayScale(1)",
              }}
              src={require("../../../../images/DownLoad Icon.png")}
            />
            <p
              className="mb-1 fw-bold"
              style={{ color: !sent ? "gray" : "#0086fe" }}
            >
              Upload Images
            </p>
          </div>
          {showImages}
          <button
            className="btn-user"
            style={{ fontFamily: "monospace", marginTop: "10px" }}
            disabled={form.title.length > 1 ? false : true}
          >
            Add
          </button>
        </Form>
      </div>
    </>
  );
}
