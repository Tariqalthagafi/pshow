import { stripIn, stripOut } from "./effects/strip.js"
import { cutIn, cutOut } from "./effects/cut.js"
import { fadeIn, fadeOut } from "./effects/fade.js"
import { frostIn, frostOut } from "./effects/frost.js"
import { sliceFlipIn, sliceFlipOut } from "./effects/sliceFlip.js"

export function runEffect(effect, images, oldIndex, newIndex) {
  switch (effect) {
    case "strip":
      stripOut(images[oldIndex])
      stripIn(images[newIndex])
      break

    case "cut":
      cutOut(images[oldIndex])
      cutIn(images[newIndex])
      break

    case "fade":
      fadeOut(images[oldIndex])
      fadeIn(images[newIndex])
      break

    case "frost":
         frostOut(images[oldIndex])
         frostIn(images[newIndex])
         break

    case "sliceflip": 
    const corner = document.querySelector(".slice-corner")
    sliceFlipOut(images[oldIndex], corner)
    sliceFlipIn(images[newIndex])
    break
  }
}
