import Layout from "../../components/layout";
import React, { useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { addProduct } from "../../actions";
import Modal from "../../components/UI/Modal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

const Products = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailtModal, setProductDetailtModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);//need to be null, cuz won't populate via .map() function
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleProductPicture = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  const renderProductTable = () => {
    return (
      <Table style={{ fontSize: 20 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  onClick={() => showProductDetailsModal(product)}
                  key={product._id}
                >
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };
  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add new Product"}
      >
        <Input
          label="Name"
          placeholder={`Product Name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          placeholder={`Quantity`}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          placeholder={`Product Price`}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          placeholder={`Description`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPicture}
        />
      </Modal>
    );
  };
  const handleCloseProductDetailModal = () => {
    setProductDetailtModal(false);
  };
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailtModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) return null;
    return (
      <Modal
        show={productDetailtModal}
        handleClose={handleCloseProductDetailModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md={6}>
            <label className="key">Nombre</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
          <Col md={6}>
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Imagen</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Row>
        <Col md={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Products</h3>
            <Button variant="primary" onClick={handleShow}>
              Add Product
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>{renderProductTable()} </Col>
      </Row>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add new Product"}
      >
        <Input
          label="Name"
          placeholder={`Product Name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          placeholder={`Quantity`}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          placeholder={`Product Price`}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          placeholder={`Description`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPicture}
        />
      </Modal>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
