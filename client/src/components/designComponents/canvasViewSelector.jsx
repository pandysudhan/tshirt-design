import { Button } from "flowbite-react";

function CanvasViewPicker({ all_views, onViewChange }) {
  return (
    <div className="flex flex-row mt-10 justify-center" >
      {all_views.map((item) => (
        <Button key={item.view_name}  className="mx-5"
          onClick={() => {
            onViewChange(item.view_name);
          }}
        >{item.view_name}</Button>
      ))}
    </div>
  );
}

export default CanvasViewPicker;
