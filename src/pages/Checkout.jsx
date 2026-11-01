// CHANGE 1: useEffect add kiya (page khulte hi cart load karne ke liye)
import { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner, // CHANGE 1: cart load hote waqt ghoomne wala spinner
} from "reactstrap";
import { Form } from "reactstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getCart } from "../api/cartApi"; // CHANGE 1: backend se cart mangwane wala function
import { placeOrder } from './../api/orderApi';

const SHIPPING_FEE = 200; // CHANGE 1: shipping fee ek jagah (Cart page aur backend wali hi 200)

const Checkout = () => {
  const [step, setStep] = useState(1);
  // CHANGE 3: default "card" tha, par card abhi disabled hai. Isliye default "cod" kiya
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  // CHANGE 1: cart ke items aur loading ki state
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  // CHANGE 2: shipping form ka data yahan jama hoga
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
  });

  // CHANGE 1: page khulte hi backend se cart load karo
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await getCart();
        if (res.data.length === 0) {
          toast.error("Your cart is empty");
          navigate("/cart"); // cart khaali ho to checkout ka koi matlab nahi
          return;
        }
        setCartItems(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [navigate]);

  const handlePlaceOrder = async()=>{
    setPlacing(true);
    try {
      await placeOrder(shipping, paymentMethod)
      toast.success("Order placed sucessfully");
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error("Failed to place order");
    } finally{
      setPlacing(false)
    }
  }

  // CHANGE 1: total cart se nikalo (price x quantity), phir shipping jodo
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal + SHIPPING_FEE;

  // CHANGE 2: har input me kuch likhne par ye us field ko update karta hai
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  // CHANGE 2: koi field khaali ho to aage nahi jaane dena
  const handleContinueToPayment = () => {
    const { firstName, lastName, address, city, phoneNumber } = shipping;
    if (!firstName || !lastName || !address || !city || !phoneNumber) {
      toast.error("Please fill in all shipping details");
      return;
    }
    setStep(2);
  };

  // CHANGE 1: cart load hone tak spinner dikhao
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
        {/* Steps */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            fontSize: 17,
            marginTop: 30,
          }}
        >
          <span
            style={{
              color: step === 1 ? "var(--text-accent)" : "var(--text-muted)",
              fontWeight: step === 1 ? 600 : 400,
            }}
          >
            1. Shipping
          </span>
          <span style={{ color: "var(--text-muted)" }}>—</span>
          <span
            style={{
              color: step === 2 ? "var(--text-accent)" : "var(--text-muted)",
              fontWeight: step === 2 ? 600 : 400,
            }}
          >
            2. Payment
          </span>
          <span style={{ color: "var(--text-muted)" }}>—</span>
          <span
            style={{
              color: step === 3 ? "var(--text-accent)" : "var(--text-muted)",
              fontWeight: step === 3 ? 600 : 400,
            }}
          >
            3. Review
          </span>
        </div>

        {/* Cards */}

        <div className="mt-5" style={{ fontFamily: "serif", marginTop: 60 }}>
          <Row className="mx-0 g-3">
            <Col md="8" xs="12">
              {step === 1 && (
                <Card className="border border-secondary">
                  <CardBody>
                    <Form>
                      <Row className="g-3">
                        <Col md={6}>
                          <FormGroup>
                            <Label for="firstName">First Name</Label>
                            {/* CHANGE 2: value aur onChange add kiye (neeche ke sab inputs me bhi yahi) */}
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="Enter name here"
                              type="text"
                              value={shipping.firstName}
                              onChange={handleShippingChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              placeholder="Enter name here"
                              type="text"
                              value={shipping.lastName}
                              onChange={handleShippingChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Label for="address">Address</Label>
                        <Input
                          id="address"
                          type="textarea"
                          placeholder="Enter street address here"
                          name="address"
                          value={shipping.address}
                          onChange={handleShippingChange}
                        />
                      </FormGroup>

                      <Row className="g-3">
                        <Col md={6}>
                          <FormGroup>
                            <Label for="city">City</Label>
                            <Input
                              type="text"
                              name="city"
                              placeholder="Enter city here"
                              id="city"
                              value={shipping.city}
                              onChange={handleShippingChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="phoneNumber">Ph Number</Label>
                            {/* CHANGE 2: name "phonenumber" se "phoneNumber" kiya, backend ke naam se milane ke liye */}
                            <Input
                              type="tel"
                              name="phoneNumber"
                              id="phoneNumber"
                              placeholder="Enter phone number"
                              value={shipping.phoneNumber}
                              onChange={handleShippingChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* CHANGE 2: seedha setStep(2) ki jagah check wala function */}
                      <Button
                        block
                        color="dark"
                        className="mt-3"
                        onClick={handleContinueToPayment}
                      >
                        Continue to payment
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              )}

              {step === 2 && (
                <Card className="border border-secondary">
                  <CardBody>
                    <h3
                      className="fw-bold mb-3"
                      style={{
                        fontSize: 15,
                      }}
                    >
                      Select payment method
                    </h3>

                    {/* Card Payment - Stripe baad me add hoga */}
                    <div
                      style={{
                        border: "0.5px solid var(--border)",
                        borderRadius: 8,
                        padding: 14,
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        opacity: 0.5,
                        cursor: "not-allowed",
                      }}
                    >
                      <Input
                        type="radio"
                        name="paymentMethod"
                        disabled
                        style={{ margin: 0 }}
                      />
                      Credit / Debit card (coming soon)
                    </div>

                    {/* Cash On delivery */}

                    <div
                      onClick={() => setPaymentMethod("cod")}
                      style={{
                        border:
                          paymentMethod === "cod"
                            ? "1.5px solid var(--border-accent)"
                            : "0.5px solid var(--border)",
                        borderRadius: 8,
                        padding: 14,
                        marginBottom: 10,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {/* CHANGE 3: radio me onClick ki jagah onChange (React ki warning hatane ke liye) */}
                      <Input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        style={{ margin: 0 }}
                      />
                      Cash on delivery
                    </div>
                    {/* Buttons */}
                    <div className="d-flex justify-content-between mt-3">
                      <Button onClick={() => setStep(1)}>Back</Button>
                      <Button color="dark" onClick={() => setStep(3)}>
                        Continue to review
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardBody className="border border-secondary">
                    <h3
                      className="fw-bold mb-3"
                      style={{
                        fontSize: 15,
                      }}
                    >
                      Review your order
                    </h3>

                    {/* CHANGE 2: review me shipping address bhi dikhaya (pehle sirf payment method tha) */}
                    <div className="mb-3 p-3 border rounded">
                      <p className="fw-bold mb-1">Shipping to</p>
                      <p style={{ fontSize: 13 }} className="mb-0">
                        {shipping.firstName} {shipping.lastName}
                      </p>
                      <p style={{ fontSize: 13 }} className="mb-0">
                        {shipping.address}, {shipping.city}
                      </p>
                      <p style={{ fontSize: 13 }}>{shipping.phoneNumber}</p>
                    </div>

                    {/* Payment Summary */}

                    <div className="mb-3 p-3 border rounded">
                      <p className="fw-bold mb-1">Payment method</p>
                      <p style={{ fontSize: 13 }}>
                        {paymentMethod === "card"
                          ? "Credit / Debit Card"
                          : "Cash on delivery"}
                      </p>
                    </div>
                    {/* Button: abhi bhi sirf toast, backend se Step 3 me jodenge */}
                    <div className="d-flex justify-content-between mt-3">
                      <Button onClick={() => setStep(2)}>Back</Button>
                      <Button
                        color="dark"
                        onClick={handlePlaceOrder}
                        disabled={placing}
                      >
                        {placing ? "Placing..." : "Place order"}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              )}
            </Col>

            <Col md="4" xs="12">
              <Card className="border border-secondary">
                <CardBody>
                  <h3
                    style={{ fontSize: 15, marginTop: 8 }}
                    className="fw-bold"
                  >
                    Order Summary
                  </h3>

                  {/* CHANGE 1: hardcoded Backpack/Sneaker hata kar real cart ke items dikhaye */}
                  <div>
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "serif",
                          marginLeft: 8,
                          marginRight: 8,
                        }}
                      >
                        <span>
                          {item.product.name} * {item.quantity}
                        </span>
                        <p>
                          Rs.{" "}
                          {(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CHANGE 1: shipping ki alag row (total me judti hai) */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "serif",
                      marginLeft: 8,
                      marginRight: 8,
                    }}
                  >
                    <span>Shipping</span>
                    <p>Rs. {SHIPPING_FEE.toLocaleString()}</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "serif",
                    }}
                    className="fw-bold"
                  >
                    <span>Total</span>
                    {/* CHANGE 1: total ab hardcoded 11,197 nahi, cart + shipping se aata hai */}
                    <p>Rs. {total.toLocaleString()}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Checkout;