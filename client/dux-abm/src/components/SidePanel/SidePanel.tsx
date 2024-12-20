import React from 'react'
import BoxLogo from '../../../public/box.png'
import Image from 'next/image'

const SidePanel = () => {
  return (
    <div className='text-white bg-gray-700 p-2 max-h-full w-auto flex flex-column'>
      <Image src={BoxLogo} alt="logo" height="27" className="m-2"></Image>
      <Image src={BoxLogo} alt="logo" height="27" className="m-2"></Image>
      <Image src={BoxLogo} alt="logo" height="27" className="m-2"></Image>
      <Image src={BoxLogo} alt="logo" height="27" className="m-2"></Image>
      <Image src={BoxLogo} alt="logo" height="27" className="m-2"></Image>
      <Image src={BoxLogo} alt="logo" height="27" className="m-2"></Image>
    </div>
  )
}

export default SidePanel