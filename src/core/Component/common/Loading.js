import * as React from "react";
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
const Loading = function (props) {

    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
        setShow(props.visible)
       // setNameAction(props.nameAction);
    })

    const onClick  = () => {
        props.onCancel();
    }

    const onCancelNotUpdate = () => {
      props.onCancelNotUpdate();
    }

  
    return (
        <Modal
          show={show}
        //   onHide={handleClose}
          backdrop="static"
          keyboard={false}
          
        >
{/*         
          <img src="../../../../assets/imgs/loading1.gif" style={{ height: 100}}/> */}
         
          
        </Modal>
      
    );
  }
  
 export default Loading;