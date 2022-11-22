import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingSpinner from '../components/Spinner'
import { getRecipes, reset } from '../features/recipe/recipeSlice'
import RecipeCard from '../components/RecipeCard'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';



function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { recipes, isLoading, isError, isSuccess, message } = useSelector((state) => state.recipes)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getRecipes())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Container>
      <h1 className="mt-3">Recipes</h1>
      <section>
        { recipes.length > 0 ? 
        <Row xs={1} sm={2} md={4} className="g-1 mt-2">
          { recipes.map((recipe) => 
            <RecipeCard key={recipe._id} recipe={recipe} showDelete={false} />
            )}
        </Row> :
        <span className="mt-5">No recipes</span> 
        }
      </section>
    </Container>
  )
}

export default Dashboard