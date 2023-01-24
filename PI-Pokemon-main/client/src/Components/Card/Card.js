import React from 'react';
import style from './Card.module.css'

export default function Card({ name, types, image, id }){
    console.log(types)
    let sprite;
    if(id >= 1 && id <= 100){
        sprite = true
    }

    const typesColors={
        fire: style.fire,
        normal: style.normal,
        fighting: style.fighting,
        flying: style.flying,
        ground: style.ground,
        poison: style.poison,
        rock: style.rock,
        bug: style.bug,
        ghost: style.ghost,
        steel: style.steel,
        water: style.water,
        grass: style.grass,
        electric: style.electric,
        psychic: style.psychic,
        ice: style.ice,
        dragon: style.dragon,
        dark: style.dark,
        fairy: style.fairy,
        unknown: style.unknown,
        shadow: style.shadow
    }


    return(
        <div className={style.card}>
             <span className={style.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            {
                sprite ?
                <img src={image}alt="Img not found" height="190px" className={style.img}/>
                :
                <img src='' alt="Img not found" height="190px" className={style.img}/>
            }

            <span className={`${style.typetitle} ${typesColors[types[0]]}`}>Types</span>
            
            <div className={style.types}>
           
                {
                    types ? types.map( (el) => {
                        return(
                             <h3 className="cardType" key={el+Math.random}>{el}</h3>
              
                        )
                     }
                    ) :
                    <h3 className="cardType">Types not found</h3>
                }
            </div>
            
            
        </div>
    )
}



//<span className={`${style.typetitle} ${typesColors[types[0]]}`}>Types</span>