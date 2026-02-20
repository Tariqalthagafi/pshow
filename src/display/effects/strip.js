// strip.js
import "./strip.css"

export function stripIn(el) {
  el.classList.add("effect-strip-in")
  el.classList.remove("effect-strip-out")
}

export function stripOut(el) {
  el.classList.add("effect-strip-out")
  el.classList.remove("effect-strip-in")
}
