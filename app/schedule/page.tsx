import Image from "next/image"
import Link from "next/link"

export default function SchedulePage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
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
              <Link href="/schedule" className="text-yellow-400 whitespace-nowrap">
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
      <div className="flex-1 z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Image
                src="/images/xuan-long-logo-new.png"
                alt="Xuan Long Logo"
                width={100}
                height={100}
                className="sm:w-[120px] sm:h-[120px]"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-4">节目流程</h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-white/80">Program Schedule</h2>
          </div>

          {/* Program schedule */}
          <div className="content-card rounded-lg p-8 border border-yellow-400/30 mb-12 golden-glow">
            <div className="space-y-6">
              <p className="text-white/80 text-center mb-8">
                国际玄龍體育總會三週年及馬來西亞玄龍體育總會十三週年庆典活动流程
                <br />
                <span className="text-sm text-white/60">
                  Program Schedule for the 3rd Anniversary of International Xuan Long Sport Association & 13th
                  Anniversary of Malaysia Xuan Long Sport Association
                </span>
              </p>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center p-3 sm:p-4 bg-black/50 rounded-lg border border-yellow-400/20">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">7:00</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/20 pl-4 sm:pl-6">
                    <h3 className="text-white font-medium text-base sm:text-lg">入席</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Seating & Entry</p>
                  </div>
                </div>

                <div className="flex items-center p-3 sm:p-4 bg-black/50 rounded-lg border border-yellow-400/20">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">7:30</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/20 pl-4 sm:pl-6">
                    <h3 className="text-white font-medium text-base sm:text-lg">国内外玄龙队伍进场及VIP进场</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Xuan Long Teams & VIP Entry</p>
                  </div>
                </div>

                <div className="flex items-center p-3 sm:p-4 bg-black/50 rounded-lg border border-yellow-400/20">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">7:55</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/20 pl-4 sm:pl-6">
                    <h3 className="text-white font-medium text-base sm:text-lg">奏国歌</h3>
                    <p className="text-white/70 text-xs sm:text-sm">National Anthem</p>
                  </div>
                </div>

                <div className="flex items-center p-3 sm:p-4 bg-yellow-400/20 rounded-lg border border-yellow-400/50">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">8:00</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/30 pl-4 sm:pl-6">
                    <h3 className="text-yellow-400 font-medium text-base sm:text-lg">开幕仪式</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Opening Ceremony</p>
                  </div>
                </div>

                <div className="flex items-center p-3 sm:p-4 bg-black/50 rounded-lg border border-yellow-400/20">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">8:15</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/20 pl-4 sm:pl-6">
                    <h3 className="text-white font-medium text-base sm:text-lg">致辞</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Welcome Address</p>
                  </div>
                </div>

                <div className="flex items-center p-3 sm:p-4 bg-black/50 rounded-lg border border-yellow-400/20">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">8:20</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/20 pl-4 sm:pl-6">
                    <h3 className="text-white font-medium text-base sm:text-lg">颁发委任状</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Presentation of Appointment Certificates</p>
                  </div>
                </div>

                <div className="flex items-center p-3 sm:p-4 bg-black/50 rounded-lg border border-yellow-400/20">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">8:45</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/20 pl-4 sm:pl-6">
                    <h3 className="text-white font-medium text-base sm:text-lg">开光帅旗</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Blessing of Commander Flag</p>
                  </div>
                </div>

                <div className="flex items-center p-3 sm:p-4 bg-yellow-400/20 rounded-lg border border-yellow-400/50">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">9:00</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/30 pl-4 sm:pl-6">
                    <h3 className="text-yellow-400 font-medium text-base sm:text-lg">开光龙，鼓，狮</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Blessing of Dragon, Drums & Lions</p>
                  </div>
                </div>

                <div className="flex items-center p-3 sm:p-4 bg-black/50 rounded-lg border border-yellow-400/20">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">10:00</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/20 pl-4 sm:pl-6">
                    <h3 className="text-white font-medium text-base sm:text-lg">标福品</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Blessing of Fortune Items</p>
                  </div>
                </div>

                <div className="flex items-center p-3 sm:p-4 bg-yellow-400/20 rounded-lg border border-yellow-400/50">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">10:30</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/30 pl-4 sm:pl-6">
                    <h3 className="text-yellow-400 font-medium text-base sm:text-lg">大汇演</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Grand Performance</p>
                  </div>
                </div>

                <div className="flex items-center p-3 sm:p-4 bg-black/50 rounded-lg border border-yellow-400/20">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-24 flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">11:00</span>
                    <span className="text-white/60 text-xs">PM</span>
                  </div>
                  <div className="flex-1 ml-4 sm:ml-6 border-l border-yellow-400/20 pl-4 sm:pl-6">
                    <h3 className="text-white font-medium text-base sm:text-lg">结束</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Event Conclusion</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/70 text-sm">
                * 节目时间可能因现场情况略有调整 | Program timing may be subject to minor adjustments
              </p>
            </div>
          </div>

          {/* Additional information */}
          <div className="content-card rounded-lg p-8 border border-yellow-400/30 mb-12 golden-glow">
            <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">活动亮点 | Event Highlights</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-black/50 rounded-lg border border-yellow-400/20">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">开光仪式</h4>
                <p className="text-sm text-white/80 mb-2">Blessing Ceremony</p>
                <p className="text-sm text-white/70">传统开光仪式将为龙、鼓、狮注入灵气，确保来年好运和成功。</p>
                <p className="text-xs text-white/60 mt-1">
                  Traditional blessing ceremony to imbue the dragon, drums, and lions with spiritual energy, ensuring
                  good fortune and success in the coming year.
                </p>
              </div>

              <div className="p-4 bg-black/50 rounded-lg border border-yellow-400/20">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">大汇演</h4>
                <p className="text-sm text-white/80 mb-2">Grand Performance</p>
                <p className="text-sm text-white/70">精彩的文化表演，包括醒狮、舞龙和传统鼓乐演奏。</p>
                <p className="text-xs text-white/60 mt-1">
                  Spectacular cultural performances including lion dance, dragon dance, and traditional drum
                  performances.
                </p>
              </div>
            </div>
          </div>

          {/* Back to event details button */}
          <div className="text-center mb-12">
            <Link
              href="/event"
              className="inline-flex items-center bg-black/50 hover:bg-black/70 text-white border border-yellow-400/30 px-6 py-3 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回活动详情 | Back to Event Details
            </Link>
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
