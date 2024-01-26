import React from 'react';
import styles from './pagination.styles.css';

const Pagination = ({ videogamesPerPage, totalVideogames, paginate, currentPage }) => {


    const totalPages = Math.ceil(totalVideogames / videogamesPerPage);

    // Crea un array de números de página para renderizar botones
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div>
            <span style={{ margin: '0 10px' }}>Página {currentPage} de {totalPages}</span>
            <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
                {'Anterior'}
            </button>
            {pageNumbers.map(number => (
                <button className={currentPage === number ? 'current-page' : ''} key={number} onClick={() => paginate(number)}>
                    {number}
                </button>
            ))}

           

            <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>
                {'Siguiente'}
            </button>
        </div>
    );
};

export default Pagination;
