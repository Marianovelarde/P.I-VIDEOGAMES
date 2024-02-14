import React from 'react';
import styles from './pagination.module.css';
//Nos traemos la información relevante de home
const Pagination = ({ videogamesPerPage, totalVideogames, paginate, currentPage }) => {


    const totalPages = Math.ceil(totalVideogames / videogamesPerPage);
    

    // Crea un array de números de página para renderizar botones
    //array from: es un método estático que crea una nueva instancia de un array a partir de un objeto iterable
    /*
    Aqui se crea  un array de longitud : length: totalPages
    El primer argumento { length: totalPages } especifica la longitud del array que se va a crear, que es igual al número total de páginas totalPages
    El segundo argumento es una funcion de mapeo que se aplica a cada elemento del array resultante
    (_,index) => index +1 se utiliza para asignar a cada elemento un numero unico de pagina comenzando  desde 1 y aumentando 
    Después de ejecutar este código, pageNumbers contendrá un array con números de página del 1 al totalPages. Cada número de página representa una página disponible en la paginación.
    (_) guion bajo: se utiliza para ignorar el parametro
    */

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

            <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>
                {'Siguiente'}
            </button>
            {/*
            Renderiza botones de navegación para ir a la página anterior, a páginas individuales y a la página siguiente.
            Los botones de navegación tienen eventos onClick que llaman a la función paginate() con el número de página correspondiente como argumento.
            */}
        </div>
        </div>
    );
};

export default Pagination;
