import Img from "gatsby-image"
import React, { useState } from "react"
import cn from "classnames"

import ArrowLeftXL from "../../icons/arrow-left-xl.inline.svg"
import ArrowRightXL from "../../icons/arrow-right-xl.inline.svg"
import VideoItem from "./video-item"
import styles from "./styles.module.styl"

const ASPECT_RATIO = 700 / 420

const Buttons = ({
  itemCount,
  currentItemIndex,
  setCurrentItemIndex: _setCurrentItemIndex,
}) => {
  const [cursor, setCursor] = useState(null)
  const handleMouseMove = (e, component) => {
    setCursor({
      x: e.clientX,
      y: e.clientY,
      component,
    })
  }
  const hasNextItem = currentItemIndex !== itemCount - 1 && itemCount > 1
  const hasPrevItem = currentItemIndex !== 0

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
            styles.buttonPrev
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
            currentItemIndex === 0 ? styles.buttonNextOnly : styles.buttonNext
          )}
          onClick={() => setCurrentItemIndex(currentItemIndex + 1)}
          onMouseMove={e => handleMouseMove(e, ArrowRightXL)}
          onMouseLeave={() => setCursor(null)}
        />
      )}
    </React.Fragment>
  )
}

const Caption = ({ currentItemIndex, gallery, videoCaption }) => {
  const currentItem = gallery[currentItemIndex]
  return (
    <div className={cn("flex justify-between text-caption", styles.caption)}>
      <div className="cursor-default">{`${currentItem.caption}${
        currentItem.video ? ` (${videoCaption})` : ""
      }`}</div>
      <div className="cursor-default">{`${currentItemIndex + 1}/${
        gallery.length
      }`}</div>
    </div>
  )
}

const GalleryItem = ({ item, isCurrentItem, setVideoCaption }) => {
  return (
    <div className={styles.imgBox}>
      {item.video ? (
        <div
          className={cn({ "relative z-50": isCurrentItem })}
          style={{ width: 700, height: 420 }}
        >
          <VideoItem
            src={item.video.file.url}
            setCaption={setVideoCaption}
            isCurrentItem={isCurrentItem}
          />
        </div>
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

    const currentItem = gallery[currentItemIndex]

    return (
      <div
        className={cn("overflow-hidden relative", styles.gallery, {
          [styles.galleryOpen]: isOpen,
        })}
        style={{ height: isOpen ? caseHeight : 0 }}
      >
        <Buttons
          itemCount={gallery.length}
          currentItemIndex={currentItemIndex}
          setCurrentItemIndex={setCurrentItemIndex}
        />
        <div ref={ref} className={cn("flex", styles.galleryContent)}>
          <div>
            <div
              className={cn("relative flex", styles.galleryInner)}
              style={{
                left: `-${currentItemIndex * 700 + 24 * currentItemIndex}px`,
              }}
            >
              {gallery.map((item, itemIndex) => (
                <GalleryItem
                  key={itemIndex}
                  item={item}
                  isCurrentItem={itemIndex === currentItemIndex}
                  setVideoCaption={setVideoCaption}
                />
              ))}
            </div>
            <Caption
              currentItemIndex={currentItemIndex}
              gallery={gallery}
              videoCaption={videoCaption}
            />
          </div>
        </div>
      </div>
    )
  }
)

export default Gallery
