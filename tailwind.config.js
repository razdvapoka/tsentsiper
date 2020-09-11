const sequence = length => Array.from(Array(length).keys())

const spacing = sequence(20).reduce(
  (s, i) => ({
    ...s,
    [i]: `${i * 4}px`,
  }),
  {}
)

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    screens: {},
    colors: {
      black: "rgba(38,38,38,1)",
      grey: "rgba(38,38,38,0.4)",
      blue: "rgba(42,36,224,1)",
      white: "rgba(255,255,255,1)",
      purple: "rgba(153,170,255,1)",
      palePurple: "rgba(153,170,255,0.4)",
      hoverGrey: "#E4E4ED",
      hoverPaleGrey: "#F2F2F7",
      activeGrey: "#D5D5E0",
    },
    spacing,
    extend: {},
  },
  variants: {
    backgroundColor: ["hover", "focus", "active"],
  },
  plugins: [],
}
