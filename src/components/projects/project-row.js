import { animate, easeInOut, updateScroll, withEase, withTime } from "framez"
import React, { useCallback, useState, useRef, useEffect } from "react"
import cn from "classnames"

import ArrowRight from "../../icons/arrow-right-s.inline.svg"
import Gallery from "../gallery"
import Typograf from "../typograph"
import styles from "./styles.module.styl"

const OFFSET_TOP = 11

const ProjectRow = ({
  number,
  client,
  project,
  category,
  type,
  deliverables,
  children,
  className,
  gallery,
  isGalleryVisible,
  projectIndex,
  openProjectIndex,
  setOpenProjectIndex,
  openProjectCaseHeight,
  setOpenProjectCaseHeight,
  ...rest
}) => {
  const ref = useRef(null)
  const galleryRef = useRef(null)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [caseHeight, setCaseHeight] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const isOpen = projectIndex === openProjectIndex
  const isProjectAboveOpen =
    openProjectIndex !== null && openProjectIndex < projectIndex

  const toggle = () => {
    setIsTransitioning(true)
    const targetY = isOpen
      ? lastScrollY
      : window.scrollY +
        ref.current.getBoundingClientRect().top -
        OFFSET_TOP -
        (isProjectAboveOpen ? openProjectCaseHeight : 0)
    if (!isOpen) {
      setLastScrollY(
        window.scrollY - (isProjectAboveOpen ? openProjectCaseHeight : 0)
      )
      setOpenProjectCaseHeight(caseHeight)
    }
    setOpenProjectIndex(isOpen ? null : projectIndex)
    requestAnimationFrame(() => {
      animate(
        withTime(400),
        withEase(easeInOut()),
        updateScroll({
          targetY,
        })
      )().then(() => {
        setIsTransitioning(false)
      })
    })
  }

  const handleResize = useCallback(() => {
    const { height } = galleryRef.current.getBoundingClientRect()
    setCaseHeight(height)
    if (isOpen) {
      setOpenProjectCaseHeight(height)
    }
  }, [setCaseHeight, setOpenProjectCaseHeight, isOpen])

  useEffect(() => {
    if (galleryRef.current) {
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [galleryRef, handleResize])

  const hasGallery =
    !!gallery && (process.env.GATSBY_CASES_VISIBLE || isGalleryVisible)

  return (
    <React.Fragment>
      <div
        ref={ref}
        className={cn(
          "flex items-start",
          { "pointer-events-none": isTransitioning },
          !isTransitioning
            ? hasGallery
              ? "hover:bg-hoverGrey active:bg-activeGrey"
              : "hover:bg-hoverPaleGrey"
            : "",
          { [styles.rowEmpty]: !hasGallery },
          styles.row,
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
        <Typograf className={styles.deliverables}>
          {deliverables || ""}
        </Typograf>
      </div>
      {hasGallery && (
        <Gallery
          isOpen={isOpen}
          gallery={gallery}
          currentItemIndex={currentItemIndex}
          setCurrentItemIndex={setCurrentItemIndex}
          caseHeight={caseHeight}
          ref={galleryRef}
        />
      )}
    </React.Fragment>
  )
}

export default ProjectRow
