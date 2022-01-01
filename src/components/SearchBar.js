import React from 'react'

function SearchBar(props) {

const {btnSearch} = props

    return (
        <div className="searchBarComponent">
            <div >
              <input onChange={btnSearch} type="search"  placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
               
            </div>
        </div>
    )
}

export default SearchBar
