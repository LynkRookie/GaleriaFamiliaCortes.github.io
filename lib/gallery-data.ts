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
      {
        src: "/albums/vacaciones/foto 12.jpeg",
        alt: "",
        caption: " FOTO 11",
      },
      {
        src: "/albums/vacaciones/foto 13.jpeg",
        alt: "",
        caption: "FOTO 12",
      },
      {
        src: "/albums/vacaciones/foto14.jpeg",
        alt: "",
        caption: "FOTO 13",
      },
      {
        src: "/albums/vacaciones/foto15.jpeg",
        alt: "",
        caption: "FOTO 14",
      },
      {
        src: "/albums/vacaciones/foto16.jpeg",
        alt: "",
        caption: "FOTO 15",
      },
        {
        src: "/albums/vacaciones/foto17.jpeg",
        alt: "",
        caption: "FOTO 16",
      },
        {
        src: "/albums/vacaciones/foto18.jpeg",
        alt: "",
        caption: "FOTO 17",
      },
        {
        src: "/albums/vacaciones/foto19.jpeg",
        alt: "",
        caption: "FOTO 18",
      },
        {
        src: "/albums/vacaciones/foto20.jpeg",
        alt: "",
        caption: "FOTO 19",
      }
      ,
        {
        src: "/albums/vacaciones/foto21.jpeg",
        alt: "",
        caption: "FOTO 20",
      }
      ,
        {
        src: "/albums/vacaciones/foto22.jpeg",
        alt: "",
        caption: "FOTO 21",
      }
      ,
        {
        src: "/albums/vacaciones/foto23.jpeg",
        alt: "",
        caption: "FOTO 22",
      }

      ,
        {
        src: "/albums/vacaciones/foto24.jpeg",
        alt: "",
        caption: "FOTO 23",
      }

      ,
        {
        src: "/albums/vacaciones/foto25.jpeg",
        alt: "",
        caption: "FOTO 24",
      }


      ,
        {
        src: "/albums/vacaciones/foto26.jpeg",
        alt: "",
        caption: "FOTO 25",
      }


      ,
        {
        src: "/albums/vacaciones/foto27.jpeg",
        alt: "",
        caption: "FOTO 26",
      }


      ,
        {
        src: "/albums/vacaciones/foto28.jpeg",
        alt: "",
        caption: "FOTO 27",
      }

      ,
        {
        src: "/albums/vacaciones/foto29.jpeg",
        alt: "",
        caption: "FOTO 28",
      }
,
        {
        src: "/albums/vacaciones/foto30.jpeg",
        alt: "",
        caption: "FOTO 29",
      }

      ,
        {
        src: "/albums/vacaciones/foto31.jpeg",
        alt: "",
        caption: "FOTO 30",
      }
,
        {
        src: "/albums/vacaciones/foto32.jpeg",
        alt: "",
        caption: "FOTO 31",
      }

      ,
        {
        src: "/albums/vacaciones/foto33.jpeg",
        alt: "",
        caption: "FOTO 32",
      }
,
        {
        src: "/albums/vacaciones/foto34.jpeg",
        alt: "",
        caption: "FOTO 33",
      }

      ,
        {
        src: "/albums/vacaciones/foto35.jpeg",
        alt: "",
        caption: "FOTO 34",
      }
,
        {
        src: "/albums/vacaciones/foto36.jpeg",
        alt: "",
        caption: "FOTO 35",
      }

      ,
        {
        src: "/albums/vacaciones/foto37.jpeg",
        alt: "",
        caption: "FOTO 36",
      }
      ,
        {
        src: "/albums/vacaciones/foto38.jpeg",
        alt: "",
        caption: "FOTO 37",
      }

      ,
        {
        src: "/albums/vacaciones/foto39.jpeg",
        alt: "",
        caption: "FOTO 38",
      }
      ,
        {
        src: "/albums/vacaciones/foto40.jpeg",
        alt: "",
        caption: "FOTO 39",
      }

      ,
        {
        src: "/albums/vacaciones/foto41.jpeg",
        alt: "",
        caption: "FOTO 40",
      }
      ,
        {
        src: "/albums/vacaciones/foto42.jpeg",
        alt: "",
        caption: "FOTO 41",
      }

      ,
        {
        src: "/albums/vacaciones/foto43.jpeg",
        alt: "",
        caption: "FOTO 42",
      }
      ,
        {
        src: "/albums/vacaciones/foto44.jpeg",
        alt: "",
        caption: "FOTO 43",
      }

      ,
        {
        src: "/albums/vacaciones/foto45.jpeg",
        alt: "",
        caption: "FOTO 44",
      }
      ,
        {
        src: "/albums/vacaciones/foto46.jpeg",
        alt: "",
        caption: "FOTO 45",
      }

      ,
        {
        src: "/albums/vacaciones/foto47.jpeg",
        alt: "",
        caption: "FOTO 46",
      }
      ,
        {
        src: "/albums/vacaciones/foto48.jpeg",
        alt: "",
        caption: "FOTO 47",
      }

      ,
        {
        src: "/albums/vacaciones/foto49.jpeg",
        alt: "",
        caption: "FOTO 48",
      }
      ,
        {
        src: "/albums/vacaciones/foto50.jpeg",
        alt: "",
        caption: "FOTO 49",
      }

      ,
        {
        src: "/albums/vacaciones/foto51.jpeg",
        alt: "",
        caption: "FOTO 50",
      }
      ,
        {
        src: "/albums/vacaciones/foto52.jpeg",
        alt: "",
        caption: "FOTO 51",
      }

      ,
        {
        src: "/albums/vacaciones/foto53.jpeg",
        alt: "",
        caption: "FOTO 52",
      }
      ,
        {
        src: "/albums/vacaciones/foto54.jpeg",
        alt: "",
        caption: "FOTO 53",
      }

      ,
        {
        src: "/albums/vacaciones/foto55.jpeg",
        alt: "",
        caption: "FOTO 54",
      }
      ,
        {
        src: "/albums/vacaciones/foto56.jpeg",
        alt: "",
        caption: "FOTO 55",
      }

      ,
        {
        src: "/albums/vacaciones/foto57.jpeg",
        alt: "",
        caption: "FOTO 56",
      }
      ,
        {
        src: "/albums/vacaciones/foto58.jpeg",
        alt: "",
        caption: "FOTO 57",
      }

      ,
        {
        src: "/albums/vacaciones/foto59.jpeg",
        alt: "",
        caption: "FOTO 58",
      }
      ,
        {
        src: "/albums/vacaciones/foto60.jpeg",
        alt: "",
        caption: "FOTO 59",
      }

      ,
        {
        src: "/albums/vacaciones/foto61.jpeg",
        alt: "",
        caption: "FOTO 60",
      }
      ,
        {
        src: "/albums/vacaciones/foto62.jpeg",
        alt: "",
        caption: "FOTO 61",
      }

      ,
        {
        src: "/albums/vacaciones/foto63.jpeg",
        alt: "",
        caption: "FOTO 62",
      }
    ],
  }
]

// Helper para buscar un álbum por id
export function getAlbumById(id: string): Album | undefined {
  return albums.find((a) => a.id === id)
}
