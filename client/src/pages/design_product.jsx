import CanvasViewPicker from "../components/designComponents/canvasViewSelector";
import KanvasArea from "../components/designComponents/kanvasArea";
import ColorPickerArea from "../components/designComponents/colorPickerArea";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

function DesignProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.data;
  const [productData, setProductData] = useState(data);
  const [currView, setCurrView] = useState(productData.views[0].view_name);

  function handleViewChange(new_view_name) {
    setCurrView(new_view_name);
  }

  function handleProductDataChange(new_data) {
    setProductData(new_data);
  }

  return (
    <div className="flex flex-col">
      {" "}
      <Button className="w-40 mx-10"
        onClick={() => {
          navigate('/');
        }}
        
      > {"<= Back"}</Button>
      <div className="flex flex-col justify-center items-center">
        <CanvasViewPicker
        currView  = {currView}
          all_views={productData.views}
          onViewChange={handleViewChange}
        ></CanvasViewPicker>
        <div className="flex flex-row">
          {" "}
          <KanvasArea data={productData} onDataChange={handleProductDataChange} currView={currView}></KanvasArea>
          <div className="flex flex-col justify-center">
            <ColorPickerArea
              data={productData}
              onDataChange={handleProductDataChange}
              currView = {currView}
            ></ColorPickerArea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignProductPage;
