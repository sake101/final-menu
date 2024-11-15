import React from 'react';

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    description?: string;
    pieces?: string;
    variant?: string;
  };
  count: number;
  onAdd: (item: any) => void;
}

export function MenuItem({ item, count, onAdd }: MenuItemProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="font-medium text-gray-900">
          {item.name} {(item.pieces || item.variant) && (
            <span className="text-sm text-gray-500">({item.pieces || item.variant})</span>
          )}
        </h3>
        {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
        <p className="text-sm font-medium text-gray-900 mt-1">${item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        {count > 0 && (
          <span className="text-sm font-medium text-blue-600">
            x{count}
          </span>
        )}
        <button
          onClick={() => onAdd(item)}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}