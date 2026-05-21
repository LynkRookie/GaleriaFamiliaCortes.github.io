"use client"

import { useState, useRef } from "react"
import { albums } from "@/lib/gallery-data"
import AlbumCard from "@/components/album-card"
import Image from "next/image"
import Link from "next/link"
import { ImageIcon, ArrowRight, ChevronDown, Layers, Star } from "lucide-react"

type Tab = "coleccion" | "destacados"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("coleccion")
  const collectionRef = useRef<HTMLElement>(null)

  const featured = albums[0]
  const totalPhotos = albums.reduce((sum, a) => sum + a.photos.length, 0)

  const displayedAlbums =
    activeTab === "destacados" ? albums.slice(0, 1) : albums

  function scrollToCollection(tab: Tab) {
    setActiveTab(tab)
    setTimeout(() => {
      collectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 60)
  }

  return (
    <main className="min-h-screen bg-background tech-grid">

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 nav-frosted border-b border-white/[0.04]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-10">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
              <ImageIcon className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-serif text-sm font-semibold tracking-tight text-foreground">
              Mi Galería
            </span>
          </div>

          {/* Tabs — center */}
          <nav className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1" aria-label="Secciones">
            <button
              onClick={() => setActiveTab("coleccion")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                activeTab === "coleccion"
                  ? "bg-primary text-primary-foreground shadow-[0_2px_12px_0] shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="h-3 w-3" />
              Colección
            </button>
            <button
              onClick={() => scrollToCollection("destacados")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                activeTab === "destacados"
                  ? "bg-primary text-primary-foreground shadow-[0_2px_12px_0] shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Star className="h-3 w-3" />
              Destacados
            </button>
          </nav>

          {/* Stat */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              {albums.length} álbumes
            </span>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      {featured && (
        <section className="relative w-full overflow-hidden" style={{ height: "92vh", minHeight: 520 }}>
          <Image
            src={featured.cover}
            alt={`Portada del álbum ${featured.title}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-black/30" />
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

          {/* Top horizontal rule */}
          <div className="absolute top-[72px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

          {/* Floating metadata — top right corner */}
          <div className="absolute top-24 right-6 hidden sm:flex flex-col items-end gap-1 sm:right-10">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20">
              {featured.date}
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20">
              {featured.photos.length} fotos
            </span>
          </div>

          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-14 sm:px-10 lg:px-16">
            {/* Label */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-primary">
                Álbum destacado
              </span>
              <div className="h-px flex-1 max-w-[60px] bg-primary/20" />
            </div>

            {/* Title */}
            <h1 className="font-serif font-bold leading-[0.9] text-white text-balance
              text-[clamp(3rem,10vw,7.5rem)]">
              {featured.title}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/45 sm:text-base">
              {featured.description}
            </p>

            {/* CTA row */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href={`/album/${featured.id}`}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_32px_0] shadow-primary/25 transition-all hover:brightness-110 hover:shadow-primary/40"
              >
                Ver álbum
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => scrollToCollection("coleccion")}
                className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
              >
                <ChevronDown className="h-4 w-4" />
                Ver todos los álbumes
              </button>
            </div>
          </div>

          {/* Scroll cue — right edge */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            <span
              className="font-mono text-[8px] tracking-[0.35em] uppercase text-white/20"
              style={{ writingMode: "vertical-rl" }}
            >
              Scroll
            </span>
          </div>
        </section>
      )}

      {/* ── COLLECTION ── */}
      <section
        ref={collectionRef}
        aria-label="Álbumes"
        className="mx-auto max-w-7xl px-5 pt-16 pb-20 sm:px-10"
      >
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <div className="h-px w-6 bg-primary/70" />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-primary">
                {activeTab === "destacados" ? "Destacados" : "Colección"}
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground text-balance sm:text-4xl">
              {activeTab === "destacados" ? "Álbum destacado" : "Todos los álbumes"}
            </h2>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-0.5 shrink-0">
            <span className="font-serif text-2xl font-bold text-foreground">{totalPhotos}</span>
            <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
              fotos en total
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex-1 h-px bg-border/60" />
          <div className="flex items-center gap-1">
            <span className="h-[3px] w-[3px] rounded-full bg-primary/40" />
            <span className="h-[5px] w-[5px] rounded-full bg-primary/60" />
            <span className="h-[3px] w-[3px] rounded-full bg-primary/40" />
          </div>
          <div className="flex-1 h-px bg-border/60" />
        </div>

        {/* Grid */}
        {displayedAlbums.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-32 text-center">
            <ImageIcon className="mb-4 h-10 w-10 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground">No hay álbumes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayedAlbums.map((album, i) => (
              <AlbumCard key={album.id} album={album} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-10">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded border border-primary/20 bg-primary/8">
              <ImageIcon className="h-2.5 w-2.5 text-primary" />
            </div>
            <span className="font-serif text-xs text-muted-foreground">Mi Galería</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/35">
            lib/gallery-data.ts
          </span>
        </div>
      </footer>
    </main>
  )
}
