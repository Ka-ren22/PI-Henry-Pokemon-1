import React from 'react' ;
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import style from './Navbar.module.css'
import loading  from '../../images/loading.gif'


//Componente para la barra de navegacion 

export default function Navbar(){
    return (
        <nav className={style.nav}>
            <Link to='/'>
                <span className={style.landinglink}>
                    <img id="logoPoke" src={loading} width="120" alt="landing" />
                </span>
            </Link>
            <SearchBar />
            <Link to="/pokemons"><button className={style.create}>Create</button></Link>
        </nav>
      );
}