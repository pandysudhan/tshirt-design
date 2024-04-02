import { useEffect, useRef } from "react";
import Konva from "konva";

export default function KanvasArea({ data, onDataChange, currView }) {
  const layerRef = useRef(null);
  const stageRef = useRef(null);
  const colorData = data.colors;

  const currViewData = data.views.find((view) => view.view_name === currView);
  const currViewImages = currViewData.images || [];

  function onImagePositionChange(imgIdx, position, size) {
 
    const updatedImages = currViewImages.map((image, index) => {
      if (index === imgIdx) {
        return { ...image, position: position, size: size };
      }
      return image;
    });

    const updatedViewData = { ...currViewData, images: updatedImages };
    const updatedViews = data.views.map((view) =>
      view.view_name === currView ? updatedViewData : view
    );

    const updatedData = { ...data, views: updatedViews };
    onDataChange(updatedData);

    console.log("changed position of img " + imgIdx, position);
    console.log(updatedData);
  }

  const drawImageOnCanvas = (idx, img) => {
    const layer = layerRef.current;
  
    const width = img.size ? img.size.width : 80;
    const height = img.size ? img.size.height : 80;
  
    console.log("this is image data"+img.img_data);

    const imageObj = new window.Image();
  
    // Set the src attribute to the Base64 string
    imageObj.src = img.img_data;

    const konvaImage = new Konva.Image({
      image: imageObj,
      width: width,
      height: height,
      x: img.position.x,
      y: img.position.y,
      draggable: true,

    });
  
    konvaImage.on("dragstart", function () {
      this.moveToTop();
      layer.draw();
    });
  
    konvaImage.on("dragend", function () {
      onImagePositionChange(idx, { x: this.x(), y: this.y() }, { width: this.width(), height: this.height() });
    });
  
    layer.add(konvaImage);
  
    // Add Transformer
    const transformer = new Konva.Transformer({
      nodes: [konvaImage],
      keepRatio: true, // Maintain aspect ratio while resizing
      padding: 10, // Add padding to handle transparent boundaries
      boundBoxFunc: function (oldBox, newBox) {
        // Limit resizing to canvas boundaries
        if (newBox.width < 10 || newBox.height < 10) {
          return oldBox;
        }
        return newBox;
      },
      visible: false, // Initially hide transformer
    });
  
    layer.add(transformer);
  
    // Handle click event on the image
    konvaImage.on('mousedown', (e) => {
      transformer.visible(!transformer.visible());
      layer.draw();
    });
  
    transformer.on('transformend', () => {
      const updatedSize = { width: transformer.width(), height: transformer.height() };
      onImagePositionChange(idx, { x: konvaImage.x(), y: konvaImage.y() }, updatedSize);
    });
  
    layer.draw();
  };
  

  useEffect(() => {
    const stage = new Konva.Stage({
      container: "stage-container",
      width: 437,
      height: 622,
      fill: 'transparent',

    });
    stageRef.current = stage;

    const layer = new Konva.Layer();
    layerRef.current = layer;

    for (const productPart of currViewData.parts) {
      const fill_color = colorData.find((item) => item.id === productPart.color);

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

    const currViewData_ = data.views.find((view) => view.view_name === currView);
    const currViewImages_ = currViewData_.images || [];

    for (const [idx, img] of currViewImages_.entries()) {
      drawImageOnCanvas(idx, img);
    }

    stage.add(layer);

    return () => {
      layer.destroy();
      stage.destroy();
    };
  }, [data, currView]);

  return (
    <div>
      <div id="stage-container"></div>
    </div>
  );
}