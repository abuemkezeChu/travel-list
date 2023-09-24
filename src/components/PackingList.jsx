import { useState } from 'react'
import Item from './Item'
function ParkingList({ items, onDeleteItem, onToggleItems, onClearList }) {
  const [sortBy, setSortBy] = useState('input')
  let sortedItems

  if (sortBy === 'input') {
    sortedItems = items
  } else if (sortBy === 'description') {
    sortedItems = items.slice().sort((a, b) => {
      return a.description.localeCompare(b.description)
    })
  } else if (sortBy === 'packed') {
    sortedItems = items.slice().sort((a, b) => {
      return Number(b.packed) - Number(a.packed)
    })
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            onClearList={onClearList}
            key={item.id}
          />
        ))}
      </ul>
      <div
        className="actions"
        onChange={(event) => setSortBy(event.target.value)}
      >
        <select value={sortBy}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => onClearList()}>Clear list</button>
      </div>
    </div>
  )
}

export default ParkingList
