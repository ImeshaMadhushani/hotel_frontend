// GalleryP.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./GalleryP.css";
import Footer from "../footer/footer";
//import NavBar from "../navbar/NavBar";

const GalleryP = () => {
  const images = [
    "dulux1.jpg",
    "dulux2.jpg",
    "hero1.jpg",
    "hero2.jpg",
    "hero3.jpg",
    "home-bg.jpg",
    "login-bg.jpg",
    "luxury1.jpg",
    "luxury2.jpg",
    "stand1.jpg",
    "stand2.jpg",
  ];

  const [index, setIndex] = useState(0);

  const animation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    reset: true,
  });

    return (
        <>
           {/*  <NavBar/> */}
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Explore our hotel images</p>
      </div>
      <div className="gallery">
        <animated.div style={animation} className="gallery-item">
          <img
            src={`/${images[index]}`}  // Correct path for images in the public folder
            alt={`gallery-image-${index}`}
            className="gallery-img"
          />
        </animated.div>
      </div>
      <div className="gallery-controls">
        <button
          onClick={() =>
            setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
          }
        >
          Prev
        </button>
        <button
          onClick={() =>
            setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
          }
        >
          Next
        </button>
      </div>
            </div>
            <Footer/>
        </>
  );
};

export default GalleryP;
