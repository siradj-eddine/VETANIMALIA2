import React, { useState, useEffect } from 'react'
import { CiUser } from 'react-icons/ci'
import { FaShoppingCart, FaClipboardList, FaCalendarCheck } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'
import { MdDashboard, MdMenu, MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { RiReservedFill } from 'react-icons/ri'

const SideBar = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  return (
    <>
      {/* Mobile toggle button - only shows on mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed h-screen overflow-w-auto  z-50 p-2 bg-white rounded-md shadow top-0 left-0 max-sm:mt-21 transition-all duration-300
             -translate-x-4 ${isOpen ? "translate-x-48" : ""} sm:mt-22 ml-1`}
          aria-label="Toggle menu"
        >
          {isOpen ? <MdClose size={24} className='max-sm:w-3 max-sm:h-3'/> : <MdMenu size={24} className='max-sm:w-3 max-sm:h-3 rotate-90 ml-2'/>}
        </button>
      )}

      <div
        className={` fixed h-screen   z-40 w-64 bg-white shadow-xl transition-all duration-300 
          ease-in-out top-25
          ${isMobile ? (isOpen ? 'left-0' : '-left-64') : 'left-0 md:w-17 md:hover:w-64'} 
          ${className}`}
      >
        <div className="ml-3 p-4 overflow-hidden  h-full">
          <h2 className="text-xl max-md:mt-15 font-bold mb-6 whitespace-nowrap md:ml-10 md:group-hover:opacity-100 transition-opacity duration-300">
            Paneau Admin
          </h2>
          <nav>
            <ul className="space-y-10 font-semibold">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-700 hover:text-[#ff6c00] transition-all"
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <MdDashboard size={24} className="flex-shrink-0" />
                  <span className="ml-4 whitespace-nowrap md:group-hover:opacity-100 transition-opacity duration-300">
                    Tableau de bord
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/AdminProducts"
                  className="flex items-center text-gray-700 hover:text-[#ff6c00] transition-all"
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <GiClothes size={24} className="flex-shrink-0" />
                  <span className="ml-4 whitespace-nowrap  md:group-hover:opacity-100 transition-opacity duration-300">
                    Produits
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/Orders"
                  className="flex items-center text-gray-700 hover:text-[#ff6c00] transition-all"
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <FaShoppingCart size={24} className="flex-shrink-0" />
                  <span className="ml-4 whitespace-nowrap  md:group-hover:opacity-100 transition-opacity duration-300">
                    Commandes
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/Users"
                  className="flex items-center text-gray-700 hover:text-[#ff6c00] transition-all"
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <CiUser size={24} className="flex-shrink-0" />
                  <span className="ml-4 whitespace-nowrap md:group-hover:opacity-100 transition-opacity duration-300">
                    Utilisateurs
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/Appointments"
                  className="flex items-center text-gray-700 hover:text-[#ff6c00] transition-all"
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <FaClipboardList size={24} className="flex-shrink-0" />
                  <span className="ml-4 whitespace-nowrap md:group-hover:opacity-100 transition-opacity duration-300">
                    Rendez-vous
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/Reservations"
                  className="flex items-center text-gray-700 hover:text-[#ff6c00] transition-all"
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <RiReservedFill size={24} className="flex-shrink-0" />
                  <span className="ml-4 whitespace-nowrap md:group-hover:opacity-100 transition-opacity duration-300">
                    Réservations
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default SideBar
