import React, { useState, useRef } from "react"
import useOnClickOutside from "use-onclickoutside"
import styles from "./styles.module.styl"
import cn from "classnames"
import Logo from "../../icons/logo.inline.svg"
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
    <nav
      ref={ref}
      className={cn(
        "fixed bg-blue text-white text-center",
        isVisible ? styles.menuVisible : styles.menuHidden,
        styles.menu,
        { [styles.menuOpen]: isOpen }
      )}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      <div className={cn("absolute", styles.logoBox)}>
        <Logo />
      </div>
      <div>{intl.formatMessage({ id: "tsentsiper" })}</div>
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
          <hr className="border-palePurple my-4" />
        </div>
        <div
          className={cn("opacity-0 px-2", styles.menuDescription)}
          onClick={close}
        >
          {description}
        </div>
      </div>
    </nav>
  )
}

export default Menu
