import React from "react"
import styles from "./styles.module.styl"
import cn from "classnames"
import { useIntl } from "gatsby-plugin-intl"
import tp from "../../typograf"
import ArrowRight from "../../icons/arrow-right-s.inline.svg"

const Typograf = ({ children, ...rest }) => (
  <div {...rest} dangerouslySetInnerHTML={{ __html: tp.execute(children) }} />
)

const ProjectRow = ({
  number,
  client,
  project,
  category,
  type,
  children,
  className,
  hasGallery,
  ...rest
}) => (
  <div
    className={cn(
      "flex items-start",
      styles.row,
      { "hover:bg-hoverGrey active:bg-activeGrey": hasGallery },
      className
    )}
    {...(hasGallery
      ? {
          role: "button",
          tabIndex: "0",
        }
      : {})}
    {...rest}
  >
    <div class={cn("flex items-start", styles.numberClientBox)}>
      <div className="relative">
        {hasGallery && (
          <div className={cn("absolute", styles.arrowBox)}>
            <ArrowRight />
          </div>
        )}
        <Typograf className={styles.number}>{number}</Typograf>
      </div>
      <Typograf className={styles.client}>{client}</Typograf>
    </div>
    <Typograf className={styles.project}>{project}</Typograf>
    <Typograf className={styles.category}>{category}</Typograf>
    <Typograf className={styles.type}>{type}</Typograf>
  </div>
)

const Projects = ({ projects, isVisible }) => {
  const intl = useIntl()
  return (
    <div
      className={cn(
        styles.container,
        isVisible ? "opacity-100" : "opacity-0",
        "pt-4 text-black"
      )}
    >
      <ProjectRow
        className="text-grey"
        number={intl.formatMessage({ id: "number" })}
        client={intl.formatMessage({ id: "client" })}
        project={intl.formatMessage({ id: "project" })}
        category={intl.formatMessage({ id: "category" })}
        type={intl.formatMessage({ id: "type" })}
      />
      {projects.map((project, projectIndex) => {
        const number = projects.length - projectIndex
        const paddedNumber = number <= 9 ? `0${number}` : `${number}`
        return (
          <ProjectRow
            key={project.id}
            number={paddedNumber}
            client={project.title}
            project={project.description}
            category={project.category}
            type={project.type}
            hasGallery
          />
        )
      })}
      <div className={cn("text-grey", styles.bottom)}>
        {intl.formatMessage(
          {
            id: "bottom",
          },
          { year: new Date().getFullYear() }
        )}
      </div>
    </div>
  )
}

export default Projects
