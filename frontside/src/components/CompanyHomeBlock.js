import React, { useState } from 'react';
import "../styles/CompanyHomeBlock.css"
import {useSelector} from "react-redux"
import GlobalFriendBtn from './GlobalFriendBtn';
import sadastro from "../images/sadastro.png";

import {Link} from "react-router-dom"
import astro from "../images/astro.jpg";

const CompanyHomeBlock = ({user} ) =>{
    const [showinfo, setshowinfo] = useState(true);
    const [showinfoabout,setshowinfoabout] = useState(false)
    const {auth} = useSelector(state => state)


    const toggleshowinfo = (sinfo) => {
        if(sinfo === 'showinfo'){
            setshowinfo(true);
            setshowinfoabout(false);
        }else if (sinfo === 'showinfoabout'){
            setshowinfo(false);
            setshowinfoabout(true)
        }
    }


    return (
        <div className="companyblock">
            <div className="company-content">
               <div className="company-home-text">
                   Your company not yet <Link to="/companyCreate"><text className="company-home-text-link">created</text> </Link><div>or</div> you have not <Link to="/explore"><text className="company-home-text-link">joined</text> </Link>an existing
               </div>
                <img className="sadastronaut" src={sadastro} />
            </div>
        </div>
    )
}

export default CompanyHomeBlock;