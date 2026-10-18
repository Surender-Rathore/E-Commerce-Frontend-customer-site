import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import logo from "../assets/logo.svg";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axiosClient from "../api/axiosClient";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name: fieldName, value: fieldValue } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [fieldName]: fieldValue };
      // console.log(updated);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      params.append("username", formData.username);
      params.append("email", formData.email);
      params.append("password", formData.password);
      params.append("address", formData.address);

      const resp = await axiosClient.post("/newuserregister", params);
      // console.log("Success : ", resp.data)
      toast.success("Registration successful");
      setFormData({
        username: "",
        email: "",
        password: "",
        address: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        setError(error.response.data);
        toast.error(error.response.data);
      } else {
        setError("Didn't signup please try again !");
        toast.error("Didn't signup please try again !");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="shadow-sm">
        <Navbar expand="md" className="px-3">
          <NavbarBrand>
            <img src={logo} alt="Shopfront" style={{ height: 40 }} />
          </NavbarBrand>
        </Navbar>
      </div>
      <Container
        style={{
          maxWidth: 500,
          marginTop: 60,
          marginBottom: 60,
          background: "#ce5cbb",
          color: "white",
        }}
        className="border border-secondary rounded-2 p-4"
      >
        <div>
          <h3 className="mb-1 text-center">Create Account</h3>
          <hr className="mt-0 mb-0" />
          <p className="mb-3 text-center">Sign up to start shopping</p>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <InputGroup>
                <InputGroupText>
                  <FiUser />
                  {/* ya <i className="ti ti-user"></i> jaisa koi icon */}
                </InputGroupText>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <InputGroup>
                <InputGroupText>
                  <FiMail />
                </InputGroupText>
                <Input
                  placeholder="Enter your email"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <InputGroup>
                <InputGroupText>
                  <FiLock />
                </InputGroupText>
                <Input
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label for="address">Address</Label>
              <InputGroup>
                <InputGroupText>
                  <CiLocationOn />
                </InputGroupText>
                <Input
                  placeholder="Enter your address here.."
                  id="address"
                  type="textarea"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="text-center rounded-2">
              <Button color="dark" block type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
              </Button>
            </div>
          </Form>
        </div>

        <div className="text-center mt-2">
          <p style={{ color: "#ffffff", fontSize: 13, textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              to={"/login"}
              style={{
                color: "#FAC775",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
};

export default Signup;
