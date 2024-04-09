import Input from "../components/loginComponents/inputField";
import { useState } from "react";
import { Button} from "flowbite-react";
import { useLocation } from 'react-router-dom';
import ProductCard from "../components/browseComponents/ProductCard";


function OrderPage() {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");

  const location = useLocation();
  const productData = location.state?.data;

  console.log(productData)

const handleSubmit = async () => {}

    
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
