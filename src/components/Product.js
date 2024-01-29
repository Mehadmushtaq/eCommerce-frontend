import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Carousel } from "react-bootstrap";

function Product() {
  const { id } = useParams(); //return obj in key/value pair
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const product = await axios.get(
      `http://localhost:4000/api/product/details/${id}`
    );
    console.log("product", product);
    setProduct(product);
  };

  useEffect(() => {
    getProduct();
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 ">
          <Carousel data-bs-theme="dark" indicators={false}>
            {product?.data?.images?.map((path) => {
              return (
                <Carousel.Item>
                  <img
                    style={{
                      height: "500px",
                      width: "100%",
                      objectFit: "cover",
                      padding: "3rem",
                    }}
                    src={`http://localhost:4000/${path}`}
                    alt=":)"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="col-6 d-flex flex-column" style={{ padding: "5rem" }}>
          <h2>{product?.data?.dataValues?.name}</h2>
          <p>
            <b>category:</b> {product?.data?.dataValues?.category}
          </p>
          <p>{product?.data?.dataValues?.description}</p>
          <p>
            <b>price: </b>${product?.data?.dataValues?.price}
          </p>
          <div>
            <button className="btn btn-primary w-40">Add to cart</button>
            <button className="btn btn-primary w-40 mx-2">whishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
