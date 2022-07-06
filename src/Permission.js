import React,{useState, useEffect} from 'react';
import axios from "axios"; 
import {ListGroup} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import {Edit,Delete} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {Modal , Button, TextField} from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

function Listar(props){

    
    const styles= useStyles();

    const [permisos, setValores] = useState([]);
    const [modalInsertar,setModalInsertar] = useState(false);
    const [modalEditar,setModalEditar] = useState(false);
    const [startDate, setStartDate] = useState(new Date());


    const [permisoSeleccionada, setpermisoSeleccionada]= useState({

        NombreEmpleado:'',
        ApellidoEmpleado:'',
        TipoPermiso:'',
        FechaPermiso:'2022-07-05'

    });

    const handleChange=e=>{
        const {name,value}=e.target;
        setpermisoSeleccionada(prevState=>({
            ...prevState,
            [name]: value
        }) )
        //console.log(permisoSeleccionada);

    }

    


    useEffect(() =>{
        axios.get("http://localhost:27330/permission")
        .then(res=>{
            const data = res.data;
            setValores(data.items);
        });

    },[]);



    const peticionPost=async()=>{
        await axios.post("http://localhost:27330/permission", permisoSeleccionada)
        .then(response=>{
            setValores(permisos.concat(response.data))
          abrirCerrarModalInsertar()
        })
      }

      const peticionPut=async()=>{
        await axios.put("http://localhost:27330/permission", permisoSeleccionada)
        .then(response=>{
          var dataNueva=permisos;
          dataNueva.map(permiso=>{
            if(permisoSeleccionada.id===permiso.id){
              permiso.nombreEmpleado=permisoSeleccionada.nombreEmpleado;
              permiso.apellidoEmpleado=permisoSeleccionada.apellidoEmpleado;
              permiso.tipoPermiso=permisoSeleccionada.tipoPermiso;
              permiso.estado=permisoSeleccionada.estado;
            }
          })
          setValores(dataNueva);
          abrirCerrarModalEditar();
        })
      }

     

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
    }
    
    const seleccionarPermiso=(consola, caso)=>{
        setpermisoSeleccionada(consola);
        (caso==='Editar')&&setModalEditar(true)
      }

    
    const bodyInsertar=(
        <div className={styles.modal}>
            <h3>Agregar Permiso</h3>
            <TextField name="NombreEmpleado" label="Nombre" onChange={handleChange} />
            <br />
            <TextField name="ApellidoEmpleado" label="Apellido" onChange={handleChange} />
            <br />
            <TextField name="TipoPermiso" label="Permiso" onChange={handleChange} />
            <br />
            <br />
            <DatePicker name="FechaPermiso" selected={startDate} onChange={(date) => setStartDate(date)} />
            <br /><br />
            <div align="right">
                <button onClick={()=>peticionPost()} color="primary">Registrar</button>
                <button onClick={()=>abrirCerrarModalInsertar()} >Cancelar</button>

            </div>
        </div>
    )

    const bodyEditar=(
        <div className={styles.modal}>
            <h3>Editar Permiso</h3>
            <TextField name="NombreEmpleado" label="Nombre" onChange={handleChange} value={permisoSeleccionada && permisoSeleccionada.nombreEmpleado}/>
            <br />
            <TextField name="ApellidoEmpleado" label="Apellido" onChange={handleChange} value={permisoSeleccionada && permisoSeleccionada.apellidoEmpleado}/>
            <br />
            <TextField name="TipoPermiso" label="Permiso" onChange={handleChange} value={permisoSeleccionada && permisoSeleccionada.tipoPermiso} />
            <br />
            
            <TextField name="FechaPermiso" label="Fecha" onChange={handleChange} value={permisoSeleccionada && permisoSeleccionada.fechaPermiso}/>
            <br /><br />
            <div align="right">
                <button  color="primary">Editar</button>
                <button onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>

            </div>
        </div>
    )




    const renderPermiso = (permisos,index) => {
        return (
            

                <tr key={permisos.id}>
                    <td>{permisos.id}</td>
                    <td>{permisos.nombreEmpleado}</td>
                    <td>{permisos.apellidoEmpleado}</td>
                    <td>{permisos.permissionTypes.descripcion}</td>
                    <td>{permisos.fechaPermiso.substring(0,10)}</td>
                    <td>

                    <Edit className={styles.iconos} onClick={()=> seleccionarPermiso(permisos, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarPermiso(permisos, 'Eliminar')}/>
                      

                    </td>
                </tr>
            )
        }


     


        return(
            <div>
                <br />
                <button onClick={abrirCerrarModalInsertar}>Solicitar permiso</button>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Permiso</th>
                    <th>Fecha permiso</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                
                <tbody>
                    {permisos.map(renderPermiso)}    
                </tbody>    

            </Table>

            <Modal 
            open={modalInsertar}
            onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>

            <Modal 
            open={modalEditar}
            onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>

            </div>

            
           

    
        );
}
export default Listar;