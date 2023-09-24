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

export default Stats
