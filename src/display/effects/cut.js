// cut.js
import "./cut.css"
export function cutIn(el) {
  el.classList.add("effect-cut-in")
  el.classList.remove("effect-cut-out")
}

export function cutOut(el) {
  el.classList.add("effect-cut-out")
  el.classList.remove("effect-cut-in")
}
