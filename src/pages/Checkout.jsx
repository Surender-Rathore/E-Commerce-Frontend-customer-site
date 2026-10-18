import { useState } from "react";
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
} from "reactstrap";
import { Form } from "reactstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();
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
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="Enter name here"
                              type="text"
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
                        />
                      </FormGroup>

                      <Row className="g-3">
                        <Col md={6}>
                          <FormGroup>
                            <Label>City</Label>
                            <Input
                              type="text"
                              name="city"
                              placeholder="Enter city here"
                              id="city"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Ph Number</Label>
                            <Input
                              type="tel"
                              name="phonenumber"
                              id="phonenumber"
                              placeholder="Enter phone number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Button
                        block
                        color="dark"
                        className="mt-3"
                        onClick={() => setStep(2)}
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

                    {/* Card Payment */}

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
                      <Input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "cod"}
                        onClick={() => setPaymentMethod("cod")}
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

                    {/* Payment Summary */}

                    <div className="mb-3 p-3 border rounded">
                      <p className="fw-bold mb-1">Payment method</p>
                      <p style={{ fontSize: 13 }}>
                        {paymentMethod === "card"
                          ? "Credit / Debit Card"
                          : "Cash on delivery"}
                      </p>
                    </div>
                    {/* Button */}
                    <div className="d-flex justify-content-between mt-3">
                      <Button onClick={() => setStep(2)}>Back</Button>
                      <Button
                        color="dark"
                        onClick={() => {
                          toast.success("Order placed successfully");
                          navigate("/");
                        }}
                      >
                        Place order
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
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "serif",
                        marginLeft: 8,
                        marginRight: 8,
                      }}
                    >
                      <span>Backpack * 1</span>
                      <p>Rs. 4,999</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "serif",
                        marginLeft: 8,
                        marginRight: 8,
                      }}
                    >
                      <span>Sneaker * 2</span>
                      <p>Rs. 5,999</p>
                    </div>
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
                    <p>Rs. 11,197</p>
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
