"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Save, Edit, Check, X, LogOut, Lock, Plus, Trash2, FileText } from "lucide-react"
import { DataService, type Booking, type SeatData } from "@/services/data-service"

// Simple authentication state management
interface AuthState {
  isAuthenticated: boolean
  username: string | null
}

export default function AdminPage() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
  })

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  })

  const [loginError, setLoginError] = useState<string | null>(null)

  const [bookings, setBookings] = useState<Booking[]>([])
  const [seats, setSeats] = useState<Record<string, SeatData>>({})

  const [editMode, setEditMode] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Booking | null>(null)

  const [showAddForm, setShowAddForm] = useState(false)
  const [newBookingForm, setNewBookingForm] = useState<Partial<Booking>>({
    attendees: [], // Changed to array
    contactInfo: "",
    tableId: "",
    notes: "",
    status: "confirmed",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [currentView, setCurrentView] = useState<"bookings" | "seats">("bookings")

  const [seatEditMode, setSeatEditMode] = useState<string | null>(null)
  const [seatEditForm, setSeatEditForm] = useState<SeatData | null>(null)

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.username === "admin" && loginForm.password === "password") {
      setAuth({
        isAuthenticated: true,
        username: loginForm.username,
      })
      setLoginError(null)
    } else {
      setLoginError("用户名或密码错误")
    }
  }

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      username: null,
    })
  }

  const startEdit = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId)
    if (booking) {
      setEditMode(bookingId)
      setEditForm({ ...booking })
    }
  }

  const cancelEdit = () => {
    setEditMode(null)
    setEditForm(null)
  }

  const saveEdit = () => {
    if (editForm && editMode) {
      const updatedBookings = bookings.map((booking) => (booking.id === editMode ? { ...editForm } : booking))
      setBookings(updatedBookings)
      DataService.saveBookings(updatedBookings)
      DataService.updateSeatAvailability() // Re-sync seat availability after booking changes
      setEditMode(null)
      setEditForm(null)
    }
  }

  const addNewBooking = () => {
    if (
      newBookingForm.attendees &&
      newBookingForm.attendees.length > 0 &&
      newBookingForm.contactInfo &&
      newBookingForm.tableId
    ) {
      const seatInfo = seats[newBookingForm.tableId]
      if (!seatInfo) {
        alert("请选择一个有效的桌号。")
        return
      }

      const newBooking: Booking = {
        id: `b${Date.now()}`,
        attendees: newBookingForm.attendees,
        contactInfo: newBookingForm.contactInfo,
        tableId: newBookingForm.tableId,
        tableType: seatInfo.type,
        tableLocation: seatInfo.location,
        bookingDate: new Date().toISOString().split("T")[0],
        status: newBookingForm.status as "confirmed" | "pending" | "cancelled",
        notes: newBookingForm.notes,
      }

      const updatedBookings = [...bookings, newBooking]
      setBookings(updatedBookings)
      DataService.saveBookings(updatedBookings)
      DataService.updateSeatAvailability() // Re-sync seat availability after booking changes

      setNewBookingForm({
        attendees: [],
        contactInfo: "",
        tableId: "",
        notes: "",
        status: "confirmed",
      })
      setShowAddForm(false)
    } else {
      alert("请填写所有必填项 (预订人姓名, 联系方式, 桌号)。")
    }
  }

  const deleteBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId)
    if (booking && window.confirm(`确定要删除 ${booking.attendees.join(", ")} 的预订吗？`)) {
      const updatedBookings = bookings.filter((b) => b.id !== bookingId)
      setBookings(updatedBookings)
      DataService.saveBookings(updatedBookings)
      DataService.updateSeatAvailability() // Re-sync seat availability after booking changes
    }
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!editForm) return

    const { name, value } = e.target

    if (name === "attendees") {
      setEditForm((prev) =>
        prev
          ? {
              ...prev,
              attendees: value
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s),
            }
          : null,
      )
    } else {
      setEditForm((prev) => (prev ? { ...prev, [name]: value } : null))
    }
  }

  const handleNewBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "attendees") {
      setNewBookingForm((prev) => ({
        ...prev,
        attendees: value
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
      }))
    } else {
      setNewBookingForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const startEditSeat = (seatId: string) => {
    const seat = seats[seatId]
    if (seat) {
      setSeatEditMode(seatId)
      setSeatEditForm({ ...seat })
    }
  }

  const cancelEditSeat = () => {
    setSeatEditMode(null)
    setSeatEditForm(null)
  }

  const saveEditSeat = () => {
    if (seatEditForm && seatEditMode) {
      const updatedSeats = { ...seats, [seatEditMode]: { ...seatEditForm } }
      setSeats(updatedSeats)
      DataService.saveSeats(updatedSeats)
      setSeatEditMode(null)
      setSeatEditForm(null)
    }
  }

  const handleSeatEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!seatEditForm) return

    const { name, value, type } = e.target as HTMLInputElement

    if (type === "number") {
      setSeatEditForm((prev) => (prev ? { ...prev, [name]: Number.parseFloat(value) } : null))
    } else {
      setSeatEditForm((prev) => (prev ? { ...prev, [name]: value } : null))
    }
  }

  const exportBookingsToCSV = () => {
    const headers = ["预订ID", "预订人姓名", "联系方式", "桌号", "人数", "桌位类型", "位置", "预订日期", "状态", "备注"]

    const bookingRows = bookings.map((booking) => [
      booking.id,
      booking.attendees.join("; "), // Join attendees with semicolon for CSV
      booking.contactInfo,
      booking.tableId,
      booking.attendees.length.toString(), // Number of attendees
      booking.tableType === "vvip" ? "VVIP" : booking.tableType === "vip" ? "VIP" : "普通",
      booking.tableLocation,
      booking.bookingDate,
      booking.status === "confirmed" ? "已确认" : booking.status === "pending" ? "待确认" : "已取消",
      booking.notes || "",
    ])

    const csvContent = [
      headers.join(","),
      ...bookingRows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `预订数据_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const saveAllChanges = () => {
    DataService.updateSeatAvailability()
    alert("数据已保存并同步！")
  }

  const resetAllData = () => {
    if (window.confirm("确定要重置所有数据到初始状态吗？这将清除所有更改。")) {
      DataService.resetToInitialData()
      alert("数据已重置到初始状态！")
      window.location.reload()
    }
  }

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.attendees.some((name) => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      booking.tableId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.contactInfo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const availableSeats = Object.values(seats).filter((seat) => seat.available)

  if (!auth.isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 poster-bg"></div>
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

        <div className="flex-1 z-10 flex items-center justify-center p-4">
          <div className="content-card rounded-lg p-6 sm:p-8 border border-yellow-400/30 golden-glow max-w-md w-full">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Image src="/images/xuan-long-logo-new.png" alt="Xuan Long Logo" width={80} height={80} />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">座位管理系统</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg text-sm">
                  {loginError}
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  用户名
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border border-yellow-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-sm sm:text-base"
                  placeholder="输入管理员用户名"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  密码
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border border-yellow-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-sm sm:text-base"
                  placeholder="输入密码"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black px-4 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>登录</span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-white/70 hover:text-yellow-400 text-xs sm:text-sm">
                返回主页
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 poster-bg"></div>
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
      <header className="w-full z-10 bg-black/50 border-b border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center justify-center sm:justify-start mb-2 sm:mb-0">
            <Image src="/images/xuan-long-logo-new.png" alt="Xuan Long Logo" width={36} height={36} className="mr-2" />
            <h1 className="text-lg sm:text-xl font-bold text-yellow-400">座位管理系统</h1>
          </div>
          <div className="flex items-center justify-center sm:justify-end space-x-4">
            <span className="text-white/70 text-sm">欢迎, {auth.username}</span>
            <button
              onClick={handleLogout}
              className="bg-black/50 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-white/20 hover:bg-black/70 transition-colors flex items-center space-x-1 text-sm"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>登出</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="w-full z-10 bg-black/30 border-b border-yellow-400/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-8">
            <button
              onClick={() => setCurrentView("bookings")}
              className={`py-2 sm:py-3 px-3 sm:px-4 border-b-2 transition-colors text-sm sm:text-base ${
                currentView === "bookings"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              预订管理
            </button>
            <button
              onClick={() => setCurrentView("seats")}
              className={`py-2 sm:py-3 px-3 sm:px-4 border-b-2 transition-colors text-sm sm:text-base ${
                currentView === "seats"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              座位管理
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {currentView === "bookings" ? (
            <>
              {/* Booking Management View */}
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="搜索预订人、桌号、联系方式..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-4 py-2 bg-black/50 border border-yellow-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-4">
                    <div className="bg-black/50 border border-yellow-400/30 rounded-lg px-4 py-2">
                      <span className="text-white/70">总预订: </span>
                      <span className="text-yellow-400 font-bold">{bookings.length}</span>
                    </div>
                    <div className="bg-black/50 border border-green-500/30 rounded-lg px-4 py-2">
                      <span className="text-white/70">已确认: </span>
                      <span className="text-green-500 font-bold">
                        {bookings.filter((b) => b.status === "confirmed").length}
                      </span>
                    </div>
                    <div className="bg-black/50 border border-orange-500/30 rounded-lg px-4 py-2">
                      <span className="text-white/70">待确认: </span>
                      <span className="text-orange-500 font-bold">
                        {bookings.filter((b) => b.status === "pending").length}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>新增预订</span>
                  </button>
                </div>
              </div>

              {/* Add New Booking Form */}
              {showAddForm && (
                <div className="content-card rounded-lg p-6 border border-yellow-400/30 golden-glow mb-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">新增预订</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">预订人姓名 (逗号分隔)</label>
                      <textarea
                        name="attendees"
                        value={newBookingForm.attendees?.join(", ") || ""}
                        onChange={handleNewBookingChange}
                        className="w-full px-3 py-2 bg-black/50 border border-yellow-400/30 rounded text-white"
                        placeholder="输入预订人姓名，多个姓名用逗号分隔 (例如: 张三, 李四, 王五)"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">联系方式</label>
                      <input
                        type="text"
                        name="contactInfo"
                        value={newBookingForm.contactInfo || ""}
                        onChange={handleNewBookingChange}
                        className="w-full px-3 py-2 bg-black/50 border border-yellow-400/30 rounded text-white"
                        placeholder="输入联系方式"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">选择座位</label>
                      <select
                        name="tableId"
                        value={newBookingForm.tableId || ""}
                        onChange={handleNewBookingChange}
                        className="w-full px-3 py-2 bg-black/50 border border-yellow-400/30 rounded text-white"
                      >
                        <option value="">选择座位</option>
                        {availableSeats.map((seat) => (
                          <option key={seat.id} value={seat.id}>
                            {seat.id} - {seat.type === "vvip" ? seat.sponsor : seat.location} (RM {seat.price})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">状态</label>
                      <select
                        name="status"
                        value={newBookingForm.status || "confirmed"}
                        onChange={handleNewBookingChange}
                        className="w-full px-3 py-2 bg-black/50 border border-yellow-400/30 rounded text-white"
                      >
                        <option value="confirmed">已确认</option>
                        <option value="pending">待确认</option>
                        <option value="cancelled">已取消</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-white font-medium mb-2">备注</label>
                      <textarea
                        name="notes"
                        value={newBookingForm.notes || ""}
                        onChange={handleNewBookingChange}
                        className="w-full px-3 py-2 bg-black/50 border border-yellow-400/30 rounded text-white"
                        rows={3}
                        placeholder="输入备注信息"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-500/20 text-white px-4 py-2 rounded hover:bg-gray-500/40"
                    >
                      取消
                    </button>
                    <button
                      onClick={addNewBooking}
                      className="bg-green-500/20 text-green-400 px-4 py-2 rounded hover:bg-green-500/40"
                    >
                      保存
                    </button>
                  </div>
                </div>
              )}

              {/* Booking Table */}
              <div className="content-card rounded-lg p-6 border border-yellow-400/30 golden-glow overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-yellow-400">预订管理</h2>
                  <button
                    onClick={exportBookingsToCSV}
                    className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded hover:bg-blue-500/40 flex items-center space-x-2"
                  >
                    <FileText className="w-5 h-5" />
                    <span>导出数据</span>
                  </button>
                </div>
                <table className="w-full text-white">
                  <thead className="border-b border-yellow-400/30">
                    <tr>
                      <th className="py-3 px-4 text-left">预订人</th>
                      <th className="py-3 px-4 text-left">桌号</th>
                      <th className="py-3 px-4 text-left">联系方式</th>
                      <th className="py-3 px-4 text-left">人数</th>
                      <th className="py-3 px-4 text-left">预订日期</th>
                      <th className="py-3 px-4 text-left">状态</th>
                      <th className="py-3 px-4 text-left">备注</th>
                      <th className="py-3 px-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-white/10 hover:bg-white/5">
                        {editMode === booking.id ? (
                          // Edit mode
                          <>
                            <td className="py-3 px-4">
                              <textarea
                                name="attendees"
                                value={editForm?.attendees?.join(", ") || ""}
                                onChange={handleEditChange}
                                className="w-full px-2 py-1 bg-black/50 border border-yellow-400/30 rounded text-white"
                                rows={1}
                              />
                            </td>
                            <td className="py-3 px-4">
                              <select
                                name="tableId"
                                value={editForm?.tableId || ""}
                                onChange={handleEditChange}
                                className="w-full px-2 py-1 bg-black/50 border border-yellow-400/30 rounded text-white"
                              >
                                <option value={booking.tableId}>{booking.tableId}</option>
                                {availableSeats.map((seat) => (
                                  <option key={seat.id} value={seat.id}>
                                    {seat.id}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                name="contactInfo"
                                value={editForm?.contactInfo || ""}
                                onChange={handleEditChange}
                                className="w-full px-2 py-1 bg-black/50 border border-yellow-400/30 rounded text-white"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="number"
                                name="seatCount" // This field is now derived, but kept for display/input consistency
                                value={editForm?.attendees?.length || 0}
                                onChange={() => {}} // Read-only
                                className="w-full px-2 py-1 bg-black/50 border border-yellow-400/30 rounded text-white"
                                disabled
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="date"
                                name="bookingDate"
                                value={editForm?.bookingDate || ""}
                                onChange={handleEditChange}
                                className="w-full px-2 py-1 bg-black/50 border border-yellow-400/30 rounded text-white"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <select
                                name="status"
                                value={editForm?.status || ""}
                                onChange={handleEditChange}
                                className="w-full px-2 py-1 bg-black/50 border border-yellow-400/30 rounded text-white"
                              >
                                <option value="confirmed">已确认</option>
                                <option value="pending">待确认</option>
                                <option value="cancelled">已取消</option>
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                name="notes"
                                value={editForm?.notes || ""}
                                onChange={handleEditChange}
                                className="w-full px-2 py-1 bg-black/50 border border-yellow-400/30 rounded text-white"
                              />
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={saveEdit}
                                  className="bg-green-500/20 text-green-400 p-1 rounded hover:bg-green-500/40"
                                  title="保存"
                                >
                                  <Check className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="bg-red-500/20 text-red-400 p-1 rounded hover:bg-red-500/40"
                                  title="取消"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          // View mode
                          <>
                            <td className="py-3 px-4">{booking.attendees.join(", ")}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  booking.tableType === "vvip"
                                    ? "bg-red-500/20 text-red-400"
                                    : booking.tableType === "vip"
                                      ? "bg-yellow-400/20 text-yellow-400"
                                      : "bg-white/10 text-white/70"
                                }`}
                              >
                                {booking.tableId}
                              </span>
                            </td>
                            <td className="py-3 px-4">{booking.contactInfo}</td>
                            <td className="py-3 px-4">{booking.attendees.length}</td>
                            <td className="py-3 px-4">{booking.bookingDate}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  booking.status === "confirmed"
                                    ? "bg-green-500/20 text-green-400"
                                    : booking.status === "pending"
                                      ? "bg-orange-500/20 text-orange-400"
                                      : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {booking.status === "confirmed"
                                  ? "已确认"
                                  : booking.status === "pending"
                                    ? "待确认"
                                    : "已取消"}
                              </span>
                            </td>
                            <td className="py-3 px-4">{booking.notes || "-"}</td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => startEdit(booking.id)}
                                  className="bg-blue-500/20 text-blue-400 p-1 rounded hover:bg-blue-500/40"
                                  title="编辑"
                                >
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => deleteBooking(booking.id)}
                                  className="bg-red-500/20 text-red-400 p-1 rounded hover:bg-red-500/40"
                                  title="删除"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              {/* Seat Management View */}
              <div className="content-card rounded-lg p-6 border border-yellow-400/30 golden-glow">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">座位状态概览</h2>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-black/50 border border-yellow-400/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{Object.keys(seats).length}</div>
                    <div className="text-white/70 text-sm">总座位数</div>
                  </div>
                  <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{availableSeats.length}</div>
                    <div className="text-white/70 text-sm">可用座位</div>
                  </div>
                  <div className="bg-black/50 border border-red-500/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {Object.values(seats).filter((seat) => !seat.available).length}
                    </div>
                    <div className="text-white/70 text-sm">已预订</div>
                  </div>
                  <div className="bg-black/50 border border-yellow-400/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      RM{" "}
                      {bookings
                        .filter((b) => b.status === "confirmed")
                        .reduce((total, booking) => {
                          const seat = seats[booking.tableId]
                          return total + (seat ? seat.price : 0)
                        }, 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-white/70 text-sm">总收入</div>
                  </div>
                </div>

                {/* Seat Map Overview */}
                <div className="space-y-8">
                  {/* VVIP Area */}
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-4">VVIP 区域</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {Object.values(seats)
                        .filter((seat) => seat.type === "vvip")
                        .map((seat) => {
                          const booking = bookings.find((b) => b.tableId === seat.id && b.status !== "cancelled")
                          return (
                            <div
                              key={seat.id}
                              className={`p-4 rounded-lg border-2 ${
                                seat.available
                                  ? "border-green-500/50 bg-green-500/10"
                                  : "border-red-500/50 bg-red-500/10"
                              }`}
                            >
                              <div className="text-center">
                                <div className="text-yellow-400 font-bold text-lg">{seat.id}</div>
                                <div className="text-white text-sm">{seat.sponsor}</div>
                                <div className="text-white/70 text-xs">RM {seat.price.toLocaleString()}</div>
                                {booking && (
                                  <div className="text-white text-xs mt-2 p-2 bg-black/50 rounded">
                                    预订人: {booking.attendees.join(", ")}
                                  </div>
                                )}
                                <div className="mt-2">
                                  <button
                                    onClick={() => startEditSeat(seat.id)}
                                    className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs hover:bg-blue-500/40"
                                  >
                                    编辑座位信息
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>

                  {/* Regular Area */}
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-4">普通区域</h3>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                      {Object.values(seats)
                        .filter((seat) => seat.type === "regular")
                        .map((seat) => {
                          const booking = bookings.find((b) => b.tableId === seat.id && b.status !== "cancelled")
                          return (
                            <div
                              key={seat.id}
                              className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                                seat.available
                                  ? "border-green-500/50 bg-green-500/10 text-green-400"
                                  : "border-red-500/50 bg-red-500/10 text-red-400"
                              }`}
                              title={booking ? `预订人: ${booking.attendees.join(", ")}` : "可用"}
                              onClick={() => startEditSeat(seat.id)}
                            >
                              {seat.id.replace("T", "")}
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>

                {/* Seat Edit Form */}
                {seatEditMode && seatEditForm && (
                  <div className="mt-8 p-6 border border-blue-400/30 rounded-lg bg-blue-500/10">
                    <h3 className="text-lg font-semibold text-blue-400 mb-4">编辑座位信息 - {seatEditMode}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">座位类型</label>
                        <select
                          name="type"
                          value={seatEditForm.type}
                          onChange={handleSeatEditChange}
                          className="w-full px-3 py-2 bg-black/50 border border-blue-400/30 rounded text-white"
                          disabled
                        >
                          <option value="vvip">VVIP</option>
                          <option value="vip">VIP</option>
                          <option value="regular">普通</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">价格 (RM)</label>
                        <input
                          type="number"
                          name="price"
                          value={seatEditForm.price}
                          onChange={handleSeatEditChange}
                          className="w-full px-3 py-2 bg-black/50 border border-blue-400/30 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">容量</label>
                        <input
                          type="number"
                          name="capacity"
                          value={seatEditForm.capacity}
                          onChange={handleSeatEditChange}
                          className="w-full px-3 py-2 bg-black/50 border border-blue-400/30 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">位置</label>
                        <input
                          type="text"
                          name="location"
                          value={seatEditForm.location}
                          onChange={handleSeatEditChange}
                          className="w-full px-3 py-2 bg-black/50 border border-blue-400/30 rounded text-white"
                        />
                      </div>
                      {(seatEditForm.type === "vvip" || seatEditForm.type === "vip") && (
                        <div>
                          <label className="block text-white font-medium mb-2">赞助信息</label>
                          <input
                            type="text"
                            name="sponsor"
                            value={seatEditForm.sponsor || ""}
                            onChange={handleSeatEditChange}
                            className="w-full px-3 py-2 bg-black/50 border border-blue-400/30 rounded text-white"
                            placeholder="例如: 特邀贵宾席"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={cancelEditSeat}
                        className="bg-gray-500/20 text-white px-4 py-2 rounded hover:bg-gray-500/40"
                      >
                        取消
                      </button>
                      <button
                        onClick={saveEditSeat}
                        className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded hover:bg-blue-500/40"
                      >
                        保存
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Save and Reset Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={resetAllData}
              className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-500/40 transition-colors flex items-center space-x-2 border border-red-500/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
              <span>重置数据</span>
            </button>
            <button
              onClick={saveAllChanges}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>保存所有更改</span>
            </button>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-white/70 hover:text-yellow-400">
              返回主页
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-white/60 text-sm z-10 bg-black/30 border-t border-yellow-400/10">
        <p>© 2025 国际玄龍體育總會 | INTERNATIONAL XUAN LONG SPORT ASSOCIATION. All rights reserved.</p>
      </footer>
    </main>
  )
}
