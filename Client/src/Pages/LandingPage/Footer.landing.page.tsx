import React from "react";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer id="endpage" className="bg-black text-white px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-12">
        {/* Left Section */}
        <div className="lg:flex-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
            AgroSmart, <br />
            for precision <br />
            farm technology
          </h2>
          <div className="flex space-x-6">
            <button
              onClick={()=>window.location.href = "https://linkedin.com/in/vermarjun"}
              className= "hover:cursor-pointer text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Get in Touch
            </button>
            <button
              onClick={()=>navigate("/privacypolicy")}
              className= "hover:cursor-pointer text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </button>
            <button
              onClick={()=>navigate("/termsconditions")}
              className= "hover:cursor-pointer text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="lg:flex-1 flex flex-col lg:items-end">
          <h3 className="font-semibold mb-4 text-base md:text-lg">Head Office</h3>
          <p className="text-sm text-gray-300 leading-relaxed text-start lg:text-end">
            Chhatisgarh, Koni, Bilaspur <br />
            Guru Ghasidas Vishwavidyalaya 
          </p>

          <div className="flex space-x-3 md:space-x-4 mt-4 flex-wrap">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-400 h-8 w-8 md:h-10 md:w-10"
            >
              <Facebook size={18} className="md:size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-400 h-8 w-8 md:h-10 md:w-10"
            >
              <Instagram size={18} className="md:size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-400 h-8 w-8 md:h-10 md:w-10"
            >
              <Twitter size={18} className="md:size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-400 h-8 w-8 md:h-10 md:w-10"
            >
              <Linkedin size={18} className="md:size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-400 h-8 w-8 md:h-10 md:w-10"
            >
              <Youtube size={18} className="md:size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 text-xs sm:text-sm text-gray-400 text-center lg:text-start">
        © 2025 AgroSmart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;