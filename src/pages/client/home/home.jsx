import NavBar from "../../../components/navbar/NavBar";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <div className="container mx-auto text-center mt-10">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to the Home Page</h1>
                <p className="text-lg text-gray-700">
                    This is where you'll find all the hotel details and reservations.
                </p>
            </div>
        </div>
    );
}
