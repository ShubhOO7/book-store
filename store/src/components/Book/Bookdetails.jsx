import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';


function Bookdetails() {

    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: '',
        author: '',
        description: '',
        price: '',
        image: '',
    });
    const [checked, setChecked] = useState(false);

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(input, checked);
        axios.put(`http://localhost:8000/books/${id}`, {
            name: String(input.name),
            author: String(input.author),
            description: String(input.description),
            image: String(input.image),
            price: Number(input.price),
            available: Boolean(checked)
        }).then(res => res.data)
            .then(navigate('/books'))
    }
    const id = useParams().id;
    // console.log(id);
    useEffect(() => {
        axios.get(`http://localhost:8000/books/${id}`)
            .then((res) => res.data)
            .then((data) => setInput(data.book))
    }, [id]);
    // console.log(book);


    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex"
                flexDirection="column"
                justifyContent={'center'}
                maxWidth={700}
                alignItems={'center'}
                alignSelf={'center'}
                marginLeft={"auto"}
                marginRight={"auto"}
                marginTop={10}
            >
                <TextField
                    label='Book Name'
                    marign='normal'
                    value={input.name}
                    onChange={handleChange}
                    style={{ marginTop: '5%' }}
                    fullWidth
                    variant='outlined'
                    name='name' />
                <TextField
                    label='Author'
                    marign='normal'
                    value={input.author}
                    onChange={handleChange}
                    style={{ marginTop: '5%' }}
                    fullWidth
                    variant='outlined'
                    name='author' />
                <TextField
                    label='Description'
                    marign='normal'
                    value={input.description}
                    onChange={handleChange}
                    style={{ marginTop: '5%' }}
                    fullWidth
                    variant='outlined'
                    name='description' />
                <TextField
                    label='ImageUrl'
                    marign='normal'
                    value={input.image}
                    onChange={handleChange}
                    style={{ marginTop: '5%' }}
                    fullWidth
                    variant='outlined'
                    name='image' />
                <TextField
                    label='Price'
                    marign='normal'
                    value={input.price}
                    onChange={handleChange}
                    type="number"
                    style={{ marginTop: '5%' }}
                    fullWidth
                    variant='outlined'
                    name='price' />

                <FormControlLabel
                    control={<Checkbox
                        checked={checked}
                        onChange={() => setChecked(!checked)} />
                    }
                    label="Available" />
                <Button
                    type="submit"
                    style={{ marginTop: '5%' }}
                    variant='outlined'>
                    Update Book
                </Button>
            </Box>
        </form>
    )
}

export default Bookdetails