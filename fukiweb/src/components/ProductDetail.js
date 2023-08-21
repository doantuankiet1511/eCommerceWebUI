import { useContext, useEffect, useState } from "react"
import Loading from "../layouts/Loading"
import { Badge, Button, Card, Col, Form, Image, Row } from "react-bootstrap"
import API, { authAPI, endpoints } from "../configs/API"
import { Link, useParams } from "react-router-dom"
import Moment from "react-moment"
import { MyUserContext } from "../configs/MyContext"
import Rating from "react-rating"
import {AiOutlineStar, AiFillStar} from "react-icons/ai"

const ProductDetail = () => {
    const [product, setProduct] = useState(null)
    const {productId} = useParams()
    const [loading, setLoading] = useState(false)

    const [comments, setComments] = useState([])
    const [contentComment, setContentComment] = useState("")

    const [reviews, setReviews] = useState([])
    const [rate, setRate] = useState(0)
    const [contentReview, setContentReview] = useState("")

    const [user, ] = useContext(MyUserContext)
    const [like, setLike] = useState()
    const [changed, setChanged] = useState()

    useEffect(() => {
        const loadProduct = async () => {
            let res = await authAPI().get(endpoints['product-detail'](productId))
            setProduct(res.data)
        }

        loadProduct()
    }, [productId, like])

    useEffect(() => {
        const loadComments = async () => {
            let res = await API.get(endpoints['comments'](productId))
            setComments(res.data)
        }

        loadComments()
    }, [productId])

    useEffect(() => {
        const loadReviews = async () => {
            let res = await API.get(endpoints['reviews'](productId))
            setReviews(res.data)
        }

        loadReviews()
    }, [productId])

    const addComment = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = await authAPI().post(endpoints['comments'](productId), {
                    "content": contentComment
                })
                setComments(current => ([res.data, ...current]))
                setContentComment("")
            } catch (ex) {
                console.error(ex)
            } finally {
                setLoading(false)
            }
        }

        setLoading(true)
        process()
    }

    const addReview = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = await authAPI().post(endpoints['reviews'](productId), {
                    "rate": rate,
                    "content": contentReview
                })
                setReviews(current => ([res.data, ...current]))
                setRate(0)
                setContentReview("")
                // setChanged(reviews.length)
            } catch (ex) {
                console.error(ex)
            } finally {
                setLoading(false)
            }
        }

        setLoading(true)
        process()
    }

    const likeProcess = () => {
        const process = async () => {
            try {
                let res = await authAPI().post(endpoints['like-product'](productId))
                if (res.status === 200)
                    setLike(res.data)
            } catch (ex) {
                console.error(ex)
            }
        }

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
                        <Link to={url} className="btn btn-primary me-1">{product.shop.name}</Link>
                        <Button className="me-1">Thêm vào giỏ</Button>
                        <button onClick={likeProcess} className={like === true || product.liked === true?"btn btn-danger":"btn btn-outline-danger"} style={{fontSize:"16px"}}>♡</button>
                    </div>
                </Col>
            </Row>

            <hr/>
            {user===null?<Link to="/login" className="btn btn-primary">Đăng nhập</Link>:(
                <Form onSubmit={addComment}>
                    <Form.Group className="mb-3" controlId="exampleform.ControlTextarea">
                        <Form.Control as="textarea" rows={3} 
                                        placeholder="Nội dung bình luận ..." 
                                        value={contentComment}
                                        onChange={e => setContentComment(e.target.value)}/>
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

            <hr/>

            {user===null ? <Link to="/login" className="btn btn-primary">Đăng nhập</Link> : ( 
                !product.auth_review ? (
                    <Form onSubmit={addReview}>
                        <Rating
                            emptySymbol= {<AiOutlineStar size="2rem"/>}
                            fullSymbol= {<AiFillStar size="2rem"/>}
                            initialRating={rate}
                            onChange={value => setRate(value)}
                        />                    
                        <Form.Group className="mb-3" controlId="exampleform.ControlTextarea">
                            <Form.Control as="textarea" rows={3} 
                                            placeholder="Nội dung review ..." 
                                            value={contentReview}
                                            onChange={e => setContentReview(e.target.value)}/>
                        </Form.Group>

                        {loading?<Loading />:<Button variant="primary" type="submit">Gửi</Button>}        
                    </Form>                
                ) : (
                    <h4>Bạn đã review</h4>
                )
            )}

            <hr/>

            {reviews === null ? <Loading /> : (
                reviews.map(review => (
                    <Row className="m-1 p-1" key={review.id}>
                        <Col xs={3} md={1}>
                            <Image src={review.user.avatar} alt={review.user.username} width={50} rounded/>
                        </Col>
                        <Col xs={9} md={11}>
                            <div>
                                <Rating
                                    emptySymbol= {<AiOutlineStar size="2rem"/>}
                                    fullSymbol= {<AiFillStar size="2rem"/>}
                                    initialRating={review.rate}
                                    readonly
                                />
                            </div>
                            <p>{review.content}</p>
                            <small>Được review bởi {review.user.username} vào {review.updated_date ? <Moment fromNow>{review.updated_date}</Moment> : <Moment fromNow>{review.created_date}</Moment>}  </small>
                        </Col>
                    </Row>
                ))
            )}
        
        </>
    )
}

export default ProductDetail