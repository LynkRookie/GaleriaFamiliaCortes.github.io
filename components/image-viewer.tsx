"use client"

import { useEffect, useCallback, useState, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Download, Play, Pause, Maximize, Minimize } from "lucide-react"
import type { Photo } from "@/lib/gallery-data"

interface ImageViewerProps {
  photos: Photo[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onJumpTo?: (index: number) => void
  music?: string[]
}

// Total time each slide is shown (ms)
const SLIDESHOW_DURATION = 5_000
// Duration of the cross-fade overlap (ms) — must be < SLIDESHOW_DURATION
const FADE_DURATION = 1_500

export default function ImageViewer({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onJumpTo,
  music,
}: ImageViewerProps) {
  const total = photos.length

  // ─────────────────────────────────────────────
  // Cross-fade: two fixed layers (A / B).
  // We swap which layer is "on top" on each navigation.
  // ─────────────────────────────────────────────
  // layerA / layerB hold the photo index each layer is showing
  const [layerA, setLayerA] = useState(currentIndex)
  const [layerB, setLayerB] = useState(currentIndex)
  // which layer is currently on top (fully opaque)
  const [topLayer, setTopLayer] = useState<"A" | "B">("A")
  // whether we are mid-transition
  const [transitioning, setTransitioning] = useState(false)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevIndexRef = useRef(currentIndex)

  // When currentIndex changes, start a cross-fade
  useEffect(() => {
    if (prevIndexRef.current === currentIndex) return
    prevIndexRef.current = currentIndex

    // Cancel any in-flight fade
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)

    // Load the new image into the BOTTOM layer, then bring it to the top
    if (topLayer === "A") {
      // A is on top → load new image into B, then fade A out / B in
      setLayerB(currentIndex)
      // Small delay so the browser paints B before we start fading
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitioning(true)
          setTopLayer("B")
          fadeTimerRef.current = setTimeout(() => setTransitioning(false), FADE_DURATION)
        })
      })
    } else {
      // B is on top → load new image into A, then fade B out / A in
      setLayerA(currentIndex)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitioning(true)
          setTopLayer("A")
          fadeTimerRef.current = setTimeout(() => setTransitioning(false), FADE_DURATION)
        })
      })
    }

    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  // ─────────────────────────────────────────────
  // Slideshow
  // ─────────────────────────────────────────────
  const [isSlideshow, setIsSlideshow] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const slideshowRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stopSlideshow = useCallback(() => {
    if (slideshowRef.current) clearTimeout(slideshowRef.current)
    slideshowRef.current = null
    setIsSlideshow(false)
  }, [])

  // Schedule the next auto-advance
  const currentIndexRef = useRef(currentIndex)
  currentIndexRef.current = currentIndex

  useEffect(() => {
    if (!isSlideshow) return
    setProgressKey((k) => k + 1)

    slideshowRef.current = setTimeout(() => {
      const idx = currentIndexRef.current
      if (idx >= total - 1) {
        stopSlideshow()
      } else {
        onNext()
      }
    }, SLIDESHOW_DURATION)

    return () => {
      if (slideshowRef.current) clearTimeout(slideshowRef.current)
    }
  // Re-run each time a new slide is shown
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSlideshow, currentIndex])

  const toggleSlideshow = useCallback(() => {
    if (isSlideshow) {
      stopSlideshow()
    } else {
      if (currentIndex === total - 1) onJumpTo?.(0)
      setIsSlideshow(true)
    }
  }, [isSlideshow, stopSlideshow, currentIndex, total, onJumpTo])

  // ─────────────────────────────────────────────
  // Fullscreen
  // ─────────────────────────────────────────────
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handleChange)
    return () => document.removeEventListener("fullscreenchange", handleChange)
  }, [])

  // ─────────────────────────────────────────────
  // Music — playlist with 10s gap between tracks, circular loop
  // ─────────────────────────────────────────────
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const musicGapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const trackIndexRef = useRef(0)

  const playTrack = useCallback((index: number) => {
    if (!music || music.length === 0) return
    const audio = audioRef.current
    if (!audio) return
    trackIndexRef.current = index
    audio.src = music[index]
    audio.currentTime = 0
    audio.play().catch(() => {})
  }, [music])

  // Create the audio element once
  useEffect(() => {
    if (!music || music.length === 0) return
    const audio = new Audio(music[0])
    audio.volume = 0.7
    audio.loop = false
    audioRef.current = audio

    // When a track ends, wait 10s then play the next one (circular)
    const handleEnded = () => {
      musicGapTimerRef.current = setTimeout(() => {
        const next = (trackIndexRef.current + 1) % music.length
        playTrack(next)
      }, 10_000)
    }
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
      if (musicGapTimerRef.current) clearTimeout(musicGapTimerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [music])

  // Play / pause with the slideshow
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isSlideshow) {
      playTrack(0)
    } else {
      audio.pause()
      if (musicGapTimerRef.current) clearTimeout(musicGapTimerRef.current)
    }
  }, [isSlideshow, playTrack])

  // ─────────────────────────────────────────────
  // Download
  // ─────────────────────────────────────────────
  const handleDownload = useCallback(async () => {
    const src = photos[currentIndex].src
    try {
      const response = await fetch(src)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = src.split("/").pop() || `foto-${currentIndex + 1}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      window.open(src, "_blank")
    }
  }, [photos, currentIndex])

  // ─────────────────────────────────────────────
  // Keyboard
  // ─────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape")     { stopSlideshow(); onClose() }
      if (e.key === "ArrowLeft")  { stopSlideshow(); onPrev() }
      if (e.key === "ArrowRight") { stopSlideshow(); onNext() }
      if (e.key === " ")          { e.preventDefault(); toggleSlideshow() }
      if (e.key === "f" || e.key === "F") { toggleFullscreen() }
    },
    [onClose, onPrev, onNext, toggleSlideshow, stopSlideshow, toggleFullscreen],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  // Thumbnail strip scroll
  const thumbsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = thumbsRef.current
    if (!container) return
    const active = container.children[currentIndex] as HTMLElement | undefined
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [currentIndex])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (slideshowRef.current)   clearTimeout(slideshowRef.current)
      if (fadeTimerRef.current)   clearTimeout(fadeTimerRef.current)
      if (musicGapTimerRef.current) clearTimeout(musicGapTimerRef.current)
      audioRef.current?.pause()
    }
  }, [])

  // Caption for the currently visible photo
  const caption = photos[currentIndex].caption ?? photos[currentIndex].alt

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de imagen"
    >
      {/* ── Slideshow progress bar ── */}
      {isSlideshow && (
        <div className="absolute top-0 left-0 right-0 z-20 h-0.5 bg-white/10">
          <div
            key={progressKey}
            className="slideshow-progress h-full origin-left bg-primary"
            style={{ animationDuration: `${SLIDESHOW_DURATION}ms` }}
          />
        </div>
      )}

      {/* ── Top bar ── */}
      <div className="flex shrink-0 items-center justify-between px-5 py-4">
        <span className="font-mono text-sm tabular-nums text-white/40">
          {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-2">
          {/* Slideshow toggle */}
          <button
            onClick={toggleSlideshow}
            aria-label={isSlideshow ? "Detener presentación" : "Iniciar presentación"}
            title={isSlideshow ? "Detener presentación (Espacio)" : "Iniciar presentación (Espacio)"}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              isSlideshow
                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {isSlideshow ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            title={isFullscreen ? "Salir de pantalla completa (F)" : "Pantalla completa (F)"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            aria-label="Descargar imagen"
            title="Descargar imagen"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <Download className="h-4 w-4" />
          </button>

          {/* Close */}
          <button
            onClick={() => { stopSlideshow(); onClose() }}
            aria-label="Cerrar visor"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Main image area ── */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">

        {/* Prev button */}
        <button
          onClick={() => { stopSlideshow(); onPrev() }}
          aria-label="Imagen anterior"
          disabled={currentIndex === 0}
          className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-black/80 disabled:pointer-events-none disabled:opacity-20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* ── Cross-fade stack: two permanent layers ── */}
        <div className="relative flex h-full w-full items-center justify-center px-20 py-4">

          {/* Layer A */}
          <div
            className="absolute inset-0 flex items-center justify-center px-20 py-4"
            style={{
              opacity: topLayer === "A" ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
              zIndex: topLayer === "A" ? 2 : 1,
            }}
          >
            <Image
              src={photos[layerA].src}
              alt={photos[layerA].alt}
              width={1400}
              height={1050}
              className="max-h-[calc(100vh-14rem)] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              priority
            />
          </div>

          {/* Layer B */}
          <div
            className="absolute inset-0 flex items-center justify-center px-20 py-4"
            style={{
              opacity: topLayer === "B" ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
              zIndex: topLayer === "B" ? 2 : 1,
            }}
          >
            <Image
              src={photos[layerB].src}
              alt={photos[layerB].alt}
              width={1400}
              height={1050}
              className="max-h-[calc(100vh-14rem)] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              priority
            />
          </div>

          {/* Invisible spacer to keep container height stable */}
          <Image
            src={photos[currentIndex].src}
            alt=""
            aria-hidden="true"
            width={1400}
            height={1050}
            className="invisible max-h-[calc(100vh-14rem)] w-auto max-w-full rounded-xl object-contain"
          />
        </div>

        {/* Next button */}
        <button
          onClick={() => { stopSlideshow(); onNext() }}
          aria-label="Imagen siguiente"
          disabled={currentIndex === total - 1}
          className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-black/80 disabled:pointer-events-none disabled:opacity-20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* ── Caption overlay (bottom of image area) ── */}
        {caption && (
          <div
            className="pointer-events-none absolute bottom-6 left-1/2 z-10 w-full max-w-2xl -translate-x-1/2 px-6"
            style={{ zIndex: 10 }}
          >
            <div className="rounded-xl bg-black/60 px-5 py-3 text-center text-sm leading-relaxed text-white backdrop-blur-sm">
              {caption}
            </div>
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="shrink-0 px-4 pb-5 pt-3">
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((p, i) => (
            <button
              key={p.src}
              onClick={() => { stopSlideshow(); onJumpTo?.(i) }}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                i === currentIndex
                  ? "border-primary opacity-100 scale-105"
                  : "border-transparent opacity-40 hover:opacity-70"
              }`}
            >
              <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="56px" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
