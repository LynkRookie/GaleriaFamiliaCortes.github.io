"use client"

import { useState } from "react"
import { X } from "lucide-react"

const FAMILY_MEMBERS = [
  "Tata Tito",
  "Abuela Olivia",
  "Nevenka Cortés",
  "Wilda Cortés",
  "Emiliana Cortés",
  "Jacqueline Cortés",
  "Mirza Cortés",
  "Ximena Cortés",
  "Lorena Cortés",
  "Viviana Cortés",
  "Karina Cortés",
  "Fernando Cortés",
  "Leo Cortés",
]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      {/* Speech bubble body */}
      <path
        d="M24 10C16.268 10 10 16.268 10 24c0 2.636.715 5.108 1.964 7.234L10 38l6.986-1.832A13.935 13.935 0 0 0 24 38c7.732 0 14-6.268 14-14S31.732 10 24 10Z"
        fill="white"
      />
      {/* Phone handset */}
      <path
        d="M30.5 27.36c-.41-.206-2.426-1.198-2.802-1.334-.375-.137-.648-.206-.92.206-.273.41-1.057 1.334-1.296 1.607-.238.273-.477.307-.888.103-.41-.205-1.73-.637-3.294-2.034-1.217-1.087-2.04-2.428-2.279-2.836-.238-.41-.025-.632.179-.836.184-.184.41-.478.615-.718.204-.238.273-.41.41-.683.136-.273.068-.512-.034-.718-.104-.205-.921-2.224-1.262-3.044-.333-.799-.67-.69-.92-.703-.239-.011-.512-.013-.785-.013-.273 0-.717.103-1.092.512-.375.41-1.43 1.398-1.43 3.41 0 2.013 1.465 3.962 1.669 4.236.205.273 2.882 4.401 6.984 6.174.976.421 1.738.673 2.33.861.98.312 1.874.268 2.58.163.787-.118 2.426-.993 2.769-1.953.342-.956.342-1.776.239-1.948-.102-.171-.375-.273-.784-.477Z"
        fill="#25D366"
      />
    </svg>
  )
}

type RequestType = "" | "fotos" | "videos"

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [requestType, setRequestType] = useState<RequestType>("")
  const [forWhom, setForWhom] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  // Reset forWhom when requestType changes so stale selection is cleared
  const handleRequestTypeChange = (val: RequestType) => {
    setRequestType(val)
    setForWhom("")
  }

  const forWhomLabel =
    requestType === "videos"
      ? "¿Para quién son los videos?"
      : "¿Para quién son las fotos?"

  const contentLabel = requestType === "videos" ? "videos" : "fotos"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !requestType || !forWhom) return
    setConfirmed(true)
    const message = encodeURIComponent(
      `Hola Damián, soy ${name.trim()}. Quiero que agregues estas ${contentLabel} ${forWhom}. Por favor dime qué necesitas.`
    )
    setTimeout(() => {
      window.open(`https://wa.me/56933471250?text=${message}`, "_blank")
      setOpen(false)
      setConfirmed(false)
      setName("")
      setRequestType("")
      setForWhom("")
    }, 2200)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Contactar por WhatsApp"
        title="Solicitar agregar fotos por WhatsApp"
        className="fixed bottom-8 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <WhatsAppIcon className="h-14 w-14" />
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setOpen(false); setConfirmed(false) } }}
        >
          <div className="relative w-full max-w-sm rounded-2xl bg-[#111] border border-white/10 shadow-2xl p-6">
            {/* Close */}
            <button
              onClick={() => { setOpen(false); setConfirmed(false) }}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <WhatsAppIcon className="h-10 w-10 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white leading-tight">
                  Solicitar agregar fotos
                </h2>
                <p className="text-xs text-white/50 mt-0.5">
                  Completa el formulario para contactar a Damián
                </p>
              </div>
            </div>

            {confirmed ? (
              /* Confirmation message */
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <WhatsAppIcon className="h-14 w-14" />
                <p className="text-sm text-white font-medium">
                  Se va a abrir WhatsApp ahora.
                </p>
                <p className="text-xs text-white/50">
                  Por favor toca <strong className="text-white/70">Abrir</strong> o <strong className="text-white/70">Permitir</strong> si el navegador lo solicita para enviar el mensaje.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wa-name" className="text-xs font-medium text-white/60 uppercase tracking-wider">
                    Tu nombre
                  </label>
                  <input
                    id="wa-name"
                    type="text"
                    required
                    placeholder="Ej: María González"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-lg border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#25D366]/60 focus:outline-none focus:ring-1 focus:ring-[#25D366]/40 transition"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                </div>

                {/* What do you want to request */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wa-request" className="text-xs font-medium text-white/60 uppercase tracking-wider">
                    ¿Qué deseas solicitar?
                  </label>
                  <select
                    id="wa-request"
                    required
                    value={requestType}
                    onChange={(e) => handleRequestTypeChange(e.target.value as RequestType)}
                    className="rounded-lg border border-white/10 px-3 py-2.5 text-sm text-white focus:border-[#25D366]/60 focus:outline-none focus:ring-1 focus:ring-[#25D366]/40 transition appearance-none"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <option value="" disabled className="bg-neutral-900">Selecciona una opción</option>
                    <option value="fotos" className="bg-neutral-900">Agregar fotos a la página</option>
                    <option value="videos" className="bg-neutral-900">Agregar videos a la página</option>
                  </select>
                </div>

                {/* For whom — label changes dynamically */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wa-forwhom" className="text-xs font-medium text-white/60 uppercase tracking-wider">
                    {forWhomLabel}
                  </label>
                  <select
                    id="wa-forwhom"
                    required
                    value={forWhom}
                    onChange={(e) => setForWhom(e.target.value)}
                    disabled={!requestType}
                    className="rounded-lg border border-white/10 px-3 py-2.5 text-sm text-white focus:border-[#25D366]/60 focus:outline-none focus:ring-1 focus:ring-[#25D366]/40 transition appearance-none disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <option value="" disabled className="bg-neutral-900">Selecciona una opción</option>
                    {FAMILY_MEMBERS.map((m) => (
                      <option key={m} value={m} className="bg-neutral-900">{m}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!name.trim() || !requestType || !forWhom}
                  className="mt-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
                  style={{ background: "#25D366" }}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Enviar por WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
