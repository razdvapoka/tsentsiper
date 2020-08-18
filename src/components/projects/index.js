import React from "react"
import styles from "./styles.module.styl"
import cn from "classnames"
import { useIntl } from "gatsby-plugin-intl"
import tp from "../../typograf"

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
  ...rest
}) => (
  <div className={cn("flex", styles.row, className)} {...rest}>
    <Typograf className={styles.number}>{number}</Typograf>
    <Typograf className={styles.client}>{client}</Typograf>
    <Typograf className={styles.project}>{project}</Typograf>
    <Typograf className={styles.category}>{category}</Typograf>
    <Typograf className={styles.type}>{type}</Typograf>
  </div>
)

const Projects = ({ projects }) => {
  const intl = useIntl()
  return (
    <div className={cn(styles.container, "pt-6 pb-8 px-11 text-black")}>
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
        />
      ))}
      <div className="mt-15 text-grey">
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
