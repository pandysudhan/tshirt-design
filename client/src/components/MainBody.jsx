import CanvasViewPicker from "./designComponents/canvasViewSelector";
import KanvasArea from "./designComponents/kanvasArea";
import ColorPickerArea from "./designComponents/colorPickerArea";
import tshirtData from "../assets/productData/individual/tshirt";
import { useState } from "react";

function MainBody() {
  const [productData, setProductData] = useState(tshirtData);
  const [currView, setCurrView] = useState(tshirtData.views[0].view_name);

  function handleViewChange(new_view_name) {
    setCurrView(new_view_name);
  }

  function handleProductDataChange(new_data) {
    setProductData(new_data);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <CanvasViewPicker
        all_views={tshirtData.views}
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
