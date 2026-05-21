"use client"

import { useEffect, useCallback, useState, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Photo } from "@/lib/gallery-data"

interface ImageViewerProps {
  photos: Photo[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onJumpTo?: (index: number) => void
}

export default function ImageViewer({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onJumpTo,
}: ImageViewerProps) {
  const photo = photos[currentIndex]
  const total = photos.length
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const thumbsRef = useRef<HTMLDivElement>(null)

  // Keep active thumbnail visible
  useEffect(() => {
    const container = thumbsRef.current
    if (!container) return
    const active = container.children[currentIndex] as HTMLElement | undefined
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [currentIndex])

  const goNext = useCallback(() => {
    setDirection("left")
    setAnimKey((k) => k + 1)
    onNext()
  }, [onNext])

  const goPrev = useCallback(() => {
    setDirection("right")
    setAnimKey((k) => k + 1)
    onPrev()
  }, [onPrev])

  const jumpTo = useCallback(
    (i: number) => {
      setDirection(i > currentIndex ? "left" : "right")
      setAnimKey((k) => k + 1)
      onJumpTo?.(i)
    },
    [currentIndex, onJumpTo],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    },
    [onClose, goPrev, goNext],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  const slideClass = direction === "left" ? "slide-left" : direction === "right" ? "slide-right" : "viewer-enter"

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de imagen"
    >
      {/* ── Top bar ── */}
      <div className="flex shrink-0 items-center justify-between px-5 py-4">
        {/* Counter */}
        <span className="font-mono text-sm tabular-nums text-white/40">
          {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* Caption (center) */}
        <p className="max-w-xs truncate text-center text-sm text-white/60">
          {photo.caption ?? photo.alt}
        </p>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Cerrar visor"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Main image area ── */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Prev button */}
        <button
          onClick={goPrev}
          aria-label="Imagen anterior"
          disabled={currentIndex === 0}
          className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-black/80 disabled:pointer-events-none disabled:opacity-20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Image */}
        <div
          key={animKey}
          className={`relative flex max-h-full max-w-full items-center justify-center px-20 py-4 ${slideClass}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={1400}
            height={1050}
            className="max-h-[calc(100vh-13rem)] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            priority
          />
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          aria-label="Imagen siguiente"
          disabled={currentIndex === total - 1}
          className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-black/80 disabled:pointer-events-none disabled:opacity-20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
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
              onClick={() => jumpTo(i)}
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
