
import CanvasViewPicker from "../components/designComponents/canvasViewSelector";
import KanvasArea from "../components/designComponents/kanvasArea";
import ColorPickerArea from "../components/designComponents/colorPickerArea";
import { useState } from "react";

function DesignProductPage({productData}) {
  const [productData, setProductData] = useState(productData);
  const [currView, setCurrView] = useState(productData.views[0].view_name);

  function handleViewChange(new_view_name) {
    setCurrView(new_view_name);
  }

  function handleProductDataChange(new_data) {
    setProductData(new_data);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <CanvasViewPicker
        all_views={productData.views}
        onViewChange={handleViewChange}
      ></CanvasViewPicker>
      <div className="flex flex-row">
        {" "}
        <KanvasArea data={productData} currView={currView}></KanvasArea>
        <div className="flex flex-col justify-center">
          <ColorPickerArea
            data={productData}
            onDataChange={handleProductDataChange}
          ></ColorPickerArea>
        </div>
      </div>
    </div>
  );
}

export default MainBody;
