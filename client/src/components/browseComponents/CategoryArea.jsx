import ProductCard from "./ProductCard";

export default function CategoryArea({ products }) {
  console.log(products)

  return (
    <div className="flex flex-row space-x-6">
      {products.map((product) => {

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
