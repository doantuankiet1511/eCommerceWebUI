import { useContext, useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/API"
import { Button, Image, Table } from "react-bootstrap"
import { CartContext } from "../configs/MyContext"

const WishListProduct = () => {
    const [listProducts, setListProducts] = useState([])
    const [ , dispatchCart] = useContext(CartContext)

    useEffect(() => {
        const loadProducts = async () => {
            let res = await authAPI().get(endpoints['wish-list'])
            console.log(res.data)
            setListProducts(res.data)
        }
        loadProducts()
    }, [])

    const addToCart = () => {
        dispatchCart({
            type: "ADD_TO_CART",
            payload: {...listProducts.product, quantity: 1}
        })
    }

    if (listProducts.length === 0)
        return <div className="alert alert-info mt-1">Không có sản phẩm yêu thích nào!</div>

    return (
        <>
            <h1 className="text-center">DANH SÁCH YÊU THÍCH</h1>
            <Table striped bordered hover variant="light" className="mt-4">
                <thead className="text-center">
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts.map((item) => 
                        <>
                            <tr key={item.product.id}>
                                <td className="text-center">
                                    <Image src={item.product.image} alt={item.product.name} width="30%"/>
                                </td>
                                <td>{item.product.name}</td>
                                <td>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price)}</td>
                                <td style={{width: 200}}><Button className="me-1" onClick={() => addToCart()}>Thêm vào giỏ</Button></td>
                            </tr>
                        </>
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default WishListProduct