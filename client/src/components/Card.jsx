import PropTypes from "prop-types";

const Card = ({ children, bg = "bg-gray-100" }) => {
  return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
};

// Define prop types for validation
Card.propTypes = {
  children: PropTypes.node.isRequired, // children can be any renderable React node
  bg: PropTypes.string, // bg is a string for CSS classes
};

export default Card;
