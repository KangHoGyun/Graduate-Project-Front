import React, {useState} from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  var tmp = []
  tmp = props;
  return (
    <div>
      <Carousel autoplay>
        {tmp.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "150px" }}
              src={image}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );


  // return (
  //   <div>
  //       {
  //       props?props.images?
  //       <Carousel autoplay>
  //           {props.images.map((image, index) => (
  //               <div key={index}>
  //                   <img
  //                       style={{ width: "100%", maxHeight: "150px" }}
  //                       src={image}
  //                   />
  //               </div>
  //           ))}
  //       </Carousel>
  //       :"error1":"error2"
  //        }
  //   </div>
  // );
  
}

export default ImageSlider;
