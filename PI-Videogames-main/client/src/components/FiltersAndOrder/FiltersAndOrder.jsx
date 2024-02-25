import  { useEffect, useState } from 'react';
import { 
    getAllVideogames,  
    orderBy,
    filterByGenresAndSource, 
    getGenres } from '../../Redux/actions';
import { connect } from 'react-redux';
import styles from './filtersAndOrder.module.css';

const FiltersAndOrder = (props) => {

const {page} = props;

    const [select, setSelect] = useState({
        filterByGenres: 'all',
        filterBySource: 'all',
        orderBy: 'orderNone'
    });
    
    useEffect(() => {
        props.getGenres();
        // eslint-disable-next-line
    },[]);

    const handleFilterGender = (e) => {
        const {value} = e.target
        
        setSelect({
            ...select,
            filterByGenres: value
        });
        props.filterByGenresAndSource(value, select.filterBySource);
        page(1);
    };
    const handleSource = (e) => {
        const {value} = e.target;
       
        setSelect({
          ...select,
          filterBySource: value,
        });
       
        page(1);
        props.filterByGenresAndSource(select.filterByGenres, value);    
    };

    const handleOrder = async (e) => {
        const { value } = e.target;    
        setSelect({
            ...select,
            orderBy: value
        });
    
        if (value === 'orderNone') {
            try {
                props.filterByGenresAndSource(select.filterByGenres, select.filterBySource)
            } catch (error) {
                console.error('Error en el ordenamiento: ', error.message);
            }
            page(1);
        } else {
            props.orderBy(value);
        }
        page(1);
    };

    
    const reset = (e) => {
        e.preventDefault()
        setSelect({
            filterByGenres: 'all',
            filterBySource: 'all',
            orderBy: 'orderNone'
        });
        props.filterByGenresAndSource('all', 'all');
        props.orderBy('orderNone'); 
        page(1);
        props.getAllVideogames()
      
    };
    
    
   
  return (
    <div className={styles.firstContainer}>
        <section className={styles.sectionFo}>
            <div>
                         {/* Filtrado por géneros*/}
                <p>Filter By Genres:</p>
                <select className={styles.selectContainer} name="filterByGenres" 
                value={select.filterByGenres} 
                onChange={e => handleFilterGender(e)}>
                    <option className={styles.option} key='all' value='all'>all Genres</option>
                    {props.genres.map((item) => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>

            <div>
                             {/*Filtrado Por fuente */}
                <p>Filter by Source:</p>
                <select className={styles.selectContainer} name="filterBySource"
                value={select.filterBySource}
                onChange={(e) => handleSource(e)}>
                    <option value="all">All Videogames</option>
                    <option value="api">From Api</option>
                    <option value="db">From Db</option>
                </select>
            </div>

            <div>
                    {/*Ordenamiento a-z z-a rating asc- rating desc*/}
                <p>Order By:</p>
                <select className={styles.selectContainer} name="orderBy" value={select.orderBy} onChange={e => handleOrder(e)}>
                    <option value="orderNone">-</option>
                    <option value="videogameAsc">Videogames (A - Z)</option>
                    <option value="videogameDesc">Videogames (Z - A)</option>
                </select>
                <select className={styles.selectContainer} name="orderBy" value={select.orderBy} onChange={e => handleOrder(e)}>
                    <option value="orderNone">-</option>
                    <option value="ratingAsc">+ Rating</option>
                    <option value="ratingDesc">- Rating</option>
                </select>
            <button className={styles.selectContainer} type='button' onClick={reset}>Reset</button>
            </div>
           
        </section>
    </div>
  )
}

const mapStateToProps = (state) =>({
    genres: state.genres,
    videogames: state.videogames
    
});

const mapDispatchToProps = {
    getAllVideogames,
    orderBy,
    filterByGenresAndSource,
    getGenres
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersAndOrder);