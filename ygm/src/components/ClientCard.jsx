import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Toaster, toast } from "react-hot-toast"

const ClientCard = ({ item, index, isAdmin, onDelete, onEdit }) => {

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this client?')
    if (!confirmDelete) return

    try {
      await onDelete(item._id)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete client')
    }
  }

  const handleEdit = async () => {
    try {
      await onEdit(item)
    } catch (error) {
      console.error('Edit error:', error)
      toast.error('Failed to delete client')
    }
  }
  console.log(item);
  

  return (
    <div
      className="w-full md:w-[300px] rounded-xl shadow-lg bg-[#1A1A1A] hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative"
    >
      {/* Admin Delete Button */}
      {isAdmin && (
        <div className= 'flex gap-3 absolute top-2 right-2 '>
        <button
          onClick={handleDelete}
          className="p-2 btn-error btn"
          title="Delete client"
        >
          <FaTrash />
        </button>
                  <button
          onClick={handleEdit}
          className="  p-2 btn-primary btn"
          title="Edit client"
        >
          edit
        </button>
        </div>

      )}

      {/* Logo */}
      <div
        className="bg-[#FFD700]/10 flex justify-center items-center h-[140px] bg-cover bg-center"
        style={{ backgroundImage: `url(${item.logo})` }}
      ></div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-[#FFD700]">{item.name}</h2>
        <p className="text-sm text-[#E0E0E0] italic">Service :{item.serviceType}</p>
        <p className="text-sm text-[#E0E0E0] italic">{item.duration}</p>
        <p className="text-sm text-[#C0C0C0] line-clamp-3">{item.description}</p>
      </div>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  )
}

export default ClientCard
