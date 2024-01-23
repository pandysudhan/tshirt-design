export default function ProductCard({ product }) {
  const handleProductClick = (product_name) => {
    console.log(product_name + " clicked");
  };
  return (
    <div
      className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg "
      onClick={() => {
        handleProductClick(product.product_name);
      }}
    >
      <img src={product.thumbnail} width="100" height="100"></img>
      <h1 className="text-2xl font-bold text-black-500 text-center">
        {" "}
        {product.product_name}
      </h1>
    </div>
  );
}
