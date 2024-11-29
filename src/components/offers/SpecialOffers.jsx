export default function SpecialOffers() {
  return (
    <section id="offers" className="bg-purple-100 py-16">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">Special Offers</h3>
        <div className="flex justify-center space-x-4">
          <div className="bg-white p-6 rounded shadow-lg">
            <h4 className="font-bold">Weekend Getaway</h4>
            <p>Book a weekend stay and get 30% off.</p>
            <button className="bg-blue-800 text-white px-4 py-2 rounded mt-4">Book Now</button>
          </div>
          <div className="bg-white p-6 rounded shadow-lg">
            <h4 className="font-bold">Stay More, Save More</h4>
            <p>Up to 50% off for stays over 3 nights.</p>
            <button className="bg-blue-800 text-white px-4 py-2 rounded mt-4">Book Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
