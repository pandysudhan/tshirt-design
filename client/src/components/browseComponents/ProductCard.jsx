import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  
  const handleProductClick = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      // Access token not found, redirect to login page
      navigate('/login');
      return;
    }

    // Access token found, navigate to the design page
    navigate('/design', { state: { data: product } });
  };

  return (
    <div
      className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg"
      onClick={handleProductClick}
    >
      <img src={product.thumbnail} width="150" alt="Product Thumbnail"></img>
      <h1 className="text-2xl font-bold text-black-500 text-center">
        {product.product_name}
      </h1>
    </div>
  );
}
