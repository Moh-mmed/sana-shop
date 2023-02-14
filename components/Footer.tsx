import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiOutlineCreditCard } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="container mx-auto py-10 px-5 flex flex-wrap flex-col sm:flex-row">
        <div className="flex-1 mr-">
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            Sana Shop is an online store that provides high-quality products at
            reasonable prices. We have a wide range of products that are perfect
            for all your needs.
          </p>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Clothing
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Electronics
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Home and Kitchen
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Beauty and Personal Care
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Connect with Us</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-white flex items-center">
                <FaFacebook className="mr-2" />
                Facebook
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white flex items-center">
                <FaTwitter className="mr-2" />
                Twitter
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white flex items-center">
                <FaInstagram className="mr-2" />
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
          <div className="flex items-center">
            <AiOutlineCreditCard className="text-2xl mr-2" />
            <p className="text-sm font-medium">We accept all major credit cards</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-gray-300 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2023 Sana Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
