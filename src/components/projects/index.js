import { useIntl } from "gatsby-plugin-intl"
import React, { useState } from "react"
import cn from "classnames"

import ProjectRow from "./project-row"
import styles from "./styles.module.styl"

const Projects = ({ projects, isVisible }) => {
  const intl = useIntl()
  const [openProjectIndex, setOpenProjectIndex] = useState(null)
  const [openProjectCaseHeight, setOpenProjectCaseHeight] = useState(null)
  return (
    <div
      className={cn(
        styles.container,
        isVisible ? "opacity-100" : "opacity-0",
        "pt-4 text-black"
      )}
    >
      <ProjectRow
        className="text-grey pointer-events-none"
        number={intl.formatMessage({ id: "number" })}
        client={intl.formatMessage({ id: "client" })}
        project={intl.formatMessage({ id: "project" })}
        deliverables={intl.formatMessage({ id: "deliverables" })}
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
            isGalleryVisible={project.isGalleryVisible}
            gallery={project.gallery}
            openProjectIndex={openProjectIndex}
            setOpenProjectIndex={setOpenProjectIndex}
            projectIndex={projectIndex}
            openProjectCaseHeight={openProjectCaseHeight}
            setOpenProjectCaseHeight={setOpenProjectCaseHeight}
            deliverables={project.deliverables}
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
