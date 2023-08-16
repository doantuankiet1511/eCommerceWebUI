import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Items = ({obj}) => {
    let url = `/products/${obj.id}`

    return (
        <Col md={4} xs={12} key={obj.id}>
            <Card>
                <Card.Img variant="top" src={obj.image} fluid/>
                <Card.Body>
                    <Card.Title>{obj.name}</Card.Title>
                    <Link to={url} className="btn btn-primary">Xem chi tiết</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Items