// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const Slider = () => {
    const slides = [
        { id: 1, message: "Welcome to our platform!", image: "hero1.jpg" },
        { id: 2, message: "Explore our amazing packages!", image: "hero2.jpg" },
        { id: 3, message: "Join us and make a difference!", image: "hero3.jpg" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full h-96 overflow-hidden shadow-lg rounded-lg">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img 
                        src={slide.image} 
                        alt={`Slide ${slide.id}`} 
                        className="object-cover w-full h-full rounded-lg filter brightness-75" 
                    />
                    <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
                    {/* Centered text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl md:text-4xl font-semibold text-center shadow-lg">
                            {slide.message}
                        </h2>
                    </div>
                </div>
            ))}
            {/* Navigation Buttons */}
            <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
                onClick={prevSlide}
                aria-label="Previous Slide"
            >
                &#10094; {/* Left arrow */}
            </button>
            <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
                onClick={nextSlide}
                aria-label="Next Slide"
            >
                &#10095; {/* Right arrow */}
            </button>
        </div>
    );
};

export default Slider;
