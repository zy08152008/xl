import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"

export default function PosterPage() {
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
        <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/images/xuan-long-logo-new.png" alt="Xuan Long Logo" width={50} height={50} />
          </Link>
          <div className="flex space-x-8 text-white">
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              主页 | Home
            </Link>
            <Link href="/event" className="hover:text-yellow-400 transition-colors">
              活动详情 | Event Details
            </Link>
            <Link href="/schedule" className="hover:text-yellow-400 transition-colors">
              节目流程 | Program
            </Link>
            <Link href="/contact" className="hover:text-yellow-400 transition-colors">
              座位查询 | Seat Inquiry
            </Link>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <div className="flex-1 z-10 px-4 py-8 flex flex-col items-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-8 flex justify-between items-center">
            <Link href="/event" className="flex items-center text-white hover:text-yellow-400 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>返回活动详情 | Back to Event Details</span>
            </Link>
            <a
              href="/images/event-poster.jpeg"
              download="xuan-long-event-poster.jpeg"
              className="flex items-center text-white hover:text-yellow-400 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              <span>下载海报 | Download Poster</span>
            </a>
          </div>

          <div className="content-card rounded-lg p-6 border border-yellow-400/30 golden-glow">
            <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6 text-center">
              玄龍大軍熱血上演 | Xuan Long Grand Performance
            </h1>

            <div className="flex justify-center mb-8">
              <div className="relative max-w-2xl">
                <Image
                  src="/images/event-poster.jpeg"
                  alt="Xuan Long Event Poster"
                  width={800}
                  height={1120}
                  className="rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6 text-center">
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-2">活动详情 | Event Details</h2>
                <p className="text-white">国际玄龍體育總會三週年 | 馬來西亞玄龍體育總會十三週年</p>
                <p className="text-white/80">
                  3rd Anniversary of International Xuan Long Sport Association | 13th Anniversary of Malaysia Xuan Long
                  Sport Association
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-2">日期与时间 | Date & Time</h2>
                <p className="text-white">2025年8月1日 晚上7:00</p>
                <p className="text-white/80">August 1, 2025 at 7:00 PM</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-2">地点 | Venue</h2>
                <p className="text-white">王岳海银星宴会厅</p>
                <p className="text-white/80">GALAXY BANQUET HALL</p>
              </div>

              <div className="pt-4">
                <Link
                  href="/event"
                  className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors inline-block"
                >
                  查看更多详情 | View More Details
                </Link>
              </div>
            </div>
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
