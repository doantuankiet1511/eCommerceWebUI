import { useEffect, useState } from "react"
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap"
import API, { endpoints } from "../configs/API"
import { Link, useSearchParams } from "react-router-dom"
import Loading from "../layouts/Loading"
import Items from "../layouts/Items"

const Products = () => {
    const [products, setProducts] = useState(null)
    const [page, setPage] = useState(1)
    const [q] = useSearchParams()

    useEffect(() => {
        const loadProducts = async () => {
            try {
                let e = `${endpoints['products']}?page=${page}`

                let k = q.get("kw")
                if (k !== null)
                    e += `&kw=${k}`

                let cateId = q.get("cateId")
                if (cateId !== null)
                    e += `&category_id=${cateId}`

                let res = await API.get(e)
    
                setProducts(res.data.results)
            } catch (ex) {
                setPage(1)
            }
        }

        setProducts(null)
        loadProducts()
    }, [page, q]) 

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)

    if (products === null)
        return <Loading />
    
    if (products.length === 0)
        return <div className="alert alert-info m-1">Không có sản phẩm nào!!!</div>

    return (
        <>
            <ButtonGroup aria-label="Basic example" className="mt-2">
                <Button onClick={prevPage} variant="outline-primary">&lt;&lt;</Button>
                <Button onClick={nextPage} variant="outline-primary">&gt;&gt;</Button>
            </ButtonGroup>
            <Row>
                {products.map(product => <Items key={product.id} obj={product} />)}
            </Row>
        </>
    )
}

export default Products