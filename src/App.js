import React, { useEffect, useState } from 'react';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import io from 'socket.io-client';


const connectSocketServer = ()=>{
  const socket =  io.connect('http://localhost:8080',{
    transports:['websocket']
  });
  return socket;
}


function App() {


  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([])

  useEffect(() => {
      //console.log(socket);
      setOnline(socket.connected);
  }, [socket])

  useEffect(() => {
    socket.on('connect',()=>{
      setOnline(true);
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect',()=>{
      setOnline(false);
    })
  }, [socket]);

  useEffect(() => {
     socket.on('current-bands',(data)=>{
       setBands(data);
     });
  }, [socket])

  const votar = (id)=>{
    //console.log('votar-app');
    socket.emit('votar-banda',id);
  }

  const borrar = (id)=>{
    socket.emit('borrar-banda',id);
  }

  const cambiarNombre = (id,name)=>{
    socket.emit('cambiar-nombre-banda',{id,name});
  }

  const crearBanda = (name)=>{
    socket.emit('crear-banda',{name});
  }

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status

          {
            online
            ? <span className="text-success"> Online</span>
            : <span className="text-danger"> Offline</span>
          }
         
          
        
        </p>
      </div>

      <h1>Band Names</h1>
      <hr/>

      <div className="row">
        <div className="col-8">
            <BandList data={bands} votar= {votar} borrar={borrar} cambiarNombre={cambiarNombre}/>
        </div>
        <div className="col-4">
            <BandAdd crearBanda={crearBanda}/>
        </div>
      </div>



    </div>
  );
}

export default App;
