"use client"

import Image from "next/image"
import Link from "next/link"
import type { Album } from "@/lib/gallery-data"
import { ArrowUpRight, PlayCircle, Film } from "lucide-react"

interface AlbumCardProps {
  album: Album
  index?: number
}

export default function AlbumCard({ album, index = 0 }: AlbumCardProps) {
  // Detect if this album is video-only
  const isVideoAlbum =
    album.photos.length > 0 &&
    album.photos.every((p) => p.type === "video")

  return (
    <Link
      href={`/album/${album.id}`}
      className="group relative flex flex-col overflow-hidden bg-card card-shine transition-all duration-500 hover:z-10 hover:shadow-[0_24px_80px_-16px] hover:shadow-black/80"
      aria-label={`Abrir álbum: ${album.title}`}
    >
      {/* Cover image / video cover placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {isVideoAlbum ? (
          /* Video-only album: dark cover with film icon */
          <div className="flex h-full w-full items-center justify-center bg-black/80">
            <Film className="h-16 w-16 text-white/20" />
          </div>
        ) : (
          <Image
            src={album.cover}
            alt={`Portada del álbum ${album.title}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Bottom-to-top gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Index watermark */}
        <div className="absolute top-3 left-4 font-mono text-[8px] tracking-[0.3em] text-white/20 select-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Hover arrow */}
        <div className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/50 opacity-0 backdrop-blur-md transition-all duration-300 -translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight className="h-3.5 w-3.5 text-white" />
        </div>

        {/* Photo count */}
        <div className="absolute bottom-3 right-3.5 rounded-sm border border-white/8 bg-black/50 px-2 py-0.5 font-mono text-[8px] tracking-[0.2em] uppercase text-white/40 backdrop-blur-sm">
          {album.photos.length}&nbsp;fotos
        </div>

        {/* Title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-10">
          <h2 className="font-serif text-xl font-bold leading-tight text-white text-balance transition-colors duration-300 group-hover:text-primary sm:text-2xl">
            {album.title}
          </h2>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 bg-card px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {album.description}
          </p>
          <span className="mt-0.5 shrink-0 font-mono text-[8px] tracking-widest text-muted-foreground/35">
            {album.date}
          </span>
        </div>

        {/* Micro strip — videos show a play icon tile, photos show the thumbnail */}
        <div className="flex gap-0.5">
          {album.photos.slice(0, 6).map((photo, i) => {
            const isVid = photo.type === "video"
            const hasSrc = photo.type !== "dedicatoria"
            return (
              <div
                key={hasSrc ? (photo as { src: string }).src : `ded-${i}`}
                className="relative h-6 flex-1 overflow-hidden bg-white/5"
                style={{ opacity: 1 - i * 0.15 }}
              >
                {isVid ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <PlayCircle className="h-3 w-3 text-white/50" />
                  </div>
                ) : hasSrc ? (
                  <Image
                    src={(photo as { src: string }).src}
                    alt={(photo as { alt: string }).alt}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                ) : null}
              </div>
            )
          })}
        </div>

        {/* Bottom accent — amber line on hover */}
        <div className="h-px bg-gradient-to-r from-primary/50 via-primary/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </Link>
  )
}
