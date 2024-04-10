import React, { useState, useEffect } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Component() {
  const navigate = useNavigate();

  // State to track whether access token is set or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect to check if access token is present in local storage on component mount
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (
      accessToken !== null &&
      accessToken !== undefined &&
      accessToken !== "" &&
      accessToken !== "undefined"
    ) {
      setIsLoggedIn(true);
    }
  });

  // Function to handle logout
  const handleLogout = () => {
    // Clear access token from local storage or wherever it is stored
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_type");

    // Set isLoggedIn to false
    setIsLoggedIn(false);
    console.log("Logged out");
    window.location.reload();
  };

  // Function to handle login
  const handleLogin = () => {
    // Perform login actions (e.g., redirect to login page)
    navigate("/login");
  };

  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <img
          src="../public/vite.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Tshirt Design
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {/* Conditionally render either logout or login button */}
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={handleLogin}>Login</Button>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Component;
