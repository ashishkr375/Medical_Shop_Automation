 "use client"
import { useState } from 'react';
import { FaPlus, FaSave, FaBars, FaUserAlt, FaEnvelope, FaPhoneAlt, FaAddressBook } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react'; 

export default function Invoice() {
  const [items, setItems] = useState([]);
  const { data: session } = useSession();
  const [customer, setCustomer] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [billerName, setBillerName] = useState(session?.user?.name || "Ashish");
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Unpaid');
  
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const addItem = () => {
    setItems([
      ...items,
      {
        itemName: '',
        quantity: 1,
        pricePerUnit: 0,
        total: 0,
      },
    ]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === 'quantity' || field === 'pricePerUnit') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].pricePerUnit;
    }

    setItems(updatedItems);
    updateTotal(); // Recalculate totals when items change
  };

  const updateTotal = () => {
    const itemTotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = (itemTotal * discountPercentage) / 100;
    const totalWithDiscount = itemTotal - discount;

    setDiscountAmount(discount);
    setNetAmount(totalWithDiscount);
    setTotalAmount(itemTotal);
  };

  const handleDiscountChange = (e) => {
    const newDiscount = parseFloat(e.target.value);
    setDiscountPercentage(newDiscount);
    
    // Recalculate total only if there's a change in discount
    if (newDiscount !== discountPercentage) {
      updateTotal();
    }
  };

  const handleSaveInvoice = async () => {
    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        billerName,
        customer,
        items,
        discountPercentage,
        totalAmount,
        discountAmount,
        dueDate,
        paymentStatus,
      }),
    });

    const data = await response.json();
    if (data.success) {
      toast.success('Invoice saved successfully!', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: '#4BB543',
          color: 'white',
        },
      });
    } else {
      toast.error('Error saving invoice.', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: '#FF4B4B',
          color: 'white',
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 items-center justify-center p-6 mx-auto bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200">
      <header className="bg-blue-900 max-w-7xl p-4 flex justify-between items-center rounded-lg shadow-md mx-auto">
        <h1 className="text-white text-3xl font-bold"><a href='/dashboard'>Medical Shop Dashboard</a></h1>
        <nav className="flex space-x-4">
          <button onClick={toggleMenu} className="text-white text-2xl md:hidden">
            <FaBars />
          </button>
          <ul className={`${menuOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-6`}>
            <li>
              <button className="text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none transition duration-300 border-2 border-red-200">
                <a href="/Invoices">Invoice Management</a>
              </button>
            </li>
            <li>
              <button className="text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none transition duration-300 border-2 border-red-200">
                Medicine Check
              </button>
            </li>
            <li>
              <button className="text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none transition duration-300 border-2 border-red-200">
                Alternative Medicine Prediction
              </button>
            </li>
            <li>
              <button className="text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none transition duration-300 border-2 border-red-200">
                Stock Management
              </button>
            </li>
            <li>
              <button className="text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none transition duration-300 border-2 border-red-200">
                Staff Management
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-xl mx-auto mt-5">
        <h1 className="text-4xl font-bold text-teal-800 mb-8 text-center">Invoice Generator</h1>
        <div className="mb-6 text-center">
          <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-center space-x-3 transition duration-200 mx-auto">
            <FaBars className="text-white" />
            <span className="font-semibold text-sm"><a href='/Invoices/View'>View Invoice List</a></span>
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Biller Name</label>
          <input
            type="text"
            value={session?.user?.name || billerName} 
            onChange={(e) => setBillerName(e.target.value)}
            placeholder="Enter Biller Name"
            className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={!!session?.user?.name}
          />
        </div>

        {/* Customer Information */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-teal-800 mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <FaUserAlt className="text-teal-500" />
              <input
                required
                type="text"
                placeholder="Customer Name"
                value={customer.customerName}
                onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-teal-500" />
              <input
                type="email"
                placeholder="Customer Email"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-teal-500" />
              <input
                type="text"
                placeholder="Phone Number"
                value={customer.phoneNumber}
                onChange={(e) => setCustomer({ ...customer, phoneNumber: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div className="flex items-center space-x-3">
              <FaAddressBook className="text-teal-500" />
              <input
                type="text"
                placeholder="Address"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Item List */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-teal-800 mb-4">Items</h3>
          
          <div>
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div className="flex items-center space-x-3 col-span-2 ">
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                    placeholder="Item Name"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    min="1"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={item.pricePerUnit}
                    onChange={(e) => handleItemChange(index, 'pricePerUnit', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    min="0"
                  />
                </div>
                <div className="flex col-span-1 items-center justify-center">
                <span className="p-4  rounded-lg">
                ₹ {item.total.toFixed(2)}
                </span>
              </div>
              </div>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-2'>
        <div >
        <button onClick={addItem} className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4">
            <FaPlus className="inline-block" /> Add Item
          </button></div>
        {/* Discount */}
        <div className="mb-6 col-span-1">
          <label className="block text-lg font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            value={discountPercentage}
            onChange={handleDiscountChange}
            placeholder="Enter Discount Percentage"
            className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            min="0"
            max="100"
          />
        </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-teal-800 mb-4">Invoice Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="col-span-2">
              <p className="font-medium text-gray-700">Total Amount:</p>
              <p className="font-semibold text-lg text-teal-700">{`$${totalAmount.toFixed(2)}`}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium text-gray-700">Discount Amount:</p>
              <p className="font-semibold text-lg text-green-500">{`$${discountAmount.toFixed(2)}`}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium text-gray-700">Net Amount:</p>
              <p className="font-semibold text-lg text-teal-700">{`$${netAmount.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
            {/* Due Date Field */}
          <div className='grid grid-cols-2 gap-7'>
        <div className="mb-6 col-span-1">
          <label className="block text-lg font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Payment Status Field */}
        <div className="mb-6 col-span-1">
          <label className="block text-lg font-medium text-gray-700">Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        </div>
        {/* Save Invoice */}
        <div className="mb-6 text-center">
          <button onClick={handleSaveInvoice} className="bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <FaSave className="inline-block" /> Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
