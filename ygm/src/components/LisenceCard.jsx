import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast, Toaster } from 'react-hot-toast'

const LisenceCard = ({ item, isAdmin, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this license?')
    if (!confirmDelete) return

    try {
      await onDelete(item._id)
    } catch (err) {
      console.error('Delete error:', err)
      toast.error('Failed to delete license')
    }
  }

  return (
    <div className="group relative h-64 w-64 rounded-3xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-500 ease-in-out border border-[#FFD700]/40 bg-[#0F0F0F]">
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-2 left-2 text-red-500 hover:text-red-600 bg-black/40 p-2 btn btn-circle z-20"
          title="Delete License"
        >
          <FaTrash />
        </button>
      )}

      <div
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out scale-100 hover:scale-110"
        style={{ backgroundImage: `url(${item.img})` }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 group-hover:backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 p-5 flex flex-col justify-end h-full">
        <div className="bg-black/70 backdrop-blur-[2px] rounded-2xl p-4">
          <h3 className="text-lg font-extrabold mb-1 tracking-wide text-[#FFD700] drop-shadow-lg">
            {item.title}
          </h3>
          <p className="text-sm text-gray-200 leading-relaxed drop-shadow-md">
            {item.description}
          </p>
        </div>
      </div>

      {item.badge && (
        <span className="absolute top-2 right-2 bg-[#FFD700] text-black text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10">
          {item.badge}
        </span>
      )}
    </div>
  )
}

export default LisenceCard
