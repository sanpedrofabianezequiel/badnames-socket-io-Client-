import React, {useContext, useState} from 'react';
import { SocketContext } from '../context/SocketContext';
import { useSocket } from '../hooks/useSocket';

export const BandAdd = () => {

    const [valor, setValor] = useState('');

    //const {socket} = useSocket('http://localhost:8080');
    const {socket} = useContext(SocketContext)


    const handleSubmit = (e)=>{
        e.preventDefault();
        if(valor.trim().length > 0){
            socket.emit('crear-banda',{name:valor});
            setValor('');
        }
    }


    return (
        <>
            <h3>Agregar Banda</h3>   
            <form onSubmit={handleSubmit}>
                <input  className="form-control" placeholder="Nuevo nombre de banda" value={valor} onChange={ (e)=>setValor(e.target.value)}/>
            </form>
        </>
    )
}
