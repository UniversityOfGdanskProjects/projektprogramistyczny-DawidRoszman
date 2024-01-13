"use client"
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
      <select
        className="select select-bordered select-accent"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      
    </div>
  )
}

export default Sort