import { useState } from 'react'
import Logo from './Logo'
import Form from './Form'
import ParkingList from './PackingList'
import Stats from './Stats'

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
    const confirm = window.confirm('Are you sure?')
    if (confirm) setItems([])
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

export default App
