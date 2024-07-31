import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-sm-7">
                        <input type="text" className="form-control" placeholder='Enter new category name' value={value} onChange={(e) => setValue(e.target.value)} />
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-warning">Submit</button>
            </form>

        </>
    )
}

export default CategoryForm