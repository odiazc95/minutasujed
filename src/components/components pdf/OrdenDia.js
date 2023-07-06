import React from 'react';


// export { wordsCount };

function OrdenDia(props) {
  if(props.data.descripcion){
  var ordenBD=props.data.descripcion;
  }else{
    var ordenBD ="";
  }
  const wordsCount = ordenBD.trim().split(/\s+/).length;

  const hasReached100Words = wordsCount >= 150;
  const pepeClass = hasReached100Words ? "pepe" : "";
  const pepeId = hasReached100Words ? "elementoSiguiente2" : "";


  return (
    <div className={`contenedor ordenDia ${pepeClass}`} id={pepeId}>
      <div className="cont1">
        <h3>Orden del Dia</h3>
        
      </div>
      <div className="ter-cont2">
        <p>{ordenBD}</p>
      </div>
    </div>
  );
}

export default OrdenDia;
