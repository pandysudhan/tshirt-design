import { use, useState } from "react";
import { Button } from "flowbite-react";

function content() {
  const site_title = "jwt practice";
  const [name, setName] = useState("sudhan");
  function handleClick() {
    console.log(name);
    if (name == "sudhan") {
      setName("pandey");
    } else {
      setName("sudhan");
    }
  }
  return (
    <div>
    </div>
  );
}

export default content;
