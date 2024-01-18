import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
  } from "flowbite-react";
  import { useState } from "react";
  
  function Component() {
    const [name, setName] = useState("sudhan");
    function handleClick(name) {
      console.log(name);
      if (name == "sudhan") {
        setName("pandey");
      }
      else{
          setName("sudhan")
      }
    }
  
    return (
      <Navbar fluid rounded>
        <NavbarBrand href="https://flowbite-react.com">
          <img
            src="../public/vite.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            MASS Merchandise
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button
            onClick={() => {
              handleClick("get started");
            }}
          >
            Get started
          </Button>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="#" active>
            Home
          </NavbarLink>
          <NavbarLink href="#">About</NavbarLink>
          <NavbarLink href="#">Services</NavbarLink>
          <NavbarLink href="#">Pricing</NavbarLink>
          <NavbarLink href="#">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    );
  }
  
  export default Component;
  