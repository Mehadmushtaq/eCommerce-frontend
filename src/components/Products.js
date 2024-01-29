import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Products() {
  const [data, setData] = useState([]);
  //   const [loading, setLoading] = useState(false);

  const dislayProducts = async () => {
    const products = await axios.get("http://localhost:4000/api/product/list");
    console.log(products?.data);
    setData(products?.data);
  };

  useEffect(() => {
    dislayProducts();
  }, []);

  return (
    <>
      <h2 className="text-center">Products</h2>
      <div className="container">
        <div className="row">
          {data &&
            data.map((dta) => {
              return (
                <div className="col-lg-3 col-sm-4">
                  <Card
                    key={dta?.dataValues?.id}
                    className="text-center"
                    style={{ width: "15rem" }}
                  >
                    <Card.Img
                      variant="top"
                      src={`http://localhost:4000/${dta.images[0]}`}
                    />
                    <Card.Body>
                      <Card.Title>{dta?.dataValues?.name}</Card.Title>
                      <Card.Text>{dta?.dataValues?.price}</Card.Text>

                      <Link
                        to={`/products/${dta?.dataValues?.id}`}
                        className="btn btn-primary"
                      >
                        View
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Products;
