import React from "react"
import styles from "./styles.module.styl"
import cn from "classnames"

const Intro = ({ children, isVisible }) => {
  return (
    <div
      className={cn(styles.introBox, isVisible ? "opacity-100" : "opacity-0")}
    >
      <div className={styles.intro}>{children}</div>
    </div>
  )
}

export default Intro
