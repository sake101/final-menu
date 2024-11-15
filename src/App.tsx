import React, { useState } from 'react';
import { Utensils, Fish, Coffee } from 'lucide-react';
import { TabButton } from './components/TabButton';
import { MenuItem } from './components/MenuItem';
import { BudgetCalculator } from './components/BudgetCalculator';

const menuItems = {
  sashimi: [
    { id: 's1', name: 'Yellowtail', price: 9, description: 'Jalapeno, Cilantro, Ponzu', pieces: '3pc' },
    { id: 's2', name: 'Tuna Tataki', price: 10, description: 'Togarashi, Mint, Wasabi', pieces: '3pc' },
    { id: 's3', name: 'Salmon', price: 9, description: 'Miso, Brown Sugar, Kosho', pieces: '3pc' },
    { id: 's4', name: 'Watermelon', price: 8, description: 'Mint, Basil, Ponzu' }
  ],
  oatsumami: [
    { id: 'o1', name: 'Chicken Gyoza', price: 8, description: 'Roasted Jalapeno Aioli' },
    { id: 'o2', name: 'Vegetable Gyoza', price: 7, description: 'Sesame Dressing, Negi' },
    { id: 'o3', name: 'Edamame Dumplings', price: 7, description: 'Sweet Soy, Fried Shallot' },
    { id: 'o4', name: 'Shrimp Shumai', price: 9, description: 'Yuzu Kosho Aioli, Pickled Cabbage' },
    { id: 'o5', name: 'Chicken Soup Dumplings', price: 10, description: 'Celery, Carrot, Onion, Chicken' }
  ],
  rolls: [
    { id: 'r1', name: 'Spicy Tuna + Avo', price: 10, variant: 'Traditional 6pc' },
    { id: 'r2', name: 'Spicy Salmon', price: 9, variant: 'Traditional 6pc' },
    { id: 'r3', name: 'Red Devil', price: 15, variant: 'Specialty 8pc' },
    { id: 'r4', name: 'Mile High', price: 10, variant: 'Specialty 8pc' }
  ],
  sweets: [
    { id: 'sw1', name: 'Green Tea Mochi', price: 3, variant: '1pc' },
    { id: 'sw2', name: 'Mango Mochi', price: 3, variant: '1pc' },
    { id: 'sw3', name: 'Mochi Set', price: 8, description: 'Choice of 3 flavors', variant: '3pc' }
  ]
};

function App() {
  const [selectedItems, setSelectedItems] = useState<Array<{ id: string; name: string; price: number; timestamp: number }>>([]);
  const [activeTab, setActiveTab] = useState('sashimi');
  const [guests, setGuests] = useState(2);
  const [budgetPerGuest, setBudgetPerGuest] = useState(50);

  const addItem = (item: { id: string; name: string; price: number }) => {
    setSelectedItems([...selectedItems, { ...item, timestamp: Date.now() }]);
  };

  const removeItem = (timestamp: number) => {
    setSelectedItems(selectedItems.filter(item => item.timestamp !== timestamp));
  };

  const groupedSelections = selectedItems.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id);
    if (existing) {
      existing.count++;
      return acc;
    }
    return [...acc, { ...item, count: 1 }];
  }, [] as Array<{ id: string; name: string; price: number; timestamp: number; count: number }>);

  const totalCost = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const getCurrentMenuItems = () => {
    switch (activeTab) {
      case 'sashimi':
        return menuItems.sashimi;
      case 'oatsumami':
        return menuItems.oatsumami;
      case 'rolls':
        return menuItems.rolls;
      case 'sweets':
        return menuItems.sweets;
      default:
        return [];
    }
  };

  const getItemCount = (itemId: string) => {
    return selectedItems.filter(item => item.id === itemId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Omakase Menu</h1>
          
          <div className="flex space-x-4 mb-6 border-b">
            <TabButton
              active={activeTab === 'sashimi'}
              onClick={() => setActiveTab('sashimi')}
              icon={Fish}
            >
              Sashimi
            </TabButton>
            <TabButton
              active={activeTab === 'oatsumami'}
              onClick={() => setActiveTab('oatsumami')}
              icon={Utensils}
            >
              Oatsumami
            </TabButton>
            <TabButton
              active={activeTab === 'rolls'}
              onClick={() => setActiveTab('rolls')}
            >
              Rolls
            </TabButton>
            <TabButton
              active={activeTab === 'sweets'}
              onClick={() => setActiveTab('sweets')}
              icon={Coffee}
            >
              Sweets
            </TabButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid gap-4">
                {getCurrentMenuItems().map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    count={getItemCount(item.id)}
                    onAdd={addItem}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Budget Calculator</h2>
                <BudgetCalculator
                  totalCost={totalCost}
                  guests={guests}
                  setGuests={setGuests}
                  budgetPerGuest={budgetPerGuest}
                  setBudgetPerGuest={setBudgetPerGuest}
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                {groupedSelections.length === 0 ? (
                  <p className="text-gray-500 text-sm">No items selected</p>
                ) : (
                  <div className="space-y-4">
                    {groupedSelections.map((item) => (
                      <div key={item.timestamp} className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {item.name} {item.count > 1 && <span className="text-blue-600">x{item.count}</span>}
                          </h3>
                          <p className="text-sm text-gray-600">${item.price * item.count}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.timestamp)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${totalCost}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Per Person</span>
                        <span>${(totalCost / guests).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;