import ProductCard from "./ProductCard";

export default function CategoryArea({ products }) {
  console.log("Products:", products); // Log products to check the array

  return (
    <div className="flex flex-row space-x-6">
      {products.map((product) => {
        console.log("Product:", product); // Log each product to check rendering

        return (
          <ProductCard
            key={product.id} // Ensure each ProductCard has a unique key
            data={product}
          />
        );
      })}
    </div>
  );
}
