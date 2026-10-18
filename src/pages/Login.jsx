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
import { FiLock, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import toast from "react-hot-toast";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const handleChange = (e) => {
    const { name: fieldName, value: fieldValue } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [fieldName]: fieldValue };
      // console.log(updatedData);
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");

    try {
      const params = new URLSearchParams();

      params.append("email", formData.email);
      params.append("password", formData.password);

      await axiosClient.post(`/userloginvalidate`, params);
      toast.success("Login Successful✅");
      await checkAuth();

      navigate("/");
    } catch (error) {
      console.log(error);
      setErrors("Invalid email or password!");
      toast.error("Invalid email or password!");
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
          <h3 className="mb-1 text-center">Welcome back</h3>
          <hr className="mt-0 mb-0" />
          <p className="mb-3 text-center">Login to continue shopping</p>
          <Form onSubmit={handleSubmit}>
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

            <div>
              <p style={{ color: "#ffffff", fontSize: 13, textAlign: "end" }}>
                <Link
                  to={"/forgotpassword"}
                  style={{
                    color: "#FAC775",
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                >
                  Forgot password?
                </Link>
              </p>
            </div>

            {errors && (
              <p
                style={{
                  color: "red",
                }}
              >
                {errors}
              </p>
            )}

            <div className="text-center rounded-2">
              <Button color="dark" block type="submit" disabled={loading}>
                {
                  loading ? "Logging in" : "Login"
                }
              </Button>
            </div>
          </Form>
        </div>

        <div className="text-center mt-2">
          <p style={{ color: "#ffffff", fontSize: 13, textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              style={{
                color: "#FAC775",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Signup
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
};

export default Login;
