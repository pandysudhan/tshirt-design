export default function colorPickerArea({ data, onDataChange, currView }) {

  console.log(data)


  function onColorChange(id, new_color) {
    const updatedColors = data.colors.map((color) => {
      if (color.id === id) {
        return { ...color, color_value: new_color };
      }
      return color;
    });

    onDataChange({ ...data, colors: updatedColors });
  }

  function updateImagesForView(img) {
    const updatedViews = data.views.map((view) => {
      if (view.view_name === currView) {
        const updatedImages = [...view.images, { img_data: img, position: { x: 0, y: 0 } }];
        return { ...view, images: updatedImages };
      }
      return view;
    });

    onDataChange({ ...data, views: updatedViews });
  }

  function removeImageFromView(imgIndex) {
    const updatedViews = data.views.map((view) => {
      if (view.view_name === currView) {
        const updatedImages = view.images.filter((_, index) => index !== imgIndex);
        return { ...view, images: updatedImages };
      }
      return view;
    });

    onDataChange({ ...data, views: updatedViews });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      
      const img = reader.result;
      
      updateImagesForView(img);
      
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        {data.colors.map((color) => (
          <div key={"color_picker_div" + color.id} className="flex flex-row my-3">
            <label key={"color_picker_label_" + color.id}>{color.display_name}</label>
            <input
              key={"color_picker_" + color.id}
              type="color"
              value={color.color_value}
              onChange={(e) => {
                onColorChange(color.id, e.target.value);
              }}
            />
            <input
              key={"color_picker_text_" + color.id}
              type="text"
              value={color.color_value}
              onChange={(e) => {
                onColorChange(color.id, e.target.value);
              }}
            />
          </div>
        ))}

        <div id="imgPicker">
          <input type="file" onChange={handleFileChange} />
        </div>

        {data.views.map((view, viewIndex) => (
          view.view_name === currView && view.images.map((image, imgIndex) => (
            <div key={`image_${viewIndex}_${imgIndex}`} className="flex flex-row my-3">
              <img src={image.img_data} alt={`Uploaded ${imgIndex + 1}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
              <button onClick={() => removeImageFromView(imgIndex)}>Remove</button>
            </div>
          ))
        ))}
      </div>
    </div>
  );
}