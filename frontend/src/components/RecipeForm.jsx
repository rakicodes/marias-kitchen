import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createRecipe } from '../features/recipe/recipeSlice'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function RecipeForm() {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");

    const dispatch = useDispatch()
     
    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createRecipe({ title, ingredients, steps }))
        setTitle("")
        setIngredients("")
        setSteps("")

    }
    return (
        <section>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="title">Name</Form.Label>
                    <Form.Control type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
                    <Form.Control as="textarea" rows={3} type="text" name="ingredients" id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="separate ingredients by comma" required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="steps">Steps</Form.Label>
                    <Form.Control as="textarea" rows={3} type="text" name="steps" id="steps" value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="separate steps by comma" required/>
                </Form.Group>

                <Button type="submit" className="mt-2">
                    Add Recipe
                </Button>

            </Form>
        </section>
    )
}

export default RecipeForm