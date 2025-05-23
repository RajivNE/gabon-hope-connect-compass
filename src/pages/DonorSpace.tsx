
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Gift, Award, Calendar, ArrowUp, ArrowDown, History } from 'lucide-react';

// Données fictives pour les dons
const donationsHistory = [
  {
    id: 1,
    orphanageId: 1,
    orphanageName: "Orphelinat Saint-Vincent de Paul",
    type: "Financier",
    amount: 25000,
    date: "21 mai 2025",
    status: "Validé",
    impact: "Nourriture pour 20 enfants pendant une semaine"
  },
  {
    id: 2,
    orphanageId: 2,
    orphanageName: "Centre d'accueil Les Enfants d'Abord",
    type: "Matériel",
    items: ["5 kg de riz", "10 cahiers", "20 stylos"],
    date: "15 mai 2025",
    status: "Validé",
    impact: "Matériel scolaire pour la rentrée"
  },
  {
    id: 3,
    orphanageId: 1,
    orphanageName: "Orphelinat Saint-Vincent de Paul",
    type: "Financier",
    amount: 10000,
    date: "02 mai 2025",
    status: "En attente",
    impact: "En cours de traitement"
  },
];

// Données fictives pour les alertes auxquelles le donateur a répondu
const respondedAlerts = [
  {
    id: 1,
    title: "Besoin urgent de médicaments",
    orphanageId: 1,
    orphanageName: "Orphelinat Saint-Vincent de Paul",
    date: "23 mai 2025",
    status: "Pris en charge",
    response: "Don de médicaments effectué le 24 mai"
  },
  {
    id: 2,
    title: "Recherche de bénévoles pour cours de soutien",
    orphanageId: 2,
    orphanageName: "Centre d'accueil Les Enfants d'Abord",
    date: "21 mai 2025",
    status: "Validé",
    response: "4 heures de cours de mathématiques effectuées"
  }
];

// Données fictives de récompenses/badges
const rewards = [
  {
    id: 1,
    title: "Premier don",
    description: "Vous avez effectué votre premier don",
    date: "21 mai 2025",
    icon: <Gift className="h-8 w-8 text-gabon-green" />
  },
  {
    id: 2,
    title: "Héros du mois",
    description: "Vous étiez parmi les donateurs les plus actifs ce mois-ci",
    date: "31 mai 2025",
    icon: <Award className="h-8 w-8 text-gabon-yellow" />
  },
  {
    id: 3,
    title: "Fidèle soutien",
    description: "Vous soutenez régulièrement les orphelinats",
    date: "02 juin 2025",
    icon: <Heart className="h-8 w-8 text-red-500" />
  }
];

// Données fictives des statistiques du donateur
const donorStats = {
  points: 350,
  totalDonations: 3,
  financialAmount: 35000, // en FCFA
  rank: "Bienfaiteur Bronze",
  nextRank: "Bienfaiteur Argent",
  pointsToNextRank: 50,
  impactedChildren: 45
};

