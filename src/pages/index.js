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
        description={pageData.seoDescription}
        url={intl.formatMessage({ id: "url" })}
        meta={[
          {
            name: "og:image",
            content: `${process.env.VERCEL_URL}/common-opengraph.png`,
          },
        ]}
      />
      <Projects isVisible={fontsLoaded} projects={pageData.projects} />
      <FixedBottom>
        <Menu isVisible={fontsLoaded} description={pageData.menuAbout} />
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
      title
      menuAbout
      seoDescription
      projects {
        category
        id
        type
        description
        title
        year
        isGalleryVisible
        gallery {
          caption
          image {
            fluid(maxWidth: 700, quality: 100) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          video {
            file {
              url
            }
          }
        }
      }
    }
  }
`

export default IndexPage
