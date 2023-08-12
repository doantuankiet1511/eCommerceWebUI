import { useContext, useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import { Button, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { MyUserContext } from "../configs/MyContext"

const Header = () => {
    const [categories, setCategories] = useState([])
    const [q, setQ] = useState("")
    const nav = useNavigate()
    const [user, dispatch] = useContext(MyUserContext)

    useEffect(() => {
        const loadCategories = async () => {
            let res = await API.get(endpoints['categories'])
            setCategories(res.data)
        }

        loadCategories()
    }, [])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/?kw=${q}`)
    }

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    let userInfo = (
        <>
            <Link to="/login" className="nav-link text-warning">Đăng nhập</Link>
        </>
    )

    if (user !== null)
        userInfo = (
            <>
                <Link to="/" className="nav-link text-warning">
                    <img src={user.avatar} alt={user.username} width="40" className="rounded-circle" />
                    Chào {user.username}
                </Link>
                <Button className="btn btn-danger" onClick={logout}>Đăng xuất</Button>
            </>
        )

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand><Link to="/" className="nav-link">Fuki-eCommerce</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Trang chủ</Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Action</NavDropdown.Item>
                            {categories.map(category => {
                                let url = `/?cateId=${category.id}`
                                return <Link to={url} className="nav-link" key={category.id}>{category.name}</Link>
                            })}
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                        {userInfo}
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