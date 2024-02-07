import React from "react";

export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start Adding Your Items in the Cart 🚀</em>
      </footer>
    );
  const totalItem = items.length;
  const packedItem = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItem * 100) / totalItem);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You Packed Everything! Ready To Go✈️"
          : `you hav ${totalItem} items on your list and you already packed ${" "}
        ${packedItem}(${percentage}%)`}
      </em>
    </footer>
  );
}
