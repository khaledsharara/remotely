import { useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ChecklistItem } from "../utils/types";

interface ChecklistProps {
  items: ChecklistItem[];
  setItems: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
}

const Checklist: React.FC<ChecklistProps> = ({ items, setItems }) => {
  const [newItem, setNewItem] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([
        ...items,
        { id: Date.now(), text: newItem, status: false }, // Generate a unique id
      ]);
      setNewItem("");
      setIsModalOpen(false);
    }
  };

  const toggleStatus = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Checklist header */}
      <div className="flex self-start text-4xl py-4">
        <span>Checklist</span>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
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
                onClick={() => toggleStatus(item.id)}
                className="flex items-center"
              >
                {item.status ? (
                  <CheckCircleOutlined className="text-3xl text-green-500" />
                ) : (
                  <CloseCircleOutlined className="text-3xl text-red-500" />
                )}
              </button>
              {/* Delete button */}
              <button
                onClick={() => deleteItem(item.id)}
                className="ml-4 text-gray-600 hover:text-red-500 transition-opacity duration-300"
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
