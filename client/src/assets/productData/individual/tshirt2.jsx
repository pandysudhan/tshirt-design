const tshirtData = {
  isPreset:true,
  manufacturer_name: "Hello World2",
  id:2,
  product_type: "tshirt",
  product_name: "T-shirt2",
  thumbnail: "/productThumbnails/tshirt.png",
  num_of_parts: 4,
  num_of_views: 1,
  colors: [
    {
      id: "front_main_color",
      display_name: "Front Main Body Color",
      color_value: "#000000",
    },
    {
      id: "sleeves_color",
      display_name: "Sleeves Color",
      color_value: "#ffffff",
    },
    {
      id: "back_main_color",
      display_name: "Back Main Body Color",
      color_value: "#000000",
    },
  ],
  views: [
    {
      view_name: "Front View",
      parts: [
        {
          name: "front_main",
          color: "front_main_color",
          //   coordinates in [x,y, x,y] form
          coordinates: [
            98, 62, 99, 78, 101, 97, 103, 134, 103, 151, 102, 169, 98, 197, 93,
            216, 90, 224, 78, 245, 68, 255, 56, 263, 47, 267, 46, 268, 46, 597,
            47, 599, 65, 600, 78, 602, 98, 604, 111, 605, 124, 606, 172, 604,
            257, 604, 289, 605, 332, 606, 357, 604, 382, 600, 394, 599, 394,
            268, 382, 262, 374, 256, 364, 245, 355, 230, 347, 215, 342, 191,
            339, 160, 338, 139, 339, 103, 340, 91, 341, 80, 344, 62, 330, 57,
            310, 50, 292, 43, 287, 55, 275, 84, 259, 108, 244, 123, 221, 135,
            197, 122, 189, 116, 182, 110, 178, 104, 168, 87, 157, 64, 152, 50,
            151, 39, 144, 42, 124, 50, 99, 60, 98, 62,
          ],
        },
        {
          name: "back_main",
          color: "back_main_color",
          coordinates: [],
        },
        {
          name: "left_sleeve",
          color: "sleeves_color",
          coordinates: [
            356, 69, 354, 88, 352, 108, 351, 133, 351, 163, 354, 193, 362, 218,
            370, 227, 374, 235, 379, 239, 383, 242, 387, 247, 392, 250, 394,
            251, 394, 256, 395, 262, 395, 266, 394, 268, 380, 261, 368, 250,
            352, 226, 342, 191, 339, 127, 341, 88, 345, 64, 345, 63, 351, 63,
            355, 65, 356, 66, 357, 68, 356, 70,
          ],
        },
        {
          name: "right_sleeve",
          color: "sleeves_color",
          coordinates: [
            85, 67, 87, 92, 89, 111, 91, 149, 89, 174, 85, 203, 80, 215, 69,
            232, 60, 242, 47, 250, 46, 268, 68, 256, 81, 241, 92, 223, 104, 178,
            104, 150, 104, 122, 101, 85, 99, 68, 99, 61, 93, 64, 86, 65, 85, 66,
          ],
        },
      ],
      images: [],
    },

    {
      view_name: "Back View",
      parts: [
        {
          name: "front_main",
          color: "front_main_color",
          //   coordinates in [x,y, x,y] form
          coordinates: [],
        },
        {
          name: "back_main",
          color: "back_main_color",
          coordinates: [
            98, 62, 99, 78, 101, 97, 103, 134, 103, 151, 102, 169, 98, 197, 93,
            216, 90, 224, 78, 245, 68, 255, 56, 263, 47, 267, 46, 268, 46, 597,
            47, 599, 65, 600, 78, 602, 98, 604, 111, 605, 124, 606, 172, 604,
            257, 604, 289, 605, 332, 606, 357, 604, 382, 600, 394, 599, 394,
            268, 382, 262, 374, 256, 364, 245, 355, 230, 347, 215, 342, 191,
            339, 160, 338, 139, 339, 103, 340, 91, 341, 80, 344, 62, 330, 57,
            310, 50, 292, 43, 287, 55, 275, 84, 259, 108, 244, 123, 221, 135,
            197, 122, 189, 116, 182, 110, 178, 104, 168, 87, 157, 64, 152, 50,
            151, 39, 144, 42, 124, 50, 99, 60, 98, 62,
          ],
        },
        {
          name: "left_sleeve",
          color: "sleeves_color",
          coordinates: [
            356, 69, 354, 88, 352, 108, 351, 133, 351, 163, 354, 193, 362, 218,
            370, 227, 374, 235, 379, 239, 383, 242, 387, 247, 392, 250, 394,
            251, 394, 256, 395, 262, 395, 266, 394, 268, 380, 261, 368, 250,
            352, 226, 342, 191, 339, 127, 341, 88, 345, 64, 345, 63, 351, 63,
            355, 65, 356, 66, 357, 68, 356, 70,
          ],
        },
        {
          name: "right_sleeve",
          color: "sleeves_color",
          coordinates: [
            85, 67, 87, 92, 89, 111, 91, 149, 89, 174, 85, 203, 80, 215, 69,
            232, 60, 242, 47, 250, 46, 268, 68, 256, 81, 241, 92, 223, 104, 178,
            104, 150, 104, 122, 101, 85, 99, 68, 99, 61, 93, 64, 86, 65, 85, 66,
          ],
        },
      ],
      images: [],
    },
  ],
};

export default tshirtData;
