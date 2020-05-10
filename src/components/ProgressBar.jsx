import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const ProgressBar = withStyles({
  root: {
    color: "#007bff",
    height: 8,
    paddingTop: "0px",
    marginBottom: "5px",
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default ProgressBar;
