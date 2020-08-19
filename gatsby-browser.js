import React from "react"
import { FontsLoadedProvider } from "./src/fonts-loaded-context"

export const wrapRootElement = ({ element }) => {
  return <FontsLoadedProvider>{element}</FontsLoadedProvider>
}
