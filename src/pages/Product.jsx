import { Button, Card, CardBody, CardImg, Col, Row, Spinner } from "reactstrap";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getAllProduct, getProductById } from "../api/productApi";
import toast from "react-hot-toast";
import { addToCart } from "../api/cartApi";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const [productRes, allProductsRes] = await Promise.all([
          getProductById(id),
          getAllProduct(),
        ]);

        setProduct(productRes.data);

        // current product ko chor kr baqi ko related products ko dikha do

        const related = allProductsRes.data
          .filter((p) => p.id !== productRes.data.id)
          .slice(0, 4);

        setRelatedProducts(related);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleAddToCart = async () => {
    if (count === 0) {
      toast.error("Please select a quantity");
      return;
    }
    try {
      await addToCart(product.id, count);
      toast.success("Added to cart");
      navigate("/cart");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center py-5">
          <Spinner color="dark" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="text-center py-5">
          <p>Product not found</p>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px" }}>
        <div className="ms-4 mt-5">
          <h4
            style={{
              fontWeight: 400,
              fontSize: 15,
              fontFamily: "serif",
            }}
          >
            <Link
              to={"/"}
              style={{ color: "var(--text-secondary)", textDecoration: "none" }}
            >
              Home
            </Link>
            /{product.name}
          </h4>
        </div>
        {/* Card */}
        <div style={{ fontFamily: "serif", marginTop: 60 }}>
          <Row className="g-3 mx-0">
            <Col md="6" xs="12">
              <Card>
                <CardImg
                  top
                  src={product.image}
                  style={{
                    height: 300,
                    objectFit: "cover",
                  }}
                />
              </Card>
            </Col>
            <Col md="6" xs="12">
              <Card>
                <CardBody>
                  <div
                    style={{
                      objectFit: "cover",
                    }}
                  >
                    <h3 style={{ fontWeight: 500, fontSize: 20 }}>
                      {product.name}
                    </h3>
                    <h3 className="fw-bold">Rs. {product.price}</h3>
                    <p className="tag">{product.description}</p>
                    <h4
                      style={{ fontWeight: 400, fontSize: 15 }}
                      className="mb-3"
                    >
                      Quantity
                    </h4>
                    <div className="mt-3">
                      <button
                        className="me-3 border-0 shadow-0"
                        onClick={() => setCount(Math.max(0, count - 1))}
                      >
                        -
                      </button>
                      {count}
                      <button
                        className="ms-3 border-0 shadow-0"
                        onClick={() => setCount(count + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <Button
                    color="dark"
                    block
                    type="submit"
                    className="mt-3"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{ fontFamily: "serif", marginTop: 60 }} className="mt-5">
          <p style={{ fontWeight: 400, fontSize: 15 }} className="ms-2">
            You may also like
          </p>
          <Row className="g-3 mx-0">
            {relatedProducts.map((item) => (
              <Col
                md="3"
                xs="6"
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <Card className="category-card border border-secondary p-3">
                  <CardBody>
                    {item.name} - Rs. {item.price}
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Product;
