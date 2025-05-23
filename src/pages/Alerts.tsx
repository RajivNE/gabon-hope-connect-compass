
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Alert, { AlertProps } from '@/components/Alert';
import AlertForm from '@/components/AlertForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Données fictives pour les alertes
const alertsData: AlertProps[] = [
  {
    id: 1,
    title: "Besoin urgent de médicaments",
    orphanageName: "Orphelinat Saint-Vincent de Paul",
    orphanageId: 1,
    description: "Nous avons besoin de médicaments de base pour traiter les rhumes et les fièvres saisonnières qui touchent plusieurs enfants actuellement. Toute aide serait grandement appréciée.",
    categories: ["Médicaments", "Santé"],
    urgency: "high",
    date: "23 mai 2025"
  },
  {
    id: 2,
    title: "Recherche de bénévoles pour cours de soutien",
    orphanageName: "Centre d'accueil Les Enfants d'Abord",
    orphanageId: 2,
    description: "Nous cherchons des bénévoles pour aider aux cours de soutien en mathématiques et en français, particulièrement pour les enfants qui préparent leurs examens de fin d'année.",
    categories: ["Bénévoles", "Éducation"],
    urgency: "medium",
    date: "21 mai 2025"
  },
  {
    id: 3,
    title: "Collecte de vêtements pour enfants",
    orphanageName: "Fondation Espoir",
    orphanageId: 3,
    description: "Nous organisons une collecte de vêtements pour enfants de 3 à 12 ans. Nous avons particulièrement besoin de vêtements pour la saison des pluies qui approche.",
    categories: ["Vêtements", "Matériel"],
    urgency: "low",
    date: "20 mai 2025"
  },
  {
    id: 4,
    title: "Besoin de fournitures scolaires",
    orphanageName: "Maison d'Espérance",
    orphanageId: 4,
    description: "Pour la prochaine rentrée scolaire, nous avons besoin de cahiers, stylos, crayons et autres fournitures pour nos 22 enfants qui vont à l'école.",
    categories: ["Fournitures", "Éducation"],
    urgency: "medium",
    date: "19 mai 2025"
  },
  {
    id: 5,
    title: "Réparation du toit du dortoir",
    orphanageName: "Centre Saint-Joseph",
    orphanageId: 5,
    description: "Suite aux dernières pluies, le toit de notre dortoir principal a été endommagé. Nous cherchons des fonds ou des professionnels qui pourraient nous aider à le réparer.",
    categories: ["Infrastructure", "Réparation"],
    urgency: "high",
    date: "18 mai 2025"
  }
];

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  
  // Filtrage des alertes
  const filteredAlerts = alertsData.filter(alert => {
    return (
      // Filtre par terme de recherche
      (searchTerm === '' || 
       alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       alert.orphanageName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      // Filtre par catégorie
      (categoryFilter === 'all' || 
       alert.categories.some(cat => cat.toLowerCase() === categoryFilter.toLowerCase())) &&
      // Filtre par urgence
      (urgencyFilter === 'all' || alert.urgency === urgencyFilter)
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gabon-green py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Alertes & Besoins
                </h1>
                <p className="text-white/80 max-w-xl">
                  Découvrez les besoins urgents des orphelinats ou créez une alerte si vous êtes responsable d'un établissement.
                </p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-6 md:mt-0 bg-white text-gabon-green hover:bg-gray-100">
                    Créer une alerte
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Nouvelle alerte</DialogTitle>
                    <DialogDescription>
                      Créez une nouvelle alerte de besoin pour votre orphelinat
                    </DialogDescription>
                  </DialogHeader>
                  <div className="pt-4">
                    <AlertForm onSuccess={() => window.location.reload()} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
        
        {/* Filters Section */}
        <section className="bg-white py-6 px-4 shadow-sm">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Rechercher par titre ou orphelinat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="Médicaments">Médicaments</SelectItem>
                  <SelectItem value="Santé">Santé</SelectItem>
                  <SelectItem value="Bénévoles">Bénévoles</SelectItem>
                  <SelectItem value="Éducation">Éducation</SelectItem>
                  <SelectItem value="Vêtements">Vêtements</SelectItem>
                  <SelectItem value="Matériel">Matériel</SelectItem>
                  <SelectItem value="Fournitures">Fournitures</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Réparation">Réparation</SelectItem>
                </SelectContent>
              </Select>
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Niveau d'urgence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les niveaux</SelectItem>
                  <SelectItem value="low">Normal</SelectItem>
                  <SelectItem value="medium">Important</SelectItem>
                  <SelectItem value="high">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                className="md:ml-auto"
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setUrgencyFilter('all');
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </section>
        
        {/* Alerts Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <Tabs defaultValue="list">
              <TabsList className="mb-8">
                <TabsTrigger value="list">Liste</TabsTrigger>
                <TabsTrigger value="map">Carte</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list">
                <div className="space-y-6">
                  {filteredAlerts.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-medium text-gray-700">Aucune alerte trouvée</h3>
                      <p className="text-gray-500 mt-2">Essayez d'autres filtres de recherche</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">{filteredAlerts.length} alertes</span>
                          {categoryFilter !== 'all' && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              {categoryFilter}
                              <button 
                                className="ml-1 text-gray-500 hover:text-gray-800" 
                                onClick={() => setCategoryFilter('all')}
                              >
                                ×
                              </button>
                            </Badge>
                          )}
                          {urgencyFilter !== 'all' && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              {urgencyFilter === 'high' ? 'Urgent' : urgencyFilter === 'medium' ? 'Important' : 'Normal'}
                              <button 
                                className="ml-1 text-gray-500 hover:text-gray-800" 
                                onClick={() => setUrgencyFilter('all')}
                              >
                                ×
                              </button>
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredAlerts.map((alert) => (
                          <Alert key={alert.id} alert={alert} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="map">
                <div className="bg-gray-100 p-8 rounded-lg text-center h-64 flex items-center justify-center">
                  <div>
                    <p className="text-lg text-gray-600 mb-4">
                      La vue carte sera disponible prochainement
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        const listButton = document.querySelector('button[value="list"]') as HTMLButtonElement;
                        if (listButton) listButton.click();
                      }}
                    >
                      Retour à la liste
                    </Button>
                  </div>
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

export default Alerts;
