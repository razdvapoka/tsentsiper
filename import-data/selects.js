const data = require("./data.json")

const c_ru = new Set()
const c_en = new Set()
const t_ru = new Set()
const t_en = new Set()

data.forEach(d => {
  c_ru.add(d.Category_ru)
  c_en.add(d.Category_en)
  t_ru.add(d.Type_ru)
  t_en.add(d.Type_en)
})

console.log(c_ru)
console.log(c_en)
console.log(t_ru)
console.log(t_en)
