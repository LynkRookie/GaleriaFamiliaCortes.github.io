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
  // musicSections[0] = canciones sección abuelo, musicSections[1] = abuela, etc.
  musicSections?: string[][]
}

// Total time each slide is shown (ms)
// ← AQUI cambias la duración de cada foto en el slideshow
const SLIDESHOW_DURATION = 15_000
// Duration of the cross-fade overlap (ms) — must be < SLIDESHOW_DURATION
const FADE_DURATION = 1_800
// Time the dedicatoria screen stays visible (ms)
const DEDICATORIA_DURATION = 20_000

// ── Helpers para discriminar el tipo de slide ──
function isPhoto(p: Photo): p is Extract<Photo, { src: string }> {
  return !p.type || p.type === "photo"
}
function isDedicatoria(p: Photo): p is Extract<Photo, { type: "dedicatoria" }> {
  return p.type === "dedicatoria"
}

export default function ImageViewer({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onJumpTo,
  musicSections,
}: ImageViewerProps) {
  const total = photos.length

  // ─────────────────────────────────────────────
  // Cross-fade: two fixed layers (A / B).
  // Only used when the current slide is a photo.
  // ─────────────────────────────────────────────
  const [layerA, setLayerA] = useState(currentIndex)
  const [layerB, setLayerB] = useState(currentIndex)
  const [topLayer, setTopLayer] = useState<"A" | "B">("A")
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevIndexRef = useRef(currentIndex)

  // Resolve a safe photo index for a layer (skip dedicatorias)
  const safePhotoIndex = useCallback(
    (idx: number): number => {
      // Walk backwards to find the nearest photo slide
      for (let i = idx; i >= 0; i--) {
        if (isPhoto(photos[i])) return i
      }
      return 0
    },
    [photos]
  )

  useEffect(() => {
    if (prevIndexRef.current === currentIndex) return
    prevIndexRef.current = currentIndex

    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)

    // When it's a dedicatoria we still need to update layers so that after
    // it the photo layers show the right images.
    const safeIdx = safePhotoIndex(currentIndex)

    if (topLayer === "A") {
      setLayerB(safeIdx)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTopLayer("B")
          fadeTimerRef.current = setTimeout(() => {}, FADE_DURATION)
        })
      })
    } else {
      setLayerA(safeIdx)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTopLayer("A")
          fadeTimerRef.current = setTimeout(() => {}, FADE_DURATION)
        })
      })
    }

    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  // ─────────────────────────────────────────────
  // Dedicatoria fade-in state
  // ─────────────────────────────────────────────
  const [dedicatoriaVisible, setDedicatoriaVisible] = useState(false)

  useEffect(() => {
    if (isDedicatoria(photos[currentIndex])) {
      // Small delay so CSS transition triggers
      const t = setTimeout(() => setDedicatoriaVisible(true), 50)
      return () => {
        clearTimeout(t)
        setDedicatoriaVisible(false)
      }
    } else {
      setDedicatoriaVisible(false)
    }
  }, [currentIndex, photos])

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

  const currentIndexRef = useRef(currentIndex)
  currentIndexRef.current = currentIndex

  const currentSlide = photos[currentIndex]
  const currentDuration = isDedicatoria(currentSlide)
    ? DEDICATORIA_DURATION
    : SLIDESHOW_DURATION

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
    }, currentDuration)

    return () => {
      if (slideshowRef.current) clearTimeout(slideshowRef.current)
    }
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
  // Music — per-section playlist with 10s gap, circular loop
  // ─────────────────────────────────────────────
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const musicGapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const trackIndexRef = useRef(0)
  const currentSectionRef = useRef(-1)

  const playTrack = useCallback(
    (sectionIdx: number, trackIdx: number) => {
      if (!musicSections || !musicSections[sectionIdx]?.length) return
      const audio = audioRef.current
      if (!audio) return
      trackIndexRef.current = trackIdx
      audio.src = musicSections[sectionIdx][trackIdx]
      audio.currentTime = 0
      audio.play().catch(() => {})
    },
    [musicSections]
  )

  // Create the audio element once
  useEffect(() => {
    const audio = new Audio()
    audio.volume = 0.7
    audio.loop = false
    audioRef.current = audio

    const handleEnded = () => {
      if (!musicSections) return
      const sec = currentSectionRef.current
      if (sec < 0 || !musicSections[sec]?.length) return
      musicGapTimerRef.current = setTimeout(() => {
        const next = (trackIndexRef.current + 1) % musicSections[sec].length
        playTrack(sec, next)
      }, 10_000)
    }
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
      if (musicGapTimerRef.current) clearTimeout(musicGapTimerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Detect section changes and switch music accordingly
  useEffect(() => {
    if (!isSlideshow || !musicSections) return

    const slide = photos[currentIndex]
    const section =
      isPhoto(slide) && slide.musicSection !== undefined
        ? slide.musicSection
        : currentSectionRef.current

    if (section === currentSectionRef.current) return

    // Section changed — stop current track, start new section from track 0
    if (musicGapTimerRef.current) clearTimeout(musicGapTimerRef.current)
    audioRef.current?.pause()
    currentSectionRef.current = section
    playTrack(section, 0)
  }, [currentIndex, isSlideshow, musicSections, photos, playTrack])

  // Play / pause with the slideshow
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isSlideshow && musicSections) {
      // Find the section of the current slide
      const slide = photos[currentIndex]
      const section =
        isPhoto(slide) && slide.musicSection !== undefined ? slide.musicSection : 0
      currentSectionRef.current = section
      playTrack(section, 0)
    } else {
      audio.pause()
      if (musicGapTimerRef.current) clearTimeout(musicGapTimerRef.current)
      currentSectionRef.current = -1
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSlideshow])

  // ─────────────────────────────────────────────
  // Text-to-Speech (TTS)
  // When slideshow reaches a photo with a caption:
  //   1. Music fades down to 15% over 1.2s
  //   2. Web Speech API reads the caption in natural Spanish
  //   3. Music fades back up to 70% when speech ends
  // ─────────────────────────────────────────────
  const ttsRef = useRef<SpeechSynthesisUtterance | null>(null)

  const fadeVolume = useCallback(
    (from: number, to: number, durationMs: number) => {
      const audio = audioRef.current
      if (!audio) return
      const steps = 30
      const stepTime = durationMs / steps
      const diff = (to - from) / steps
      let current = from
      let count = 0
      const interval = setInterval(() => {
        count++
        current += diff
        audio.volume = Math.max(0, Math.min(1, current))
        if (count >= steps) clearInterval(interval)
      }, stepTime)
    },
    []
  )

  const speakCaption = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return
      window.speechSynthesis.cancel()

      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = "es-ES"
      utter.rate = 0.88   // un poco más lento para que se entienda bien
      utter.pitch = 1.05
      utter.volume = 1

      // Pick a natural-sounding Spanish voice if available
      const voices = window.speechSynthesis.getVoices()
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith("es") &&
          (v.name.toLowerCase().includes("google") ||
            v.name.toLowerCase().includes("mónica") ||
            v.name.toLowerCase().includes("paulina") ||
            v.name.toLowerCase().includes("jorge") ||
            v.name.toLowerCase().includes("lucia") ||
            v.name.toLowerCase().includes("diego"))
      )
      if (preferred) utter.voice = preferred

      utter.onstart = () => {
        fadeVolume(audioRef.current?.volume ?? 0.7, 0.12, 1200)
      }
      utter.onend = () => {
        fadeVolume(audioRef.current?.volume ?? 0.12, 0.7, 1500)
      }

      ttsRef.current = utter
      // Small delay so fade starts smoothly before speech begins
      setTimeout(() => window.speechSynthesis.speak(utter), 300)
    },
    [fadeVolume]
  )

  // Trigger TTS whenever the slide changes during slideshow
  useEffect(() => {
    if (!isSlideshow) {
      window.speechSynthesis?.cancel()
      return
    }
    const slide = photos[currentIndex]
    const text = isPhoto(slide)
      ? (slide.caption ?? "")
      : isDedicatoria(slide)
      ? (slide as Extract<Photo, { type: "dedicatoria" }>).text
      : ""

    if (text.trim()) {
      speakCaption(text)
    } else {
      window.speechSynthesis?.cancel()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isSlideshow])

  // Stop TTS when slideshow stops or viewer closes
  useEffect(() => {
    if (!isSlideshow) window.speechSynthesis?.cancel()
  }, [isSlideshow])

  // ─────────────────────────────────────────────
  // Download (only for photo slides)
  // ─────────────────────────────────────────────
  const handleDownload = useCallback(async () => {
    const slide = photos[currentIndex]
    if (!isPhoto(slide)) return
    try {
      const response = await fetch(slide.src)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = slide.src.split("/").pop() || `foto-${currentIndex + 1}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      if (isPhoto(slide)) window.open(slide.src, "_blank")
    }
  }, [photos, currentIndex])

  // ─────────────────────────────────────────────
  // Keyboard
  // ─────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape")                     { stopSlideshow(); onClose() }
      if (e.key === "ArrowLeft")                  { stopSlideshow(); onPrev() }
      if (e.key === "ArrowRight")                 { stopSlideshow(); onNext() }
      if (e.key === " ")                          { e.preventDefault(); toggleSlideshow() }
      if (e.key === "f" || e.key === "F")         { toggleFullscreen() }
    },
    [onClose, onPrev, onNext, toggleSlideshow, stopSlideshow, toggleFullscreen]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  // Thumbnail scroll
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
      if (slideshowRef.current)       clearTimeout(slideshowRef.current)
      if (fadeTimerRef.current)       clearTimeout(fadeTimerRef.current)
      if (musicGapTimerRef.current)   clearTimeout(musicGapTimerRef.current)
      audioRef.current?.pause()
      window.speechSynthesis?.cancel()
    }
  }, [])

  // Resolve caption for the current photo slide
  const caption = isPhoto(currentSlide) ? (currentSlide.caption ?? "") : ""

  // Safe photo to show in each layer
  const photoA = isPhoto(photos[layerA]) ? (photos[layerA] as Extract<Photo, { src: string }>) : null
  const photoB = isPhoto(photos[layerB]) ? (photos[layerB] as Extract<Photo, { src: string }>) : null

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
            style={{ animationDuration: `${currentDuration}ms` }}
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

          {/* Download — only shown for photo slides */}
          {isPhoto(currentSlide) && (
            <button
              onClick={handleDownload}
              aria-label="Descargar imagen"
              title="Descargar imagen"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <Download className="h-4 w-4" />
            </button>
          )}

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

      {/* ── Main area ── */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">

        {/* ���══════════════════════════════════════════════════════
            PANTALLA DE DEDICATORIA
            Aparece con fade-in cuando el slide actual es tipo "dedicatoria"
        ═══════════════════════════════════════════════════════ */}
        {isDedicatoria(currentSlide) && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center px-8"
            style={{
              background: (currentSlide as Extract<Photo, { type: "dedicatoria" }>).bg ?? "#000",
              opacity: dedicatoriaVisible ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            }}
          >
            <p className="max-w-2xl text-center text-3xl font-light leading-relaxed tracking-wide text-white md:text-4xl lg:text-5xl">
              {(currentSlide as Extract<Photo, { type: "dedicatoria" }>).text
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════
            FOTO — Cross-fade layers A & B
        ═══════════════════════════════════════════════════════ */}
        {/* Prev button */}
        <button
          onClick={() => { stopSlideshow(); onPrev() }}
          aria-label="Imagen anterior"
          disabled={currentIndex === 0}
          className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-black/80 disabled:pointer-events-none disabled:opacity-20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="relative flex h-full w-full items-center justify-center">
          {/* Layer A */}
          {photoA && (
            <div
              className="absolute inset-0"
              style={{
                opacity: topLayer === "A" ? 1 : 0,
                transition: `opacity ${FADE_DURATION}ms ease-in-out`,
                zIndex: topLayer === "A" ? 2 : 1,
              }}
            >
              <Image
                src={photoA.src}
                alt={photoA.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          )}

          {/* Layer B */}
          {photoB && (
            <div
              className="absolute inset-0"
              style={{
                opacity: topLayer === "B" ? 1 : 0,
                transition: `opacity ${FADE_DURATION}ms ease-in-out`,
                zIndex: topLayer === "B" ? 2 : 1,
              }}
            >
              <Image
                src={photoB.src}
                alt={photoB.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          )}
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

        {/* Caption overlay */}
        {caption && (
          <div
            className="pointer-events-none absolute bottom-6 left-1/2 z-10 w-full max-w-3xl -translate-x-1/2 px-6"
            style={{ zIndex: 10 }}
          >
            <div className="rounded-2xl bg-black/70 px-6 py-4 text-center text-base leading-relaxed text-white backdrop-blur-md md:text-lg md:leading-loose">
              {caption}
            </div>
          </div>
        )}
      </div>

      {/* ── Thumbnail strip (skip dedicatoria slides) ── */}
      <div className="shrink-0 px-4 pb-5 pt-3">
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((p, i) => {
            if (isDedicatoria(p)) {
              // Show a placeholder for the dedicatoria in the thumbnail strip
              return (
                <button
                  key={`dedicatoria-${i}`}
                  onClick={() => { stopSlideshow(); onJumpTo?.(i) }}
                  aria-label="Pantalla dedicatoria"
                  className={`relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    i === currentIndex
                      ? "border-primary opacity-100 scale-105"
                      : "border-transparent opacity-40 hover:opacity-70"
                  } bg-white/5`}
                >
                  <span className="text-[9px] text-white/60 leading-tight text-center px-1">
                    ded.
                  </span>
                </button>
              )
            }

            const photo = p as Extract<Photo, { src: string }>
            return (
              <button
                key={photo.src}
                onClick={() => { stopSlideshow(); onJumpTo?.(i) }}
                aria-label={`Ir a imagen ${i + 1}`}
                className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                  i === currentIndex
                    ? "border-primary opacity-100 scale-105"
                    : "border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="56px" />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
