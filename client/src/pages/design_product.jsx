import CanvasViewPicker from "../components/designComponents/canvasViewSelector";
import KanvasArea from "../components/designComponents/kanvasArea";
import ColorPickerArea from "../components/designComponents/colorPickerArea";
import { useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { Button } from "flowbite-react";
import { v4 as uuidv4 } from "uuid"; // Import UUID library

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

      var uniqueId = productData.id;
      // Generate a unique ID
      if (productData.isPreset) {
        uniqueId = uuidv4();
      }

      // Update the productData with the unique ID and name
      const updatedProductData = {
        ...productData,
        id: uniqueId,
        product_name: name,
        isPreset: false,
      };

      console.log(updatedProductData);

      // Call your API to save the design with updatedProductData
      const response = await fetch("http://127.0.0.1:8000/save_design", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Add bearer token header
        },
        body: JSON.stringify(updatedProductData),
      });

      setProductData(updatedProductData);


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

  };

  const handleSaveAndNavigate = () => {
    handleSaveDesign();
    navigate("/"); // Navigate to home page after saving design
  };

  // Function to handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDeleteDesign = async () => {
    try {
      // Check if access token exists
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found in local storage");
        // Handle error if needed
        return;
      }

      // Call the API to delete the design
      const response = await fetch(
        `http://127.0.0.1:8000/delete_design/${productData.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add bearer token header
          },
        }
      );

      // Handle response if needed
      if (response.ok) {
        console.log(await response.json());
        console.log("Design deleted successfully");
        // Optionally, you can navigate to a different page after successful deletion
        // navigate('/success');
        navigate("/");
      } else {
        console.error("Failed to delete design");
        // Handle error if needed
      }
    } catch (error) {
      console.error("Error deleting design:", error);
      // Handle error if needed
    }
    navigate("/");
  };

  const handleOrderDesign = () => {
    handleSaveDesign();
    navigate("/checkout", { state: { data: productData } });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row items-center justify-center space-x-4">
          <label className="font-bold"> Design Name: </label>{" "}
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter Product Name"
            className="my-2 px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <CanvasViewPicker
          currView={currView}
          all_views={productData.views}
          onViewChange={handleViewChange}
        ></CanvasViewPicker>
        <div className="flex flex-row">
          <KanvasArea
            data={productData}
            onDataChange={handleProductDataChange}
            currView={currView}
          ></KanvasArea>
          <div className="flex flex-col justify-center">
            <ColorPickerArea
              data={productData}
              onDataChange={handleProductDataChange}
              currView={currView}
            ></ColorPickerArea>
          </div>
        </div>
        <div className="flex flex-row">
          <Button className="w-40 mx-10" onClick={handleSaveAndNavigate}>
            Save Design
          </Button>

          {!data.isPreset && (
            <Button
              className="w-40 mx-10 bg-red-400"
              onClick={handleDeleteDesign}
            >
              Delete Design
            </Button>
          )}

          <Button className="w-40 mx-10" onClick={handleOrderDesign}>
            Order Design
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DesignProductPage;
