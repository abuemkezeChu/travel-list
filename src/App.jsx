import { useState } from 'react'

function App() {
  const [items, setItems] = useState([])

  const handleNewItem = item => {
    setItems(items => [...items, item])
  }

  return (
    <div className="app">
      <Logo />
      <Form onNewItem={handleNewItem} />
      <ParkingList items={items} />
      <Stats />
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
  const handleSubmit = event => {
    event.preventDefault()

    if (!description) return

    const newItem = { id: Date.now(), description, quantity, packed: false }
    console.log(newItem)

    onNewItem(newItem)

    setDescription('')
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={event => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map(number => (
          <option value={number} key={number}>
            {number}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

function ParkingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em> 🧳 You have X items on your list, and you already packed x (x% )</em>
    </footer>
  )
}

export default App
