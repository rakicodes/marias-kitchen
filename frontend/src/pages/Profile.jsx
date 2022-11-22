import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingSpinner from '../components/Spinner'
import RecipeForm from '../components/RecipeForm'
import { getUserRecipes, reset } from '../features/recipe/recipeSlice'
import RecipeCard from '../components/RecipeCard'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)
  const { recipes, isLoading, isError, isSuccess, message } = useSelector((state) => state.recipes)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login')
    }

    dispatch(getUserRecipes(user._id))

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Container>
      <h2 className="mt-3">Let's get cooking, {user && user.name}!</h2>
      <RecipeForm />

        { recipes.length > 0 ? 
          <Row xs={1} sm={2} md={4} className="g-1 mt-2">
            { recipes.map((recipe) => 
              <RecipeCard key={recipe._id} recipe={recipe} showDelete={true}/>
            )}
        </Row> :
        <p className="mt-3">No recipes</p>
        }
    </Container>
  )
}

export default Dashboard