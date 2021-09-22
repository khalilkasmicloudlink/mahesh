import React from "react";
import { API } from "../config";
import { Image } from "react-bootstrap"

const ShowImage = ({ item, url }) => (
  // <div className="img-thubnail">
  //   <div className="col sm-4">
  //   <img
  //     src={`${url}`}
  //     alt={item.name}
  //     className="mx-auto img-thumbnail"
  //     style={{ height: "auto", width: "auto" }}
  //   />
  // </div>
  // </div>

  <Image src={`${url}`} alt={item.name} fluid />
);


export default ShowImage;