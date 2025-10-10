import React from 'react';
import { Support, Receipt, Help } from '@mui/icons-material';

const HelpTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Help & Support</h2>
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Support className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Customer Support</h3>
          </div>
          <p className="text-gray-600 mb-4">Get help with your orders, returns, or any other queries.</p>
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
            Contact Support
          </button>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Receipt className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Order Help</h3>
          </div>
          <p className="text-gray-600 mb-4">Track orders, return items, or get refund information.</p>
          <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
            Order Help
          </button>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Help className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">FAQ</h3>
          </div>
          <p className="text-gray-600 mb-4">Find answers to frequently asked questions.</p>
          <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
            View FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpTab;