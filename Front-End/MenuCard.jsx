export default function MenuCard({ item, cart, addToCart, updateQuantity }) {
  const existing = cart.find((ci) => ci.id === item.id);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={`${item.imageUrl}?w=400&h=300&fit=crop`}
        alt={item?.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{item?.name}</h3>
        <p className="text-gray-600 mb-4">₹{item?.price}</p>

        {existing ? (
          <div className="flex items-center justify-between">
            <button
              onClick={() => updateQuantity(item.id, "dec")}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
            <span className="font-bold">{existing.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, "inc")}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(item)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
