import { useContext } from "react"
import { Button, Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CartContext } from "../configs/MyContext"

const Items = ({obj}) => {
    const [stateCart, dispatchCart] = useContext(CartContext)

    const addToCart = () => {
        dispatchCart({
            type: "ADD_TO_CART",
            payload: {...obj, quantity: 1}
        })
    }

    let url = `/products/${obj.id}`

    return (
        <Col md={4} xs={12} className="mt-2" key={obj.id}>
            <Card>
                <Card.Img variant="top" src={obj.image} fluid/>
                <Card.Body>
                    <Card.Title>{obj.name.length > 52 ? obj.name.slice(0, 52) + " ..." : obj.name}</Card.Title>
                    <Card.Title>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(obj.price)}</Card.Title>
                    <Link to={url} className="btn btn-primary">Xem chi tiết</Link>
                    <Button onClick={() => addToCart()} className="ms-1">Thêm vào giỏ hàng</Button>               
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Items