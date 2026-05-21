// ============================================================
// CONFIGURACIÓN DE ÁLBUMES — edita este archivo desde VS Code
// para agregar, quitar o modificar álbumes y fotos.
// ============================================================

export interface Photo {
  src: string   // ruta dentro de /public, ej: "/albums/vacaciones/foto1.jpg"
  alt: string   // descripción de la imagen (accesibilidad)
  caption?: string // pie de foto opcional
}

export interface Album {
  id: string          // slug único, usado en la URL: /album/[id]
  title: string       // nombre visible del álbum
  description: string // descripción corta
  cover: string       // imagen de portada (ruta dentro de /public)
  date: string        // fecha o período del álbum
  photos: Photo[]
}

// ——————————————————————————————————————————
// AGREGA O EDITA TUS ÁLBUMES AQUÍ ↓ Y PONE EN DESTACADO LAS PRIMERAS {} QUE ESTAN EN LA LINEA 25
// ——————————————————————————————————————————
export const albums: Album[] = [
   {
    id: "Dia_Del_Padre",
    title: "Feliz dia Del Padre, Hector Cortes",
    description: "Momentos inolvidables Del Maravilloso Padre y Abuelo",
    cover: "/albums/vacaciones/foto1.jpg",
    date: "Junio 2026",
    photos: [
      {
        src: "/albums/vacaciones/foto1.jpg",
        alt: "Foto familiar de Hector Cortes",
        caption: "Foto de la familia de Hector Cortes",
      },
      {
        src: "/albums/vacaciones/foto2.jpg",
        alt: "",
        caption: " FOTO 2",
      },
      {
        src: "/albums/vacaciones/foto3.jpg",
        alt: "",
        caption: "FOTO 3",
      },
      {
        src: "/albums/vacaciones/foto 5.jpeg",
        alt: "",
        caption: "FOTO 4",
      },
      {
        src: "/albums/vacaciones/foto 6.jpeg",
        alt: "",
        caption: "FOTO 5",
      },
      {
        src: "/albums/vacaciones/foto 7.jpeg",
        alt: "",
        caption: "FOTO 6",
      },
        {
        src: "/albums/vacaciones/foto 8.jpeg",
        alt: "",
        caption: "FOTO 7",
      },
        {
        src: "/albums/vacaciones/foto 9.jpeg",
        alt: "",
        caption: "FOTO 8",
      },
        {
        src: "/albums/vacaciones/foto10.jpeg",
        alt: "",
        caption: "FOTO 9",
      },
        {
        src: "/albums/vacaciones/foto 11.jpeg",
        alt: "",
        caption: "FOTO 10",
      },
      
      
    ],
  }
]

// Helper para buscar un álbum por id
export function getAlbumById(id: string): Album | undefined {
  return albums.find((a) => a.id === id)
}
