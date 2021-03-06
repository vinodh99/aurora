import React from "react";
import { PropTypes } from "prop-types";
import { smallLarge } from "./iconConstants";
import { themes } from "../../theme";

const clearIcons = {
  small: (color, children, props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
    >
      {children}
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="16" height="16" />
        <path
          fill={color}
          {...color !== "currentColor" && { fillOpacity: ".65" }}
          fillRule="nonzero"
          d="M8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 Z M8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 Z M10.3131133,4.97977994 C10.4972082,4.79568503 10.8047379,4.80473785 11,5 C11.1952621,5.19526215 11.204315,5.50279181 11.0202201,5.68688672 L5.68688672,11.0202201 C5.50279181,11.204315 5.19526215,11.1952621 5,11 C4.80473785,10.8047379 4.79568503,10.4972082 4.97977994,10.3131133 L10.3131133,4.97977994 Z M4.97977994,5.68688672 C4.79568503,5.50279181 4.80473785,5.19526215 5,5 C5.19526215,4.80473785 5.50279181,4.79568503 5.68688672,4.97977994 L11.0202201,10.3131133 C11.204315,10.4972082 11.1952621,10.8047379 11,11 C10.8047379,11.1952621 10.4972082,11.204315 10.3131133,11.0202201 L4.97977994,5.68688672 Z"
        />
      </g>
    </svg>
  ),
  large: (color, children, props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      {children}
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          fill={color}
          {...color !== "currentColor" && { fillOpacity: ".65" }}
          fillRule="nonzero"
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 1C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm3.89-15.596a.5.5 0 0 1 .706.707l-8.485 8.485a.5.5 0 0 1-.707-.707l8.485-8.485zm-8.486.707a.5.5 0 0 1 .707-.707l8.485 8.485a.5.5 0 0 1-.707.707L7.404 8.111z"
        />
      </g>
    </svg>
  )
};

const ClearIcon = ({ size, color, children, ...props }) =>
  clearIcons[size](color, children, props);

ClearIcon.displayName = "ClearIcon";

ClearIcon.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(smallLarge),
  color: PropTypes.string
};

ClearIcon.defaultProps = {
  children: null,
  size: smallLarge[1],
  color: themes.global.gray01
};

export default ClearIcon;
