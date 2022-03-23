import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ImageLoader({ loaderStyle, loaderWidth, loaderHeight, ...props }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {
        <img
          {...props}
          onLoad={() => setLoaded(true)}
          style={loaded ? {} : { display: "none" }}
        />
      }
      {!loaded && (
        <div
          style={{
            ...loaderStyle,
            width: loaderWidth || props.width || "100%",
            height: loaderHeight || props.height || "100%",
          }}
        >
          <Skeleton width="100%" height="100%" />
        </div>
      )}
    </>
  );
}

export default ImageLoader;
