import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!values.keyword) {
            alert("Please enter a search term");
            return;
        }
        try {
            console.log('Keyword=', values.keyword)
            const { data } = await axios.get(`http://localhost:8080/api/v1/products/search/${values.keyword}`)
            setValues({ ...values, result: data })
            navigate('/search')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <form className="d-flex" role="search">
                <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" style={{ width: '20vw' }} value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button className="btn btn-outline-warning" type="button" onClick={handleSearch}>Search</button>
            </form>
        </>
    )
}

export default SearchInput