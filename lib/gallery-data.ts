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
        "/albums/vacaciones/foto64.jpeg",
        "/albums/vacaciones/foto65.jpeg",
        "/albums/vacaciones/foto66.jpeg",
        "/albums/vacaciones/foto67.jpeg",
        "/albums/vacaciones/foto68.jpeg",
        "/albums/vacaciones/foto69.jpeg",
        "/albums/vacaciones/foto70.jpeg",
        "/albums/vacaciones/foto71.jpeg",
        "/albums/vacaciones/foto72.jpeg",
        "/albums/vacaciones/foto73.jpeg",
        "/albums/vacaciones/foto74.jpeg",
        "/albums/vacaciones/foto75.jpeg",
        "/albums/vacaciones/foto76.jpeg",
        "/albums/vacaciones/foto76.jpeg",
        "/albums/vacaciones/foto77.jpeg",
        "/albums/vacaciones/foto78.jpeg",
        "/albums/vacaciones/foto79.jpeg",
        "/albums/vacaciones/foto80.jpeg",
        "/albums/vacaciones/foto81.jpeg",
        "/albums/vacaciones/foto82.jpeg",
        "/albums/vacaciones/foto83.jpeg",
        "/albums/vacaciones/foto84.jpeg",
        "/albums/vacaciones/foto85.jpeg",
        "/albums/vacaciones/foto86.jpeg",
        "/albums/vacaciones/foto87.jpeg",
        "/albums/vacaciones/foto88.jpeg",
        "/albums/vacaciones/foto89.jpeg",
        "/albums/vacaciones/foto90.jpeg",
        "/albums/vacaciones/foto91.jpeg",
        "/albums/vacaciones/foto93.jpeg",
        "/albums/vacaciones/foto94.jpeg",
        "/albums/vacaciones/foto95.jpeg",
        "/albums/vacaciones/foto96.jpeg",
        "/albums/vacaciones/foto97.jpeg",
        "/albums/vacaciones/foto98.jpeg",
        "/albums/vacaciones/foto99.jpeg",
        "/albums/vacaciones/foto100.jpeg",
        "/albums/vacaciones/foto101.jpeg",
        "/albums/vacaciones/foto102.jpeg",
        "/albums/vacaciones/foto103.jpeg",
        "/albums/vacaciones/foto104.jpeg",
        "/albums/vacaciones/foto105.jpeg",
        "/albums/vacaciones/foto106.jpeg",
        "/albums/vacaciones/foto107.jpeg",
        "/albums/vacaciones/foto108.jpeg",
        "/albums/vacaciones/foto109.jpeg",
        "/albums/vacaciones/foto110.jpeg",
        "/albums/vacaciones/foto111.jpeg",
        "/albums/vacaciones/foto113.jpeg",
        "/albums/vacaciones/foto114.jpeg",
        "/albums/vacaciones/foto115.jpeg",
        "/albums/vacaciones/foto116.jpeg",
        "/albums/vacaciones/foto117.jpeg",
        "/albums/vacaciones/foto118.jpeg",
        "/albums/vacaciones/foto119.jpeg",
        "/albums/vacaciones/foto120.jpeg",
        "/albums/vacaciones/foto121.jpeg",
        "/albums/vacaciones/foto122.jpeg",
        "/albums/vacaciones/foto123.jpeg",
        "/albums/vacaciones/foto124.jpeg",
        "/albums/vacaciones/foto125.jpeg",
        "/albums/vacaciones/foto126.jpeg",
        "/albums/vacaciones/foto127.jpeg",
        "/albums/vacaciones/foto128.jpeg",
        "/albums/vacaciones/foto129.jpeg",
        "/albums/vacaciones/foto130.jpeg",
        "/albums/vacaciones/foto131.jpeg",
        "/albums/vacaciones/foto132.jpeg",
        "/albums/vacaciones/foto133.jpeg",
        "/albums/vacaciones/foto134.jpeg",
        "/albums/vacaciones/foto135.jpeg",
        "/albums/vacaciones/foto136.jpeg",
        "/albums/vacaciones/foto137.jpeg",
        "/albums/vacaciones/foto138.jpeg",
        "/albums/vacaciones/foto139.jpeg",
        "/albums/vacaciones/foto140.jpeg",
        "/albums/vacaciones/foto141.jpeg",
        "/albums/vacaciones/foto142.jpeg",
        "/albums/vacaciones/foto143.jpeg",
        "/albums/vacaciones/foto144.jpeg",
        "/albums/vacaciones/foto145.jpeg",
        "/albums/vacaciones/foto146.jpeg",
        "/albums/vacaciones/foto147.jpeg",
        "/albums/vacaciones/foto148.jpeg",
        "/albums/vacaciones/foto149.jpeg",
        "/albums/vacaciones/foto150.jpeg",
        "/albums/vacaciones/foto151.jpeg",
        "/albums/vacaciones/foto152.jpeg",
        "/albums/vacaciones/foto153.jpeg",
        "/albums/vacaciones/foto154.jpeg",
        "/albums/vacaciones/foto155.jpeg",
        "/albums/vacaciones/foto156.jpeg",
        "/albums/vacaciones/foto157.jpeg",
        "/albums/vacaciones/foto158.jpeg",
        "/albums/vacaciones/foto159.jpeg",
        "/albums/vacaciones/foto160.jpeg",
        "/albums/vacaciones/foto161.jpeg",
        "/albums/vacaciones/foto162.jpeg",
        "/albums/vacaciones/foto163.jpeg",
        "/albums/vacaciones/foto164.jpeg",
        "/albums/vacaciones/foto165.jpeg",
        "/albums/vacaciones/foto166.jpeg",
        "/albums/vacaciones/foto167.jpeg",
        "/albums/vacaciones/foto168.jpeg",
        "/albums/vacaciones/foto169.jpeg",
        "/albums/vacaciones/foto170.jpeg",
        "/albums/vacaciones/foto171.jpeg",
        "/albums/vacaciones/foto172.jpeg",
        "/albums/vacaciones/foto173.jpeg",
        "/albums/vacaciones/foto174.jpeg",
        "/albums/vacaciones/foto175.jpeg",
        "/albums/vacaciones/foto176.jpeg",
        "/albums/vacaciones/foto177.jpeg",
        "/albums/vacaciones/foto178.jpeg",
        "/albums/vacaciones/foto179.jpeg",
        "/albums/vacaciones/foto180.jpeg",
        "/albums/vacaciones/foto181.jpeg",
        "/albums/vacaciones/foto182.jpeg",
        "/albums/vacaciones/foto183.jpeg",
        "/albums/vacaciones/foto184.jpeg",
        "/albums/vacaciones/foto185.jpeg",
        "/albums/vacaciones/foto186.jpeg",
        "/albums/vacaciones/foto187.jpeg",
        "/albums/vacaciones/foto188.jpeg",
        "/albums/vacaciones/foto189.jpeg",
        "/albums/vacaciones/foto190.jpeg",
        "/albums/vacaciones/foto191.jpeg",
        "/albums/vacaciones/foto192.jpeg",
        "/albums/vacaciones/foto193.jpeg",
        "/albums/vacaciones/foto194.jpeg",
        "/albums/vacaciones/foto195.jpeg",
        "/albums/vacaciones/foto196.jpeg",
        "/albums/vacaciones/foto197.jpeg",

      ],
      {
        // ── Captions personalizados ───────────────────────────
        // El índice empieza en 0 (0 = primera foto, 1 = segunda, etc.)
        // Si no pones caption, la foto aparece sin cuadro de descripción.
        // Para agregar una descripción a otra foto, copia el formato de abajo.
        //
      0: "El comienzo de un viaje lleno de momentos inolvidables junto a la familia",
      119:"Papá Cuánta falta me haces Hoy vives en el cielo pero también en mi corazón te extraño mucho papá 💗Gracias por tus lindos consejos que me diste Gracias por el amor que me entregaste Gracias por ser mi amigo.Gracias por el tiempo que me dedicaste no te imaginas cuánto te extraño,de escuchar tu voz ver tu mirada sentir tu sonrisa no sabes cuánto te extraño de tenerte a mi lado , la única manera de verte es viendo tus fotos pero mis ojos se llenan de lágrimas pero se que tú quieres que siga adelante mi bello angel se que me das la fuerza para seguir adelante .Te quiero mucho te recordaré por siempre se que algún día nos volveremos a ver y estaremos juntos otra vez  te amo te quiero más allá de las estrellas  PAPÁ ♥️",
      121: " Te amo hasta el infinito y más allá me haces mucha falta Papá gracias por tanto y por todo",
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
