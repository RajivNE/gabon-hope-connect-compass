
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Données fictives pour les orphelinats
const orphanagesData = [
  {
    id: 1,
    name: "Orphelinat Saint-Vincent de Paul",
    location: "Libreville",
    description: "Fondé en 1995, cet orphelinat accueille des enfants de 0 à 18 ans qui ont perdu leurs parents ou ont été abandonnés.",
    children: 42,
    needs: ["Nourriture", "Vêtements", "Fournitures scolaires"],
    image: "https://images.unsplash.com/photo-1571210862729-78a52d3779a2"
  },
  {
    id: 2,
    name: "Centre d'accueil Les Enfants d'Abord",
    location: "Libreville",
    description: "Institution dédiée à l'accompagnement des orphelins et enfants vulnérables depuis 2005.",
    children: 28,
    needs: ["Médicaments", "Lits", "Jouets"],
    image: "https://images.unsplash.com/photo-1597135037761-29631a2208c2"
  },
  {
    id: 3,
    name: "Fondation Espoir",
    location: "Port-Gentil",
    description: "Créée en 2010, la fondation est dédiée à offrir un avenir meilleur aux orphelins et enfants abandonnés de Port-Gentil.",
    children: 35,
    needs: ["Nourriture", "Ordinateurs", "Livres"],
    image: "https://images.unsplash.com/photo-1511108690759-009324a90311"
  },
  {
    id: 4,
    name: "Maison d'Espérance",
    location: "Franceville",
    description: "Un foyer accueillant pour les enfants sans famille, offrant éducation et soins depuis 2008.",
    children: 22,
    needs: ["Vêtements", "Médicaments", "Matériel scolaire"],
    image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f"
  },
  {
    id: 5,
    name: "Centre Saint-Joseph",
    location: "Oyem",
    description: "Orphelinat situé au nord du Gabon, accueillant des enfants de tous âges depuis 2000.",
    children: 30,
    needs: ["Nourriture", "Lits", "Vêtements"],
    image: "https://images.unsplash.com/photo-1612831455359-970e23a1e4e9"
  }
];

// Données fictives pour les histoires
const storiesData = [
  {
    id: 1,
    title: "De l'orphelinat à l'université",
    orphanage: "Orphelinat Saint-Vincent de Paul",
    orphanageId: 1,
    summary: "L'histoire inspirante de Marie, qui a grandi à l'orphelinat et poursuit maintenant des études supérieures.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754"
  },
  {
    id: 2,
    title: "Reconstruction après le drame",
    orphanage: "Centre d'accueil Les Enfants d'Abord",
    orphanageId: 2,
    summary: "Comment notre centre a aidé des frères et sœurs à surmonter la perte de leurs parents lors d'un accident tragique.",
    image: "https://images.unsplash.com/photo-1511108690759-009324a90311"
  },
  {
    id: 3,
    title: "Un talent musical découvert",
    orphanage: "Fondation Espoir",
    orphanageId: 3,
    summary: "Jean-Pierre a découvert son don pour la musique grâce au programme artistique de notre fondation.",
    image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f"
  }
];

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrer les orphelinats en fonction du terme de recherche
  const filteredOrphanages = orphanagesData.filter(orphanage => 
    orphanage.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    orphanage.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gabon-green py-12 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Catalogue des Orphelinats
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Découvrez les orphelinats au Gabon, leurs histoires, leurs besoins, et comment vous pouvez leur apporter votre soutien.
            </p>
          </div>
        </section>
        
        {/* Search Section */}
        <section className="bg-white py-6 px-4 shadow-sm">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Rechercher par nom ou localité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Button variant="outline" className="md:ml-auto">
                Filtres avancés
              </Button>
            </div>
          </div>
        </section>
        
        {/* Tabs Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <Tabs defaultValue="orphanages">
              <TabsList className="mb-8">
                <TabsTrigger value="orphanages">Orphelinats</TabsTrigger>
                <TabsTrigger value="stories">Histoires</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orphanages" className="space-y-6">
                {filteredOrphanages.length === 0 ? (
                  <div className="text-center py-8">
                    <h3 className="text-xl font-medium text-gray-700">Aucun orphelinat trouvé</h3>
                    <p className="text-gray-500 mt-2">Essayez d'autres termes de recherche</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOrphanages.map((orphanage) => (
                      <Card key={orphanage.id} className="overflow-hidden orphanage-card">
                        <div className="aspect-w-16 aspect-h-9 h-40 relative">
                          <img 
                            src={orphanage.image} 
                            alt={orphanage.name}
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute bottom-0 left-0 bg-black/60 text-white px-2 py-1 text-sm">
                            {orphanage.location}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-1">{orphanage.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{orphanage.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            <Badge>{orphanage.children} enfants</Badge>
                            <Badge variant="outline">{orphanage.needs[0]}</Badge>
                            {orphanage.needs.length > 1 && (
                              <Badge variant="outline">+{orphanage.needs.length - 1}</Badge>
                            )}
                          </div>
                          <Link to={`/orphanage/${orphanage.id}`}>
                            <Button className="w-full bg-gabon-green hover:bg-gabon-green/90">
                              Voir détails
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="stories" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {storiesData.map((story) => (
                    <Card key={story.id} className="overflow-hidden orphanage-card">
                      <div className="aspect-w-16 aspect-h-9 h-40 relative">
                        <img 
                          src={story.image} 
                          alt={story.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{story.title}</h3>
                        <p className="text-xs text-gabon-green mb-2">{story.orphanage}</p>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                          {story.summary}
                        </p>
                        <Link to={`/orphanage/${story.orphanageId}`}>
                          <Button variant="outline" className="w-full border-gabon-green text-gabon-green hover:bg-gabon-green/10">
                            Lire l'histoire complète
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalog;
