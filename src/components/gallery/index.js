import React, { useRef, useState, useEffect } from "react"
import Img from "gatsby-image"
import cn from "classnames"
import ArrowLeftXL from "../../icons/arrow-left-xl.inline.svg"
import ArrowRightXL from "../../icons/arrow-right-xl.inline.svg"
import Play from "../../icons/play.inline.svg"

import styles from "./styles.module.styl"

const ASPECT_RATIO = 700 / 420

const VideoItem = ({ src, setCaption }) => {
  const ref = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = () => ref.current.play()
  const pause = () => ref.current.pause()

  const setPlayOn = () => setIsPlaying(true)
  const setPlayOff = () => setIsPlaying(false)

  useEffect(() => {
    if (ref.current) {
      const videoRef = ref
      videoRef.current.addEventListener("pause", setPlayOff)
      videoRef.current.addEventListener("play", setPlayOn)
      return () => {
        videoRef.current.removeEventListener("pause", setPlayOff)
        videoRef.current.removeEventListener("play", setPlayOn)
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current.readyState > 0) {
        const minutes = parseInt(ref.current.duration / 60, 10)
        const seconds = Math.round(ref.current.duration % 60)
        setCaption(`${minutes}:${seconds}`)
        clearInterval(interval)
      }
    }, 200)
    return () => {
      clearInterval(interval)
    }
  }, [setCaption])

  return (
    <div className="relative h-full">
      {!isPlaying && (
        <button
          className="absolute left-0 top-0 w-full h-full flex items-center
                    justify-center z-20"
          onClick={play}
        >
          <Play className={styles.play} />
        </button>
      )}
      <video
        onClick={pause}
        ref={ref}
        className={cn("h-full", styles.video)}
        src={src}
        loop
      ></video>
    </div>
  )
}

const Gallery = ({
  isOpen,
  gallery,
  currentItemIndex,
  setCurrentItemIndex,
  caseHeight,
}) => {
  const [videoCaption, setVideoCaption] = useState(null)
  return (
    <div
      className={cn("overflow-hidden relative", styles.gallery, {
        [styles.galleryOpen]: isOpen,
      })}
      style={{ height: isOpen ? caseHeight : 0 }}
    >
      {currentItemIndex !== 0 && (
        <button
          className={cn(
            "absolute left-0 flex items-center justify-center text-white z-10",
            styles.button,
            styles.buttonPrev
          )}
          onClick={() => setCurrentItemIndex(currentItemIndex - 1)}
        >
          <ArrowLeftXL className={styles.arrow} />
        </button>
      )}
      {currentItemIndex !== gallery.length - 1 && gallery.length > 1 && (
        <button
          className={cn(
            "absolute right-0 flex items-center justify-center text-white z-10",
            styles.button,
            currentItemIndex === 0 ? styles.buttonNextOnly : styles.buttonNext
          )}
          onClick={() => setCurrentItemIndex(currentItemIndex + 1)}
        >
          <ArrowRightXL className={styles.arrow} />
        </button>
      )}
      <div className={cn("flex h-full", styles.galleryContent)}>
        <div>
          <div
            className={cn("flex", styles.galleryInner)}
            style={{
              transform: `translateX(-${
                currentItemIndex * 700 + 24 * currentItemIndex
              }px)`,
            }}
          >
            {gallery.map((item, itemIndex) => (
              <div key={itemIndex} className={styles.imgBox}>
                {item.video ? (
                  <VideoItem
                    src={item.video.file.url}
                    setCaption={setVideoCaption}
                  />
                ) : (
                  <Img
                    className={styles.img}
                    fluid={{ ...item.image.fluid, aspectRatio: ASPECT_RATIO }}
                  />
                )}
              </div>
            ))}
          </div>
          <div
            className={cn("flex justify-between text-caption", styles.caption)}
          >
            <div>{gallery[currentItemIndex].caption}</div>
            <div>
              {videoCaption || `${currentItemIndex + 1}/${gallery.length}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
