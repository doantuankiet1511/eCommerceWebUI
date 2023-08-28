import { useContext, useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import { Badge, Button, Container, Dropdown, Form, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { CartContext, MyUserContext } from "../configs/MyContext"
import { LiaShoppingCartSolid } from "react-icons/lia"

const Header = () => {
    const [q, setQ] = useState("")
    const nav = useNavigate()
    const [user, dispatch] = useContext(MyUserContext)
    const [stateCart, ] = useContext(CartContext)

    const search = (evt) => {
        evt.preventDefault()
        nav(`/?kw=${q}`)
    }

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    const quantity = stateCart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity
    }, 0)

    let listYourShop = `/users/shops`
    let profileUser = `/users/current-user`
    let listUserRegister = `/users/confirm-register`

    let userInfo = (
        <>
            <Link to="/login" className="nav-link text-warning">Đăng nhập</Link>
            <Link to="/register" className="nav-link text-danger">Đăng ký</Link>
        </>
    )

    if (user !== null)
        userInfo = (
            <>
                <Dropdown>
                    <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                        <img src={user.avatar} alt={user.username} width="30" className="rounded-circle" />
                        Chào {user.username}
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="secondary">
                        <Dropdown.Item> <Link className="nav nav-link" to={profileUser}> Thông tin cá nhân </Link> </Dropdown.Item>
                        <Dropdown.Item> <Link className="nav nav-link" to={profileUser}> Đổi mật khẩu </Link> </Dropdown.Item>
                        {user.role === "Seller" || user.role === "Employee" ?
                            <Dropdown.Item> <Link className="nav nav-link" to={listYourShop}> Cửa hàng của bạn </Link></Dropdown.Item> : null}
                        {user.role === "Employee" ? 
                            <Dropdown.Item> <Link className="nav nav-link" to={listUserRegister}> Danh sách đăng ký </Link></Dropdown.Item> : null}
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <Button className="btn btn-danger" onClick={logout}>Đăng xuất</Button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        )

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand><Link to="/" className="nav-link">Fuki-eCommerce</Link></Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            {userInfo}
                        </Nav>
                        <Nav>
                            <Link to="/wish-list" className="nav-link d-flex">
                                <div>Danh sách yêu thích</div> 
                            </Link>
                        </Nav>
                        <Nav>
                            <Link to="/cart" className="nav-link d-flex">
                                <div className="mt-1">Giỏ hàng</div> 
                                <LiaShoppingCartSolid size="2em"/>
                                <sup><Badge bg="danger">{quantity?quantity:""}</Badge></sup>
                            </Link>
                        </Nav>
                        <Form onSubmit={search} className="d-flex">
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={q}
                            onChange={e => setQ(e.target.value)}
                            />
                            <Button type="submit" variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    )
}

export default Header