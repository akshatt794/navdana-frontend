import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import API from '../api'; // Make sure this is the correct path to your API instance

// Category API (create)
// const createCategory = (data) => API.post("/api/v1/category", data);
// Product APIs
// const getProduct = () => API.get("/api/v1/product");

// Helper for API calls (for endpoints not covered by above, fallback)
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(endpoint, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Generic Modal component
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

// Main Dashboard Page
export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

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
      key: 'order',
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
    categories: <CategoriesContent />,
    products: <ProductsContent />,
    users: <UsersContent />,
    banners: <BannersContent />,
    orders: <OrdersContent />,
  };

  // Title mapping
  const tabTitles = {
    dashboard: 'Dashboard',
    categories: 'Category',
    products: 'Product',
    users: 'Users',
    banners: 'Banners',
    orders: 'Orders',
  };

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
                  console.log(activeTab)
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
              {console.log(tabTitles[activeTab])}
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
            {tabContent[activeTab]}
          </div>
        </div>
      </main>
    </div>
  );
}

// Category Add/Edit Modal (image upload, not URL)
function CategoryModal({ open, onClose, onSave, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [isActive, setIsActive] = useState(
    typeof initialData?.isActive === "boolean" ? initialData.isActive : true
  );
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    setName(initialData?.name || "");
    setSlug(initialData?.slug || "");
    setDescription(initialData?.description || "");
    setIsActive(typeof initialData?.isActive === "boolean" ? initialData.isActive : true);
    setImageFile(null);
    setImagePreview(initialData?.image || "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [initialData, open]);

  // Slugify helper
  function slugify(str) {
    return str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-');
  }

  // Auto-generate slug from name if not editing slug directly
  useEffect(() => {
    if (!initialData || !initialData.slug) {
      setSlug(slugify(name));
    }
    // eslint-disable-next-line
  }, [name]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(initialData?.image || "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload;
      if (imageFile) {
        // Use FormData for file upload
        payload = new FormData();
        payload.append("name", name);
        payload.append("slug", slug || slugify(name));
        payload.append("description", description);
        payload.append("isActive", isActive);
        payload.append("image", imageFile);
      } else {
        // No image file, send JSON
        payload = {
          name,
          slug: slug || slugify(name),
          description,
          isActive,
        };
      }

      if (initialData && initialData._id) {
        // Edit
        if (imageFile) {
          await axios.put(`${import.meta.env.VITE_LOCAL_URL}/categories/${initialData._id}`, payload, {
            headers: { ...(imageFile ? {} : { 'Content-Type': 'application/json' }) }
          });
        } else {
          await axios.put(`${import.meta.env.VITE_LOCAL_URL}/categories/${initialData._id}`, payload, {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } else {
        // Add
        if (imageFile) {
          await axios.post(`${import.meta.env.VITE_LOCAL_URL}/categories`,payload);
        } else {
          await axios.post(`${import.meta.env.VITE_LOCAL_URL}/categories`,payload);
        }
      }
      onSave();
      onClose();
    } catch (err) {
      alert("Error saving category: " + (err?.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit Category" : "Add Category"}>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            required
            disabled={loading}
            placeholder="category-slug"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={loading}
            placeholder="Category description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border rounded px-3 py-2"
            onChange={handleImageChange}
            disabled={loading}
            ref={fileInputRef}
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-20 w-20 object-cover rounded border"
              />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={e => setIsActive(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="isActive" className="text-sm font-medium">Active</label>
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={onClose} disabled={loading}>Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Product Add/Edit Modal (UPDATED for schema)
function ProductModal({ open, onClose, onSave, initialData, categories }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [stock, setStock] = useState(initialData?.stock || "");
  const [category, setCategory] = useState(initialData?.category?._id || initialData?.category || "");
  const [color, setColor] = useState(initialData?.color || "");
  const [size, setSize] = useState(initialData?.size || "");
  const [isActive, setIsActive] = useState(
    typeof initialData?.isActive === "boolean" ? initialData.isActive : true
  );
  // Images: array of {url, alt}
  const [images, setImages] = useState(initialData?.images || []);
  const [imageFiles, setImageFiles] = useState([]); // for new uploads
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    // console.log(initialData?.images);
    setName(initialData?.name || "");
    setDescription(initialData?.description || "");
    setPrice(initialData?.price || "");
    setStock(initialData?.stock || "");
    setCategory(initialData?.category?._id || initialData?.category || "");
    setColor(initialData?.color || "");
    setSize(initialData?.size || "");
    setIsActive(typeof initialData?.isActive === "boolean" ? initialData.isActive : true);
    setImages(initialData?.images || []);
    setImageFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [initialData, open]);

  // Handle new image file(s) selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    // console.log(files);
    // For preview, create URLs
    const previews = files.map(file => ({
      url: URL.createObjectURL(file),
      alt: file.name
    }));
    setImages(prev => [ 
      // Keep existing images if editing, else just previews
      ...(initialData?.images && initialData.images.length > 0 ? initialData.images : []),
      ...previews
    ]);
  };

  // Remove image (either from existing or new)
  const handleRemoveImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
    // If removing a new file, also remove from imageFiles
    if (idx >= (initialData?.images?.length || 0)) {
      setImageFiles(files => files.filter((_, i) => i !== (idx - (initialData?.images?.length || 0))));
    }
  };

  const handleImageAltChange = (idx, alt) => {
    setImages(prev =>
      prev.map((img, i) => (i === idx ? { ...img, alt } : img))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload;
      if (imageFiles.length > 0) {
        payload = new FormData();
        payload.append("name", name);
        payload.append("description", description);
        payload.append("price", price);
        payload.append("stock", stock);
        payload.append("category", category);
        payload.append("color", color);
        payload.append("size", size);
        payload.append("isActive", isActive);

        // Existing images (not removed)
        const existingImages = images
          .filter((img, idx) => idx < (initialData?.images?.length || 0));
        payload.append("existingImages", JSON.stringify(existingImages));

        // New images
        imageFiles.forEach((file, idx) => {
          payload.append("images", file);
          // alt text for new images
          payload.append(`imagesAlt_${idx}`, images[(initialData?.images?.length || 0) + idx]?.alt || "");
        });
      } else {
        // No new image files, just send JSON
        payload = {
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          category,
          color,
          size,
          isActive,
          images: images.map(img => ({
            url: img.url,
            alt: img.alt || ""
          }))
        };
      }

      if (initialData && initialData._id) {
        // Edit
        if (imageFiles.length > 0) {
          await API.put(`/api/v1/product/${initialData._id}`, payload, {
            headers: { }
          });
        } else {
          await API.put(`/api/v1/product/${initialData._id}`, payload, {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } else {
        // Add
        if (imageFiles.length > 0) {
          await axios.post(`${import.meta.env.VITE_LOCAL_URL}/products`, payload);
        } else {
          await axios.post(`${import.meta.env.VITE_LOCAL_URL}/products`, payload, {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      onSave();
      onClose();

    } catch (err) {
      alert("Error saving product: " + (err?.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit Product" : "Add Product"}>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[85vh] overflow-y-auto" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            min="0"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={stock}
            onChange={e => setStock(e.target.value)}
            required
            min="0"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Select Category</option>
            {categories && categories.map(cat => (
              <option key={cat._id || cat.id} value={cat._id || cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={color}
            onChange={e => setColor(e.target.value)}
            required
            disabled={loading}
            placeholder="e.g. Red, Blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={size}
            onChange={e => setSize(e.target.value)}
            required
            disabled={loading}
            placeholder="e.g. M, L, XL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Images (upto 5)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="w-full border rounded px-3 py-2"
            onChange={handleImageChange}
            disabled={loading}
            ref={fileInputRef}
          />
          <div className="flex flex-wrap gap-3 mt-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img.url}
                  alt={img.alt || ""}
                  className="h-16 w-16 object-cover rounded border"
                />
                {/* <button
                  type="button"
                  className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
                  onClick={() => handleRemoveImage(idx)}
                  disabled={loading}
                  title="Remove"
                >
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button> */}
                <input
                  className="mt-1 w-full border rounded px-1 py-0.5 text-xs"
                  placeholder="Alt text"
                  value={img.alt || ""}
                  onChange={e => handleImageAltChange(idx, e.target.value)}
                  disabled={loading}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={e => setIsActive(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="isActive" className="text-sm font-medium">Active</label>
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={onClose} disabled={loading}>Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Dashboard Content (unchanged)
function DashboardContent() {
  const [stats, setStats] = useState([
    { label: 'Total Users', value: '-', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    ) },
    { label: 'Total Orders', value: '-', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h8a1 1 0 001-1v-6"></path>
      </svg>
    ) },
    { label: 'Total Products', value: '-', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
      </svg>
    ) },
    { label: 'Revenue', value: '-', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    ) },
  ]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    Promise.all([
      fetchAPI('/api/dashboard/stats'),
      fetchAPI('/api/orders?limit=2'),
      fetchAPI('/api/products/top?limit=2')
    ])
      .then(([statsData, ordersData, topProductsData]) => {
        if (ignore) return;
        setStats([
          { ...stats[0], value: statsData.totalUsers ?? '-' },
          { ...stats[1], value: statsData.totalOrders ?? '-' },
          { ...stats[2], value: statsData.totalProducts ?? '-' },
          { ...stats[3], value: statsData.revenue ? `₹${statsData.revenue}` : '-' },
        ]);
        setRecentOrders(ordersData || []);
        setTopProducts(topProductsData || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => { ignore = true; };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={stat.label} className={["stat-card", "stat-card-2", "stat-card-3", "stat-card-4"][idx] + " rounded-xl p-6 text-white"}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-4">
              {recentOrders.length === 0 && <div className="text-gray-500">No recent orders.</div>}
              {recentOrders.map(order => (
                <div key={order._id || order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">#{order.orderNumber || order._id?.slice(-3) || "N/A"}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{order.customerName || order.user?.name || "Unknown"}</p>
                      <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-semibold">{order.total ? `₹${order.total}` : '-'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-4">
              {topProducts.length === 0 && <div className="text-gray-500">No top products.</div>}
              {topProducts.map(product => (
                <div key={product._id || product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600">{product.emoji || "📦"}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category?.name || product.category || "Category"}</p>
                    </div>
                  </div>
                  <span className="text-gray-600">{product.sold || 0} sold</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Category Section with Add/Edit/Delete working popup
function CategoriesContent() {
  console.log("qwerqrw");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = () => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_LOCAL_URL}/categories`)
      .then(res => {
        console.log(res);
        setCategories(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditCategory(null);
    setShowModal(true);
  };

  const handleEdit = (cat) => {
    setEditCategory(cat);
    setShowModal(true);
  };

  const handleDelete = async (cat) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_LOCAL_URL}/categories/${cat._id || cat.id}`);
        fetchCategories();
      } catch (err) {
        alert("Error deleting category: " + (err?.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Categories Management</h3>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={handleAdd}
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="p-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.length === 0 && <div className="text-gray-500">No categories found.</div>}
            {categories.map((cat, idx) => (
              <div key={cat._id || cat.id || idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {/* Show image if available, else fallback to emoji or 📦 */}
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <span className="text-2xl">{cat.emoji || "📦"}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{cat.name}</h4>
                    <p className="text-xs text-gray-500 break-all">/{cat.slug}</p>
                    <p className="text-sm text-gray-500">{cat.description || ""}</p>
                    <p className="text-xs text-gray-400">{cat.isActive === false ? "Inactive" : "Active"}</p>
                    <p className="text-xs text-gray-400">{cat.productCount || 0} products</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm" onClick={() => handleEdit(cat)}>Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm" onClick={() => handleDelete(cat)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <CategoryModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={fetchCategories}
        initialData={editCategory}
      />
    </div>
  );
}

// Product Section with Add/Edit/Delete working popup (UPDATED for schema)
function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    await axios(`${import.meta.env.VITE_LOCAL_URL}/products`)
      .then(res => {
        setProducts(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchCategories = async () => {
    await axios.get(`${import.meta.env.VITE_LOCAL_URL}/categories`)
      .then(res => setCategories(res.data.data || []))
      .catch(() => {});
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditProduct(null);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_LOCAL_URL}/products/${product._id || product.id}`);
        fetchProducts();
      } catch (err) {
        alert("Error deleting product: " + (err?.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Products Management</h3>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={handleAdd}
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500">No products found.</td>
                </tr>
              )}
              {products.map(product => (
                <tr key={product._id || product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex items-center justify-center overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.images[0].alt || product.name} className="w-10 h-10 object-cover" />
                        ) : (
                          <span className="text-gray-400 text-xl">📦</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description || ""}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category?.name || product.category || ""}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.color || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.size || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price ? `₹${product.price}` : "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock ?? "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.isActive ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-wrap gap-1">
                      {product.images && product.images.length > 0
                        ? product.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={img.alt || ""}
                              className="w-8 h-8 object-cover rounded border"
                            />
                          ))
                        : <span className="text-gray-400">-</span>
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(product)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ProductModal
        open={showModal}
        onClose={() => {setShowModal(false), document.body.style.overflow = "auto"}}
        onSave={fetchProducts}
        initialData={editProduct}
        categories={categories}
      />
    </div>
  );
}

// User Section with Add/Edit/Delete working popup (UPDATED for schema)
function UserModal({ open, onClose, onSave, initialData }) {
  // Schema fields:
  // username, firstName, lastName, password, DOB, role, email, phoneNumber
  // orders: not editable here
  const [username, setUsername] = useState(initialData?.username || "");
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState(initialData?.DOB ? new Date(initialData.DOB).toISOString().slice(0, 10) : "");
  const [role, setRole] = useState(initialData?.role || "customer");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsername(initialData?.username || "");
    setFirstName(initialData?.firstName || "");
    setLastName(initialData?.lastName || "");
    setPassword("");
    setDOB(initialData?.DOB ? new Date(initialData.DOB).toISOString().slice(0, 10) : "");
    setRole(initialData?.role || "customer");
    setEmail(initialData?.email || "");
    setPhoneNumber(initialData?.phoneNumber || "");
  }, [initialData, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload = {
        username,
        firstName,
        lastName,
        DOB,
        role,
        email,
        phoneNumber,
      };
      if (!initialData || !initialData._id) {
        // Only require password on create
        payload.password = password;
      } else if (password) {
        // If editing and password is set, update it
        payload.password = password;
      }
      if (initialData && initialData._id) {
        await API.put(`/api/v1/user/${initialData._id}`, payload, {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        await API.post("/api/v1/user", payload, {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      onSave();
      onClose();
    } catch (err) {
      alert("Error saving user: " + (err?.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit User" : "Add User"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            disabled={loading || !!initialData}
            autoComplete="username"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              disabled={loading}
              autoComplete="given-name"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
              disabled={loading}
              autoComplete="family-name"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading || !!initialData}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full border rounded px-3 py-2"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
            required
            disabled={loading}
            pattern="\d{10}"
            maxLength={10}
            placeholder="10 digit number"
            autoComplete="tel"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={DOB}
            onChange={e => setDOB(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
            disabled={loading}
          >
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            {initialData ? "Password (leave blank to keep unchanged)" : "Password"}
          </label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required={!initialData}
            disabled={loading}
            autoComplete={initialData ? "new-password" : "new-password"}
            placeholder={initialData ? "••••••••" : ""}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={onClose} disabled={loading}>Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function UsersContent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    API.get('/api/v1/user')
      .then(res => {
        setUsers(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setEditUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleDelete = async (user) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/api/v1/user/${user._id || user.id}`);
        fetchUsers();
      } catch (err) {
        alert("Error deleting user: " + (err?.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Users Management</h3>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={handleAdd}
          >
            Add User
          </button>
        </div>
      </div>
      <div className="p-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length === 0 && <div className="text-gray-500">No users found.</div>}
            {users.map((user, idx) => (
              <div key={user._id || user.id || idx} className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${idx % 2 === 0 ? "bg-blue-100" : "bg-purple-100"} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <span className={`${idx % 2 === 0 ? "text-blue-600" : "text-purple-600"} text-xl font-bold`}>
                    {user.firstName && user.lastName
                      ? (user.firstName[0] + user.lastName[0]).toUpperCase()
                      : user.username
                        ? user.username[0].toUpperCase()
                        : "U"}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  {user.firstName} {user.lastName}
                </h4>
                <p className="text-sm text-gray-500 mb-1">{user.username}</p>
                <p className="text-sm text-gray-500 mb-1">{user.email}</p>
                <p className="text-xs text-gray-400 mb-1">Role: {user.role}</p>
                <p className="text-xs text-gray-400 mb-1">Phone: {user.phoneNumber}</p>
                <p className="text-xs text-gray-400 mb-1">
                  DOB: {user.DOB ? new Date(user.DOB).toLocaleDateString() : "-"}
                </p>
                <p className="text-xs text-gray-400 mb-2">
                  Orders: {user.orders ? user.orders.length : 0}
                </p>
                <div className="flex justify-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm" onClick={() => handleDelete(user)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <UserModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={fetchUsers}
        initialData={editUser}
      />
    </div>
  );
}

// Banner Section with Add/Edit/Delete placeholders (unchanged)
function BannersContent() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchAPI('/api/banners')
      .then(data => {
        if (!ignore) setBanners(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => { ignore = true; };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Banner Management</h3>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() => alert('Add Banner placeholder (form/modal)')}
          >
            Add Banner
          </button>
        </div>
      </div>
      <div className="p-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-6">
            {banners.length === 0 && <div className="text-gray-500">No banners found.</div>}
            {banners.map((banner, idx) => (
              <div key={banner._id || banner.id || idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">{banner.title || "Banner"}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{banner.title || "Banner"}</h4>
                      <p className="text-sm text-gray-500">{banner.status || "Active"} {banner.expiry ? `until ${banner.expiry}` : ""}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm" onClick={() => alert('Edit Banner placeholder (form/modal)')}>Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm" onClick={() => window.confirm('Are you sure you want to delete this item?') && alert('Delete Banner placeholder')}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Orders section (no add, only view/edit) (unchanged)
function OrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchAPI('/api/orders')
      .then(data => {
        if (!ignore) setOrders(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => { ignore = true; };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Orders Management</h3>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No orders found.</td>
                </tr>
              )}
              {orders.map(order => (
                <tr key={order._id || order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.orderNumber || order._id?.slice(-3) || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName || order.user?.name || "Unknown"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date ? new Date(order.date).toLocaleDateString() : "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total ? `₹${order.total}` : "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === "Completed" ? "bg-green-100 text-green-800" :
                      order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>{order.status || "Unknown"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => alert('View details placeholder')}>View</button>
                    <button className="text-gray-600 hover:text-gray-900" onClick={() => alert('Edit Order placeholder (form/modal)')}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}