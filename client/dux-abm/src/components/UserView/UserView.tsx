"use client"
import React, { useState } from 'react';
import SearchInput from '../SearchInput/SearchInput'
import SelectInput from '../SelectInput/SelectInput'
import DataTable from '../DataTable/DataTable'
import PageHeader from '../PageHeader/PageHeader'

const UserView: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [estado, setEstado] = useState<string>('');
  const [sector, setSector] = useState<string>('1000');
  const toggleModal = (): void => setIsModalVisible((prev) => !prev);

  return (
    <div className="p-2 h-full">
      <PageHeader toggleModal={toggleModal} />
        <div className="flex gap-2">
            <SearchInput setSearch={setSearch}/>
            <SelectInput setSelected={setEstado} values={['ACTIVO', 'INACTIVO']} placeholder="Seleccione el estado"/>
            <SelectInput setSelected={setSector} values={['1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000']} placeholder="Seleccione el sector"/>
        </div>
        <div className="mt-3">
            <DataTable isModalVisible={isModalVisible} toggleModal={toggleModal} search={search} estado={estado} sector={sector}/>
        </div>
    </div>
  )
}

export default UserView