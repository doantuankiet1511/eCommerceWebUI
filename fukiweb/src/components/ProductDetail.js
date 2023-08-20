import { useContext, useEffect, useState } from "react"
import Loading from "../layouts/Loading"
import { Badge, Button, Card, Col, Form, Image, Row } from "react-bootstrap"
import API, { authAPI, endpoints } from "../configs/API"
import { Link, useParams } from "react-router-dom"
import Moment from "react-moment"
import { MyUserContext } from "../configs/MyContext"

const ProductDetail = () => {
    const [product, setProduct] = useState(null)
    const {productId} = useParams()
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState(null)
    const [content, setContent] = useState("")
    const [user, ] = useContext(MyUserContext)

    useEffect(() => {
        const loadProduct = async () => {
            let res = await API.get(endpoints['product-detail'](productId))
            setProduct(res.data)
        }

        loadProduct()
    }, [productId])

    useEffect(() => {
        const loadComments = async () => {
            let res = await API.get(endpoints['comments'](productId))
            setComments(res.data)
        }

        loadComments()
    }, [productId])

    const addComment = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = await authAPI().post(endpoints['comments'](productId), {
                    "content": content
                })
                setComments(current => ([res.data, ...current]))
            } catch {

            } finally {
                setLoading(false)
            }

        }

        setLoading(true)
        process()
    }

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

            <hr/>
            {user===null?<Link to="/login">Đăng nhập</Link>:(
                <Form onSubmit={addComment}>
                    <Form.Group className="mb-3" controlId="exampleform.ControlTextarea">
                        <Form.Control as="textarea" rows={3} 
                                        placeholder="Nội dung bình luận ..." 
                                        value={content}
                                        onChange={e => setContent(e.target.value)}/>
                    </Form.Group>

                    {loading?<Loading />:<Button variant="primary" type="submit">Bình luận</Button>}        
                </Form>
            )}
            <hr/>

            {comments === null ? <Loading /> : (
                comments.map(comment => (
                    <Row className="m-1 p-1" key={comment.id}>
                        <Col xs={3} md={1}>
                            <Image src={comment.user.avatar} alt={comment.user.username} width={50} rounded/>
                        </Col>
                        <Col xs={9} md={11}>
                            <p>{comment.content}</p>
                            <small>Được bình luận bởi {comment.user.username} vào <Moment fromNow>{comment.created_date}</Moment> </small>
                        </Col>
                    </Row>
                ))
            )}
        
        </>
    )
}

export default ProductDetail