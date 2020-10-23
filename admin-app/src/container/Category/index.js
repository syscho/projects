import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Row, Col,Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, addCategory } from "../../actions/category.actions";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  return (
    <Layout sidebar>
      <Row>
        <Col md={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Categories</h3>
            <Button variant="primary" onClick={handleShow}>
              Add
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <ul>{renderCategories(category.categories)}</ul>
          {/* {JSON.stringify(createCategoryList(category.categories))} */}
        </Col>
      </Row>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add new Category"}
      >
        <Input
          value={categoryName}
          placeholder={"Category Name"}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          className="form-control"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </Modal>
    </Layout>
  );
};
export default Category;
