"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Album } from "@/lib/gallery-data"
import ImageViewer from "@/components/image-viewer"
import ShareModal from "@/components/share-modal"
import {
  ArrowLeft,
  Share2,
  CalendarDays,
  Images,
} from "lucide-react"

interface AlbumViewerProps {
  album: Album
}

export default function AlbumViewer({ album }: AlbumViewerProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const [showShare, setShowShare] = useState(false)

  const openViewer = (index: number) => setViewerIndex(index)
  const closeViewer = () => setViewerIndex(null)

  const handlePrev = useCallback(() => {
    setViewerIndex((i) => (i !== null && i > 0 ? i - 1 : i))
  }, [])

  const handleNext = useCallback(() => {
    setViewerIndex((i) =>
      i !== null && i < album.photos.length - 1 ? i + 1 : i,
    )
  }, [album.photos.length])

  const handleJumpTo = useCallback((index: number) => {
    setViewerIndex(index)
  }, [])

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* ── Sticky header ── */}
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
            {/* Back */}
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
              aria-label="Volver a la galería"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Galería</span>
            </Link>

            {/* Album title */}
            <div className="flex min-w-0 flex-col items-center text-center">
              <h1 className="font-serif text-base font-semibold leading-tight text-foreground text-balance truncate max-w-[180px] sm:max-w-xs">
                {album.title}
              </h1>
              <span className="text-xs text-muted-foreground">{album.date}</span>
            </div>

            {/* Share button */}
            <button
              onClick={() => setShowShare(true)}
              aria-label="Compartir álbum"
              className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition hover:bg-primary/20 hover:border-primary/50"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Compartir</span>
            </button>
          </div>
        </header>

        {/* ── Hero band ── */}
        <div className="relative h-52 w-full overflow-hidden sm:h-72">
          <Image
            src={album.cover}
            alt={`Portada ${album.title}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 px-6 pb-7 sm:px-10">
            <p className="mb-1 text-xs tracking-[0.25em] text-primary uppercase">Album</p>
            <h2 className="font-serif text-3xl font-bold text-white text-balance sm:text-4xl">
              {album.title}
            </h2>
            <p className="mt-1.5 text-sm text-white/60">{album.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-5 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <Images className="h-3.5 w-3.5" />
                {album.photos.length} fotos
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {album.date}
              </span>
            </div>
          </div>
        </div>

        {/* ── Photo grid ── */}
        <section
          aria-label={`Fotos del album ${album.title}`}
          className="mx-auto max-w-6xl px-4 py-8 sm:px-8 pb-20"
        >
          <div className="columns-2 gap-3 sm:columns-3 md:columns-4">
            {album.photos.map((photo, index) => (
              <button
                key={photo.src}
                onClick={() => openViewer(index)}
                aria-label={`Ver imagen: ${photo.alt}`}
                className="group relative mb-3 block w-full overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={800}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/25" />
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full px-3 py-2 text-xs font-medium text-white backdrop-blur-sm bg-black/60 transition-transform duration-200 group-hover:translate-y-0 rounded-b-xl">
                    {photo.caption}
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* ── Lightbox viewer ── */}
      {viewerIndex !== null && (
        <ImageViewer
          photos={album.photos}
          currentIndex={viewerIndex}
          onClose={closeViewer}
          onPrev={handlePrev}
          onNext={handleNext}
          onJumpTo={handleJumpTo}
        />
      )}

      {/* ── Share QR modal ── */}
      {showShare && (
        <ShareModal
          albumTitle={album.title}
          albumUrl={`/album/${album.id}`}
          onClose={() => setShowShare(false)}
        />
      )}
    </>
  )
}
