import React, { useState } from "react";
import css from './Search.module.css';
interface SearchProps {
    onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    return (
        <div className={css.search}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={() => onSearch(query)}>Пошук</button>
        </div>
    );
};

export default Search;