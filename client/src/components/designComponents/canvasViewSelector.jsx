import { Button } from "flowbite-react";

function CanvasViewPicker({ currView, all_views, onViewChange }) {
  let btnColor = "red";

  return (
    <div className="flex flex-row mt-2 justify-center">
      {all_views.map((item) => {
        if (item.view_name === currView) {
          btnColor = "success";
        } else {
          btnColor = "red";
        }

        return (
          <Button
            key={item.view_name}
            color={btnColor}
          
            onClick={() => {
              onViewChange(item.view_name);
            }}
          >
            {item.view_name}
          </Button>
        );
      })}
    </div>
  );
}

export default CanvasViewPicker;
