import { useState } from "react";
import { NavLink as RouterLink, useNavigate } from "react-router";
import { FiSearch, FiUser, FiShoppingCart, FiX } from "react-icons/fi";
import {
  Collapse,
  Form,
  Input,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import logo from "../assets/logo.svg";
import axiosClient from "./../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile hamburger
  const [searchOpen, setSearchOpen] = useState(false); // search expand toggle
  const [userDropDownOpen, setUserDropDownOpen] = useState(false); // for user profile
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const toggle = () => setIsOpen(!isOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleUserDropdown = () => {
    setUserDropDownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axiosClient.get("/logout");
      setUser(null);
      toast.success("Logged out Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed, please try again");
    }
  };

  return (
    <div className="shadow-sm">
      <Navbar expand="md" className="px-3">
        <NavbarBrand tag={RouterLink} to="/">
          <img src={logo} alt="Shopfront" style={{ height: 36 }} />
        </NavbarBrand>

        {searchOpen ? (
          // Search open: nav gayab, search bar poori width le leta hai
          <Form className="d-flex align-items-center gap-2 flex-grow-1 ms-4">
            <Input
              type="search"
              placeholder="Search products..."
              autoFocus
              className="flex-grow-1"
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={toggleSearch}
              aria-label="Close search"
            >
              <FiX size={18} />
            </button>
          </Form>
        ) : (
          <>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mx-auto fw-bold gap-4" navbar>
                <NavItem>
                  <NavLink tag={RouterLink} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RouterLink} to="/product">
                    Product
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RouterLink} to="/cart">
                    Cart
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RouterLink} to="/checkout">
                    Checkout
                  </NavLink>
                </NavItem>
              </Nav>

              {/* position: relative ab is poore row par hai, taake dropdown isi ke andar align ho */}
              <div
                className="d-flex align-items-center gap-3 mt-3 mt-md-0 ms-md-3"
                style={{ position: "relative" }}
              >
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={toggleSearch}
                  aria-label="Open search"
                >
                  <FiSearch size={18} />
                </button>

                <FiUser
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={toggleUserDropdown}
                />

                {userDropDownOpen && (
                  <>
                    {/* Invisible overlay to close dropdown on outside click */}
                    <div
                      onClick={() => setUserDropDownOpen(false)}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 10px)",
                        right: 0,
                        minWidth: 180,
                        maxWidth: "calc(100vw - 40px)",
                        background: "white",
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                        zIndex: 1000,
                        padding: "8px 0",
                      }}
                    >
                      <div
                        style={{
                          padding: "10px 16px",
                          cursor: "pointer",
                          color: "#333",
                        }}
                        onClick={() => {
                          setUserDropDownOpen(false);
                          navigate("/profile");
                        }}
                      >
                        Your Account
                      </div>
                      <hr style={{ margin: "4px 0" }} />
                      <div
                        style={{
                          padding: "10px 16px",
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={() => {
                          setUserDropDownOpen(false);
                          handleLogout();
                        }}
                      >
                        Logout
                      </div>
                    </div>
                  </>
                )}

                <NavLink tag={RouterLink} to="/cart">
                  <FiShoppingCart size={20} />
                </NavLink>
              </div>
            </Collapse>
          </>
        )}
      </Navbar>
    </div>
  );
};

export default Header;
