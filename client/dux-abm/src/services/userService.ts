import { User } from "@/components/DataTable/DataTable";

const API_URL = 'https://staging.duxsoftware.com.ar/api/personal';

export const fetchUsers = async (search: string, sector: string, estado: string, page: number, limit: number): Promise<User[]> => {
  try {
    const url = new URL(`${API_URL}`);
    console.log('url', url)
    const params = new URLSearchParams();
    params.append('_page', String(page));
    params.append('_limit', String(limit));
    if(search){
      params.append('usuario', search);
    }
    if (estado) {
      params.append('estado', estado);
    }
    if(sector){
      params.append('sector', sector);
    } else {
      params.append('sector', '1000') // si no hay sector ponemos por defecto 1000 que es el sector que se me asigno
    }
    url.search = params.toString();
    console.log('Request URL:', url);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
  };

export const fetchTotalUsers = async (sector: string) => {
    try {
      const response = await fetch(`${API_URL}?sector=${sector}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

export const createUser = async (id : (string | null), sector: number, usuario: string, estado: string) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, sector, usuario, estado }),
    });

    const data = await response.json();
    console.log('response create', data)
    return data;
};

export const updateUser = async (sector: number, id: string, usuario: string, estado: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, sector, usuario, estado }),
    });

    const data = await response.json();
    return data;
};

export const deleteUser = async (sector: number, id: number) => {
    await fetch(`${API_URL}/${id}?sector=${sector}`, {
        method: 'DELETE',
    });
};
