import { useState, useEffect } from "react";
import CategoryArea from "../components/browseComponents/CategoryArea";
import allProducts from "../assets/productData/allProducts";

function BrowseDesignPage() {
  const [myDesigns, setMyDesigns] = useState([]);

  useEffect(() => {
    const fetchMyDesigns = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          console.log("Access token not found in local storage");
          return;
        }

        // Fetch my designs from the API using the access token
        const response = await fetch("http://127.0.0.1:8000/my_designs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch my designs");
          return;
        }

        const data = await response.json();
        setMyDesigns(data.designs);
      } catch (error) {
        console.error("Error fetching my designs:", error);
      }
    };

    fetchMyDesigns();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="my-5">
        <h1 className="text-4xl font-bold text-blue-500 my-5">Choose a Design</h1>
        <CategoryArea products={allProducts[0]}></CategoryArea>
      </div>
      {myDesigns.length > 0 && (
        <div className="my-5">
          <h1 className="text-4xl font-bold text-blue-500 my-5">My Custom Edits</h1>
          <CategoryArea products={myDesigns}></CategoryArea>
        </div>
      )}
    </div>
  );
}

export default BrowseDesignPage;
