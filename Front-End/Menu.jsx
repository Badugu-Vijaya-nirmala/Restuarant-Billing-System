import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import menuData from "../services/menuData.js";
import MenuCard from "./MenuCard.jsx";
import OrderService from "../services/OrderService.js";

export default function Menu({ cart, setCart, setOrder }) {
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState("Appetizers");
  const navigate = useNavigate();

  useEffect(() => {
    setMenu(menuData[category] || []);
  }, [category]);

  const addToCart = (item) => {
    const existing = cart.find((ci) => ci.id === item.id);
    if (existing) {
      setCart(
        cart.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, type) => {
    setCart(
      cart
        .map((ci) =>
          ci.id === id
            ? { ...ci, quantity: type === "inc" ? ci.quantity + 1 : ci.quantity - 1 }
            : ci
        )
        .filter((ci) => ci.quantity > 0)
    );
  };

const completeOrder = async () => {
  if (cart.length === 0) return alert("Cart is empty");

  const orderId = Date.now(); // unique frontend-generated ID
  const orderDate = new Date().toISOString(); // backend-friendly format
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const userId = parseInt(localStorage.getItem("userId")); // save userId after login

  const orderData = {
    orderId,
    orderDate,
    total,
    items: JSON.stringify(cart), // stringify JSON for backend
    userId,
  };

  try {
    // Save order in database
    const savedOrder = await OrderService.createOrder(orderData);
    console.log("Order saved:", savedOrder);

    // Update local state for bill page
    setOrder(orderData);
    setCart([]);

    // Navigate to bill page
    navigate("/bill");
  } catch (err) {
    console.error("Order failed:", err);
    alert("Order failed! Check console for details.");
  }
};


  return (
    <div className="bg-gradient-to-br from-orange-200 via-pink-200 to-yellow-200">
      <h1 className="text-4xl font-extrabold text-red drop-shadow-lg mb-6 text-center">
        🍽️ Explore Our Menu
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT: Menu Items */}
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.keys(menuData).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {menu.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                cart={cart}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-1">
          {cart.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 sticky top-20">
              <h2 className="text-xl font-bold mb-4 text-gray-800">🧾 Order Summary</h2>
              <ul className="mb-4 divide-y">
                {cart.map((ci) => (
                  <li key={ci.id} className="py-2 flex justify-between">
                    {ci.name} x{ci.quantity} <span>₹{ci.price * ci.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bold mb-4 text-gray-900">
                Total: ₹{cart.reduce((sum, ci) => sum + ci.price * ci.quantity, 0)}
              </p>
              <button
                className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
                onClick={completeOrder}
              >
                ✅ Complete Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
