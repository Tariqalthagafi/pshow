import "./sliceFlip.css"

export function sliceFlipIn(el) {
  el.classList.add("effect-slice-in")
  el.classList.remove("effect-slice-out")
}

export function sliceFlipOut(el, cornerEl) {
  el.classList.add("effect-slice-out")
  el.classList.remove("effect-slice-in")

  // تشغيل حركة المثلث
  cornerEl.style.animation = "sliceMove 1s ease-out forwards"
  cornerEl.style.opacity = "1"
}
