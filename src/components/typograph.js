import React from "react"
import tp from "../typograf"

const Typograf = ({ children, ...rest }) => (
  <div {...rest} dangerouslySetInnerHTML={{ __html: tp.execute(children) }} />
)

export default Typograf
