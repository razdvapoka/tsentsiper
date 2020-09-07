import Img from "gatsby-image"
import React, { useState } from "react"
import cn from "classnames"
import { useSwipeable } from "react-swipeable"

import ArrowLeftXL from "../../icons/arrow-left-xl.inline.svg"
import ArrowRightXL from "../../icons/arrow-right-xl.inline.svg"
import VideoItem from "./video-item"
import styles from "./styles.module.styl"
import createBreakpoints from "../../hooks/createBreakpoints"

const ASPECT_RATIO = 700 / 420

const useBreakpoints = createBreakpoints({
  XL: 1440,
  L: 1200,
  M: 870,
  S: 768,
  XS: 320,
})

const getGalleryProps = breakpoint => {
  switch (breakpoint) {
    case "XL":
      return {
        gap: "0px",
        leftPad: "0px",
        slideWidth: "881px",
      }
    case "L":
      return {
        slideWidth: "878px",
        gap: "24px",
        leftPad: "calc(275px + (100vw - 1200px) / 2)",
      }
    case "M":
      return {
        gap: "24px",
        leftPad: "275px",
      }
    case "S":
      return {
        gap: "24px",
        leftPad: "263px",
      }
    case "XS":
    default:
      return {
        gap: "16px",
        leftPad: "24px",
      }
  }
}

const Buttons = ({
  itemCount,
  hasNextItem,
  hasPrevItem,
  currentItemIndex,
  setCurrentItemIndex: _setCurrentItemIndex,
  isVideo,
}) => {
  const [cursor, setCursor] = useState(null)
  const handleMouseMove = (e, component) => {
    setCursor({
      x: e.clientX,
      y: e.clientY,
      component,
    })
  }

  const setCurrentItemIndex = index => {
    _setCurrentItemIndex(index)
    if (index === itemCount - 1 || index === 0) {
      setCursor(null)
    }
  }

  return (
    <React.Fragment>
      {cursor && (
        <cursor.component
          className={cn(styles.arrow, "fixed z-50 pointer-events-none")}
          style={{ left: cursor.x, top: cursor.y }}
        />
      )}
      {hasPrevItem && (
        <button
          className={cn(
            "absolute left-0 text-white z-10",
            styles.button,
            isVideo
              ? styles.buttonPrevVideo
              : currentItemIndex === itemCount - 1
              ? styles.buttonPrevOnly
              : styles.buttonPrev
          )}
          onClick={() => setCurrentItemIndex(currentItemIndex - 1)}
          onMouseMove={e => handleMouseMove(e, ArrowLeftXL)}
          onMouseLeave={() => setCursor(null)}
        />
      )}
      {hasNextItem && (
        <button
          className={cn(
            "absolute right-0 text-white z-10",
            styles.button,
            isVideo
              ? styles.buttonNextVideo
              : currentItemIndex === 0
              ? styles.buttonNextOnly
              : styles.buttonNext
          )}
          onClick={() => setCurrentItemIndex(currentItemIndex + 1)}
          onMouseMove={e => handleMouseMove(e, ArrowRightXL)}
          onMouseLeave={() => setCursor(null)}
        />
      )}
    </React.Fragment>
  )
}

const Caption = ({ currentItemIndex, gallery, videoCaption, slideWidth }) => {
  const currentItem = gallery[currentItemIndex]
  const caption = `${currentItem.caption}${
    currentItem.video ? ` (${videoCaption})` : ""
  }`
  const counter = `${currentItemIndex + 1}/${gallery.length}`

  return (
    <div
      className={cn("flex justify-between text-caption", styles.caption)}
      style={{ width: slideWidth }}
    >
      <div className="cursor-default">{caption}</div>
      <div className="cursor-default">{counter}</div>
    </div>
  )
}

const GalleryItem = ({
  item,
  isCurrentItem,
  setVideoCaption,
  slideWidth,
  hasPrevItem,
  hasNextItem,
  setCurrentItemIndex,
  currentItemIndex,
}) => {
  const handlers = useSwipeable({
    onSwipedRight: () =>
      hasPrevItem && setCurrentItemIndex(currentItemIndex - 1),
    onSwipedLeft: () =>
      hasNextItem && setCurrentItemIndex(currentItemIndex + 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  })

  return (
    <div className={styles.slide} style={{ width: slideWidth }} {...handlers}>
      {item.video ? (
        <VideoItem
          src={item.video.file.url}
          poster={item.image.fluid.src}
          setCaption={setVideoCaption}
          isCurrentItem={isCurrentItem}
        />
      ) : (
        <Img
          className={styles.img}
          fluid={{
            ...item.image.fluid,
            aspectRatio: ASPECT_RATIO,
          }}
        />
      )}
    </div>
  )
}

const Gallery = React.forwardRef(
  (
    { isOpen, gallery, currentItemIndex, setCurrentItemIndex, caseHeight },
    ref
  ) => {
    const [videoCaption, setVideoCaption] = useState(null)
    const bp = useBreakpoints()
    const galleryProps = getGalleryProps(bp)
    const slideWidth = galleryProps.slideWidth
      ? galleryProps.slideWidth
      : `calc(100vw - ${galleryProps.leftPad} - 2 * ${galleryProps.gap})`
    const galleryContentShift = `
      calc(
          ${-currentItemIndex} * ${slideWidth} -
          ${currentItemIndex} * ${galleryProps.gap}
      )
    `
    const itemCount = gallery.length
    const currentItem = gallery[currentItemIndex]
    const hasNextItem = currentItemIndex !== itemCount - 1 && itemCount > 1
    const hasPrevItem = currentItemIndex !== 0

    return (
      <div
        className={cn("overflow-hidden relative", styles.gallery, {
          [styles.galleryOpen]: isOpen,
        })}
        style={{
          height: isOpen ? caseHeight : 0,
          paddingLeft: galleryProps.leftPad,
        }}
      >
        <Buttons
          itemCount={itemCount}
          hasNextItem={hasNextItem}
          hasPrevItem={hasPrevItem}
          currentItemIndex={currentItemIndex}
          setCurrentItemIndex={setCurrentItemIndex}
          isVideo={!!currentItem.video}
        />
        <div ref={ref} className={cn("flex", styles.galleryContent)}>
          <div>
            <div
              className={cn("relative flex", styles.galleryInner)}
              style={{
                transform: `translateX(${galleryContentShift})`,
              }}
            >
              {gallery.map((item, itemIndex) => (
                <GalleryItem
                  key={itemIndex}
                  item={item}
                  isCurrentItem={itemIndex === currentItemIndex}
                  setVideoCaption={setVideoCaption}
                  slideWidth={slideWidth}
                  hasNextItem={hasNextItem}
                  hasPrevItem={hasPrevItem}
                  currentItemIndex={currentItemIndex}
                  setCurrentItemIndex={setCurrentItemIndex}
                />
              ))}
            </div>
            <Caption
              currentItemIndex={currentItemIndex}
              gallery={gallery}
              videoCaption={videoCaption}
              slideWidth={slideWidth}
            />
          </div>
        </div>
      </div>
    )
  }
)

export default Gallery
