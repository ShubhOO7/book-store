import React from 'react'
import { Button, Card, Typography } from '@mui/material';
import "./Book.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
function Book(books) {

    const { _id, author, name, description, price, image } = books.book;
    // console.log(_id);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/books/${_id}`).then(res => res.data)
            .then(window.location.reload());
    }
    return (
        <Card sx={{ maxWidth: 345 }} className='deck'>
            <img src={image} alt={name} className='image' />
            <Typography variant="h6" color="text.secondary">
                {author}
            </Typography>
            <Typography variant="h6">
                {name}
            </Typography>

            <Typography
                variant="body2" color="text.secondary"
                className='description'>
                {description}
            </Typography >
            <Typography variant="h5">Rs : {price}</Typography>
            <Typography style={{ margin: "5%" }} >
                <Button
                    variant="outlined"
                    LinkComponent={Link} to={`/books/${_id}`}
                    sx={{ mt: "auto" }}
                    style={{ margin: "2px" }}
                    startIcon={<DeleteIcon />}>
                    Update
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleSubmit}
                    sx={{ mt: "auto" }}
                    style={{ margin: "2px" }}
                    startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </Typography>

        </Card>
    )
}

export default Book