import React from "react"
import {useSelector} from "react-redux"
import CompanyHomeBlock from "./CompanyHomeBlock"
import CreateCompany from "./CreateCompany"

const HomeRight = () =>{
    const {auth} = useSelector(state => state)
    return (
        <div style={{ color:'black'}}>
            <CompanyHomeBlock user={auth.user}/>
        </div>
    )
}

export default HomeRight;