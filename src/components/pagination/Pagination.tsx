import React from "react";
import css from './Pagination.module.css';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

    const thisPage = Math. ceil(currentPage*10 / totalPages);

    return (
        <div className={css.pagination}>
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                Назад
            </button>
            <span>{thisPage}</span>
            <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                Вперед
            </button>
        </div>
    );
};

export default Pagination;
