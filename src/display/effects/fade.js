// fade.js
import "./fade.css"
export function fadeIn(el) {
  el.classList.add("effect-fade-in")
  el.classList.remove("effect-fade-out")
}

export function fadeOut(el) {
  el.classList.add("effect-fade-out")
  el.classList.remove("effect-fade-in")
}
 