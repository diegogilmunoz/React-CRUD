import logo from './logo.svg';
import './App.css';
import Listar from "./Permission.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Row,Col, Container ,Table} from 'react-bootstrap';



function App() {
  return (
    <div className="App">
      <header className="">
        
      </header>
      <body>

      <Container  fluid>
        <Row>
          <Col>
          <Listar />
          </Col>
        </Row>
      </Container>
      </body>
     
    </div>
    
  );
}

export default App;
