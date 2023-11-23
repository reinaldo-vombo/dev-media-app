import { useState } from 'react'
import { Signin, Signup } from "./form/"


export const Register = () => {
   const [switchToggled, setSwitchToggled] = useState(false)

   const ToggleSwitch = () => {
      setSwitchToggled(switchToggled => !switchToggled)
   }

   const toggleClass = switchToggled ? 'sign-up-mode' : ''
   return (
      <div id="page-home">
         <div className="content">
            <div className={`container ${toggleClass}`}>
               <div className="form-container">
                  <div className="signin-signup">
                     <Signup />
                     <Signin />
                  </div>
               </div>
               <div className="panels-container">
                  <div className="panel left-panel">
                     <div className="content">
                        <h3>Eis novo aqui?</h3>
                        <p> Para usar DevOps prencha os campos para criar sua conta e começe a partihar sues conteúdos sed dolores nihil sunt, </p>
                        <button className='btn transparent' id='sign-up-btn' onClick={ToggleSwitch}>Lognin</button>
                     </div>
                     {/* <img className='image' src={background} alt="" /> */}
                  </div>
                  <div className="panel rigth-panel">
                     <div className="content">
                        <h3>Já é um de Nós</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur animi, quaerat praesentium </p>
                        <button className='btn transparent' id='sign-in-btn' onClick={ToggleSwitch}>Registra-se</button>
                     </div>
                     {/* <img className='image' src={login_re_4vu2} alt="" /> */}
                  </div>
               </div>
            </div>

         </div>
      </div>
   )
}


