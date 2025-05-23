
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex flex-shrink-0 space-x-2 items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gabon-green via-gabon-yellow to-gabon-blue" />
              <span className="font-display font-bold text-xl text-gabon-green">OorphaGabon</span>
            </div>
          </Link>
          
          {/* Menu bureau */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gabon-green transition-colors font-medium">Accueil</Link>
            <Link to="/catalog" className="text-gray-700 hover:text-gabon-green transition-colors font-medium">Catalogue</Link>
            <Link to="/alerts" className="text-gray-700 hover:text-gabon-green transition-colors font-medium">Alertes</Link>
            <Link to="/donate" className="text-gray-700 hover:text-gabon-green transition-colors font-medium">Faire un don</Link>
            <Button className="bg-gabon-green hover:bg-gabon-green/90 text-white">
              Connexion
            </Button>
          </nav>
          
          {/* Menu mobile */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Menu mobile ouvert */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 bg-white">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gabon-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/catalog" 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gabon-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Catalogue
              </Link>
              <Link 
                to="/alerts" 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gabon-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Alertes
              </Link>
              <Link 
                to="/donate" 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gabon-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Faire un don
              </Link>
              <Button className="bg-gabon-green text-white hover:bg-gabon-green/90 w-full">
                Connexion
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
