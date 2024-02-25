import React from 'react';
import styles from './pagination.module.css';
//Nos traemos la información relevante de home
const Pagination = ({ videogamesPerPage, totalVideogames, paginate, currentPage }) => {


    const totalPages = Math.ceil(totalVideogames / videogamesPerPage);
    

    // Se crea un array de números de página para renderizar botones
   
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
   

    return (
        
        <div className={styles.firstContainer}>
            
            <span>Página {currentPage} de {totalPages}</span>
            <br />
            <div  className={styles.buttonPag}>   
            <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
                {'Anterior'}
            </button>
            {pageNumbers.map(number => (
                <button className={currentPage} key={number} onClick={() => paginate(number)}>
                    {number}
                </button>
            ))}

            <button disabled={totalPages === 0   || currentPage ===  totalPages } onClick={() => paginate(currentPage + 1)}>
                {'Siguiente'}
            </button>
         
            </div>
        </div>
    );
};

export default Pagination;
