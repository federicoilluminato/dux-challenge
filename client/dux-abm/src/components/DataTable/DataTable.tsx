import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';      
import ModalForm from '../ModalForm/ModalForm';
import { fetchUsers, fetchTotalUsers } from '../../services/userService';

export interface User {
    id: string;
    estado: string;
    sector: number;
    usuario: string;
}

interface DataTableComponentProps {
    isModalVisible: boolean;
    toggleModal: () => void;
    search: string;
    estado: string;
    sector: string;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({ isModalVisible, toggleModal, search, estado, sector }) => {
    const [data, setData] = useState<User[]>([]);
    const [page, setPage] = useState<number>(0);
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(true);
    const [onEdit, setOnEdit] = useState<boolean | User>(false);
    const [totalRecords, setTotalRecords] = useState<number>(0);

    const fetchData = async (page: number, limit: number) => {
        setLoading(true);
        try {
            const users = await fetchUsers(search, sector, estado, page, limit);
            setData(users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setPage(event.page + 1);
        setRows(event.rows);
        setFirst(event.first);
    };

    useEffect(() => {
        fetchData(page, rows);
    }, [page, rows, sector, estado, search]);

    useEffect(() => {
        fetchTotalUsers(sector).then((res) => setTotalRecords(res.length));  //fetch inicial para obtener la cantidad total de registros
    }, []);

    const usuarioBody = (rowData: User) => {
        const handleRowClick = (user: User) => {
            setOnEdit(user);
            toggleModal()
        };
        return (
          <span onClick={() => handleRowClick(rowData)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
            {rowData.usuario}
          </span>
        );
    };

    return (
        <div className="flex flex-column">
        {loading ? (
            <Skeleton width="87vw" height="70vh"></Skeleton>
        ) : (
            <div className="">
                <DataTable value={data} tableStyle={{ minWidth: '50rem', minHeight: '70vh' }} scrollable scrollHeight="70vh">
                    <Column field="id" header="Id" sortable style={{ width: '25%' }}></Column>
                    <Column field="usuario" header="Usuario" sortable style={{ width: '25%' }} body={usuarioBody}></Column>
                    <Column field="estado" header="Estado" sortable style={{ width: '25%' }}></Column>
                    <Column field="sector" header="Sector" sortable style={{ width: '25%' }}></Column>
                </DataTable>
                <ModalForm visible={isModalVisible} onHide={toggleModal} onEdit={onEdit} setOnEdit={setOnEdit} />
            </div>
        )}
        <div className="card">
            <Paginator first={first} rows={rows} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
        </div>
        </div>
    );
}

export default DataTableComponent;