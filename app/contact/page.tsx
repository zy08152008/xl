"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Phone, Mail, Users, Calendar, Clock, ArrowUp } from "lucide-react"
import { DataService, type Booking, type SeatData } from "@/services/data-service"

export default function ContactPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const [foundBooking, setFoundBooking] = useState<Booking | null>(null)
  const [highlightedTable, setHighlightedTable] = useState<string | null>(null)

  const [bookings, setBookings] = useState<Booking[]>([])
  const [seats, setSeats] = useState<Record<string, SeatData>>({})

  // Load initial data and set up storage listeners
  useEffect(() => {
    const loadData = () => {
      setBookings(DataService.getBookings())
      setSeats(DataService.getSeats())
      DataService.updateSeatAvailability() // Ensure availability is up-to-date
    }

    loadData()

    const handleStorageUpdate = () => {
      loadData()
    }

    window.addEventListener("storage-update", handleStorageUpdate)
    window.addEventListener("storage", handleStorageUpdate)

    return () => {
      window.removeEventListener("storage-update", handleStorageUpdate)
      window.removeEventListener("storage", handleStorageUpdate)
    }
  }, [])

  // Debounce search term for suggestions
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300) // 300ms debounce delay

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  // Generate suggestions based on debounced search term
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      const searchTermLower = debouncedSearchTerm.toLowerCase().trim()
      const matchingNames = new Set<string>()

      bookings.forEach((booking) => {
        if (booking.status !== "cancelled") {
          booking.attendees.forEach((name) => {
            if (name.toLowerCase().includes(searchTermLower)) {
              matchingNames.add(name)
            }
          })
        }
      })
      setSuggestions(Array.from(matchingNames).sort())
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setFoundBooking(null) // Clear previous search result if search term is empty
      setHighlightedTable(null)
    }
  }, [debouncedSearchTerm, bookings])

  // Function to handle clicking a suggestion
  const handleSuggestionClick = (attendeeName: string) => {
    setSearchTerm(attendeeName) // Set input value to the clicked suggestion
    setShowSuggestions(false) // Hide suggestions

    const booking = bookings.find((b) => b.attendees.includes(attendeeName) && b.status !== "cancelled")

    if (booking) {
      setFoundBooking(booking)
      setHighlightedTable(booking.tableId)
    } else {
      setFoundBooking(null)
      setHighlightedTable(null)
    }
  }

  // Memoize table data for rendering, structured by rows for better layout control
  const tableLayout = useMemo(() => {
    const layout: {
      left: { id: string; type: "regular" | "vvip" }[][]
      right: { id: string; type: "regular" | "vvip" }[][]
      vvip: { id: string; type: "regular" | "vvip" }
    } = {
      left: [],
      right: [],
      vvip: { id: "VVIP", type: "vvip" },
    }

    // Left side tables (grouped by rows as per image)
    const leftTableRows = [
      [1, 2, 3],
      [8, 9, 10],
      [14, 15, 16],
      [20, 21, 22],
      [26, 27, 28],
      [32, 33, 34],
      [38, 39, 40],
      [44, 45, 46],
      [49, 50], // This row has 2 tables
      [54, 55, 56],
    ]
    leftTableRows.forEach((rowTables) => {
      layout.left.push(
        rowTables.map((tableNum) => ({
          id: `T${tableNum}`,
          type: "regular",
        })),
      )
    })

    // Right side tables (grouped by rows as per image)
    const rightTableRows = [
      [5, 6, 7],
      [11, 12, 13],
      [17, 18, 19],
      [23, 24, 25],
      [29, 30, 31],
      [35, 36, 37],
      [41, 42, 43],
      [47, 48], // This row has 2 tables
      [51, 52, 53],
      ["R", 57, 58], // 'R' is a string ID
    ]
    rightTableRows.forEach((rowTables) => {
      layout.right.push(
        rowTables.map((tableId) => ({
          id: typeof tableId === "number" ? `T${tableId}` : String(tableId),
          type: "regular",
        })),
      )
    })

    return layout
  }, [])

  const getTableClass = (seatId: string) => {
    const isHighlighted = highlightedTable === seatId
    const seat = seats[seatId]
    const isBooked = seat ? !seat.available : false // A seat is booked if not available

    let baseClasses =
      "relative flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out text-xs sm:text-sm font-medium"
    let colorClasses = ""

    if (seatId === "VVIP") {
      baseClasses =
        "relative flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out font-bold text-base sm:text-lg"
      colorClasses = isHighlighted
        ? "border-red-500 bg-red-500/30 text-red-400 animate-pulse-highlight"
        : isBooked
          ? "border-red-700 bg-red-700/20 text-red-300"
          : "border-red-500/50 bg-red-500/10 text-red-400"
    } else {
      colorClasses = isHighlighted
        ? "border-yellow-400 bg-yellow-400/30 text-yellow-400 animate-pulse-highlight"
        : isBooked
          ? "border-gray-600 bg-gray-800/50 text-gray-400"
          : "border-white/30 bg-black/50 text-white/70"
    }

    return `${baseClasses} ${colorClasses}`
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden" onClick={() => setShowSuggestions(false)}>
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
        <nav className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <Link href="/" className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
            <Image src="/images/xuan-long-logo-new.png" alt="Xuan Long Logo" width={50} height={50} />
          </Link>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-white text-sm sm:text-base">
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              主页 | Home
            </Link>
            <Link href="/event" className="hover:text-yellow-400 transition-colors">
              活动详情 | Event Details
            </Link>
            <Link href="/schedule" className="hover:text-yellow-400 transition-colors">
              节目流程 | Program
            </Link>
            <Link href="/contact" className="text-yellow-400">
              座位查询 | Seat Inquiry
            </Link>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <div className="flex-1 z-10 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image src="/images/xuan-long-logo-new.png" alt="Xuan Long Logo" width={120} height={120} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">座位查询</h1>
            <h2 className="text-xl md:text-2xl text-white/80">Find Your Table</h2>
          </div>

          {/* Search section */}
          <div className="content-card rounded-lg p-4 sm:p-8 border border-yellow-400/30 mb-6 sm:mb-8 golden-glow">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
              查找您的座位 | Find Your Seat
            </h3>

            <div className="max-w-md mx-auto mb-6 sm:mb-8 relative">
              <p className="text-white text-center mb-4 text-sm sm:text-base">
                请输入预订人姓名查询座位位置
                <br />
                <span className="text-white/70 text-xs sm:text-sm">
                  Please enter the booking name to find your table location
                </span>
              </p>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="输入预订人姓名... | Enter booking name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm.trim() && suggestions.length > 0 && setShowSuggestions(true)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 bg-black/50 border border-yellow-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-sm sm:text-base"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute z-20 w-full bg-black/80 border border-yellow-400/30 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {suggestions.map((name, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-white hover:bg-yellow-400/20 cursor-pointer text-sm sm:text-base"
                        onClick={(e) => {
                          e.stopPropagation() // Prevent hiding suggestions immediately
                          handleSuggestionClick(name)
                        }}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Search results */}
            {foundBooking && (
              <div className="mt-4 sm:mt-6 max-w-md mx-auto">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 sm:p-4">
                  <h4 className="text-white font-bold text-base sm:text-lg mb-2">找到您的座位！</h4>
                  <p className="text-white text-sm sm:text-base">
                    <span className="font-semibold">{foundBooking.attendees.join(", ")}</span> 的座位在{" "}
                    <span className="text-yellow-400 font-bold">{foundBooking.tableId}</span>
                  </p>
                  <p className="text-white/70 text-xs sm:text-sm mt-1">位置: {foundBooking.tableLocation}</p>
                  <p className="text-white/70 text-xs sm:text-sm mt-2 sm:mt-3">座位图中已高亮显示您的座位位置</p>
                </div>
              </div>
            )}

            {/* No results message - only show if search term is present and no booking found and no suggestions */}
            {searchTerm.trim() && !foundBooking && suggestions.length === 0 && (
              <div className="mt-4 sm:mt-6 max-w-md mx-auto text-center">
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 sm:p-4">
                  <p className="text-white text-sm sm:text-base">未找到匹配的预订人姓名，请检查拼写或联系工作人员</p>
                  <p className="text-white/70 text-xs sm:text-sm mt-1">
                    No matching booking name found. Please check spelling or contact staff.
                  </p>
                </div>
              </div>
            )}

            {/* Add reset data button - only in development */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    if (window.confirm("确定要重置所有数据到初始状态吗？这将清除所有更改。")) {
                      DataService.resetToInitialData()
                      setSearchTerm("")
                      setFoundBooking(null)
                      setHighlightedTable(null)
                      window.location.reload()
                    }
                  }}
                  className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs border border-red-500/30"
                >
                  重置数据到初始状态
                </button>
              </div>
            )}
          </div>

          {/* Seating Chart */}
          <div className="content-card rounded-lg p-4 sm:p-8 border border-yellow-400/30 mb-8 golden-glow">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
              座位平面图 | Seating Chart
            </h3>

            <div className="relative w-full max-w-[800px] mx-auto aspect-[800/1120] overflow-hidden">
              {/* Stage */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[8%] bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-2 border-yellow-400 rounded-b-lg flex items-center justify-center">
                <h4 className="text-lg sm:text-xl font-bold text-yellow-400">舞台 | STAGE</h4>
              </div>

              {/* Top Green/Red Dots */}
              <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[80%] h-[2%] flex justify-between items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-red-glow"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-red-glow"></div>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-green-500 rounded-full shadow-green-glow"></div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-red-glow"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-red-glow"></div>
                </div>
              </div>

              {/* VVIP Table */}
              <div
                className={`${getTableClass("VVIP")} absolute top-[12%] left-1/2 -translate-x-1/2 w-[15%] h-[10%]`}
                style={{ aspectRatio: "1/1" }}
              >
                VVIP
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[0.6em] text-white/80">12PAX</div>
              </div>

              {/* Lion Dance Aisle (Vertical path, horizontal text) */}
              <div className="absolute top-[23%] left-1/2 -translate-x-1/2 w-[20%] h-[60%] bg-orange-700/20 border border-orange-700/30 rounded-lg flex flex-col items-center justify-center text-white/70 text-sm">
                <span className="whitespace-nowrap">Lion Dance</span>
                <ArrowUp className="w-4 h-4 mt-1" /> {/* Arrow pointing up */}
              </div>

              {/* Main Entrance */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[20%] h-[5%] bg-gray-700/30 border border-gray-700/50 rounded-t-lg flex items-center justify-center text-white/70 text-xs sm:text-sm">
                入口处 | Main Entrance
              </div>

              {/* Left Side Tables */}
              <div className="absolute top-[12%] left-[5%] w-[30%] h-[80%] flex flex-col justify-between">
                {tableLayout.left.map((row, rowIndex) => (
                  <div key={`left-row-${rowIndex}`} className="flex justify-center gap-2 w-full">
                    {row.map((table) => (
                      <div
                        key={table.id}
                        className={`${getTableClass(table.id)} w-16 h-16`} // Fixed size for "normal" tables
                      >
                        {table.id.replace("T", "")}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Right Side Tables */}
              <div className="absolute top-[12%] right-[5%] w-[30%] h-[80%] flex flex-col justify-between">
                {tableLayout.right.map((row, rowIndex) => (
                  <div key={`right-row-${rowIndex}`} className="flex justify-center gap-2 w-full">
                    {row.map((table) => (
                      <div
                        key={table.id}
                        className={`${getTableClass(table.id)} w-16 h-16`} // Fixed size for "normal" tables
                      >
                        {table.id.replace("T", "")}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm mt-6 sm:mt-12">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-yellow-400 bg-yellow-400/20"></div>
                <span className="text-white">已选择 | Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-gray-600 bg-gray-800/50"></div>
                <span className="text-white">已预订 | Booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white/30 bg-black/50"></div>
                <span className="text-white">可用 | Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-red-500/50 bg-red-500/10"></div>
                <span className="text-white">VVIP</span>
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div className="content-card rounded-lg p-4 sm:p-8 border border-yellow-400/30 mb-6 sm:mb-12 golden-glow">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
              联系我们 | Contact Information
            </h3>

            <div className="text-center mb-4 sm:mb-6">
              <p className="text-lg sm:text-xl font-bold text-yellow-400 mb-1 sm:mb-2">Master Andrew Yap 葉师傅</p>
              <p className="text-white/70 text-sm">活动联系人 | Event Contact Person</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <p className="text-white font-semibold text-sm sm:text-base">电话 | Phone</p>
                <p className="text-white/70 text-xs sm:text-sm">+60 16-681 2728</p>
              </div>

              <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <p className="text-white font-semibold text-sm sm:text-base">邮箱 | Email</p>
                <p className="text-white/70 text-xs sm:text-sm">xuanlongsports.msia@gmail.com</p>
              </div>

              <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <p className="text-white font-semibold text-sm sm:text-base">地点 | Venue</p>
                <p className="text-white/70 text-xs sm:text-sm text-center">
                  王岳海银星宴会厅
                  <br />
                  Galaxy Banquet Hall
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://bit.ly/2FAUPD4"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
                </svg>
                <span>WhatsApp 联系</span>
              </a>

              <a
                href="mailto:xuanlongsports.msia@gmail.com"
                className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>发送邮件 | Send Email</span>
              </a>
            </div>
          </div>

          {/* Event info summary */}
          <div className="content-card rounded-lg p-4 sm:p-8 border border-yellow-400/30">
            <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-4 text-center">
              活动信息 | Event Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <p className="text-white font-semibold text-sm sm:text-base">2025年8月1日</p>
                <p className="text-white/70 text-xs sm:text-sm">August 1, 2025 (Friday)</p>
              </div>

              <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <p className="text-white font-semibold text-sm sm:text-base">晚上7:00</p>
                <p className="text-white/70 text-xs sm:text-sm">7:00 PM</p>
              </div>

              <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <p className="text-white font-semibold text-sm sm:text-base">座位有限</p>
                <p className="text-white/70 text-xs sm:text-sm">Limited Seating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-3 sm:py-4 text-center text-white/60 text-xs sm:text-sm z-10">
        <p>© 2025 国际玄龍體育總會 | INTERNATIONAL XUAN LONG SPORT ASSOCIATION. All rights reserved.</p>
      </footer>
    </main>
  )
}
