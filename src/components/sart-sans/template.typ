#let template(weight) = {
  return body => {
    set page(width: auto, height: auto, margin: 0pt, fill: none)
    set text(font: "Sart Sans", weight: weight, fill: black)

    body
  }
}

#let ital(c) = {
  set text(features: ("ital", ))
  c
}
