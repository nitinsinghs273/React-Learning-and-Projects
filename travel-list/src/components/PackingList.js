import React, { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onhandleDelete,
  onhandleToggleItem,
  onhandleClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onhandleDelete={onhandleDelete}
            onhandleToggleItem={onhandleToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed status</option>
        </select>
        <button onClick={onhandleClearList}>Clear list</button>
      </div>
    </div>
  );
}
