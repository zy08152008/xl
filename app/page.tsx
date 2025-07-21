import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden">
      {/* Black and gold background */}
      <div className="absolute inset-0 poster-bg"></div>

      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="w-full z-10">
        <nav className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            <Link href="/" className="flex items-center">
              <Image src="/images/xuan-long-logo-new.png" alt="Xuan Long Logo" width={50} height={50} />
            </Link>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-8 text-white text-sm sm:text-base">
              <Link href="/" className="hover:text-yellow-400 transition-colors whitespace-nowrap">
                主页 | Home
              </Link>
              <Link href="/event" className="hover:text-yellow-400 transition-colors whitespace-nowrap">
                活动详情 | Event Details
              </Link>
              <Link href="/schedule" className="hover:text-yellow-400 transition-colors whitespace-nowrap">
                节目流程 | Program
              </Link>
              <Link href="/contact" className="hover:text-yellow-400 transition-colors whitespace-nowrap">
                座位查询 | Seat Inquiry
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 px-4 text-center">
        <div className="relative w-72 sm:w-80 md:w-96 mb-8 sm:mb-12">
          <Image
            src="/images/event-poster.jpeg"
            alt="Xuan Long Event Poster"
            width={400}
            height={560}
            className="animate-pulse-slow rounded-lg shadow-2xl golden-glow w-full h-auto"
          />
        </div>

        <div className="text-yellow-400 mt-6 sm:mt-8 space-y-4 sm:space-y-6 content-card p-4 sm:p-8 rounded-lg max-w-4xl w-full">
          {/* Chinese text */}
          <div className="space-y-1 sm:space-y-2">
            <p className="text-base sm:text-lg md:text-xl">国际玄龍體育總會三週年</p>
            <p className="text-base sm:text-lg md:text-xl">馬來西亞玄龙體育總會十三週年</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">籌募新會所基金晚宴</p>
          </div>

          {/* English text */}
          <div className="space-y-1 sm:space-y-2 text-white/80">
            <p className="text-xs sm:text-sm md:text-base">
              3rd Anniversary of INTERNATIONAL XUAN LONG SPORT ASSOCIATION
            </p>
            <p className="text-xs sm:text-sm md:text-base">13th Anniversary of MALAYSIA XUAN LONG SPORT ASSOCIATION</p>
            <p className="text-sm sm:text-base md:text-lg font-medium">Fundraising Dinner for New Headquarters</p>
          </div>

          {/* Event date and venue */}
          <div className="mt-6 sm:mt-8 space-y-2 text-white/90">
            <p className="text-base sm:text-lg md:text-xl font-bold">
              <span className="text-yellow-400">2025年8月1日 星期五</span> | August 1, 2025 (Friday)
            </p>
            <p className="text-sm sm:text-base md:text-lg">
              <span className="text-yellow-400">王岳海银星宴会厅</span> | GALAXY BANQUET HALL
            </p>
            <p className="text-sm sm:text-base md:text-lg">
              <span className="text-yellow-400">晚上7:00</span> | 7:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-white/60 text-sm z-10">
        <p>© 2025 国际玄龍體育總會 | INTERNATIONAL XUAN LONG SPORT ASSOCIATION. All rights reserved.</p>
      </footer>
    </main>
  )
}
