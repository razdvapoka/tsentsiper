import { useMeasure } from "react-use"
import React, { useState, useRef } from "react"
import useOnClickOutside from "use-onclickoutside"
import styles from "./styles.module.styl"
import cn from "classnames"
import Logo from "../../icons/logo.inline.svg"
import { useIntl } from "gatsby-plugin-intl"

const Menu = ({ isVisible }) => {
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()
  const ref = useRef(null)
  const [innerMenuRef, { height }] = useMeasure()
  const close = () => {
    setIsOpen(false)
  }
  useOnClickOutside(ref, close)
  return (
    <div
      className={cn(
        "fixed z-50",
        styles.menuWrapper,
        isVisible ? styles.menuWrapperVisible : styles.menuWrapperHidden,
        {
          [styles.menuOpen]: isOpen,
        }
      )}
      ref={ref}
      onClick={() => !isOpen && setIsOpen(true)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <nav className={cn("bg-blue text-white text-center", styles.menu)}>
        <div className={cn("absolute", styles.logoBox)}>
          <Logo />
        </div>
        <div className="cursor-default">
          {intl.formatMessage({ id: "tsentsiper" })}
        </div>
        <div
          className={cn("overflow-hidden", styles.menuInner)}
          style={{
            height: isOpen ? height : 0,
          }}
        >
          <div ref={innerMenuRef}>
            <div className={cn("opacity-0", styles.menuUpper)}>
              <a
                className={cn(
                  "block pb-1 text-purple hover:text-white",
                  styles.contact
                )}
                href="mailto:hello@tsentsiper.com"
              >
                {intl.formatMessage({ id: "contact" })}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Menu
