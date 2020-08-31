import React, { useRef, useState, useEffect } from "react"
import Play from "../../icons/play.inline.svg"
import styles from "./styles.module.styl"
import cn from "classnames"

const VideoItem = ({ src, setCaption, isCurrentItem }) => {
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
    if (!isCurrentItem) {
      pause()
    }
  }, [isCurrentItem])

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
    <div className="relative h-full w-full">
      {!isPlaying && (
        <button
          className={cn(
            "absolute left-0 top-0 w-full h-full flex items-center justify-center",
            { "z-20": isCurrentItem }
          )}
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

export default VideoItem
