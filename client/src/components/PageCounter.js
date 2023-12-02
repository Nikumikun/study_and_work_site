import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Pagination } from 'react-bootstrap'

const PageCounter = observer( () => {
  const {task} = useContext(Context)
  const pageCount = Math.ceil(task.totalCount / task.limit)
  const pages = []
  for (let i = 0; i < pageCount; i++){
    pages.push(i + 1)
  }
  return (
    <Pagination>
      {pages.map(page =>
        <Pagination.Item
          key={page}
          active={task.page == page}
          onClick={() => task.setPage(page)}
        >
          {page}
        </Pagination.Item>
      )}
    </Pagination>
  )
});

export default PageCounter