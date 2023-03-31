import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Book from "../Asset/BookComponent/BookComponent";
import Loader from "../Asset/Loader/Loader";
import { Button } from '@mui/material';

export default function SubjectPage({ subject }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        fetch("https://openlibrary.org/subjects/" + subject + ".json")
            .then((res) => res.json())
            .then((data) => {
                data.work_count ? setData(data) : setData(null);
                console.log(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <Button variant="outlined" onClick={() => (navigate('/search'))} className="btN" style={{ marginTop: "20px" }} >Go to Home
                </Button>
                <h1 style={{ marginBottom: 39, marginTop: 15, textAlign: "center", fontWeight: "200" }}>
                    {String(subject).toUpperCase()}
                </h1>
            </div>
            <div className="books-container">
                {data &&
                    data.works.map((d, i) => {
                        return (
                            <Book
                                key={i}
                                title={d.title}
                                author={d.authors && d.authors.map((d) => `${d.name}, `)}
                                coverId={d.cover_id}
                            />
                        );
                    })}
            </div>
            <Loader state={loading} />
        </>
    );
}
