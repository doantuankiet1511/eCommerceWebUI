import { useEffect, useState } from "react"
import Loading from "../layouts/Loading"
import { Badge } from "react-bootstrap"
import API, { endpoints } from "../configs/API"
import { useParams } from "react-router-dom"

const ProductDetail = () => {
    const [product, setProduct] = useState(null)
    const {productId} = useParams()

    useEffect(() => {
        const loadProduct = async () => {
            let res = await API.get(endpoints['product-detail'](productId))
            setProduct(res.data)
        }

        loadProduct()
    }, [])

    if (product === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-info">CHI TIẾT SẢN PHẨM</h1>
            <h2 className="text-center text-info">{product.name}</h2>
            <div>
                <div>
                    <img src={product.image} width="120" />
                </div>
                {product.tags.map(tag => <Badge key={tag.id} className="m-1" bg="primary">{tag.name}</Badge>)}
            </div>
            <p dangerouslySetInnerHTML={{__html: product.description}}></p>
        </>
    )
}

export default ProductDetail