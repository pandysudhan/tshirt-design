import Input from "../components/loginComponents/inputField";
import { useState } from "react";
import { Button } from "flowbite-react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/browseComponents/ProductCard";

function OrderPage() {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");
  const accessToken = localStorage.getItem("access_token");

  const location = useLocation();
  const productData = location.state?.data;

  console.log(productData);

  const handleSubmit = async () => {
    const manufacturer_email = productData.manufacturer_email;
    const design_id = productData.id;

    console.log(manufacturer_email)
    const payload = {
      "manufacturer_email": manufacturer_email,
      "design_id": design_id,
      "design_name": productData.product_name,
      "shippingAddress": shippingAddress,
      "quantity": qty,
    };

    const response = await fetch("http://127.0.0.1:8000/order_design", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to fetch my designs");
      return;
    } else {
      console.log("Order placed successfully");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ProductCard data={productData} />

      <div className="container mx-auto max-w-screen-sm my-30">
        <Input
          handleChange={(e) => setName(e.target.value)}
          value={name}
          labelText="Name"
          labelFor={"Name"}
          id="name"
          name="name"
          type="name"
          isRequired={true}
          placeholder="Name"
        />
        <Input
          handleChange={(e) => setQty(e.target.value)}
          value={qty}
          labelText="qty"
          labelFor={"qty"}
          id="qty"
          qty="qty"
          type="qty"
          isRequired={true}
          placeholder="Quantity"
        />
        <Input
          handleChange={(e) => setShippingAddress(e.target.value)}
          value={shippingAddress}
          labelText="Shipping Address"
          labelFor={"Shipping Address"}
          id="Shipping Address"
          name="Shipping Address"
          type="Shipping Address"
          isRequired={true}
          placeholder="Shipping Address"
        />

        <Button onClick={handleSubmit}>Order</Button>
      </div>
    </div>
  );
}
export default OrderPage;
