import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ShineBorder } from '@/Components/magicui/shine-border';
import { useNavigate } from 'react-router-dom';

const GlassyNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: 'home' },
    { label: 'Features', href: 'features' },
    { label: 'Gallery', href: 'gallery' },
    { label: 'Reach Us', href: 'contact' },
    { label: 'Socials', href: 'endpage' },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigate = useNavigate();

  return (
    <div className={`w-screen fixed transform z-50 transition-all duration-500 ${
      isScrolled ? 'scale-85' : 'scale-90'
    }`}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-center">
        <div className="w-[95%] bg-white/80 backdrop-blur-xl border-b border-gray-200 rounded-b-4xl px-8 py-2 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo on extreme left */}
            <div className="flex items-center">
              <img src="https://res.cloudinary.com/dkzeey5iq/image/upload/v1758645150/WhatsApp_Image_2025-09-22_at_08.46.43-removebg-preview_mrdhry.png" alt="Logo" className="h-10 w-auto" />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="hover:cursor-pointer group flex flex-col items-center space-y-1 px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-md"
                >
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Get Started button on extreme right */}
            <div className='relative'>
              <button onClick={() => navigate("/home")} className="bg-green-100 hover:cursor-pointer rounded-full px-6 py-2 text-gray-800 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300 font-medium border border-gray-300">
                <ShineBorder borderWidth={2} duration={8} shineColor={["#4F46E5", "#7C3AED", "#EC4899"]} />
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between w-screen bg-white/80 backdrop-blur-xl border-b border-gray-200 rounded-b-4xl px-8 shadow-lg">
        <div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full py-4"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <div className='flex justify-center items-center gap-2'>
                <Menu className="w-6 h-6 text-gray-700" />
                <span className='text-gray-700'>Menu</span>
              </div>
            )}
          </button>
        </div>
        <div onClick={() => navigate("/home")} className=''>
          <button className="bg-gray-100 backdrop-blur-xl rounded-full px-6 py-2 text-gray-800 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300 font-medium border border-gray-300">
            <ShineBorder borderWidth={2} duration={8} shineColor={["#4F46E5", "#7C3AED", "#EC4899"]} />
            Get Started
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute w-full top-20 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100"
                >
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium">
                    {item.label}
                  </span>
                </button>
              ))}
              <button onClick={() => navigate("/home")} className="bg-gray-100 backdrop-blur-xl border border-gray-300 rounded-full px-6 py-2 text-gray-800 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300 font-medium mt-4">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default GlassyNavbar;