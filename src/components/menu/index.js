import React, { useState, useRef } from "react"
import useOnClickOutside from "use-onclickoutside"
import styles from "./styles.module.styl"
import cn from "classnames"
import Logo from "../../icons/logo.inline.svg"
import Typograf from "../typograph"
import { useIntl } from "gatsby-plugin-intl"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"

const Menu = ({ description, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()
  const ref = useRef(null)
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
    >
      <nav className={cn("bg-blue text-white text-center", styles.menu)}>
        <div className={cn("absolute", styles.logoBox)}>
          <Logo />
        </div>
        <div className="cursor-default">
          {intl.formatMessage({ id: "tsentsiper" })}
        </div>
        <div className={cn("h-0 overflow-hidden", styles.menuInner)}>
          <div className={cn("opacity-0", styles.menuUpper)}>
            <a
              className={cn(
                "block mt-1 py-1 text-purple hover:text-white",
                styles.contact
              )}
              href="mailto:hello@tsentsiper.com"
            >
              {intl.formatMessage({ id: "contact" })}
            </a>
            <IntlContextConsumer>
              {({ languages, language }) => (
                <button
                  className={cn(
                    "w-full py-1 text-purple hover:text-white",
                    styles.language
                  )}
                  onClick={() => {
                    changeLocale(language === "ru" ? "en" : "ru")
                  }}
                >
                  {intl.formatMessage({ id: "lang" })}
                </button>
              )}
            </IntlContextConsumer>
            <hr className={cn("border-palePurple", styles.menuSeparator)} />
          </div>
          <Typograf
            className={cn(
              "opacity-0 px-2 cursor-default",
              styles.menuDescription
            )}
            onClick={close}
          >
            {description}
          </Typograf>
        </div>
      </nav>
    </div>
  )
}

export default Menu
