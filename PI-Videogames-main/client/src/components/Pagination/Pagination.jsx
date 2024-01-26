import React from 'react';
import styles from './pagination.styles.css'

const Pagination = ({ videogamesPerPage, totalVideogames, paginate, currentPage }) => {
    const totalPages = Math.ceil(totalVideogames / videogamesPerPage);
    const maxPagesToShow = 7;

    // Calcula la página inicial de manera que siempre haya 6 páginas
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 1));

    // Ajuste para asegurarse de que se muestren todas las páginas cuando estás en la última página
    if (startPage + maxPagesToShow - 1 > totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
    }

    // Calcula la página final basándote en la página inicial y el número fijo de páginas a mostrar
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    // Crea un array de números de página para renderizar botones
    const pageNumbers = Array.from({ length: maxPagesToShow }, (_, index) => startPage + index);

    return (
        <div>
            <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
                {'Anterior'}
            </button>

            {pageNumbers.map(number => (
                <button className={currentPage === number ? 'current-page' : ''} key={number} onClick={() => paginate(number)}>
                    {number}
                </button>
            ))}

            <span style={{ margin: '0 10px' }}>Página {currentPage} de {totalPages}</span>

            <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>
                {'Siguiente'}
            </button>
        </div>
    );
};

export default Pagination;
