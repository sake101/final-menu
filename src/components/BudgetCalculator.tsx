import React from 'react';

interface BudgetCalculatorProps {
  totalCost: number;
  guests: number;
  setGuests: (guests: number) => void;
  budgetPerGuest: number;
  setBudgetPerGuest: (budget: number) => void;
}

export function BudgetCalculator({
  totalCost,
  guests,
  setGuests,
  budgetPerGuest,
  setBudgetPerGuest,
}: BudgetCalculatorProps) {
  const totalBudget = guests * budgetPerGuest;
  const remaining = totalBudget - totalCost;
  const isOverBudget = remaining < 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
            Guests
          </label>
          <input
            type="number"
            id="guests"
            min="1"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
          />
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Budget/Guest
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="budget"
              min="0"
              value={budgetPerGuest}
              onChange={(e) => setBudgetPerGuest(Math.max(0, parseInt(e.target.value) || 0))}
              className="block w-full rounded-md border-gray-300 pl-7 focus:border-blue-500 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Budget:</span>
          <span className="font-medium">${totalBudget}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Current Total:</span>
          <span className="font-medium">${totalCost}</span>
        </div>
        <div className={`flex justify-between text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
          <span>Remaining:</span>
          <span>${remaining}</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {isOverBudget ? (
            <p className="text-red-600">You are ${Math.abs(remaining)} over budget</p>
          ) : remaining === 0 ? (
            <p className="text-blue-600">You have reached your budget exactly</p>
          ) : (
            <p className="text-green-600">You have ${remaining} remaining in your budget</p>
          )}
        </div>
      </div>
    </div>
  );
}