import "@/styles/index.styl"

import FontFaceObserver from "fontfaceobserver"
import { FixedBottom } from "react-fixed-bottom"
import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import { useIntl } from "gatsby-plugin-intl"

import Menu from "../components/menu"
import Projects from "../components/projects"
import SEO from "../components/seo"

const loadFont = font => new FontFaceObserver(font).load()
//const loadFonts = fonts => Promise.all(fonts.map(loadFont))

const IndexPage = ({ data: { contentfulPage: pageData }, pathContext }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const intl = useIntl()
  useEffect(() => {
    loadFont("Favorit Pro Book").then(() => {
      setFontsLoaded(true)
    })
  }, [])
  return (
    <div>
      <SEO
        lang={pathContext.language}
        title={intl.formatMessage({ id: "tsentsiper" })}
        description={pageData.description}
        url={intl.formatMessage({ id: "url" })}
      />
      <Projects isVisible={fontsLoaded} projects={pageData.projects} />
      <FixedBottom>
        <Menu isVisible={fontsLoaded} description={pageData.description} />
      </FixedBottom>
    </div>
  )
}

export const query = graphql`
  query MainPage($locale: String) {
    contentfulPage(title: { eq: "main" }, node_locale: { eq: $locale }) {
      description
      title
      projects {
        category
        description
        id
        type
        title
        year
      }
    }
  }
`

export default IndexPage
