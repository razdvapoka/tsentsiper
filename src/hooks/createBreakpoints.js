import { useEffect, useState, useMemo } from "react"

const createBreakpoints = (
  breakpoints = { laptopL: 1440, laptop: 1024, tablet: 768 }
) => () => {
  const [screen, setScreen] = useState(0)

  useEffect(() => {
    const setSideScreen = () => {
      setScreen(window.innerWidth)
    }
    setSideScreen()
    window.addEventListener("resize", setSideScreen)
    return () => {
      window.removeEventListener("resize", setSideScreen)
    }
  })
  const sortedBreakpoints = useMemo(
    () => Object.entries(breakpoints).sort((a, b) => (a[1] >= b[1] ? 1 : -1)),
    []
  )
  const result = sortedBreakpoints.reduce((acc, [name, width]) => {
    if (screen >= width) {
      return name
    } else {
      return acc
    }
  }, sortedBreakpoints[0][0])
  return result
}

export default createBreakpoints
