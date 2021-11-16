import React, { useEffect, useState } from 'react'

export const BandList = ({data,votar,borrar,cambiarNombre}) => {

    const [bands, setBands] = useState([]);

    useEffect(() => {
        setBands(data);
    }, [data])

    const cambiaNombre = (event, id)=>{
        const nuevoNombre =  event.target.value;

        //First i get the all state and then I each all the ellemtns 
        setBands( (x) => x.map( y => {
            if(y.id === id){
                y.name = nuevoNombre;
            }
            return y;
        }));
    }

    const perdioFoco = ( id,nombre)=>{
        console.log(id,nombre);
        cambiarNombre(id,nombre);
    }

    const crearRows = ()=>{
        return(
            bands.map( (x,index)=> (
                <tr key={x.id}>
                    <td>
                        <button className="btn btn-primary" onClick={()=>votar(x.id)}> +1 </button>
                    </td>
                    <td>
                        <input className="form-control" value={x.name}  onChange={(event)=> cambiaNombre(event,x.id)} onBlur={ ()=>perdioFoco(x.id,x.name)} />
                    </td>
                    <td>
                        <h3>{x.votes}</h3>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={()=>borrar(x.id)}>
                            Borrar
                        </button>
                    </td>
                </tr>
            ) )
        )
    }

    return (
        <>
         <h3>Bandas actuales</h3>   
           <table className="table table-stripped">
               <thead>
                   <tr>
                       <th></th>
                       <th>Nombre</th>
                       <th>Votos</th>
                       <th>Borrar</th>
                   </tr>
               </thead>
               <tbody>
                    { crearRows()}
               </tbody>
           </table>    
        </>
    )
}
