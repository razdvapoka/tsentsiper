import React, { useEffect, createContext, useContext, useState } from "react"
import FontFaceObserver from "fontfaceobserver"

const loadFont = font => new FontFaceObserver(font).load()
//const loadFonts = fonts => Promise.all(fonts.map(loadFont))

const FontsLoadedContext = createContext({
  fontsLoaded: false,
  setFontsLoaded: () => {},
})

export const FontsLoadedProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    loadFont("Favorit Pro Book").then(() => {
      setFontsLoaded(true)
    })
  }, [])

  return (
    <FontsLoadedContext.Provider value={{ fontsLoaded, setFontsLoaded }}>
      {children}
    </FontsLoadedContext.Provider>
  )
}

export const useFontsLoaded = () => useContext(FontsLoadedContext)
