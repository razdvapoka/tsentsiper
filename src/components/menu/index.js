import React from "react"
import styles from "./styles.module.styl"
import cn from "classnames"
import Logo from "../../icons/logo.inline.svg"
import { useIntl } from "gatsby-plugin-intl"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"

const Menu = ({ description }) => {
  const intl = useIntl()
  return (
    <nav
      className={cn("fixed bg-blue text-white text-center px-4", styles.menu)}
    >
      <div className={cn("absolute", styles.logoBox)}>
        <Logo />
      </div>
      <div>{intl.formatMessage({ id: "tsentsiper" })}</div>
      <div className={cn("h-0 opacity-0 overflow-hidden", styles.menuInner)}>
        <a
          className="block mt-1 py-1 text-purple hover:text-white"
          href="mailto:hello@tsentsiper.com"
        >
          {intl.formatMessage({ id: "contact" })}
        </a>
        <IntlContextConsumer>
          {({ languages, language }) => (
            <button
              className="w-full py-1 text-purple hover:text-white"
              onClick={() => {
                changeLocale(language === "ru" ? "en" : "ru")
              }}
            >
              {intl.formatMessage({ id: "lang" })}
            </button>
          )}
        </IntlContextConsumer>
        <hr className="border-palePurple my-4" />
        <div className="px-2 mb-2">{description}</div>
      </div>
    </nav>
  )
}

export default Menu
