import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import API, { authAPI, endpoints } from "../configs/API"
import cookie from "react-cookies"
import Loading from "../layouts/Loading"
import { MyUserContext } from "../configs/MyContext"
import { Navigate } from "react-router-dom"
import ErrorAlert from "../layouts/ErrorAlert"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState()
    const [user, dispatch] = useContext(MyUserContext)

    const login = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = await API.post(endpoints['login'], {
                    "username": username,
                    "password": password,
                    "client_id": "dOpYblCChifIEB47b9RvjwZMhHWoNPKYjuy8z3gO",
                    "client_secret": "w1MJRLnuePGEanPq45KzQysE0odalmdS3aEAv5TaO2uDQb6FIHYbimvklQWdfZdKhVyItJvNz1E19RRsvWVCHrDNvHJc4CAYpA5v2tiih6KrT2sImiJTU0QvL5vTIpiI",
                    "grant_type": "password"
                })
    
                cookie.save('access-token', res.data.access_token)
    
                let user = await authAPI().get(endpoints['current-user'])
                cookie.save('current-user', user.data) 
    
                dispatch({
                    "type": "login",
                    "payload": user.data
                })
            } catch (ex) {
                console.error(ex)
                setErr("Username hoặc password không hợp lệ !!!")
            } finally {
                setLoading(false)
            }
        }

        if (username === "" || password === "")
            setErr("Phải nhập username và password")
        else {
            setLoading(true)
            process()
        }
    }

    if (user !== null)
        return <Navigate to="/" />

    return (
        <>
            <h1 className="text-center text-success">ĐĂNG NHẬP NGƯỜI DÙNG</h1>

            {err?<ErrorAlert err={err} />:""}

            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" 
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="Nhập tên đăng nhập" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu" />
                </Form.Group>
                {loading ? <Loading /> : <Button variant="primary" type="submit">Đăng nhập</Button>}

            </Form>
        </>
    )
}

export default Login