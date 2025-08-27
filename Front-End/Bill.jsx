import { useNavigate } from "react-router-dom";

export default function Bill({ order }) {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  // Safely parse items if it's a JSON string
  const itemsArray = Array.isArray(order.items) ? order.items : JSON.parse(order.items || "[]");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-2xl w-full mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-200 font-[Poppins]">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-pink-800 tracking-wide drop-shadow-md">
          🧾 Bill Receipt
        </h1>
        <p className="text-gray-700 text-lg">
          Order ID: <span className="font-bold">{order.orderId}</span>
        </p>
        <p className="text-gray-700 text-lg mb-6">
          Order Date: <span className="font-semibold">{order.orderDate}</span>
        </p>

        <ul className="mb-6 divide-y divide-gray-300">
          {itemsArray.map((item) => (
            <li
              key={item.id}
              className="py-3 flex justify-between text-lg hover:bg-gray-100 px-2 rounded-lg transition"
            >
              <span>
                {item.name} x{item.quantity}
              </span>
              <span className="font-semibold text-green-700">
                ₹{item.price * item.quantity}
              </span>
            </li>
          ))}
        </ul>

        <p className="font-extrabold text-2xl text-right text-orange-900 mb-6">
          Total: ₹{order.total}
        </p>

        <div className="flex justify-between">
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition transform duration-200"
            onClick={() => navigate("/menu")}
          >
            🍴 Go to Menu
          </button>
          <button
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition transform duration-200"
            onClick={handlePrint}
          >
            🖨️ Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}
