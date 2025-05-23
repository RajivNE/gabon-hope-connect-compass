
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import AlertForm from '@/components/AlertForm';
import DonationCard from '@/components/DonationCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Données fictives des orphelinats
const orphanagesData = [
  {
    id: 1,
    name: "Orphelinat Saint-Vincent de Paul",
    address: "Quartier Glass, Libreville",
    description: "Fondé en 1995, l'orphelinat Saint-Vincent de Paul accueille des enfants de 0 à 18 ans qui ont perdu leurs parents ou qui ont été abandonnés. Notre mission est de leur offrir un environnement familial, une éducation de qualité et un avenir prometteur.",
    phone: "+241 77 00 00 01",
    email: "contact@svp-orphelinat.org",
    website: "www.svp-orphelinat.org",
    director: "Marie Nguema",
    children: 42,
    staff: 12,
    needs: ["Nourriture", "Vêtements", "Fournitures scolaires", "Médicaments"],
    image: "https://images.unsplash.com/photo-1571210862729-78a52d3779a2",
    gallery: [
      {id: 1, image: "https://images.unsplash.com/photo-1577896851231-70ef18881754", caption: "Activités artistiques"},
      {id: 2, image: "https://images.unsplash.com/photo-1511108690759-009324a90311", caption: "Fête de Noël"},
      {id: 3, image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f", caption: "Cours"}
    ],
    stats: {
      enfantsAccueillis: 120,
      enfantsAdoptes: 34,
      benevoles: 25,
      anneesFonctionnement: 28
    }
  },
  {
    id: 2,
    name: "Centre d'accueil Les Enfants d'Abord",
    address: "Avenue de la Liberté, Libreville",
    description: "Le Centre d'accueil Les Enfants d'Abord est une institution qui se consacre à l'accompagnement des orphelins et enfants vulnérables depuis 2005. Nous mettons l'accent sur l'éducation, la santé et l'épanouissement personnel de chaque enfant.",
    phone: "+241 77 00 00 02",
    email: "info@enfantsdabord.org",
    website: "www.enfantsdabord.org",
    director: "Jean-Pierre Moussavou",
    children: 28,
    staff: 8,
    needs: ["Médicaments", "Lits", "Jouets", "Bénévoles pour cours"],
    image: "https://images.unsplash.com/photo-1597135037761-29631a2208c2",
    gallery: [
      {id: 1, image: "https://images.unsplash.com/photo-1612831455359-970e23a1e4e9", caption: "Visite médicale"},
      {id: 2, image: "https://images.unsplash.com/photo-1577896851231-70ef18881754", caption: "Atelier créatif"},
      {id: 3, image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f", caption: "Lecture"}
    ],
    stats: {
      enfantsAccueillis: 87,
      enfantsAdoptes: 19,
      benevoles: 14,
      anneesFonctionnement: 20
    }
  },
  {
    id: 3,
    name: "Fondation Espoir",
    address: "Rue des Palmiers, Port-Gentil",
    description: "La Fondation Espoir, créée en 2010, est dédiée à offrir un avenir meilleur aux orphelins et enfants abandonnés de Port-Gentil. Nous proposons un hébergement, une éducation et une formation professionnelle pour assurer leur autonomie future.",
    phone: "+241 77 00 00 03",
    email: "contact@fondationespoir.org",
    website: "www.fondationespoir.org",
    director: "Pauline Obone",
    children: 35,
    staff: 10,
    needs: ["Nourriture", "Ordinateurs", "Livres", "Vêtements"],
    image: "https://images.unsplash.com/photo-1511108690759-009324a90311",
    gallery: [
      {id: 1, image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f", caption: "Cours d'informatique"},
      {id: 2, image: "https://images.unsplash.com/photo-1571210862729-78a52d3779a2", caption: "Activités sportives"},
      {id: 3, image: "https://images.unsplash.com/photo-1597135037761-29631a2208c2", caption: "Repas"}
    ],
    stats: {
      enfantsAccueillis: 65,
      enfantsAdoptes: 12,
      benevoles: 18,
      anneesFonctionnement: 15
    }
  }
];

const OrphanageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Trouver l'orphelinat correspondant à l'ID
  const orphanage = orphanagesData.find(o => o.id === Number(id)) || orphanagesData[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          className="relative h-64 md:h-80 bg-cover bg-center" 
          style={{ backgroundImage: `url(${orphanage.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <h1 className="text-white text-3xl md:text-4xl font-bold">{orphanage.name}</h1>
              <p className="text-white/80 mt-2">{orphanage.address}</p>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="container mx-auto px-4 py-8 max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-8 overflow-x-auto flex-nowrap">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="children">Enfants</TabsTrigger>
              <TabsTrigger value="gallery">Galerie</TabsTrigger>
              <TabsTrigger value="needs">Besoins</TabsTrigger>
              <TabsTrigger value="help">Aider</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>À propos de {orphanage.name}</CardTitle>
                  <CardDescription>Informations générales sur l'orphelinat</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{orphanage.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Contact</h3>
                      <ul className="space-y-1 text-gray-700">
                        <li><span className="font-medium">Directeur:</span> {orphanage.director}</li>
                        <li><span className="font-medium">Téléphone:</span> {orphanage.phone}</li>
                        <li><span className="font-medium">Email:</span> {orphanage.email}</li>
                        <li><span className="font-medium">Site web:</span> {orphanage.website}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Capacité</h3>
                      <ul className="space-y-1 text-gray-700">
                        <li><span className="font-medium">Nombre d'enfants:</span> {orphanage.children}</li>
                        <li><span className="font-medium">Personnel:</span> {orphanage.staff}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-gabon-green">{orphanage.stats.enfantsAccueillis}</div>
                    <p className="text-sm text-gray-500 mt-1">Enfants accueillis</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-gabon-blue">{orphanage.stats.enfantsAdoptes}</div>
                    <p className="text-sm text-gray-500 mt-1">Enfants adoptés</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-gabon-yellow">{orphanage.stats.benevoles}</div>
                    <p className="text-sm text-gray-500 mt-1">Bénévoles actifs</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-gray-700">{orphanage.stats.anneesFonctionnement}</div>
                    <p className="text-sm text-gray-500 mt-1">Années d'existence</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="children">
              <Card>
                <CardHeader>
                  <CardTitle>Liste des enfants</CardTitle>
                  <CardDescription>
                    Cette section sera accessible uniquement aux responsables de l'orphelinat et aux administrateurs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Pour accéder à cette section, veuillez vous connecter en tant que responsable ou administrateur.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gallery">
              <Card>
                <CardHeader>
                  <CardTitle>Galerie photos</CardTitle>
                  <CardDescription>Découvrez la vie quotidienne à l'orphelinat</CardDescription>
                </CardHeader>
                <CardContent>
                  <Gallery />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="needs">
              <Card>
                <CardHeader>
                  <CardTitle>Besoins actuels</CardTitle>
                  <CardDescription>Liste des besoins matériels et immatériels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Besoins matériels</h3>
                      <ul className="space-y-2">
                        {orphanage.needs.map((need, index) => (
                          <li key={index} className="flex items-center">
                            <Badge className="bg-gabon-green/10 text-gabon-green hover:bg-gabon-green/20 mr-2">
                              Priorité
                            </Badge>
                            {need}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Créer une alerte de besoin</h3>
                      <p className="text-gray-700 text-sm mb-4">
                        Si vous êtes responsable de cet orphelinat, vous pouvez créer une alerte de besoin.
                      </p>
                      <AlertForm orphanageId={orphanage.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="help">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DonationCard 
                  title="Faire un don financier"
                  description="Votre contribution financière aide à subvenir aux besoins quotidiens des enfants."
                  image={orphanage.image}
                  orphanageId={orphanage.id}
                />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Autres façons d'aider</CardTitle>
                    <CardDescription>Découvrez comment vous pouvez contribuer autrement que financièrement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Bénévolat</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Offrez votre temps et vos compétences pour aider les enfants dans différents domaines (éducation, santé, loisirs).
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Dons matériels</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Faites don de biens essentiels comme des vêtements, des fournitures scolaires, des jouets ou des équipements.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Parrainage</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Parrainez un enfant pour l'aider financièrement dans son éducation et son bien-être.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrphanageDetail;
