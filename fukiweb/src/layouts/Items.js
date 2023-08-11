import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Items = ({obj}) => {
    let url = `/products/${obj.id}`

    return (
        <Col md={3} xs={12} className="p-2" key={obj.id}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={obj.image} />
                <Card.Body>
                    <Card.Title>{obj.name}</Card.Title>
                    <Link to={url} className="btn btn-primary">Xem chi tiết</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Items