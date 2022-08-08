import {darkColors} from "./constants";

export function GenericCell({color, type, playerHere}) {
  let style = {borderColor: "#787878"};
  let className = ""

  let player = ""
  if (playerHere) {
    player = <div className={"player-icon"}/>
  }

  if (color) {
    style.borderColor = color

    if (type === "standing") {
      style.color = color
      style.backgroundColor = darkColors[color]
      className = "pattern-triangles-sm"
    } else if (type === "fall-base") {
      style.backgroundColor = darkColors[color]
    }
  }
  return <td style={style} className={className}>{player}</td>;
}