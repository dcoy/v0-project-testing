export default function Pearl() {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-teal-50 shadow-lg border border-teal-100"></div>
      <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-white opacity-80"></div>
      <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-white opacity-70"></div>
      {/* Subtle iridescent glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-100 to-blue-100 opacity-30"></div>
    </div>
  )
}
