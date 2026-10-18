import { Card, CardBody, Col, Row, Button, Spinner, CardImg } from "reactstrap";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCart, removeCartItem, updateCartItem } from "../api/cartApi";
import toast from "react-hot-toast";
import CartItem from "../components/CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // load data from cartitem and backend
  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await getCart();
      setCartItems(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cart!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const updateQty = async (productId, currentyQty, delta) => {
    const newQty = Math.max(1, currentyQty + delta);

    try {
      await updateCartItem(productId, newQty);
      loadCart();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update qunatity");
    }
  };


  const handleRemove = async(productId) =>{
    try {
      await removeCartItem(productId);
      toast.success("Item removed from your cart");
      loadCart();
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove item")
    }
  }
  const shipping = 200;
  const total = subtotal + shipping;

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
  return (
    <>
      <Header />
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px" }}>
        <div
          className="mt-5 ms-4"
          style={{ fontFamily: "serif", marginTop: 60 }}
        >
          <h3 style={{ fontWeight: 500, fontSize: 20 }}>
            Your cart ({cartItems.length} items)
          </h3>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-muted ms-4 mt-3"> Your cart is empty</p>
        ) : (
          <div className="mt-5" style={{ fontFamily: "serif", marginTop: 60 }}>
            <Row className="mx-0 g-3">
              <Col md="8" xs="12">
                <div className="d-flex flex-column gap-3">
                  {cartItems.map((item) => (
                    <CartItem 
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={updateQty}
                    onRemove={handleRemove}
                    />
                  ))}
                </div>
              </Col>

              <Col md="4" xs="12">
                <Card>
                  <CardBody>
                    <h3 style={{ fontSize: 15 }} className="fw-bold">
                      Order Summary
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 10,
                      }}
                    >
                      <p style={{ fontSize: 15 }}>Subtotal</p>
                      <p style={{ fontSize: 15 }}>
                        Rs. {subtotal.toLocaleString()}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 10,
                      }}
                    >
                      <p style={{ fontSize: 15 }}>Shipping</p>
                      <p style={{ fontSize: 15 }}>
                        Rs. {shipping.toLocaleString()}
                      </p>
                    </div>
                    <div
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 10,
                      }}
                    >
                      <h3 className="fw-bold" style={{ fontSize: 20 }}>
                        Total
                      </h3>
                      <h3 className="fw-bold" style={{ fontSize: 20 }}>
                        Rs. {total.toLocaleString()}
                      </h3>
                    </div>
                    <Button
                      color="dark"
                      block
                      className="mt-3"
                      onClick={() => navigate("/checkout")}
                    >
                      Proceed to checkout
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;