"use client"

import { useEffect, useRef, useState } from "react"
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react"
import { X, Copy, Check, ExternalLink, QrCode, Link2, Download, Share2 } from "lucide-react"

interface ShareModalProps {
  albumTitle: string
  albumUrl: string
  onClose: () => void
}

type Tab = "link" | "qr"

export default function ShareModal({ albumTitle, albumUrl, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [fullUrl, setFullUrl] = useState(albumUrl)
  const [tab, setTab] = useState<Tab>("link")
  const [qrDownloaded, setQrDownloaded] = useState(false)
  const qrCanvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${albumUrl}`)
    }
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [albumUrl])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // no-op
    }
  }

  const handleDownloadQR = () => {
    // Find the canvas rendered by QRCodeCanvas inside the hidden div
    const canvas = qrCanvasRef.current?.querySelector("canvas") as HTMLCanvasElement | null
    if (!canvas) return

    // Create a padded export canvas
    const padding = 24
    const size = canvas.width
    const exportCanvas = document.createElement("canvas")
    exportCanvas.width = size + padding * 2
    exportCanvas.height = size + padding * 2
    const ctx = exportCanvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)
    ctx.drawImage(canvas, padding, padding)

    const link = document.createElement("a")
    link.download = `qr-${albumTitle.replace(/\s+/g, "-").toLowerCase()}.png`
    link.href = exportCanvas.toDataURL("image/png")
    link.click()

    setQrDownloaded(true)
    setTimeout(() => setQrDownloaded(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Compartir album"
    >
      <div
        className="modal-enter relative w-full max-w-md overflow-hidden rounded-t-3xl sm:rounded-3xl border border-white/[0.09] bg-card shadow-2xl shadow-black/70"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top glow accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/[0.06] to-transparent pointer-events-none" />

        <div className="px-5 pt-5 pb-6 sm:px-6 sm:pt-6">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/25">
                <Share2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground leading-tight">
                  Compartir álbum
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground truncate max-w-[200px]">
                  {albumTitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-muted-foreground transition hover:bg-white/[0.12] hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-5 flex gap-1 rounded-xl bg-muted/60 p-1">
            <button
              onClick={() => setTab("link")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all duration-200 ${
                tab === "link"
                  ? "bg-card text-foreground shadow-sm shadow-black/30 ring-1 ring-white/[0.07]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Link2 className="h-3.5 w-3.5" />
              Enlace
            </button>
            <button
              onClick={() => setTab("qr")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all duration-200 ${
                tab === "qr"
                  ? "bg-card text-foreground shadow-sm shadow-black/30 ring-1 ring-white/[0.07]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <QrCode className="h-3.5 w-3.5" />
              Código QR
            </button>
          </div>

          {/* Tab: Link */}
          {tab === "link" && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Copia el enlace directo al álbum y compártelo donde quieras.
              </p>

              {/* URL display */}
              <div className="group relative flex items-center gap-2.5 rounded-xl border border-border bg-muted/40 px-3.5 py-3 transition hover:border-primary/30 hover:bg-muted/60">
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                <span className="flex-1 truncate font-mono text-xs text-muted-foreground">
                  {fullUrl}
                </span>
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopy}
                aria-label="Copiar enlace"
                className={`flex w-full items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                  copied
                    ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/30"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Enlace copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copiar enlace
                  </>
                )}
              </button>
            </div>
          )}

          {/* Tab: QR */}
          {tab === "qr" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Escanea el código QR con cualquier dispositivo para abrir el álbum al instante.
              </p>

              {/* QR display */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative rounded-2xl bg-white p-5 shadow-lg ring-1 ring-white/20">
                  {/* Visible SVG QR */}
                  <QRCodeSVG
                    value={fullUrl}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#0a0a0a"
                    level="H"
                    includeMargin={false}
                  />
                  {/* Corner decorations */}
                  <div className="absolute -top-1 -left-1 h-4 w-4 rounded-tl-lg border-t-2 border-l-2 border-primary" />
                  <div className="absolute -top-1 -right-1 h-4 w-4 rounded-tr-lg border-t-2 border-r-2 border-primary" />
                  <div className="absolute -bottom-1 -left-1 h-4 w-4 rounded-bl-lg border-b-2 border-l-2 border-primary" />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-br-lg border-b-2 border-r-2 border-primary" />
                </div>

                {/* Hidden canvas QR for download */}
                <div ref={qrCanvasRef} className="hidden" aria-hidden="true">
                  <QRCodeCanvas
                    value={fullUrl}
                    size={400}
                    bgColor="#ffffff"
                    fgColor="#0a0a0a"
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </div>

              {/* Download button */}
              <button
                onClick={handleDownloadQR}
                aria-label="Descargar imagen QR"
                className={`flex w-full items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                  qrDownloaded
                    ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/30"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
                }`}
              >
                {qrDownloaded ? (
                  <>
                    <Check className="h-4 w-4" />
                    QR descargado
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Descargar imagen QR
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Bottom safe-area spacer on mobile */}
        <div className="h-safe-area-inset-bottom sm:hidden" />
      </div>
    </div>
  )
}
