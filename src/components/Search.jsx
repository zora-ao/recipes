import { FaSearch } from "react-icons/fa";

const Search = ({searchRecipe, setSearchRecipe}) => {

    const handleSearch = (e) => {
        e.preventDefault();
        const val = e.target.value;

        setSearchRecipe(val);
    }

    return (
        <form onSubmit={handleSearch} className='bg-gray-200 rounded py-2 flex justify-between items-center gap-x-3 md:px-10 px-4'>
            <FaSearch className="text-xl" />
            <input 
            type="text" 
            value={searchRecipe}
            placeholder='Search for a recipe'
            onChange={handleSearch}
            className='rounded w-full poppins text-[16px] outline-none border-none '
            />

            <button type="submit" className='bg-green-700 poppins text-sm text-white px-3 py-2 rounded'>Search</button>
        </form>
    )
}

export default Search
