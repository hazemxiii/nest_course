import { useState } from "react";

export default function SortButton({
  handleClick,
}: {
  handleClick: (type: string) => void;
}) {
  const [open, setOpen] = useState(false);

  function onClick(type: string) {
    handleClick(type);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm active:scale-95 transition"
      >
        <span>↕</span>
        <span>Sort</span>
      </button>

      {open && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-xl p-2 z-50">
          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
            onClick={() => onClick("price:l")}
          >
            Price: Low → High
          </button>

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
            onClick={() => onClick("price:h")}
          >
            Price: High → Low
          </button>

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
            onClick={() => onClick("rate:h")}
          >
            Rate: High → Low
          </button>

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
            onClick={() => onClick("rate:l")}
          >
            Rate: Low → High
          </button>
        </div>
      )}
    </div>
  );
}
