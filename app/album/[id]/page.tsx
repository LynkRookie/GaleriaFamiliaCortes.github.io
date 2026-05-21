import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getAlbumById, albums } from "@/lib/gallery-data"
import AlbumViewer from "@/components/album-viewer"

interface Props {
  params: Promise<{ id: string }>
}

// Genera las rutas estáticas para todos los álbumes
export async function generateStaticParams() {
  return albums.map((album) => ({ id: album.id }))
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const album = getAlbumById(id)
  if (!album) return { title: "Álbum no encontrado" }

  return {
    title: `${album.title} — Mi Galería`,
    description: album.description,
    openGraph: {
      title: album.title,
      description: album.description,
      images: [{ url: album.cover }],
    },
  }
}

export default async function AlbumPage({ params }: Props) {
  const { id } = await params
  const album = getAlbumById(id)

  if (!album) notFound()

  return <AlbumViewer album={album} />
}
