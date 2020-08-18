import "@/styles/index.styl"

import { FixedBottom } from "react-fixed-bottom"
import { graphql } from "gatsby"
import React from "react"
import { useIntl } from "gatsby-plugin-intl"

import Menu from "../components/menu"
import Projects from "../components/projects"
import SEO from "../components/seo"

const IndexPage = ({ data: { contentfulPage: pageData }, pathContext }) => {
  const intl = useIntl()
  return (
    <div>
      <SEO
        lang={pathContext.language}
        title={intl.formatMessage({ id: "tsentsiper" })}
        description={pageData.description}
        url={intl.formatMessage({ id: "url" })}
      />
      <Projects projects={pageData.projects} />
      <FixedBottom>
        <Menu description={pageData.description} />
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
