import { useState, useEffect } from "react";
import CategoryArea from "../components/browseComponents/CategoryArea";
import allProducts from "../assets/productData/allProducts";
import { ManufacturerPage } from "../pages/manufacturerPage";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

function BrowseDesignPage() {
  const [myDesigns, setMyDesigns] = useState([]);
  const [user_type, setUserType] = useState("");
  const [manufacturerDesigns, setManufacturerDesigns] = useState([]);
  const navigate = useNavigate();

  const fetchMyDesigns = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const user_type_updated = localStorage.getItem("user_type");
      setUserType(user_type_updated);

      console.log(accessToken);
      if (
        accessToken === undefined ||
        !accessToken ||
        accessToken == "undefined"
      ) {
        console.log("Access token not found in local storage");
        setMyDesigns([]);

        navigate("/login");

        return;
      }

      // Fetch my designs from the API using the access token
      else {
        if (user_type === "customer") {
          console.log("User is a customer");

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

          // get manufacturer designs
          const response2 = await fetch("http://127.0.0.1:8000/get_presets", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response2.ok) {
            console.error("Failed to fetch my designs");
            return;
          }

          const data2 = await response2.json();
          console.log("data2.designs");
          console.log(data2.designs);
          setManufacturerDesigns(data2.designs);

          return;
        } else if (user_type === "manufacturer") {
        }
      }
    } catch (error) {
      console.error("Error fetching my designs:", error);
    }
  };

  useEffect(() => {
    fetchMyDesigns();
  }, [user_type]);

  const handleMyOrdersClick = () => {
    // Redirect to the orders page
    // You can use the navigate function from the react-router-dom
    navigate("/my_orders");
  };

  return (
    <div>
      {(user_type === null || user_type === "customer") && (
        <div className="flex flex-col">
          <div className="my-5">
            <h1 className="text-4xl font-bold text-blue-500 my-5">
              Choose a Design
            </h1>
            <CategoryArea products={manufacturerDesigns}></CategoryArea>
          </div>
          {myDesigns.length > 0 && (
            <div className="my-5">
              <h1 className="text-4xl font-bold text-blue-500 my-5">
                My Custom Edits
              </h1>
              <CategoryArea products={myDesigns}></CategoryArea>
              <Button  className="mt-10" onClick={handleMyOrdersClick}>View My Orders</Button>
            </div>
          )}
        </div>
      )}

      {user_type === "manufacturer" && <ManufacturerPage></ManufacturerPage>}
    </div>
  );
}

export default BrowseDesignPage;
