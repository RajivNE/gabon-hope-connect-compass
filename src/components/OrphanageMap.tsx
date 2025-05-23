
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';

// Données fictives des orphelinats pour démonstration
const orphanageData = [
  {
    id: 1,
    name: "Orphelinat Saint-Vincent de Paul",
    location: { lat: 0.3924, lng: 9.4536 }, // Libreville, Gabon
    address: "Quartier Glass, Libreville",
    children: 42,
    needs: ["Nourriture", "Vêtements", "Fournitures scolaires"]
  },
  {
    id: 2,
    name: "Centre d'accueil Les Enfants d'Abord",
    location: { lat: 0.3854, lng: 9.4580 }, // Proche de Libreville
    address: "Avenue de la Liberté, Libreville",
    children: 28,
    needs: ["Médicaments", "Lits", "Jouets"]
  },
  {
    id: 3,
    name: "Fondation Espoir",
    location: { lat: -0.7153, lng: 10.2283 }, // Port-Gentil, Gabon
    address: "Rue des Palmiers, Port-Gentil",
    children: 35,
    needs: ["Nourriture", "Ordinateurs", "Livres"]
  },
  {
    id: 4,
    name: "Maison d'Espérance",
    location: { lat: -1.6312, lng: 13.5772 }, // Franceville, Gabon
    address: "Boulevard Central, Franceville",
    children: 22,
    needs: ["Vêtements", "Médicaments", "Matériel scolaire"]
  },
  {
    id: 5,
    name: "Centre Saint-Joseph",
    location: { lat: 1.5983, lng: 11.5799 }, // Oyem, Gabon
    address: "Rue des Églises, Oyem",
    children: 30,
    needs: ["Nourriture", "Lits", "Vêtements"]
  }
];

const OrphanageMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedOrphanage, setSelectedOrphanage] = useState<any>(null);
  const [mapInputVisible, setMapInputVisible] = useState(false);
  const [mapApiKey, setMapApiKey] = useState("");
  const [searchDistance, setSearchDistance] = useState(50); // Distance de recherche en km
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [nearbyOrphanages, setNearbyOrphanages] = useState(orphanageData);
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    // Ici, nous simulons le chargement de la carte car elle nécessiterait une clé API de service de cartographie
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMapKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Cette fonction serait utilisée pour configurer l'API de carte avec la clé
    // Pour l'instant, nous continuons avec la fausse carte
    setMapLoaded(true);
    setMapInputVisible(false);
  };

  const handleOrphanageSelect = (orphanage: any) => {
    setSelectedOrphanage(orphanage);
  };

  const getNearbyOrphanages = () => {
    // Simulation de géolocalisation - filtrer les orphelinats par ville ou retourner tous
    if (searchCity) {
      return orphanageData.filter(orphanage => 
        orphanage.address.toLowerCase().includes(searchCity.toLowerCase())
      );
    }
    return orphanageData;
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
          // Dans un cas réel, nous calculerions la distance entre l'utilisateur et chaque orphelinat
          // Pour cette démo, nous simulons simplement la fonctionnalité
          const filtered = orphanageData.filter((_, index) => index < 3); // Simule 3 orphelinats proches
          setNearbyOrphanages(filtered);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          alert("Impossible d'obtenir votre position. Veuillez autoriser l'accès à votre localisation ou rechercher par ville.");
        }
      );
    } else {
      alert("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNearbyOrphanages(getNearbyOrphanages());
  };

  return (
    <div className="w-full">
      {!mapLoaded && (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="animate-pulse text-gabon-green mb-4">Chargement de la carte...</div>
          {mapInputVisible ? (
            <form onSubmit={handleMapKeySubmit} className="w-full max-w-md">
              <div className="flex items-center border-b border-gabon-green py-2">
                <input 
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                  type="text" 
                  placeholder="Entrez votre clé API de carte"
                  value={mapApiKey}
                  onChange={(e) => setMapApiKey(e.target.value)}
                />
                <button className="bg-gabon-green hover:bg-gabon-green/90 text-white font-bold py-1 px-4 rounded" type="submit">
                  Configurer
                </button>
              </div>
            </form>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setMapInputVisible(true)}
              className="text-gabon-green border-gabon-green hover:bg-gabon-green/10"
            >
              Configurer la carte
            </Button>
          )}
        </div>
      )}
      
      {mapLoaded && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-lg font-semibold mb-3">Rechercher des orphelinats</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="flex-grow">
                    <Input
                      type="text"
                      placeholder="Rechercher par ville..."
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="bg-gabon-green hover:bg-gabon-green/90">
                    <Search className="w-4 h-4 mr-1" />
                    Rechercher
                  </Button>
                </form>
              </div>
              <div>
                <Button 
                  onClick={getUserLocation} 
                  variant="outline" 
                  className="w-full md:w-auto border-gabon-green text-gabon-green hover:bg-gabon-green/10"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  À proximité
                </Button>
              </div>
            </div>
            
            {userLocation && (
              <div className="mt-3 flex items-center">
                <Label className="mr-2">Distance:</Label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={searchDistance}
                  onChange={(e) => setSearchDistance(parseInt(e.target.value))}
                  className="flex-grow"
                />
                <span className="ml-2">{searchDistance} km</span>
              </div>
            )}
          </div>

          <div className="relative rounded-lg overflow-hidden bg-gray-100 h-64 md:h-96 border shadow-sm">
            {/* Carte simulée avec un gradient aux couleurs du Gabon */}
            <div className="absolute inset-0 bg-gradient-to-b from-gabon-green/20 via-gabon-yellow/20 to-gabon-blue/20">
              <div className="absolute top-0 left-0 p-4 bg-white rounded-br shadow-sm">
                <h3 className="text-sm font-medium text-gray-700">Carte des Orphelinats au Gabon</h3>
              </div>
              
              {/* Marqueur de position de l'utilisateur si disponible */}
              {userLocation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                  style={{ 
                    top: `${50 + (userLocation.lat * 10)}%`, 
                    left: `${50 + (userLocation.lng - 9) * 20}%`
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white pulse-animation">
                    <span className="sr-only">Votre position</span>
                  </div>
                </div>
              )}
              
              {/* Cercle de recherche autour de l'utilisateur */}
              {userLocation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400 bg-blue-100/20 z-20"
                  style={{ 
                    top: `${50 + (userLocation.lat * 10)}%`, 
                    left: `${50 + (userLocation.lng - 9) * 20}%`,
                    width: `${searchDistance * 1.5}px`,
                    height: `${searchDistance * 1.5}px`,
                  }}
                ></div>
              )}
              
              {nearbyOrphanages.map((orphanage) => (
                <div
                  key={orphanage.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                    selectedOrphanage && selectedOrphanage.id === orphanage.id 
                      ? 'z-20' 
                      : 'z-10'
                  }`}
                  style={{ 
                    top: `${50 + (orphanage.location.lat * 10)}%`, 
                    left: `${50 + (orphanage.location.lng - 9) * 20}%`
                  }}
                  onClick={() => handleOrphanageSelect(orphanage)}
                >
                  <div className={`w-4 h-4 rounded-full shadow-md ${
                    selectedOrphanage && selectedOrphanage.id === orphanage.id 
                      ? 'bg-gabon-yellow border-2 border-white' 
                      : 'bg-gabon-green'
                  }`}>
                    <span className="sr-only">{orphanage.name}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Boîte d'information de l'orphelinat sélectionné */}
            {selectedOrphanage && (
              <div className="absolute bottom-4 left-4 right-4 md:max-w-xs bg-white p-3 rounded shadow-lg animate-fade-in">
                <h3 className="font-semibold text-gray-900">{selectedOrphanage.name}</h3>
                <p className="text-sm text-gray-600">{selectedOrphanage.address}</p>
                <p className="text-xs mt-1 text-gabon-green">{selectedOrphanage.children} enfants</p>
                <div className="mt-2">
                  <Button 
                    size="sm" 
                    className="bg-gabon-green hover:bg-gabon-green/90 text-xs"
                    onClick={() => window.location.href = `/orphanage/${selectedOrphanage.id}`}
                  >
                    Voir détails
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">
              {userLocation 
                ? `Orphelinats à moins de ${searchDistance} km` 
                : searchCity 
                  ? `Orphelinats à ${searchCity}` 
                  : "Tous les orphelinats"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyOrphanages.map((orphanage) => (
                <Card key={orphanage.id} className="orphanage-card">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg">{orphanage.name}</h4>
                    <p className="text-sm text-gray-600">{orphanage.address}</p>
                    <div className="mt-2">
                      <span className="inline-block bg-gabon-green/10 text-gabon-green text-xs px-2 py-1 rounded-full">
                        {orphanage.children} enfants
                      </span>
                    </div>
                    <div className="mt-3 space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gabon-green text-gabon-green hover:bg-gabon-green/10"
                        onClick={() => handleOrphanageSelect(orphanage)}
                      >
                        Voir sur la carte
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gabon-green hover:bg-gabon-green/90"
                        onClick={() => window.location.href = `/orphanage/${orphanage.id}`}
                      >
                        Détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrphanageMap;
