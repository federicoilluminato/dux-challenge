import React from 'react'
import { Button } from 'primereact/button';

interface PageHeaderProps {
  toggleModal: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({toggleModal}) => {
  return (
    <div className='flex justify-content-between'>
      <h1 className='text-black-alpha-80' style={{fontWeight: 800, fontSize: '1.8rem'}}>Usuarios</h1>
      <div className="flex align-items-center">
        <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={toggleModal}/>
      </div>
    </div>
  )
}

export default PageHeader