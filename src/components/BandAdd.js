import React, {useState} from 'react';

export const BandAdd = ({crearBanda}) => {

    const [valor, setValor] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(valor.trim().length > 0){
            crearBanda(valor);
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
