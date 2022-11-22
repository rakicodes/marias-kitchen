import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

function LoadingSpinner() {
  return (
    <section className="justify-center min-height-80 align-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>  
    </section>
  )
}

export default LoadingSpinner