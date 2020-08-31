import Img from "gatsby-image"
import React, { useState } from "react"
import cn from "classnames"

import ArrowLeftXL from "../../icons/arrow-left-xl.inline.svg"
import ArrowRightXL from "../../icons/arrow-right-xl.inline.svg"
import VideoItem from "./video-item"
import styles from "./styles.module.styl"

const ASPECT_RATIO = 700 / 420

const Gallery = ({
  isOpen,
  gallery,
  currentItemIndex,
  setCurrentItemIndex: _setCurrentItemIndex,
  caseHeight,
}) => {
  const [videoCaption, setVideoCaption] = useState(null)
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
    if (index === gallery.length - 1 || index === 0) {
      setCursor(null)
    }
  }

  const currentItem = gallery[currentItemIndex]
  const hasNextItem =
    currentItemIndex !== gallery.length - 1 && gallery.length > 1
  const hasPrevItem = currentItemIndex !== 0

  return (
    <div
      className={cn("overflow-hidden relative", styles.gallery, {
        [styles.galleryOpen]: isOpen,
      })}
      style={{ height: isOpen ? caseHeight : 0 }}
    >
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
      <div className={cn("flex h-full", styles.galleryContent)}>
        <div>
          <div
            className={cn("relative flex", styles.galleryInner)}
            style={{
              left: `-${currentItemIndex * 700 + 24 * currentItemIndex}px`,
            }}
          >
            {gallery.map((item, itemIndex) => {
              const isCurrentItem = itemIndex === currentItemIndex
              return (
                <div key={itemIndex} className={styles.imgBox}>
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
                      fluid={{ ...item.image.fluid, aspectRatio: ASPECT_RATIO }}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <div
            className={cn("flex justify-between text-caption", styles.caption)}
          >
            <div>{currentItem.caption}</div>
            <div>
              {currentItem.video
                ? videoCaption
                : `${currentItemIndex + 1}/${gallery.length}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
