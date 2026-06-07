import React, { useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import MyModal from './MyModal';

function MyPizza({pizza}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            {/* Hiển thị thông tin ID, Name, tên loại pizza, description,
            hình ảnh pizza, giá cũ, giá giảm,tag trong 1 Card React-bootstrap,
            chứa trong container react-bootstrap , có Row, Col */}
            <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={pizza.imageSrc} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{pizza.name}</Card.Title>
                    <Card.Text>
                        ID: {pizza.id} <br />
                        Description: {pizza.description} <br />
                        Old Price: {pizza.oldPrice} <br />
                        New Price: {pizza.newPrice} <br />
                        Tag: {pizza.tag}
                    </Card.Text>
                    <Button variant="primary" onClick={handleShow} className="mt-auto w-100">
                        View Details
                    </Button>
                </Card.Body>
            </Card>
            <MyModal show={show} handleClose={handleClose} context={pizza} />
        </div>
    );
}
export default MyPizza;