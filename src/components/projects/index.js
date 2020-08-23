import { animate, easeInOut, updateScroll, withEase, withTime } from "framez"
import { useIntl } from "gatsby-plugin-intl"
import React, { useState, useRef } from "react"
import cn from "classnames"

import ArrowRight from "../../icons/arrow-right-s.inline.svg"
import Gallery from "../gallery"
import createBreakpoints from "../../hooks/createBreakpoints"
import styles from "./styles.module.styl"
import tp from "../../typograf"

const OFFSET_TOP = 11

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
  gallery,
  projectIndex,
  openProjectIndex,
  setOpenProjectIndex,
  caseHeight,
  ...rest
}) => {
  const ref = useRef(null)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)

  const isOpen = projectIndex === openProjectIndex
  const isProjectAboveOpen =
    openProjectIndex !== null && openProjectIndex < projectIndex

  const toggle = () => {
    const targetY = isOpen
      ? lastScrollY
      : window.scrollY +
        ref.current.getBoundingClientRect().top -
        OFFSET_TOP -
        (isProjectAboveOpen ? caseHeight : 0)
    if (!isOpen) {
      setLastScrollY(window.scrollY - (isProjectAboveOpen ? caseHeight : 0))
    }
    setOpenProjectIndex(isOpen ? null : projectIndex)
    requestAnimationFrame(() => {
      animate(
        withTime(400),
        withEase(easeInOut()),
        updateScroll({
          targetY,
        })
      )()
    })
  }

  const hasGallery = !!gallery

  return (
    <React.Fragment>
      <div
        ref={ref}
        className={cn(
          "flex items-start hover:bg-hoverGrey",
          styles.row,
          { "active:bg-activeGrey": hasGallery },
          className
        )}
        {...(hasGallery
          ? {
              role: "button",
              tabIndex: "0",
              onClick: toggle,
            }
          : {})}
        {...rest}
      >
        <div className={cn("flex items-start", styles.numberClientBox)}>
          <div className="relative">
            {hasGallery && (
              <div
                className={cn("absolute", styles.arrowBox, {
                  [styles.arrowBoxOpen]: isOpen,
                })}
              >
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
      {hasGallery && (
        <Gallery
          isOpen={isOpen}
          gallery={gallery}
          currentItemIndex={currentItemIndex}
          setCurrentItemIndex={setCurrentItemIndex}
          caseHeight={caseHeight}
        />
      )}
    </React.Fragment>
  )
}

const useBreakpoints = createBreakpoints({ XL: 1200, L: 768, S: 350 })
const getCaseHeight = breakpoint => {
  switch (breakpoint) {
    case "XL":
      return 513
    default:
      return 513
  }
}

const Projects = ({ projects, isVisible }) => {
  const intl = useIntl()
  const [openProjectIndex, setOpenProjectIndex] = useState(null)
  const breakpoint = useBreakpoints()
  const caseHeight = getCaseHeight(breakpoint)
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
            gallery={project.gallery}
            openProjectIndex={openProjectIndex}
            setOpenProjectIndex={setOpenProjectIndex}
            projectIndex={projectIndex}
            caseHeight={caseHeight}
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
