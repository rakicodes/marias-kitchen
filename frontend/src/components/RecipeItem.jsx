import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { deleteRecipe, likeRecipe } from '../features/recipe/recipeSlice'
import LoadingSpinner from '../components/Spinner'
import { getRecipe, reset } from '../features/recipe/recipeSlice'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RecipeItem() { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { recipeId } = useParams();

    const { user } = useSelector((state) => state.auth)
    const { recipes, isLoading, isError, isSuccess, message } = useSelector((state) => state.recipes)

    useEffect(() => {
        if (isError) {
          console.log(message);
        }

        dispatch(getRecipe(recipeId))
    
        return () => {
          dispatch(reset())
        }
    }, [navigate, isError, message, dispatch, recipeId])

    const onDelete = () => {
        dispatch(deleteRecipe(recipes[0]._id))
        navigate("/profile")

    }
    
    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <Container>
        { recipes.length===0 ? <LoadingSpinner /> : 
            <>
                <Row className="mt-3">
                    <Col>
                        <h2>
                            {recipes[0].title}
                        </h2>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ul>
                            {recipes[0].ingredients?.map((ingredient, i) => <li key={i}>{ingredient}</li>)}
                        </ul>
                        <ol>
                        {recipes[0].steps?.map((step, i) => <li key={i}>{step}</li>)}
                        </ol>
                    </Col>
                </Row>
                <Row>
                    <Col className="align-center gap-1">
                         { user ? 
                             <Button variant="outline-primary"  onClick={() => dispatch(likeRecipe(recipes[0]._id))}>
                                 <FaHeart />
                             </Button> :
                            <FaHeart />
                         }
                         <span>{recipes[0].likes}</span>
                     </Col>
                    <Col className="flex-end">
                        { (user && user._id === recipes[0].user) && <Button variant="outline-primary" onClick={onDelete}><FaTrash /></Button> }       
                    </Col>
                    
                </Row>

            </> 
        }
        </Container>

    )
}

export default RecipeItem