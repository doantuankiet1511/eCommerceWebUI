import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API, { endpoints } from "../configs/API"

const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const loadCategories = async () => {
            let res = await API.get(endpoints['categories'])
            setCategories(res.data)
        }

        loadCategories()
    }, [])

    return (
        <>
            <div className="filter-card"></div>
            <h5>Danh mục sản phẩm</h5>
            {categories.map(category => {
                let url = `/?cateId=${category.id}`
                return <Link to={url} className="nav-link" key={category.id}>{category.name}</Link>
            })}
        </>
    )
}

export default Categories