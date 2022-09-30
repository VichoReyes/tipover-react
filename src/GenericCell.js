import {darkColors} from "./constants";

export function GenericCell({color, type, playerHere}) {
  let style = {borderColor: "#787878"};
  let className = ""

  let player = ""
  if (playerHere) {
    player = <div className={"h-2/3 w-2/3 rounded-lg border border-2 border-white m-auto bg-red-600 motion-safe:animate-spin"}/>
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
  return <td style={style} className={`${className} w-10 h-10 md:w-14 md:h-14 border-solid border-8`}>{player}</td>;
}