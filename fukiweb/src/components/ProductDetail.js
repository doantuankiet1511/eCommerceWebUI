import { useEffect, useState } from "react"
import Loading from "../layouts/Loading"
import { Badge, Button, Card, Col, Row } from "react-bootstrap"
import API, { endpoints } from "../configs/API"
import { Link, useParams } from "react-router-dom"

const ProductDetail = () => {
    const [product, setProduct] = useState(null)
    const {productId} = useParams()

    useEffect(() => {
        const loadProduct = async () => {
            let res = await API.get(endpoints['product-detail'](productId))
            setProduct(res.data)
        }

        loadProduct()
    }, [productId])

    if (product === null)
        return <Loading />

    let url = `/shops/${product.shop.id}/products`

    return (
        <>
            <Row className="mt-2">
                <Col md={4}>
                    <img src={product.image} width="100%" alt={product.name}/>
                </Col>
                <Col md={8}>
                    <h2 className="text-center">{product.name}</h2>
                    <hr/>
                    <div>
                        <p>Giá: {product.price}</p>
                        <p>Loại sản phẩm: {product.category.name}</p>
                        <p dangerouslySetInnerHTML={{__html:  product.description}}></p>
                    </div>
                    <div>
                        {product.tags.map(tag => <Badge key={tag.id} className="m-1" bg="primary">{tag.name}</Badge>)}
                    </div>
                    <div>
                        <Button>Thêm vào giỏ</Button>
                    </div>
                </Col>
            </Row>
        
        </>
    )
}

export default ProductDetail