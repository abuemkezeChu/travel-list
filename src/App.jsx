import { useState } from 'react'

function App() {
  const [items, setItems] = useState([])

  const handleNewItem = (item) => {
    setItems((items) => [...items, item])
  }

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  const handleClearList = () => {
    setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onNewItem={handleNewItem} />
      <ParkingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>
}

function Form({ onNewItem }) {
  // state management form
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault()

    if (!description) return

    const newItem = { id: Date.now(), description, quantity, packed: false }

    onNewItem(newItem)

    setDescription('')
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((number) => (
          <option value={number} key={number}>
            {number}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

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

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>🧳 You have no items on your list, add some!</em>
      </footer>
    )

  const numItems = items.length
  const numPackedItems = items.filter((item) => item.packed).length
  const percentage = Math.round((numPackedItems / numItems) * 100)

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You get everything, enjoy your trip! 🛫'
          : `🧳 You have ${numItems} items on your list, and you already packed
        ${numPackedItems} (${percentage + '%'})`}
      </em>
    </footer>
  )
}

export default App