const DonorSpace = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Simuler un utilisateur connecté
  const donorName = "Jean Dupont";
  
  const sortedDonations = [...donationsHistory].sort((a, b) => {
    const dateA = new Date(a.date.split(' ').reverse().join('-'));
    const dateB = new Date(b.date.split(' ').reverse().join('-'));
    return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gabon-green py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Bienvenue, {donorName}
                </h1>
                <p className="text-white/80">
                  Votre espace donateur personnel
                </p>
              </div>
              <div className="mt-4 md:mt-0 bg-white p-4 rounded-lg shadow-md">
                <div className="text-center">
                  <p className="text-xl font-semibold text-gabon-green">{donorStats.points} points</p>
                  <p className="text-sm text-gray-600">{donorStats.rank}</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">{donorStats.pointsToNextRank} points pour atteindre {donorStats.nextRank}</p>
                  <Progress value={(donorStats.points / (donorStats.points + donorStats.pointsToNextRank)) * 100} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Dashboard Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total des dons</p>
                      <p className="text-2xl font-semibold">{donorStats.totalDonations}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gabon-green/10 flex items-center justify-center">
                      <Gift className="h-5 w-5 text-gabon-green" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Dons financiers</p>
                      <p className="text-2xl font-semibold">{donorStats.financialAmount.toLocaleString()} FCFA</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gabon-yellow/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-gabon-yellow" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Enfants impactés</p>
                      <p className="text-2xl font-semibold">{donorStats.impactedChildren}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="history">Historique des dons</TabsTrigger>
                <TabsTrigger value="alerts">Alertes prises en charge</TabsTrigger>
                <TabsTrigger value="rewards">Récompenses & Badges</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Historique de vos dons</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                      >
                        {sortOrder === 'desc' ? (
                          <span className="flex items-center">Plus récents <ArrowDown className="ml-1 h-4 w-4" /></span>
                        ) : (
                          <span className="flex items-center">Plus anciens <ArrowUp className="ml-1 h-4 w-4" /></span>
                        )}
                      </Button>
                    </div>
                    <CardDescription>Tous vos dons aux orphelinats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {sortedDonations.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Vous n'avez pas encore effectué de don.</p>
                        <Button asChild className="mt-4 bg-gabon-green hover:bg-gabon-green/90">
                          <Link to="/catalog">Découvrir les orphelinats</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {sortedDonations.map((donation) => (
                          <Card key={donation.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                  <p className="font-semibold">{donation.orphanageName}</p>
                                  <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span>{donation.date}</span>
                                  </div>
                                </div>
                                <div className="mt-2 md:mt-0">
                                  <Badge className={donation.status === "Validé" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                    {donation.status}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="mt-3">
                                <div className="flex items-center">
                                  <Badge variant="outline" className="mr-2">{donation.type}</Badge>
                                  {donation.type === "Financier" ? (
                                    <span>{donation.amount.toLocaleString()} FCFA</span>
                                  ) : (
                                    <span>{donation.items?.join(", ")}</span>
                                  )}
                                </div>
                                
                                <div className="mt-2 text-sm">
                                  <p className="text-gray-600">Impact: {donation.impact}</p>
                                </div>
                              </div>
                              
                              <div className="mt-3">
                                <Button 
                                  size="sm"
                                  variant="outline" 
                                  className="text-gabon-green border-gabon-green hover:bg-gabon-green/10"
                                  asChild
                                >
                                  <Link to={`/orphanage/${donation.orphanageId}`}>
                                    Voir l'orphelinat
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="alerts">
                <Card>
                  <CardHeader>
                    <CardTitle>Alertes prises en charge</CardTitle>
                    <CardDescription>Les alertes auxquelles vous avez répondu</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {respondedAlerts.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Vous n'avez pas encore répondu à des alertes.</p>
                        <Button asChild className="mt-4 bg-gabon-green hover:bg-gabon-green/90">
                          <Link to="/alerts">Voir les alertes actives</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {respondedAlerts.map((alert) => (
                          <Card key={alert.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                  <p className="font-semibold">{alert.title}</p>
                                  <p className="text-sm text-gray-600">{alert.orphanageName}</p>
                                  <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span>{alert.date}</span>
                                  </div>
                                </div>
                                <div className="mt-2 md:mt-0">
                                  <Badge className={alert.status === "Validé" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                    {alert.status}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="mt-3">
                                <p className="text-sm text-gray-600">
                                  Votre réponse: {alert.response}
                                </p>
                              </div>
                              
                              <div className="mt-3">
                                <Button 
                                  size="sm"
                                  variant="outline" 
                                  className="text-gabon-green border-gabon-green hover:bg-gabon-green/10"
                                  asChild
                                >
                                  <Link to={`/orphanage/${alert.orphanageId}`}>
                                    Voir l'orphelinat
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rewards">
                <Card>
                  <CardHeader>
                    <CardTitle>Vos badges et récompenses</CardTitle>
                    <CardDescription>Reconnaissance de votre générosité</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {rewards.map((reward) => (
                        <Card key={reward.id} className="overflow-hidden">
                          <CardContent className="p-6 text-center">
                            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                              {reward.icon}
                            </div>
                            <h3 className="text-lg font-semibold">{reward.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{reward.description}</p>
                            <p className="text-xs text-gray-500 mt-3">Obtenu le {reward.date}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-600">
                      Continuez vos actions pour débloquer plus de badges!
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonorSpace;
