import CanvasViewPicker from "../components/designComponents/canvasViewSelector";
import KanvasArea from "../components/designComponents/kanvasArea";
import ColorPickerArea from "../components/designComponents/colorPickerArea";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

function DesignProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.data;
  const [productData, setProductData] = useState(data);
  const [currView, setCurrView] = useState(productData.views[0].view_name);
  const [name, setName] = useState(productData.product_name);

  function handleViewChange(new_view_name) {
    setCurrView(new_view_name);
  }

  function handleProductDataChange(new_data) {
    setProductData(new_data);
  }

  // Function to handle saving design
  const handleSaveDesign = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found in local storage");
        // Handle error if needed, e.g., redirect to login page
        return;
      }

      // Generate a unique ID
      const uniqueId = uuidv4();

      // Update the productData with the unique ID and name
      const updatedProductData = { ...productData, id: uniqueId, product_name: name };

      console.log(updatedProductData)

      
      // Call your API to save the design with updatedProductData
      const response = await fetch("http://127.0.0.1:8000/save_design", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // Add bearer token header
        },
        body: JSON.stringify(updatedProductData),
      });

      // Handle response if needed
      if (response.ok) {
        console.log(await response.json());
        console.log("Design saved successfully");
        // Optionally, you can navigate to a different page after successful save
        // navigate('/success');
      } else {
        console.error("Failed to save design");
        // Handle error if needed
      }
    } catch (error) {
      console.error("Error saving design:", error);
      // Handle error if needed
    }
    navigate('/');
  };

  // Function to handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <Button className="w-40 mx-10" onClick={() => navigate('/')}>{"<= Back"}</Button>
      <div className="flex flex-col justify-center items-center">
        Design Name: <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter Product Name"
          className="my-2 px-2 py-1 border border-gray-300 rounded-md"
        />
        <CanvasViewPicker currView={currView} all_views={productData.views} onViewChange={handleViewChange}></CanvasViewPicker>
        <div className="flex flex-row">
          <KanvasArea data={productData} onDataChange={handleProductDataChange} currView={currView}></KanvasArea>
          <div className="flex flex-col justify-center">
            <ColorPickerArea data={productData} onDataChange={handleProductDataChange} currView={currView}></ColorPickerArea>
          </div>
        </div>
        <Button className="w-40 mx-10" onClick={handleSaveDesign}>Save Design</Button>
      </div>
    </div>
  );
}

export default DesignProductPage;
