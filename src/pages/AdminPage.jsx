import React, { useState, useEffect } from 'react';

// Helper for API calls
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(endpoint, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Main App component
export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sidebar navigation items
  const sidebarItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"></path>
        </svg>
      ),
    },
    {
      key: 'categories',
      label: 'Category',
      icon: (
        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2zM2 10h20"></path>
        </svg>
      ),
    },
    {
      key: 'products',
      label: 'Product',
      icon: (
        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2l6 6"></path>
        </svg>
      ),
    },
    {
      key: 'users',
      label: 'Users',
      icon: (
        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM20 8v6M23 11h-6"></path>
        </svg>
      ),
    },
    {
      key: 'banners',
      label: 'Banner',
      icon: (
        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 7l9 6 9-6"></path>
        </svg>
      ),
    },
    {
      key: 'orders',
      label: 'Order',
      icon: (
        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18"></path>
        </svg>
      ),
    },
  ];

  // Tab content mapping
  const tabContent = {
    dashboard: <DashboardContent />,
    categories: <CategoriesContent onAdd={() => setShowAddModal(true)} />,
    products: <ProductsContent onAdd={() => setShowAddModal(true)} />,
    users: <UsersContent onAdd={() => setShowAddModal(true)} />,
    banners: <BannersContent onAdd={() => setShowAddModal(true)} />,
    orders: <OrdersContent />,
  };

  // Title mapping
  const tabTitles = {
    dashboard: 'Dashboard',
    categories: 'Categories',
    products: 'Products',
    users: 'Users',
    banners: 'Banners',
    orders: 'Orders',
  };

  // Card gradient classes
  const statCardClasses = [
    "stat-card rounded-xl p-6 text-white",
    "stat-card-2 rounded-xl p-6 text-white",
    "stat-card-3 rounded-xl p-6 text-white",
    "stat-card-4 rounded-xl p-6 text-white"
  ];

  // Add styles for gradients and transitions
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .sidebar-transition { transition: width 0.3s ease-in-out; }
      .content-fade { animation: fadeIn 0.3s ease-in-out; }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .stat-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .stat-card-2 {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }
      .stat-card-3 {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }
      .stat-card-4 {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Add Modal Component
  const AddModal = () => {
    const [formData, setFormData] = useState({});
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await fetchAPI(`/api/${activeTab}`, {
          method: 'POST',
          body: JSON.stringify(formData)
        });
        setShowAddModal(false);
        // Refresh data
      } catch (err) {
        console.error('Failed to add:', err);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Add New {tabTitles[activeTab].slice(0, -1)}</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              {/* Add more fields based on activeTab */}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`bg-gray-800 text-white sidebar-transition ${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0`}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            id="sidebarTitle"
            className={`text-xl font-bold transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          >
            Dashboard
          </h1>
          <button
            id="toggleSidebar"
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setIsSidebarOpen((open) => !open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {sidebarItems.map((item) => (
              <a
                href="#"
                key={item.key}
                className={`nav-item flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  activeTab === item.key
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                data-tab={item.key}
                onClick={e => {
                  e.preventDefault();
                  setActiveTab(item.key);
                }}
              >
                {item.icon}
                <span className={`nav-text ${isSidebarOpen ? '' : 'hidden'}`}>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 id="pageTitle" className="text-2xl font-semibold text-gray-800">
              {tabTitles[activeTab] || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 0 0-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0 1 19 0v10z"></path>
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-gray-700 font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div id="contentArea" className="p-6 overflow-y-auto h-full">
          <div className="content-section content-fade">
            {React.cloneElement(tabContent[activeTab], {})}
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && <AddModal />}
      </main>
    </div>
  );
}

// Rest of the components remain unchanged...
