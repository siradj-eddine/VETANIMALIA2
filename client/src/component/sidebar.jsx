import React, { useState, useEffect } from 'react'
import { CiUser } from 'react-icons/ci'
import { FaShoppingCart, FaClipboardList, FaCalendarCheck } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'
import { MdDashboard, MdMenu, MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { RiReservedFill } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'

const SideBar = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { i18n } = useTranslation()

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
          className={`fixed overflow-w-auto  z-50 p-2 bg-white rounded-md shadow top-0 ${i18n.language === "fr" ? "left-0" : "right-0"}
             max-sm:mt-21 transition-all duration-300 -translate-x-4 ${isOpen ? `${i18n.language === "fr" ? "translate-x-48" : "-translate-x-48"}` : ""}   sm:mt-22 ml-1`}
          aria-label="Toggle menu"
        >
          {isOpen ? <MdClose size={35} className='max-sm:w-3 max-sm:h-3'/> : <MdMenu size={35} className='max-sm:w-4 max-sm:h-6 rotate-90 ml-2'/>}
        </button>
      )}

      <div
        className={` fixed h-screen z-40 w-64 bg-white shadow-xl transition-all duration-300 
          ease-in-out top-25
          ${isMobile ? (isOpen ? `${i18n.language === "fr" ? "left-0" : "right-0"} -translate-y-8` : `-left-64 -translate-y-8`) : `${i18n.language ==="fr" ? 'left-0' : 'right-0'} md:w-17 md:hover:w-64`} 
          ${className}`}
      >
        <div className="ml-3 p-4 overflow-hidden h-full ">
          <h2 className={`text-xl max-md:mt-15 font-bold mb-6 whitespace-nowrap md:ml-10 md:group-hover:opacity-100
          transition-opacity duration-300`}>
            {i18n.language==="fr" ? "Tableau de bord" : "لوحة القيادة"}
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
                  <span className={`ml-4 whitespace-nowrap md:group-hover:opacity-100 transition-opacity duration-300`}>
                    {i18n.language==="fr" ? "Tableau de bord" : "لوحة القيادة"}
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
                  <span className={`ml-4 whitespace-nowrap  md:group-hover:opacity-100 transition-opacity duration-300`}>
                    {i18n.language==="fr" ? "Produits" : "المنتجات"}
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
                  <span className={`ml-4 whitespace-nowrap  md:group-hover:opacity-100 transition-opacity duration-300`}>
                    {i18n.language==="fr" ? "Commandes" : "الطلبات"}
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
                  <span className={`ml-4 whitespace-nowrap md:group-hover:opacity-100 transition-opacity duration-300`}>
                    {i18n.language==="fr" ? "Utilisateurs" : "المستخدمون"}
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
                  <span className={`ml-4 whitespace-nowrap md:group-hover:opacity-100 transition-opacity duration-300`}>
                    {i18n.language==="fr" ? "Réservations" : "الحجوزات"}
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
