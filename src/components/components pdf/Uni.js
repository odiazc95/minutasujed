import React from 'react'
import logo from '../../assets/img/logoujed.png'

function Uni(props) {
  return (
    <div className="contenedor" >
            <div className="cont1" >
              <h3>Universidad Juarez del Estado de Durango</h3>
            </div>
            <div className="cont2">
              <div className="cont-der">
              <img src={logo} alt="Logo UJED" width="100" height="100" />
              </div>
              <div className="cont-medio">
                <div className="c1 center">
                  <h3>Orden del dia</h3>
                </div>
                <div className="c2 center">
                  <h3>{props.data.asunto}</h3>
                </div>
              </div>
              <div className="cont-izq">
                <div className="izq1 ">
                  <p><b>Codigo</b>: R9.3, B</p>
                </div>
                <div className="izq2 ">
                  <p><b>Edicion</b>: 1</p>
                </div>
                <div className="izq3 "><b>Fecha</b>: 2023-05-04</div>
              </div>
            </div>
          </div>
  )
}

export default Uni