import classNames from "classnames";
import "./Image.css";

const Image = ({
  alt,
  src,
  width = null,
  height = null,
  className = null,
  fitMode = "contain",
  ...props
}) => {
  return (
    <img
      className={classNames("image", `image--fit-${fitMode}`, className)}
      width={width}
      height={height}
      src={src}
      alt={alt}
      {...props}
    />
  );
};

export default Image;
