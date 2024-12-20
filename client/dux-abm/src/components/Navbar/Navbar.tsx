import React from 'react'
import Image from 'next/image'
import LogoPic from '../../../public/logo-dux.png'

export default function Navbar() {
  return (
    <>
      <div className="card h-auto bg-blue-600 p-1">
          <div className='flex justify-content-between'>
          <Image alt="logo" src={LogoPic} height="40" className="mx-2"></Image>
            <div className="flex align-items-center gap-2 px-2">
            <i className="pi pi-cog" style={{ fontSize: '1.5rem' }}></i>
            </div>
          </div>
      </div>
    </>
  )
}