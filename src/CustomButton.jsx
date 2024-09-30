/* eslint-disable react/prop-types */

export default function CustomButton({
  bgColor,
  hoverColor,
  padding,
  height,
  width,
  textColor,
  onClick,
  children,
  disabled,
}) {
  return (
    <button
      className={`${bgColor} ${hoverColor} ${padding} ${height} ${width} ${textColor} font-semibold rounded-md transition-all   ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
