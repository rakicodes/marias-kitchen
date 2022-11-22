import { useSelector, useDispatch } from 'react-redux';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { deleteRecipe, likeRecipe } from '../features/recipe/recipeSlice'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function RecipeCard({ recipe, showDelete }) { 
    const dispatch = useDispatch();
    
    const { user } = useSelector((state) => state.auth)

    return (
        <Col>
            <Card>
                <Card.Body>
                    <Link to={"/recipe/"+recipe._id}>
                        <Card.Title>
                            <h2>{recipe.title}</h2>
                        </Card.Title>
                    </Link>

                    <section className="gap-1 align-center">
                        { showDelete && user._id === recipe.user && <Button variant="outline-primary" onClick={() => dispatch(deleteRecipe(recipe._id))}><FaTrash/></Button> }
                        { user ? 
                            <Button variant="outline-primary" onClick={() => dispatch(likeRecipe(recipe._id))}>
                                <FaHeart />
                            </Button> :
                            <FaHeart />
                        }
                        <span>{recipe.likes}</span>
                    </section>


                </Card.Body>
                
            </Card>
        </Col>
    )
}

export default RecipeCard