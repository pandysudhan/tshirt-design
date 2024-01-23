import allProducts from "../assets/productData/allProducts";
import CategoryArea from "../components/browseComponents/CategoryArea";

function BrowseDesignPage() {
  return (
    <div className="flex flex-col">
      <div className="my-5">
        <h1 className="text-4xl font-bold text-blue-500"> Individual</h1>
        <CategoryArea products={allProducts[0]}></CategoryArea>
      </div>
      <div className="my-5">
      <h1 className="text-4xl font-bold text-blue-500"> Bundle</h1>
        <CategoryArea products={allProducts[1]}></CategoryArea>
      </div>
    </div>
  );
}

export default BrowseDesignPage;
