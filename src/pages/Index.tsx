
import React from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrphanageMap from '@/components/OrphanageMap';
import Alert, { AlertProps } from '@/components/Alert';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Données fictives pour les alertes récentes
const recentAlerts: AlertProps[] = [
  {
    id: 1,
    title: "Besoin urgent de médicaments",
    orphanageName: "Orphelinat Saint-Vincent de Paul",
    orphanageId: 1,
    description: "Nous avons besoin de médicaments de base pour traiter les rhumes et les fièvres saisonnières.",
    categories: ["Médicaments", "Santé"],
    urgency: "high",
    date: "23 mai 2025"
  },
  {
    id: 2,
    title: "Recherche de bénévoles pour cours de soutien",
    orphanageName: "Centre d'accueil Les Enfants d'Abord",
    orphanageId: 2,
    description: "Nous cherchons des bénévoles pour aider aux cours de soutien en mathématiques et en français.",
    categories: ["Bénévoles", "Éducation"],
    urgency: "medium",
    date: "21 mai 2025"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative hero bg-gabon-green py-20 md:py-32 px-4 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Ensemble pour les orphelinats du Gabon
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Digitaliser pour une meilleure prise en charge, transparence, et soutien des orphelins gabonais.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="btn-gabon">
                <Link to="/donate">Faire un don</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                <Link to="/alerts">Voir les besoins</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 px-4 md:py-16 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Localiser les orphelinats</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trouvez les orphelinats près de chez vous pour apporter votre soutien direct ou découvrez ceux qui ont besoin d'aide prioritaire.
            </p>
          </div>
          
          <OrphanageMap />
        </div>
      </section>
      
      {/* Recent Alerts */}
      <section className="py-12 px-4 md:py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Alertes récentes</h2>
            <Button variant="ghost" className="text-gabon-green">
              <Link to="/alerts">Voir toutes les alertes</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentAlerts.map((alert) => (
              <Alert key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 px-4 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Ce que notre plateforme propose</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez comment OorphaGabon aide à digitaliser et améliorer la gestion des orphelinats au Gabon.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="orphanage-card">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gabon-green/10 mb-4">
                  <MapPin className="h-8 w-8 text-gabon-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Localisation</h3>
                <p className="text-gray-600">
                  Localisez facilement les orphelinats et identifiez ceux près de chez vous.
                </p>
              </CardContent>
            </Card>
            
            <Card className="orphanage-card">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gabon-yellow/10 mb-4">
                  <svg className="h-8 w-8 text-gabon-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Alertes de besoins</h3>
                <p className="text-gray-600">
                  Recevez les alertes des orphelinats concernant leurs besoins matériels ou logistiques.
                </p>
              </CardContent>
            </Card>
            
            <Card className="orphanage-card">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gabon-blue/10 mb-4">
                  <svg className="h-8 w-8 text-gabon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Galerie d'histoires</h3>
                <p className="text-gray-600">
                  Découvrez les histoires et le quotidien des orphelinats à travers des photos et des récits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:py-20 bg-gabon-green text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à soutenir les orphelinats du Gabon?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Votre aide, qu'elle soit matérielle, financière ou votre temps, peut faire une différence significative.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-gabon-green hover:bg-gray-100">
              <Link to="/donate">Faire un don</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              <Link to="/alerts">Voir les besoins actuels</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
