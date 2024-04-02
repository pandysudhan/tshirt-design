import ProductCard from "./ProductCard";

export default function CategoryArea({ products }) {
  return (
    <div className="flex flex-row space-x-6">
    
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          ></ProductCard>
        ))}
    </div>
  );
}
