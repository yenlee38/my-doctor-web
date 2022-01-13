import * as React from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { updateRegistration } from "../../model/registration";
const AlertMessage = function (props) {

    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
        setShow(props.isVisited)
    })

    const onClick  = () => {
      updateRegistration(props.id, props.name, props.status).then(res => {
        props.onCancel();
      })
    }
    const handleClose = () => {setShow(false); props.onCancelNotUpdate()}
    return (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton style = {{backgroundColor: '#71DFE7'}}>
            <Modal.Title style = {{fontSize: 20, fontWeight: 500}}>Thay đổi trạng thái [{props.nameAction}]</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style = {{fontSize: 20, fontWeight: 500, textAlign:'center'}}>
            <span>Thay đổi trạng thái đăng kí dịch vụ</span>
          </div>
          <div style = {{fontSize: 20, fontWeight: 500, textAlign:'center'}}>
            <span>"{props.name}"</span>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" style = {{backgroundColor: '#F90716',  color: "white",
                              alignItems: "center",
                              justifyContent:'center',
                              textAlign:'center',
                              fontWeight:'400',
                              boxShadow:
                                "0 2px 5px 0 rgb(0 0 0 /20%), 0 2px 10px 0 rgb(0 0 0 /10%)",
                              cursor: "pointer",}} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" style = {{backgroundColor: '#1DB9C3', 
                              marginLeft: 10,
                                color: "white",
                              alignItems: "center",
                              justifyContent:'center',
                              textAlign:'center',
                              fontWeight:'400',
                              boxShadow:
                                "0 2px 5px 0 rgb(0 0 0 /20%), 0 2px 10px 0 rgb(0 0 0 /10%)",
                              cursor: "pointer",}} onClick = {() => onClick()}>{props.nameAction}</Button>
          </Modal.Footer>
        </Modal>
      
    );
  }
  
 export default AlertMessage;