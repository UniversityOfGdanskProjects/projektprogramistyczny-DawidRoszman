import React from 'react'

const Pagination = (
  {
    page,
    setPage,
    limit,
    setLimit,
    screeningsNum
  }: {
    page: number,
    setPage: (page: number) => void,
    limit: number,
    setLimit: (limit: number) => void,
    screeningsNum: number
  }
) => {
  return (
    <div className='grid place-items-center p-10'>
      <div className='flex gap-3'>

      <div className="join">
        {
          Array.from(Array(Math.ceil(screeningsNum / limit)).keys()).map((item, index) => {
            return (
              <button
                key={index}
                className={`join-item btn ${page === index + 1 ? "btn-active" : ""}`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            )
          }
          )
        }
      </div>
      <div>
        <label htmlFor="select">Items on page: </label>
        <select
          className="select select-bordered"
          onChange={(e) => setLimit(parseInt(e.target.value))}
          value={limit}
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </div>
      </div>
    </div>
  )
}

export default Pagination