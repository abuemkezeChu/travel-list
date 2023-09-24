import { useState } from 'react'

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

export default Form
