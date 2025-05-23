
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
import { Input } from '@/components/ui/input';
import { Search, School, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    },
    currentChildren: [
      {
        id: 1,
        firstName: "Sophia",
        lastName: "Moussavou",
        birthDate: "12/05/2015",
        birthPlace: "Libreville",
        photo: "https://images.unsplash.com/photo-1517830378853-434978dc6b86?q=80&w=136&auto=format&fit=crop",
        level: "CE2",
        message: "J'adore dessiner et je veux devenir artiste."
      },
      {
        id: 2,
        firstName: "Thomas",
        lastName: "Ndong",
        birthDate: "23/08/2012",
        birthPlace: "Port-Gentil",
        photo: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=136&auto=format&fit=crop",
        level: "6ème",
        message: "Le foot est ma passion. Je joue tous les jours avec mes amis."
      },
      {
        id: 3,
        firstName: "Marie",
        lastName: "Obiang",
        birthDate: "04/11/2018",
        birthPlace: "Inconnue",
        photo: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=136&auto=format&fit=crop",
        level: "Maternelle",
        message: "Marie est une petite fille joyeuse qui aime chanter et danser. Elle s'adapte très bien à la vie en communauté."
      },
      {
        id: 4,
        firstName: "Paul",
        lastName: "Koumba",
        birthDate: "15/06/2014",
        birthPlace: "Oyem",
        photo: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=136&auto=format&fit=crop",
        level: "CM1",
        message: "J'aime les mathématiques et je veux devenir ingénieur."
      }
    ],
    formerChildren: [
      {
        id: 101,
        firstName: "Jean",
        lastName: "Moubeyi",
        birthDate: "05/03/2002",
        photo: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=136&auto=format&fit=crop",
        departure: "2020",
        reason: "Majorité",
        update: "Étudiant en informatique à l'université de Libreville."
      },
      {
        id: 102,
        firstName: "Émilie",
        lastName: "Nzengue",
        birthDate: "18/07/2008",
        photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=136&auto=format&fit=crop",
        departure: "2022",
        reason: "Adoption",
        update: "Vit maintenant avec sa nouvelle famille en France."
      }
    ]
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
    },
    currentChildren: [
      {
        id: 5,
        firstName: "Éric",
        lastName: "Mintsa",
        birthDate: "28/02/2013",
        birthPlace: "Libreville",
        photo: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=136&auto=format&fit=crop",
        level: "CM2",
        message: "J'aime jouer aux échecs et lire des livres d'aventures."
      },
      {
        id: 6,
        firstName: "Christelle",
        lastName: "Ntoutoume",
        birthDate: "19/09/2016",
        birthPlace: "Inconnue",
        photo: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=136&auto=format&fit=crop",
        level: "CP",
        message: "Christelle est très créative et adore le dessin et la peinture."
      }
    ],
    formerChildren: [
      {
        id: 103,
        firstName: "André",
        lastName: "Ndong",
        birthDate: "10/12/2000",
        photo: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=136&auto=format&fit=crop",
        departure: "2019",
        reason: "Majorité",
        update: "Apprenti mécanicien, très motivé par son métier."
      }
    ]
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
    },
    currentChildren: [
      {
        id: 7,
        firstName: "Michel",
        lastName: "Ondo",
        birthDate: "03/04/2014",
        birthPlace: "Port-Gentil",
        photo: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=136&auto=format&fit=crop",
        level: "CM1",
        message: "Je rêve de devenir footballeur professionnel."
      }
    ],
    formerChildren: []
  }
];

const OrphanageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeChildrenTab, setActiveChildrenTab] = useState('current');
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Trouver l'orphelinat correspondant à l'ID
  const orphanage = orphanagesData.find(o => o.id === Number(id)) || orphanagesData[0];

  // Filtrer les enfants selon le terme de recherche
  const filteredCurrentChildren = orphanage.currentChildren?.filter(child => 
    `${child.firstName} ${child.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.level?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.birthPlace?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredFormerChildren = orphanage.formerChildren?.filter(child => 
    `${child.firstName} ${child.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.update?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Liste des enfants</CardTitle>
                    <CardDescription>
                      Les enfants actuellement hébergés et ceux qui ont quitté l'orphelinat
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="relative flex-grow">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            type="text"
                            placeholder="Rechercher un enfant..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <Tabs value={activeChildrenTab} onValueChange={setActiveChildrenTab} className="w-full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="current" className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            Enfants actuels
                          </TabsTrigger>
                          <TabsTrigger value="former" className="flex items-center">
                            <School className="w-4 h-4 mr-1" />
                            Anciens enfants
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="current">
                          {filteredCurrentChildren.length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-gray-500">Aucun enfant trouvé avec ces critères.</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {filteredCurrentChildren.map((child) => (
                                <Card 
                                  key={child.id} 
                                  className="overflow-hidden hover:shadow-md cursor-pointer transition-shadow"
                                  onClick={() => setSelectedChild(child)}
                                >
                                  <div className="p-4 flex items-center space-x-4">
                                    <Avatar className="w-16 h-16 rounded-lg border">
                                      <AvatarImage src={child.photo} alt={`${child.firstName} ${child.lastName}`} />
                                      <AvatarFallback>{child.firstName.charAt(0)}{child.lastName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h4 className="font-semibold">{child.firstName} {child.lastName}</h4>
                                      <p className="text-sm text-gray-600">Né(e) le {child.birthDate}</p>
                                      <div className="mt-1">
                                        <Badge variant="outline" className="text-xs">
                                          Niveau: {child.level}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="former">
                          {filteredFormerChildren.length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-gray-500">Aucun ancien enfant trouvé avec ces critères.</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {filteredFormerChildren.map((child) => (
                                <Card 
                                  key={child.id} 
                                  className="overflow-hidden hover:shadow-md cursor-pointer transition-shadow"
                                  onClick={() => setSelectedChild(child)}
                                >
                                  <div className="p-4 flex items-center space-x-4">
                                    <Avatar className="w-16 h-16 rounded-lg border">
                                      <AvatarImage src={child.photo} alt={`${child.firstName} ${child.lastName}`} />
                                      <AvatarFallback>{child.firstName.charAt(0)}{child.lastName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h4 className="font-semibold">{child.firstName} {child.lastName}</h4>
                                      <p className="text-sm text-gray-600">Né(e) le {child.birthDate}</p>
                                      <div className="mt-1">
                                        <Badge variant="secondary" className="text-xs">
                                          Départ: {child.departure} ({child.reason})
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    {selectedChild && (
                      <Card className="mt-6 bg-gray-50">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-xl">{selectedChild.firstName} {selectedChild.lastName}</CardTitle>
                            <button onClick={() => setSelectedChild(null)} className="text-gray-500 hover:text-gray-700">
                              &times;
                            </button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3">
                              <img 
                                src={selectedChild.photo} 
                                alt={`${selectedChild.firstName} ${selectedChild.lastName}`}
                                className="rounded-lg w-full h-auto object-cover"
                              />
                            </div>
                            <div className="md:w-2/3">
                              <h3 className="text-lg font-semibold mb-3">Informations personnelles</h3>
                              <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                                <dt className="font-medium text-gray-600">Nom complet</dt>
                                <dd>{selectedChild.firstName} {selectedChild.lastName}</dd>
                                
                                <dt className="font-medium text-gray-600">Date de naissance</dt>
                                <dd>{selectedChild.birthDate}</dd>
                                
                                {selectedChild.birthPlace && (
                                  <>
                                    <dt className="font-medium text-gray-600">Lieu de naissance</dt>
                                    <dd>{selectedChild.birthPlace}</dd>
                                  </>
                                )}
                                
                                {selectedChild.level && (
                                  <>
                                    <dt className="font-medium text-gray-600">Niveau scolaire</dt>
                                    <dd>{selectedChild.level}</dd>
                                  </>
                                )}
                                
                                {selectedChild.departure && (
                                  <>
                                    <dt className="font-medium text-gray-600">Année de départ</dt>
                                    <dd>{selectedChild.departure}</dd>
                                    
                                    <dt className="font-medium text-gray-600">Raison du départ</dt>
                                    <dd>{selectedChild.reason}</dd>
                                  </>
                                )}
                              </dl>
                              
                              {selectedChild.message && (
                                <div className="mt-4">
                                  <h3 className="text-lg font-semibold mb-2">Message</h3>
                                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                                    {selectedChild.message.startsWith(selectedChild.firstName) ? (
                                      <p className="text-gray-700">{selectedChild.message}</p>
                                    ) : (
                                      <p className="text-gray-700">"{selectedChild.message}"</p>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {selectedChild.update && (
                                <div className="mt-4">
                                  <h3 className="text-lg font-semibold mb-2">Mise à jour</h3>
                                  <p className="text-gray-700">{selectedChild.update}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </div>
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
