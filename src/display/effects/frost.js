import "./frost.css"

export function frostIn(el) {
  el.classList.add("effect-frost-in")
  el.classList.remove("effect-frost-out")
}

export function frostOut(el) {
  el.classList.add("effect-frost-out")
  el.classList.remove("effect-frost-in")
}
