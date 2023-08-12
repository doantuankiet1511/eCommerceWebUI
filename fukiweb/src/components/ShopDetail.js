import { useEffect, useState } from "react"
import Loading from "../layouts/Loading"
import API, { endpoints } from "../configs/API"
import { useParams } from "react-router-dom"
import Items from "../layouts/Items"
import { Row } from "react-bootstrap"

const ShopDetail = () => {
    const [shop, setShop] = useState(null)
    const [products, setProducts] = useState(null)

    const {shopId} = useParams()

    useEffect(() => {
        const loadShop = async () => {
            let res = await API.get(endpoints['shop-detail'](shopId))
            setShop(res.data)
        }

        const loadProduct = async () => {
            let res = await API.get(endpoints['shop-detail-product'](shopId))
            setProducts(res.data.results)
        }

        loadShop()
        loadProduct()
    }, [shopId])

    if (shop === null || products === null)
        return <Loading />
    return (
        <>
            <h1>Cửa hàng {shop.name}</h1>
            <Row>
                {products.map(product => <Items obj={product}/>)}
            </Row>
        </>
    )
}

export default ShopDetail