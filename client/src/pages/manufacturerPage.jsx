import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import CategoryArea from "../components/browseComponents/CategoryArea";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const ManufacturerPage = () => {

  // State for tracking uploaded JSON file
  const [jsonFile, setJsonFile] = useState(null);
  const [myDesigns, setMyDesigns] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setJsonFile(file);
  };

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    // Fetch data when the component mounts

    const fetchData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/manufacturer_designs",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch my designs");
        return;
      }

      const data = await response.json();
      setMyDesigns(data.designs);
      return;
    };

    fetchData();
  }, []);

  // Function to handle uploading JSON file to the server using fetch
  const uploadJsonFile = async () => {
    try {
      if (!jsonFile) {
        alert("Please select a file");
        return;
      }

      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          const response = await fetch(
            "http://127.0.0.1:8000/upload_manufacturer_designs",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              method: "POST",
              body: JSON.stringify(jsonData),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to upload file");
          }

          setJsonFile(null);
          alert("File uploaded successfully");
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("Failed to upload file");
        }
      };

      reader.readAsText(jsonFile);
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Failed to read file");
    }
  };

  const handleMyOrdersClick = () => {
    // Redirect to the orders page
    // You can use the navigate function from the react-router-dom
    navigate("/my_orders");
  };

  return (
    <div>
      <h1>Manufacturer Page</h1>
      <div>
        <h2>My Designs</h2>
        <CategoryArea products={myDesigns}></CategoryArea>
      </div>
      {/* Upload new design section */}
      <div className="my-10">
        <h2>Upload New Design</h2>
        <input type="file" accept=".json" onChange={handleFileUpload} />
        <button onClick={uploadJsonFile}>Upload</button>
      </div>

      {/* My Designs section (You can replace this with your actual designs) */}

      {/* My Orders section (You can replace this with your actual orders) */}
      <div>
        <Button onClick={handleMyOrdersClick}>My Orders</Button>
        {/* Render your orders here */}
      </div>
    </div>
  );
};
