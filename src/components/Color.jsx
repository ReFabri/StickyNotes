import { PropTypes } from "prop-types";

function Color({ color }) {
  const changeColor = () => {
    document.body.style.backgroundColor = color;
  };

  return (
    <div
      className="color"
      onClick={changeColor}
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
}

Color.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Color;
