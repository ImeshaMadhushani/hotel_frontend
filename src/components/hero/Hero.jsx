export default function Hero() {
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url('your-hero-image.jpg')` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <h2 className="text-4xl font-bold">Book Your Room Today</h2>
          <p className="text-lg">Find and book your perfect stay</p>
          <div className="bg-white text-black p-6 rounded shadow-lg flex space-x-4">
            <input type="date" className="border p-2 rounded" />
            <input type="date" className="border p-2 rounded" />
            <select className="border p-2 rounded">
              <option>Select Category</option>
              <option>Deluxe</option>
              <option>Suite</option>
            </select>
            <button className="bg-purple-800 text-white px-4 py-2 rounded">Book Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

