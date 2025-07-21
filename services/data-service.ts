// 定义数据类型
export interface Booking {
  id: string
  tableId: string
  attendees: string[] // Changed from 'name: string' to 'attendees: string[]'
  contactInfo: string
  tableType: "vvip" | "vip" | "regular" // Added 'vvip' type
  tableLocation: string
  bookingDate: string
  notes?: string
  status: "confirmed" | "pending" | "cancelled"
}

export interface SeatData {
  id: string
  type: "vvip" | "vip" | "regular" // Added 'vvip' type
  price: number
  available: boolean
  sponsor?: string // For VIP/VVIP tables
  location: string
  capacity: number // Added capacity for each table
}

// 定义初始数据
export const getInitialSeats = (): Record<string, SeatData> => {
  const initialSeats: Record<string, SeatData> = {
    VVIP: {
      id: "VVIP",
      type: "vvip",
      price: 12000, // Example price for VVIP
      available: true,
      sponsor: "特邀贵宾席",
      location: "舞台前方中央",
      capacity: 12,
    },
    // VIP tables (assuming these are the ones from the previous version, now regular tables)
    // The image only shows numbered tables and one VVIP.
    // I will re-map the previous VIPs to regular tables if they are part of the 58.
    // Based on the image, there are no distinct "VIP" tables other than VVIP.
    // The previous VIP1-VIP6 will be removed or re-categorized if they are part of the 58.
    // For now, I'll assume all numbered tables are 'regular'.

    // The image shows tables 1-58 and 'R'. Let's assume 'R' is a special regular table.
    // The image has 29 tables on the left and 29 on the right (including R).
    // Left side: 1,2,3, 8,9,10, 14,15,16, 20,21,22, 26,27,28, 32,33,34, 38,39,40, 44,45,46, 49,50, 54,55,56 (29 tables)
    // Right side: 5,6,7, 11,12,13, 17,18,19, 23,24,25, 29,30,31, 35,36,37, 41,42,43, 47,48, 51,52,53, R,57,58 (29 tables)
  }

  // Generate regular tables (T1-T58, plus R)
  const tableNumbers = [
    1,
    2,
    3,
    8,
    9,
    10,
    14,
    15,
    16,
    20,
    21,
    22,
    26,
    27,
    28,
    32,
    33,
    34,
    38,
    39,
    40,
    44,
    45,
    46,
    49,
    50,
    54,
    55,
    56, // Left side
    5,
    6,
    7,
    11,
    12,
    13,
    17,
    18,
    19,
    23,
    24,
    25,
    29,
    30,
    31,
    35,
    36,
    37,
    41,
    42,
    43,
    47,
    48,
    51,
    52,
    53,
    57,
    58, // Right side
  ]
  tableNumbers.sort((a, b) => a - b) // Sort for consistent order

  tableNumbers.forEach((num) => {
    const id = `T${num}`
    let location = ""
    if (num >= 1 && num <= 3) location = "左侧前排"
    else if (num >= 5 && num <= 7) location = "右侧前排"
    else if (num >= 8 && num <= 10) location = "左侧中前排"
    else if (num >= 11 && num <= 13) location = "右侧中前排"
    else if (num >= 14 && num <= 16) location = "左侧中排"
    else if (num >= 17 && num <= 19) location = "右侧中排"
    else if (num >= 20 && num <= 22) location = "左侧中后排"
    else if (num >= 23 && num <= 25) location = "右侧中后排"
    else if (num >= 26 && num <= 28) location = "左侧后排"
    else if (num >= 29 && num <= 31) location = "右侧后排"
    else if (num >= 32 && num <= 34) location = "左侧更后排"
    else if (num >= 35 && num <= 37) location = "右侧更后排"
    else if (num >= 38 && num <= 40) location = "左侧最后排"
    else if (num >= 41 && num <= 43) location = "右侧最后排"
    else if (num >= 44 && num <= 46) location = "左侧角落"
    else if (num >= 47 && num <= 48) location = "右侧角落"
    else if (num >= 49 && num <= 50) location = "左侧入口附近"
    else if (num >= 51 && num <= 53) location = "右侧入口附近"
    else if (num >= 54 && num <= 56) location = "左侧出口附近"
    else if (num >= 57 && num <= 58) location = "右侧出口附近"
    else location = "未知区域" // Fallback

    initialSeats[id] = {
      id: id,
      type: "regular",
      price: 2500,
      available: true,
      location: location,
      capacity: 10,
    }
  })

  // Add special 'R' table
  initialSeats["R"] = {
    id: "R",
    type: "regular",
    price: 2500,
    available: true,
    location: "右侧特殊区域",
    capacity: 10,
  }

  return initialSeats
}

