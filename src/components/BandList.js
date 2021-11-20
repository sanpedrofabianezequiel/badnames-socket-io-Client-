import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {

    const [bands, setBands] = useState([]);
    const {socket} = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands',(bands)=>{
            setBands(bands);
        });
        return ()=>socket.off('current-bands');
    }, [socket])






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
        socket.emit('cambiar-nombre-banda',{id,nombre});
    }

    const votar = (id) =>{
        socket.emit('votar-banda',id);
    }

    const borrar = (id) =>{
        socket.emit('borrar-banda',id);
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
