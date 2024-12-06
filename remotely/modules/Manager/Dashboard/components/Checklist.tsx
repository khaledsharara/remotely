import { useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

type ChecklistItem = {
  text: string;
  status: boolean; // true for checked, false for crossed
};

const Checklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { text: "Activity 1", status: true },
    { text: "Activity 2", status: false },
  ]);
  const [newItem, setNewItem] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { text: newItem, status: false }]);
      setNewItem("");
      setIsModalOpen(false);
    }
  };

  const toggleStatus = (index: number) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, status: !item.status } : item
      )
    );
  };

  const deleteItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="flex flex-col w-[850px]">
      {/* Checklist header */}
      <div className="flex self-start text-4xl py-4">
        <span>Checklist</span>
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-row py-5 px-4 items-center justify-between border-b-[1px] border-black"
        >
          <div className="text-2xl">
            <span>{item.text}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Icon container */}
            <div className="flex items-center group relative">
              {/* Toggle status button */}
              <button
                onClick={() => toggleStatus(index)}
                className="flex items-center"
              >
                {item.status ? (
                  <CheckCircleOutlined className="text-3xl text-green-500" />
                ) : (
                  <CloseCircleOutlined className="text-3xl text-red-500" />
                )}
              </button>
              {/* Delete button (inside the same container, appears on hover) */}
              <button
                onClick={() => deleteItem(index)}
                className="ml-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <DeleteOutlined className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Add Item button */}
      <div className="flex mt-9 self-end">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
        >
          <PlusOutlined className="mr-2" />
          Add Item
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter item"
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-red-500 hover:text-red-700 mr-4"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addItem}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;