export const getInitialBookings = (): Booking[] => {
  return [
    {
      id: "b1",
      tableId: "VVIP",
      attendees: ["张伟", "李丽", "王明", "赵芳"], // Example attendees
      contactInfo: "+60 12-345-6789",
      tableType: "vvip",
      tableLocation: "舞台前方中央",
      bookingDate: "2024-12-20",
      status: "confirmed",
      notes: "特邀贵宾",
    },
    {
      id: "b2",
      tableId: "T5",
      attendees: ["李娜", "陈刚", "刘红", "周杰", "吴迪", "郑凯", "孙悦", "马力", "高飞", "林静"],
      contactInfo: "+60 16-555-7890",
      tableType: "regular",
      tableLocation: "右侧前排",
      bookingDate: "2024-12-21",
      status: "confirmed",
    },
    {
      id: "b3",
      tableId: "T12",
      attendees: ["刘强", "杨敏"],
      contactInfo: "+60 17-222-3333",
      tableType: "regular",
      tableLocation: "右侧中前排",
      bookingDate: "2024-12-22",
      status: "pending",
    },
  ]
}

// 数据同步服务
export const DataService = {
  // 加载座位数据
  getSeats: (): Record<string, SeatData> => {
    if (typeof window === "undefined") return getInitialSeats()

    try {
      const storedSeats = localStorage.getItem("xuan-long-seats")
      if (storedSeats) {
        const parsedSeats = JSON.parse(storedSeats)
        // 验证数据结构，确保包含新的字段
        if (typeof parsedSeats === "object" && parsedSeats !== null) {
          // 检查并添加缺失的字段，例如 capacity
          const initial = getInitialSeats()
          for (const key in initial) {
            if (!parsedSeats[key]) {
              parsedSeats[key] = initial[key] // Add missing initial seats
            } else {
              // Ensure all properties exist, especially new ones like capacity
              parsedSeats[key] = { ...initial[key], ...parsedSeats[key] }
            }
          }
          // Remove seats that are no longer in initialSeats (e.g., old VIPs)
          for (const key in parsedSeats) {
            if (!initial[key]) {
              delete parsedSeats[key]
            }
          }
          return parsedSeats
        }
      }
    } catch (error) {
      console.error("Error loading seats data:", error)
    }

    // 如果没有存储的数据或数据无效，使用初始数据并保存
    const initialSeats = getInitialSeats()
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("xuan-long-seats", JSON.stringify(initialSeats))
      } catch (error) {
        console.error("Error saving initial seats data:", error)
      }
    }
    return initialSeats
  },

  // 保存座位数据
  saveSeats: (seats: Record<string, SeatData>): void => {
    if (typeof window === "undefined") return
    localStorage.setItem("xuan-long-seats", JSON.stringify(seats))
    // 触发存储事件以通知其他页面
    window.dispatchEvent(new Event("storage-update"))
  },

  // 加载预订数据
  getBookings: (): Booking[] => {
    if (typeof window === "undefined") return getInitialBookings()

    try {
      const storedBookings = localStorage.getItem("xuan-long-bookings")
      if (storedBookings) {
        const parsedBookings = JSON.parse(storedBookings)
        // 验证数据结构，确保包含新的字段
        if (Array.isArray(parsedBookings)) {
          // 转换旧的 'name' 字段到 'attendees' 数组
          return parsedBookings.map((booking) => ({
            ...booking,
            attendees: Array.isArray(booking.attendees) ? booking.attendees : booking.name ? [booking.name] : [],
            // Ensure tableType and tableLocation are correctly set based on current seat data
            // This might require fetching seats first, but for simplicity, assume they are correct or will be updated on save.
          }))
        }
      }
    } catch (error) {
      console.error("Error loading bookings data:", error)
    }

    // 如果没有存储的数据或数据无效，使用初始数据并保存
    const initialBookings = getInitialBookings()
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("xuan-long-bookings", JSON.stringify(initialBookings))
      } catch (error) {
        console.error("Error saving initial bookings data:", error)
      }
    }
    return initialBookings
  },

  // 保存预订数据
  saveBookings: (bookings: Booking[]): void => {
    if (typeof window === "undefined") return
    localStorage.setItem("xuan-long-bookings", JSON.stringify(bookings))
    // 触发存储事件以通知其他页面
    window.dispatchEvent(new Event("storage-update"))
  },

  // 更新座位可用性
  updateSeatAvailability: (): void => {
    if (typeof window === "undefined") return

    const seats = DataService.getSeats()
    const bookings = DataService.getBookings()

    // 首先将所有座位重置为可用
    Object.keys(seats).forEach((seatId) => {
      seats[seatId].available = true
    })

    // 然后根据预订数据更新座位可用性
    bookings.forEach((booking) => {
      if (seats[booking.tableId] && booking.status !== "cancelled") {
        // A table is unavailable if it has any confirmed or pending booking
        seats[booking.tableId].available = false
      }
    })

    DataService.saveSeats(seats)
  },

  // 添加一个新方法来重置数据到初始状态
  resetToInitialData: (): void => {
    if (typeof window === "undefined") return

    try {
      const initialSeats = getInitialSeats()
      const initialBookings = getInitialBookings()

      localStorage.setItem("xuan-long-seats", JSON.stringify(initialSeats))
      localStorage.setItem("xuan-long-bookings", JSON.stringify(initialBookings))

      // 触发存储事件以通知其他页面
      window.dispatchEvent(new Event("storage-update"))
    } catch (error) {
      console.error("Error resetting data:", error)
    }
  },
}
