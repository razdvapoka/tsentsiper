import React from "react"
import styles from "./styles.module.styl"
import cn from "classnames"
import { useIntl } from "gatsby-plugin-intl"
import tp from "../../typograf"
import ArrowRight from "../../icons/arrow-right-s.inline.svg"

const Typograf = ({ children, ...rest }) => (
  <div {...rest}>{tp.execute(children)}</div>
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
      "flex items-start px-11",
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
    <div className="relative">
      {hasGallery && (
        <div className={cn("absolute", styles.arrowBox)}>
          <ArrowRight />
        </div>
      )}
      <Typograf className={styles.number}>{number}</Typograf>
    </div>
    <Typograf className={styles.client}>{client}</Typograf>
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
        "pt-4 pb-8 text-black"
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
      {projects.map((project, projectIndex) => (
        <ProjectRow
          key={project.id}
          number={projects.length - projectIndex}
          client={project.title}
          project={project.description}
          category={project.category}
          type={project.type}
          hasGallery
        />
      ))}
      <div className="mt-15 text-grey px-11">
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
