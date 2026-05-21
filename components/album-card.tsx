"use client"

import Image from "next/image"
import Link from "next/link"
import type { Album } from "@/lib/gallery-data"
import { ArrowUpRight } from "lucide-react"

interface AlbumCardProps {
  album: Album
  index?: number
}

export default function AlbumCard({ album, index = 0 }: AlbumCardProps) {
  return (
    <Link
      href={`/album/${album.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)]"
      aria-label={`Abrir álbum: ${album.title}`}
    >
      {/* Cover */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={album.cover}
          alt={`Portada del álbum ${album.title}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Dark gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Index — subtle editorial touch */}
        <div className="absolute top-3 left-4 font-mono text-[9px] tracking-[0.25em] text-white/20 select-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Arrow badge on hover */}
        <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>

        {/* Photo count badge */}
        <div className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[9px] tracking-wider text-white/50 backdrop-blur-sm">
          {album.photos.length} fotos
        </div>

        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10">
          <h2 className="font-serif text-xl font-bold leading-tight text-white text-balance group-hover:text-primary transition-colors duration-300 sm:text-2xl">
            {album.title}
          </h2>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3">
        {/* Description + date row */}
        <div className="flex items-start justify-between gap-3">
          <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {album.description}
          </p>
          <span className="shrink-0 font-mono text-[9px] text-muted-foreground/40 tracking-wide mt-0.5">
            {album.date}
          </span>
        </div>

        {/* Photo strip */}
        <div className="flex gap-1">
          {album.photos.slice(0, 5).map((photo, i) => (
            <div
              key={photo.src}
              className="relative h-7 flex-1 overflow-hidden rounded-md"
              style={{ opacity: 1 - i * 0.18 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          ))}
        </div>

        {/* Amber accent bar — appears on hover */}
        <div className="h-px bg-gradient-to-r from-primary/40 via-primary/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </Link>
  )
}
