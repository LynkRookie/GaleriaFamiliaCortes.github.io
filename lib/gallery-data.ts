// ============================================================
// CONFIGURACIÓN DE ÁLBUMES
//
// Para agregar una foto nueva al álbum:
//   1. Copia el nombre exacto del archivo (con espacios si los tiene)
//   2. Agrégalo al array "srcs" en el orden que quieras que aparezca
//   3. Si quieres un caption personalizado, agrégalo en "captions"
//      usando el índice (0 = primera foto, 1 = segunda, etc.)
// ============================================================

export interface Photo {
  src: string
  alt: string
  caption?: string
}

export interface Album {
  id: string
  title: string
  description: string
  cover: string
  date: string
  photos: Photo[]
  // Lista de canciones para el slideshow (opcional).
  // Al terminar cada canción, espera 10s y pasa a la siguiente en orden.
  // Cuando termina la última, vuelve a la primera (bucle circular).
  // Coloca los archivos en /public/albums/<carpeta>/
  music?: string[]
}

// ──────────────────────────────────────────────────────────────
// Helper: convierte una lista de rutas en Photo[]
// El caption y alt se generan como "Foto 1", "Foto 2", etc.
// Si quieres un caption personalizado, pásalo en el objeto
// captions con el índice correspondiente (basado en 0).
// ──────────────────────────────────────────────────────────────
function makePhotos(
  srcs: string[],
  captions: Record<number, string> = {}
): Photo[] {
  return srcs.map((src, i) => ({
    src,
    alt: `Foto ${i + 1}`,
    // Solo se muestra el caption si fue definido manualmente
    caption: captions[i] ?? "",
  }))
}

// ──────────────────────────────────────────────────────────────
// ÁLBUMES — agrega o edita aquí
// ──────────────────────────────────────────────────────────────
export const albums: Album[] = [
  {
    id: "Dia_Del_Padre",
    title: "Feliz día del Padre, Héctor Cortés",
    description: "Momentos inolvidables del maravilloso padre y abuelo",
    cover: "/albums/vacaciones/foto1.jpg",
    date: "Junio 2026",
    // ── Música para el slideshow ──────────────────────────────
    // Agrega aquí todos los archivos de música que quieras.
    // Se reproducen en orden y en bucle circular con 10s de pausa entre cada canción.
    // Coloca los archivos MP3 en: /public/albums/vacaciones/
    music: [
      "/albums/vacaciones/Piero - Mi viejo (Letra) Viejo, mi querido viejo.mp3",
      "/albums/vacaciones/Lyrics).mp3",
      // Agrega más canciones aquí:
      // "/albums/vacaciones/musica3.mp3",
    ],
    photos: makePhotos(
      [
        // ── Agrega más rutas aquí abajo cuando tengas nuevas fotos ──
        "/albums/vacaciones/foto1.jpg",
        "/albums/vacaciones/foto2.jpg",
        "/albums/vacaciones/foto3.jpg",
        "/albums/vacaciones/foto 5.jpeg",
        "/albums/vacaciones/foto 6.jpeg",
        "/albums/vacaciones/foto 7.jpeg",
        "/albums/vacaciones/foto 8.jpeg",
        "/albums/vacaciones/foto 9.jpeg",
        "/albums/vacaciones/foto10.jpeg",
        "/albums/vacaciones/foto 11.jpeg",
        "/albums/vacaciones/foto 12.jpeg",
        "/albums/vacaciones/foto 13.jpeg",
        "/albums/vacaciones/foto14.jpeg",
        "/albums/vacaciones/foto15.jpeg",
        "/albums/vacaciones/foto16.jpeg",
        "/albums/vacaciones/foto17.jpeg",
        "/albums/vacaciones/foto18.jpeg",
        "/albums/vacaciones/foto19.jpeg",
        "/albums/vacaciones/foto20.jpeg",
        "/albums/vacaciones/foto21.jpeg",
        "/albums/vacaciones/foto22.jpeg",
        "/albums/vacaciones/foto23.jpeg",
        "/albums/vacaciones/foto24.jpeg",
        "/albums/vacaciones/foto25.jpeg",
        "/albums/vacaciones/foto26.jpeg",
        "/albums/vacaciones/foto27.jpeg",
        "/albums/vacaciones/foto28.jpeg",
        "/albums/vacaciones/foto29.jpeg",
        "/albums/vacaciones/foto30.jpeg",
        "/albums/vacaciones/foto31.jpeg",
        "/albums/vacaciones/foto32.jpeg",
        "/albums/vacaciones/foto33.jpeg",
        "/albums/vacaciones/foto34.jpeg",
        "/albums/vacaciones/foto35.jpeg",
        "/albums/vacaciones/foto36.jpeg",
        "/albums/vacaciones/foto37.jpeg",
        "/albums/vacaciones/foto38.jpeg",
        "/albums/vacaciones/foto39.jpeg",
        "/albums/vacaciones/foto40.jpeg",
        "/albums/vacaciones/foto41.jpeg",
        "/albums/vacaciones/foto42.jpeg",
        "/albums/vacaciones/foto43.jpeg",
        "/albums/vacaciones/foto44.jpeg",
        "/albums/vacaciones/foto45.jpeg",
        "/albums/vacaciones/foto46.jpeg",
        "/albums/vacaciones/foto47.jpeg",
        "/albums/vacaciones/foto48.jpeg",
        "/albums/vacaciones/foto49.jpeg",
        "/albums/vacaciones/foto50.jpeg",
        "/albums/vacaciones/foto51.jpeg",
        "/albums/vacaciones/foto52.jpeg",
        "/albums/vacaciones/foto53.jpeg",
        "/albums/vacaciones/foto54.jpeg",
        "/albums/vacaciones/foto55.jpeg",
        "/albums/vacaciones/foto56.jpeg",
        "/albums/vacaciones/foto57.jpeg",
        "/albums/vacaciones/foto58.jpeg",
        "/albums/vacaciones/foto59.jpeg",
        "/albums/vacaciones/foto60.jpeg",
        "/albums/vacaciones/foto61.jpeg",
        "/albums/vacaciones/foto62.jpeg",
        "/albums/vacaciones/foto63.jpeg",
      ],
      {
        // ── Captions personalizados ───────────────────────────
        // El índice empieza en 0 (0 = primera foto, 1 = segunda, etc.)
        // Si no pones caption, la foto aparece sin cuadro de descripción.
        // Para agregar una descripción a otra foto, copia el formato de abajo.
        //
        0: "El comienzo de un viaje lleno de momentos inolvidables junto a la familia",
        // 1: "Aquí va tu descripción para la segunda foto",
        // 5: "Toda la familia reunida, un día para recordar siempre",
      }
    ),
  },

  // ── Para agregar un nuevo álbum, copia este bloque ────────────
  // {
  //   id: "cumpleanos",
  //   title: "Cumpleaños 2025",
  //   description: "La celebración del año",
  //   cover: "/albums/cumpleanos/foto1.jpg",
  //   date: "Diciembre 2025",
  //   photos: makePhotos([
  //     "/albums/cumpleanos/foto1.jpg",
  //     "/albums/cumpleanos/foto2.jpg",
  //   ], {
  //     0: "Llegando a la fiesta",
  //   }),
  // },
]

// Helper para buscar un álbum por id
export function getAlbumById(id: string): Album | undefined {
  return albums.find((a) => a.id === id)
}
