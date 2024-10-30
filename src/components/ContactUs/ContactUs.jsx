// src/components/ContactUs.js
export default function ContactUs() {
    return (
        <div className="py-12 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
                <p className="text-lg mb-4">We would love to hear from you!</p>
                <form className="mt-8">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="border p-2 mb-4 w-full max-w-xs"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="border p-2 mb-4 w-full max-w-xs"
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        className="border p-2 mb-4 w-full max-w-xs"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
