

import React from 'react';
import { Link } from "react-router-dom";
import style from './LandingPage.module.css';


export default function LandingPage(){

  
    return(
        <div className={style.position}>
            <div style={{display:'flex', flexFlow:'column'}}>
                <h1>Pokemon</h1>
                <Link to='/home'>
                    <button className={style.boton}>Home</button>
                </Link>
            </div>
            
        </div>
    ) 
}