import classNames from "classnames";
import "./HeadLine.css";

const HeadLine = ({
  tag = "h1",
  displayedAs = "h1",
  className,
  children,
  ...props
}) => {
  const Element = tag;
  return (
    <Element
      className={classNames("headline", `headline--${displayedAs}`, className)}
      {...props}
    >
      {children}
    </Element>
  );
};

export default HeadLine;
