import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const URL = "https://storebackend-jeri.onrender.com/books";

function AddBook() {
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
        axios.post(URL, {
            name: String(input.name),
            author: String(input.author),
            description: String(input.description),
            image: String(input.image),
            price: Number(input.price),
            available: Boolean(checked)
        }).then(res => res.data)
            .then(navigate('/books'))
        // window.location.reload();
    }

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
                    Add Book
                </Button>
            </Box>
        </form>
    )
}

export default AddBook