import ViceCityGame from "@/components/vice-city-game"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black overflow-hidden">
      {/* Animated grid background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/neon-highway-sunset.png')] bg-cover bg-center opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-pink-600/30 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-purple-900/40 to-transparent"></div>
      </div>

      {/* Palm tree silhouettes */}
      <div className="fixed bottom-0 left-0 right-0 h-40 z-10">
        <div className="absolute bottom-0 left-5 w-40 h-60 bg-[url('/tropical-sunset-silhouette.png')] bg-contain bg-no-repeat bg-bottom"></div>
        <div className="absolute bottom-0 right-5 w-40 h-60 bg-[url('/tropical-sunset-silhouette.png')] bg-contain bg-no-repeat bg-bottom transform scale-x-[-1]"></div>
      </div>

      {/* Sun/moon circle */}
      <div className="fixed top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 blur-sm opacity-70 z-0"></div>

      <div className="relative z-20 w-full max-w-4xl">
        <h1 className="text-center mb-6">
          <span className="font-black text-5xl md:text-7xl tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-teal-300 drop-shadow-[0_0_10px_rgba(255,65,180,0.8)]">
            VICE CITY
          </span>
          <span className="block text-2xl md:text-3xl font-bold text-white mt-2 italic tracking-wide drop-shadow-[0_0_5px_rgba(0,242,234,0.8)]">
            CONTRABAND HUSTLE
          </span>
        </h1>

        <ViceCityGame />
      </div>
    </main>
  )
}
