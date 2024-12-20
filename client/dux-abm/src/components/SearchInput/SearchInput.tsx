    import React from 'react'
    import { IconField } from "primereact/iconfield";
    import { InputIcon } from "primereact/inputicon";
    import { InputText } from "primereact/inputtext";

    interface SearchInputComponentProps {
        setSearch: (searchQuery: string) => void;
    }

    const SearchInput: React.FC<SearchInputComponentProps> = ({ setSearch }) => {
        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
        };

    return (
        <div className="w-full">
            <IconField iconPosition="left">
            <InputIcon className="pi pi-search"></InputIcon>
            <InputText className="w-full" placeholder="Search" onChange={handleSearchChange} />
            </IconField>
        </div>
    )
    }

    export default SearchInput