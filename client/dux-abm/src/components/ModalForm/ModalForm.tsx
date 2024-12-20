import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import SelectInput from "../SelectInput/SelectInput";
import { User } from '../DataTable/DataTable';
import { createUser, deleteUser, updateUser } from "@/services/userService";

interface ModalFormProps {
    visible: boolean;
    onEdit: boolean | User;
    onHide: () => void;
    setOnEdit: (value: boolean) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ visible, onHide, onEdit, setOnEdit }) => {
    const [id, setId] = useState<string | null >(null);
    const [nombre, setNombre] = useState<string>('');
    const [estado, setEstado] = useState<string>('');
    const [sector, setSector] = useState<number | null | string>(null);
    
    const hideModal = () => {
        setOnEdit(false);
        onHide();
    }

    useEffect(() => {
        if (onEdit && typeof onEdit === 'object') {
            setId(onEdit.id);
            setNombre(onEdit.usuario);
            setEstado(onEdit.estado);
            setSector(onEdit.sector);
        } else {
            // resetea el form cuando onEdit es false (cuando cierro el modal, o abro para crear)
            setId(null);
            setNombre('');
            setEstado('');
            setSector(null);
        }
    }, [onEdit]);

    const handleConfirm = async () => {
        if(!onEdit){
            if (sector !== null) {
                createUser(id, sector, nombre, estado);
            } else {
                alert('Por favor seleccionar un sector');
            }
        } else {
            updateUser(sector!, id!, nombre, estado);
        }
        hideModal();
    };

    const handleDelete = async () => {
        deleteUser(id!);
        hideModal();
    } 


    const footerContent = (
        <div className="flex justify-content-center p-4 gap-3">
            <Button label="Confirmar" icon="pi pi-check" onClick={() => handleConfirm()} autoFocus />
            <Button label="Cancelar" icon="pi pi-times" onClick={() => hideModal()} className="p-button-text"/>
            {onEdit && <Button icon="pi pi-trash" severity="danger" onClick={() => handleDelete()} className="p-button-text"/>}
        </div>
    );

    const headerContent = (
        <div className="flex justify-content-center bg-blue-600 flex justify-content-between">
            <h3 className="p-2 m-0 ml-3">Usuario</h3>
            <div className="flex align-items-center space-x-2 gap-2 mr-3">
                <i className="pi pi-cog cursor-pointer" style={{ fontSize: '1rem' }}></i>
                <i className="pi pi-minus cursor-pointer" style={{ fontSize: '1rem' }} onClick={() => hideModal()}></i>
            </div>
        </div>
    );

  return (
    <Dialog 
      visible={visible}
      onHide={onHide}
      style={{ width: '50vw', zIndex: 1050 }}
      modal
      header={headerContent}
      footer={footerContent}
      content={({ hide }) => (
      <div className="bg-white">
      {headerContent}
      <div className="p-3">
        {/* id */}
                <>
                    <div className="text-black-alpha-80 weight-bold">ID</div>
                    <div className="card flex justify-content-center py-3">
                        <InputText
                            className="w-12"
                            keyfilter="int"
                            placeholder="Ingrese el ID del Usuario"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId((e.target.value))}
                            value={id}
                        />
                    </div>
                </>
        {/* nombre */}
        <div className="text-black-alpha-80 weight-bold">Nombre:</div>
        <div className="card flex justify-content-center py-3">
            <InputText className="w-12" placeholder="Ingrese el nombre del Usuario" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)} value={nombre} />
        </div>
        {/* estado */}
        <div className="text-black-alpha-80 weight-bold">Estado:</div>
        <div className="card flex justify-content-center py-3">
            <SelectInput values={['ACTIVO', 'INACTIVO']} placeholder="Seleccione el estado" setSelected={setEstado} value={estado}/>
        </div>
        {/* sector */}
        <div className="text-black-alpha-80 weight-bold">Sector:</div>
        <div className="card flex justify-content-center py-3">
            <SelectInput values={['1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000']} placeholder="Seleccione el sector" setSelected={setSector} value={sector}/>
        </div>
      </div>
      {footerContent}
      </div>
      )}
    >
    </Dialog>
  );
}

export default ModalForm