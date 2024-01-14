import React from 'react'

const Sort = ({
  setSort,
  sort,
}: {
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
}) => {
  return (
    <div>
      <label htmlFor="sort" className='btn btn-outline btn-secondary'>Sort by title</label>
    <input type="checkbox" hidden id="sort" className="" value={sort} onChange={(e) => 
      sort === "asc" ? setSort("desc") : setSort("asc")} />
    </div>
  )
}

export default Sort