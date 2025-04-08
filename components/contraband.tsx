export default function Contraband() {
  return (
    <div className="relative w-16 h-16">
      {/* White powder bag */}
      <div className="absolute inset-0 bg-white rounded-md border border-gray-300 shadow-lg">
        {/* Bag folds */}
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gray-200"></div>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-200"></div>
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gray-200"></div>
      </div>

      {/* Dollar sign overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-green-500 font-bold text-2xl opacity-50">
        $
      </div>

      {/* Neon glow */}
      <div className="absolute -inset-1 bg-teal-400 opacity-20 blur-sm rounded-lg animate-pulse"></div>
    </div>
  )
}
