// eslint-disable-next-line no-unused-vars
import React from 'react';

const Gallery = () => {
    const images = [
        { src: '/dulux1.jpg', alt: 'Luxurious Room' },
        { src: '/dulux2.jpg', alt: 'Infinity Pool with Ocean Views' },
        { src: '/hero1.jpg', alt: 'Exquisite Dining Area' },
        { src: '/hero2.jpg', alt: 'Relaxing Spa' },
        { src: '/luxury1.jpg', alt: 'Modern Gym Facilities' },
        { src: '/luxury2.jpg', alt: 'Scenic Balcony View' },
    ];

    return (
        <div className="bg-gray-100 py-12">
            <h2 className="text-center text-4xl font-bold mb-8 text-gray-800">
                Explore Our Gallery
            </h2>
            <p className="text-center text-lg text-gray-600 mb-10">
                A glimpse into the luxury and elegance we offer.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-16">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden group rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                            <p className="text-white text-lg font-semibold px-4">
                                {image.alt}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
