/*import React from "react";

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = []

    for(let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <nav className='container_Nav'>
            <ul className='container_ul'>
                {
                    pageNumbers?.map(number=>(
                        <li className='container_li' 
                        key={number}>
                            <button type='button' onClick={()=>paginado(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}*/

import React from 'react'
import style from './Paginate.module.css'

export default function Paginado({ pokemonsPerPage, allPokemons, paginado, page}){
    const pageNumbers = []

    for (let i = 0 ; i < Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul className={style.pagination}>
                {
                    pageNumbers && pageNumbers.map( number => (
                        <li key={number} style={{ listStyle:'none' }}>
                           <button className={style.buttons} style={ page === number ? {color:"white"} : {}}onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}