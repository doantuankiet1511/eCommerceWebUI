import { useEffect, useState } from "react"
import { Button, ButtonGroup, Col, Row } from "react-bootstrap"
import API, { endpoints } from "../configs/API"
import { useSearchParams } from "react-router-dom"
import Loading from "../layouts/Loading"
import Items from "../layouts/Items"
import Categories from "./Categories"

const Products = () => {
    const [products, setProducts] = useState(null)
    const [categories, setCategories] = useState([])
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

        const loadCategories = async () => {
            let res = await API.get(endpoints['categories'])
            setCategories(res.data)
        }

        setProducts(null)
        loadProducts()
        loadCategories()
    }, [page, q]) 

    const getNameCategory = categories.filter(c => c.id === parseInt(q.get("cateId"))).map(c => c.name)

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)

    if (products === null)
        return <Loading />
    
    if (products.length === 0)
        return (
            <>
                <Row>
                    <Col xs={6} md={2}>
                        <Categories />
                    </Col>
                    <Col xs={12} md={10}>
                        <div className="alert alert-info mt-1">Không có sản phẩm nào {q.get("cateId") !== null ? <>thuộc {getNameCategory}</> : ""}!!!</div>
                    </Col>
                </Row>
            </>
        )

    return (
        <>
            <Row className="mt-4">
                <Col xs={6} md={2}>
                    <Categories />
                </Col>
                <Col xs={12} md={10}>
                    <h5>Sản phẩm {q.get("cateId") !== null ? <>thuộc {getNameCategory}</> : ""}</h5>
                    <Row>
                        {products.map(product => <Items key={product.id} obj={product} />)}
                    </Row>
                    <ButtonGroup aria-label="Basic example" className="mt-2">
                        <Button onClick={prevPage} variant="outline-primary">&lt;&lt;</Button>
                        <Button onClick={nextPage} variant="outline-primary">&gt;&gt;</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </>
    )
}

export default Products