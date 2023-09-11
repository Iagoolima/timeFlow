import Form from "../../component/login-components/form";
import "./loginpage.css";
// @ts-ignore
import ImagemLogo from "./../../assets/logo-simbolo.png";
import { useState } from "react";


export default function Login() {
   
    const initialFirstTime = false;

    const [firstTime, setFirstTime] = useState(initialFirstTime);
    
    return (
        <div className="container-login">
               <img src= {ImagemLogo} alt="imagem" className="img-logo-login"/>
                <div className="container-left">
                <Form/>     
            </div>

            
            <div className="container-right">
         

            {/* imagem */}
            <a className="title-astraltech" href="https://www.astraltech.com.br">ASTRAL TECH</a>
            </div>
        </div>

    );
}