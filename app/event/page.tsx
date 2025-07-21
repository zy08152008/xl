import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Phone, Mail } from "lucide-react"

export default function EventPage() {
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
              <Link href="/event" className="text-yellow-400 whitespace-nowrap">
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
      <div className="flex-1 z-10 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page title */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Image src="/images/xuan-long-logo-new.png" alt="Xuan Long Logo" width={120} height={120} />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-4">籌募新會所基金晚宴</h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-white/80">Fundraising Dinner for New Headquarters</h2>
          </div>

          {/* Event overview */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="content-card rounded-lg p-4 sm:p-6 border border-yellow-400/30 golden-glow">
              <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-4">活动概述 | Event Overview</h3>
              <div className="space-y-3 text-white/90">
                <p className="text-sm sm:text-base">
                  为庆祝国际玄龍體育總會三週年及馬來西亞玄龍體育總會十三週年，我们诚挚邀请您参加这场意义非凡的筹款晚宴。
                </p>
                <p className="text-xs sm:text-sm text-white/70">
                  To celebrate the 3rd Anniversary of International Xuan Long Sport Association and 13th Anniversary of
                  Malaysia Xuan Long Sport Association, we cordially invite you to this meaningful fundraising dinner.
                </p>
              </div>
            </div>

            <div className="content-card rounded-lg p-4 sm:p-6 border border-yellow-400/30 golden-glow">
              <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-4">筹款目标 | Fundraising Goal</h3>
              <div className="space-y-3 text-white/90">
                <p className="text-sm sm:text-base">
                  此次筹款活动旨在为玄龍體育總會筹建新会所，为会员提供更好的训练和活动场所。
                </p>
                <p className="text-xs sm:text-sm text-white/70">
                  This fundraising event aims to establish a new headquarters for Xuan Long Sport Association, providing
                  better training and activity facilities for our members.
                </p>
              </div>
            </div>
          </div>

          {/* Event details */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="content-card rounded-lg p-4 sm:p-6 border border-yellow-400/30">
              <div className="flex items-center mb-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2" />
                <h4 className="font-semibold text-white text-sm sm:text-base">日期 | Date</h4>
              </div>
              <p className="text-yellow-400 font-bold text-sm sm:text-base">2025年8月1日</p>
              <p className="text-white/70 text-xs sm:text-sm">August 1, 2025</p>
              <p className="text-yellow-400 mt-1 text-sm sm:text-base">星期五</p>
              <p className="text-white/70 text-xs sm:text-sm">Friday</p>
            </div>

            <div className="content-card rounded-lg p-4 sm:p-6 border border-yellow-400/30">
              <div className="flex items-center mb-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2" />
                <h4 className="font-semibold text-white text-sm sm:text-base">时间 | Time</h4>
              </div>
              <p className="text-yellow-400 font-bold text-sm sm:text-base">晚上7:00</p>
              <p className="text-white/70 text-xs sm:text-sm">7:00 PM</p>
            </div>

            <div className="content-card rounded-lg p-4 sm:p-6 border border-yellow-400/30">
              <div className="flex items-center mb-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2" />
                <h4 className="font-semibold text-white text-sm sm:text-base">地点 | Venue</h4>
              </div>
              <p className="text-yellow-400 font-bold text-sm:text-base">王岳海银星宴会厅</p>
              <p className="text-white/70 text-xs sm:text-sm mb-2">GALAXY BANQUET HALL</p>
              <p className="text-white/60 text-xs mb-3">Jalan Peach Avenue, Kuala Lumpur</p>
              <a
                href="https://waze.com/ul/hw28644f9d"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Waze 导航 | Get Directions
              </a>
            </div>
          </div>

          {/* Event Poster */}
          <div className="content-card rounded-lg p-4 sm:p-8 border border-yellow-400/30 mb-8 sm:mb-12 golden-glow">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
              活动海报 | Event Poster
            </h3>
            <div className="flex justify-center">
              <Link href="/poster">
                <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-xl transition-transform hover:scale-105">
                  <Image
                    src="/images/event-poster.jpeg"
                    alt="Xuan Long Event Poster"
                    width={500}
                    height={700}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
                    <span className="text-white font-medium text-xs sm:text-sm">
                      点击查看完整海报 | Click to view full poster
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* 福品竞标部分 */}
          <div className="content-card rounded-lg p-4 sm:p-8 border border-yellow-400/30 mb-8 sm:mb-12 golden-glow">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
              福品竞标 | Fortune Items Auction
            </h3>

            <div className="text-center mb-6">
              <p className="text-white/90 text-sm sm:text-base mb-2">
                现场将举行福品竞标活动，所得善款将用于新会所建设基金
              </p>
              <p className="text-white/70 text-xs sm:text-sm">
                Live auction of fortune items will be held, with proceeds going to the new headquarters fund
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-400/30">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2">🐉</div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-yellow-400 mb-2">开光金龙</h4>
                  <p className="text-xs sm:text-sm text-white/80 mb-2">Blessed Golden Dragon</p>
                  <p className="text-xs sm:text-sm text-white/70">经过开光仪式的金龙摆件，寓意事业腾飞、财源广进</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg p-4 border border-red-500/30">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2">🦁</div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-red-400 mb-2">醒狮头</h4>
                  <p className="text-xs sm:text-sm text-white/80 mb-2">Lion Head</p>
                  <p className="text-xs sm:text-sm text-white/70">传统醒狮头，具有驱邪避凶、招财进宝的寓意</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg p-4 border border-orange-500/30">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2">🥁</div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-orange-400 mb-2">开光鼓</h4>
                  <p className="text-xs sm:text-sm text-white/80 mb-2">Blessed Drum</p>
                  <p className="text-xs sm:text-sm text-white/70">经过开光的传统鼓，象征着声势浩大、前程似锦</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2">🏮</div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-green-400 mb-2">福灯</h4>
                  <p className="text-xs sm:text-sm text-white/80 mb-2">Fortune Lantern</p>
                  <p className="text-xs sm:text-sm text-white/70">传统福灯，寓意光明前程、家庭和睦</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2">🎋</div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-purple-400 mb-2">竹报平安</h4>
                  <p className="text-xs sm:text-sm text-white/80 mb-2">Bamboo Peace</p>
                  <p className="text-xs sm:text-sm text-white/70">竹制工艺品，象征节节高升、平安吉祥</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-lg p-4 border border-pink-500/30">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2">💎</div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-pink-400 mb-2">水晶摆件</h4>
                  <p className="text-xs sm:text-sm text-white/80 mb-2">Crystal Ornament</p>
                  <p className="text-xs sm:text-sm text-white/70">精美水晶摆件，寓意纯洁透明、事业成功</p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <div className="bg-black/50 border border-yellow-400/30 rounded-lg p-4 sm:p-6">
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-yellow-400 mb-3">
                  竞标须知 | Auction Guidelines
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-white/80">
                  <p>• 竞标将在晚宴现场进行，起标价将于活动当晚公布</p>
                  <p>• 竞标所得善款将全数用于新会所建设基金</p>
                  <p>• 成功竞标者将获得福品及感谢状</p>
                </div>
                <div className="mt-3 space-y-1 text-xs text-white/60">
                  <p>• Auction will be held during the dinner, starting prices announced on event night</p>
                  <p>• All proceeds will go towards the new headquarters fund</p>
                  <p>• Successful bidders will receive the item and a certificate of appreciation</p>
                </div>
              </div>
            </div>
          </div>

          {/* View program schedule button */}
          <div className="text-center mb-8 sm:mb-12">
            <Link
              href="/schedule"
              className="inline-flex items-center bg-yellow-400 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-sm sm:text-base"
            >
              查看完整节目流程 | View Complete Program Schedule
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Contact information */}
          <div className="content-card rounded-lg p-4 sm:p-8 border border-yellow-400/30 golden-glow">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
              联系我们 | Contact Information
            </h3>
            <div className="text-center mb-4 sm:mb-6">
              <p className="text-lg sm:text-xl font-bold text-yellow-400 mb-2">Master Andrew Yap 葉师傅</p>
              <p className="text-white/70 text-sm">活动联系人 | Event Contact Person</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="flex items-center space-x-3 justify-center sm:justify-start">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">电话 | Phone</p>
                  <p className="text-white/70 text-xs sm:text-sm">+60 16-681 2728</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 justify-center sm:justify-start">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <div>
                  <p className="text-white font-semibold text-sm:text-base">邮箱 | Email</p>
                  <p className="text-white/70 text-xs sm:text-sm">xuanlongsports.msia@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://bit.ly/2FAUPD4"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
                </svg>
                <span>WhatsApp 联系</span>
              </a>
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
