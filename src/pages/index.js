import "@/styles/index.styl"

import { FixedBottom } from "react-fixed-bottom"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import React from "react"

import { FontsLoadedProvider, useFontsLoaded } from "../fonts-loaded-context"
import Menu from "../components/menu"
import Projects from "../components/projects"
import SEO from "../components/seo"

const IndexPageInner = ({ pageData, pageContext }) => {
  const intl = useIntl()
  const { fontsLoaded } = useFontsLoaded()
  return (
    <div>
      <SEO
        lang={pageContext.language}
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

const IndexPage = ({ data: { contentfulPage: pageData }, pageContext }) => (
  <FontsLoadedProvider>
    <IndexPageInner pageData={pageData} pageContext={pageContext} />
  </FontsLoadedProvider>
)

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
        gallery {
          caption
          image {
            fluid(maxWidth: 700, quality: 100) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`

export default IndexPage
