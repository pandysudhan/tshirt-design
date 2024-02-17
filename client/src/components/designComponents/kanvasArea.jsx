import { useEffect } from "react";
import Konva from "konva";

export default function KanvasArea({ data, currView }) {
  const layer = new Konva.Layer();
  const currViewData = data.views.find((view) => view.view_name === currView);
  const colorData = data.colors;

  useEffect(() => {
    console.log("from konva");

    const stage = new Konva.Stage({
      container: "stage-container",
      width: 437,
      height: 622,
    });

    for (const productPart of currViewData.parts) {


      const fill_color = colorData.find(
        (item) => item.id === productPart.color
      );




      const tempPart = new Konva.Line({
        points: productPart.coordinates,
        closed: true,
        fill: fill_color.color_value,
        stroke: "black",
        strokeWidth: 1.5,
        draggable: false,
      });
      layer.add(tempPart);
    }
    stage.add(layer);
  });

  return (
    <div>
      <div id="stage-container" ></div>
    </div>
  );
}
