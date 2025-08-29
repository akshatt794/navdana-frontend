import React from "react";
import { Truck, Headphones, ShieldCheck, Mail } from "lucide-react";

export default function Footer1() {
  return (
    <footer className="bg-black text-gray-100">
  <div className="max-w-8xl mx-auto px-6 py-8 mt-[8px]">
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
      
      {/* 1. Free Shipping */}
      <div className="flex flex-col items-center">
        <div className="p-3 rounded-lg bg-gray-900 mb-6 text-white">
          <Truck size={32} aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold">Free Shipping</h3>
        <p className="text-sm text-gray-400">
          On all orders over ₹999 — fast & tracked
        </p>
      </div>

      {/* 2. Customer Service */}
      <div className="flex flex-col items-center">
        <div className="p-3 rounded-lg bg-gray-900 mb-3 text-white">
          <Headphones size={32} aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold">Customer Service</h3>
        <p className="text-sm text-gray-400">
          Mon–Fri: 9am–7pm • Live chat & phone
        </p>
      </div>

      {/* 3. Secure Payments */}
      <div className="flex flex-col items-center">
        <div className="p-3 rounded-lg bg-gray-900 mb-3 text-white">
          <ShieldCheck size={32} aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold">Secure Payments</h3>
        <p className="text-sm text-gray-400">
          PCI-compliant payment gateway & encryption
        </p>
      </div>

      {/* 4. Contact Us */}
      <div className="flex flex-col items-center">
        <div className="p-3 rounded-lg bg-gray-900 mb-3 text-white">
          <Mail size={32} aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold">Contact Us</h3>
        <p className="text-sm text-gray-400">
          Email:{" "}
          <a href="mailto:support@example.com" className="underline hover:text-blue-400">
            support@example.com
          </a>
        </p>
        <p className="text-sm text-gray-400">
          Phone:{" "}
          <a href="tel:+911234567890" className="underline hover:text-blue-400">
            +91 12345 67890
          </a>
        </p>
      </div>
    </div>
  </div>
</footer>

  );
}
