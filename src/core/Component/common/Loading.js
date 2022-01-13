import * as React from "react";
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
const Loading = function (props) {

    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
        setShow(props.visible)
    })

    return (
        <Modal
          show={show}
          backdrop="static"
          keyboard={false}
          
        >
        </Modal>
      
    );
  }
  
 export default Loading;