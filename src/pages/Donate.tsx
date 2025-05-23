
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonationCard from '@/components/DonationCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// Données fictives pour les orphelinats
const orphanages = [
  {
    id: 1,
    name: "Orphelinat Saint-Vincent de Paul",
    description: "Accueille des enfants de 0 à 18 ans qui ont perdu leurs parents ou qui ont été abandonnés.",
    image: "https://images.unsplash.com/photo-1571210862729-78a52d3779a2",
    urgentNeeds: ["Médicaments", "Vêtements"]
  },
  {
    id: 2,
    name: "Centre d'accueil Les Enfants d'Abord",
    description: "Institution dédiée à l'accompagnement des orphelins et enfants vulnérables.",
    image: "https://images.unsplash.com/photo-1597135037761-29631a2208c2",
    urgentNeeds: ["Fournitures scolaires", "Lits"]
  },
  {
    id: 3,
    name: "Fondation Espoir",
    description: "Dédiée à offrir un avenir meilleur aux orphelins et enfants abandonnés de Port-Gentil.",
    image: "https://images.unsplash.com/photo-1511108690759-009324a90311",
    urgentNeeds: ["Nourriture", "Ordinateurs"]
  }
];

const Donate = () => {
  const [donationType, setDonationType] = useState('financial');
  const [selectedOrphanage, setSelectedOrphanage] = useState('');
  const [donationCategory, setDonationCategory] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMaterialDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrphanage || !donationCategory || !description || !contactInfo) {
      toast.error("Veuillez remplir tous les champs requis.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      toast.success("Merci pour votre proposition de don ! Un responsable vous contactera bientôt.");
      setSelectedOrphanage('');
      setDonationCategory('');
      setDescription('');
      setContactInfo('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 px-4 bg-gradient-to-b from-gabon-green to-gabon-green/90">
          <div className="container mx-auto max-w-5xl text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Faire un don
            </h1>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              Votre générosité peut transformer la vie d'un enfant. Chaque don, quelle que soit sa taille, fait une différence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className={`${donationType === 'financial' ? 'bg-white text-gabon-green' : 'bg-white/20 text-white hover:bg-white/30'}`}
                onClick={() => setDonationType('financial')}
              >
                Don financier
              </Button>
              <Button 
                size="lg"
                className={`${donationType === 'material' ? 'bg-white text-gabon-green' : 'bg-white/20 text-white hover:bg-white/30'}`}
                onClick={() => setDonationType('material')}
              >
                Don matériel
              </Button>
              <Button 
                size="lg"
                className={`${donationType === 'time' ? 'bg-white text-gabon-green' : 'bg-white/20 text-white hover:bg-white/30'}`}
                onClick={() => setDonationType('time')}
              >
                Don de temps
              </Button>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            {donationType === 'financial' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Faire un don financier</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Les dons financiers aident à couvrir les besoins essentiels des orphelinats : nourriture, vêtements, soins médicaux, éducation et bien plus encore.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orphanages.map((orphanage) => (
                    <DonationCard
                      key={orphanage.id}
                      title={orphanage.name}
                      description={orphanage.description}
                      image={orphanage.image}
                      orphanageId={orphanage.id}
                    />
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Don général</CardTitle>
                    <CardDescription className="text-center">
                      Faites un don qui sera réparti entre tous les orphelinats selon leurs besoins
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DonationCard
                      title="Fond commun pour tous les orphelinats"
                      description="Votre don sera distribué équitablement entre tous les orphelinats participants selon leurs besoins prioritaires."
                      image="https://images.unsplash.com/photo-1577896851231-70ef18881754"
                    />
                  </CardContent>
                </Card>
              </div>
            )}
            
            {donationType === 'material' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Faire un don matériel</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Les dons matériels (vêtements, jouets, fournitures scolaires, etc.) sont essentiels pour le bien-être quotidien des enfants.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {orphanages.map((orphanage) => (
                    <Card key={orphanage.id} className="orphanage-card">
                      <div className="h-32 relative">
                        <img 
                          src={orphanage.image} 
                          alt={orphanage.name} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{orphanage.name}</h3>
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Besoins urgents:</p>
                          <div className="flex flex-wrap gap-1">
                            {orphanage.urgentNeeds.map((need, index) => (
                              <Badge key={index} variant="outline">{need}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Proposer un don matériel</CardTitle>
                    <CardDescription>
                      Remplissez ce formulaire pour nous informer du don matériel que vous souhaitez faire
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleMaterialDonation} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="orphanage">Orphelinat destinataire</Label>
                        <Select 
                          value={selectedOrphanage} 
                          onValueChange={setSelectedOrphanage}
                          required
                        >
                          <SelectTrigger id="orphanage">
                            <SelectValue placeholder="Sélectionner un orphelinat" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les orphelinats</SelectItem>
                            {orphanages.map((orphanage) => (
                              <SelectItem key={orphanage.id} value={orphanage.id.toString()}>
                                {orphanage.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie du don</Label>
                        <Select 
                          value={donationCategory} 
                          onValueChange={setDonationCategory}
                          required
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Choisir une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vetements">Vêtements</SelectItem>
                            <SelectItem value="nourriture">Nourriture</SelectItem>
                            <SelectItem value="fournitures">Fournitures scolaires</SelectItem>
                            <SelectItem value="jouets">Jouets</SelectItem>
                            <SelectItem value="mobilier">Mobilier</SelectItem>
                            <SelectItem value="medicaments">Médicaments</SelectItem>
                            <SelectItem value="autres">Autres</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description du don</Label>
                        <Textarea 
                          id="description"
                          placeholder="Décrivez ce que vous souhaitez donner (type, quantité, état...)"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact">Vos coordonnées</Label>
                        <Input 
                          id="contact"
                          placeholder="Nom, téléphone ou email pour vous contacter"
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full btn-gabon"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Envoi en cours..." : "Soumettre ma proposition de don"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {donationType === 'time' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Donner de votre temps</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Votre temps et vos compétences sont précieux. Devenez bénévole et aidez directement les enfants des orphelinats.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compétences recherchées</CardTitle>
                      <CardDescription>
                        Voici quelques compétences particulièrement utiles pour les orphelinats
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 text-gabon-green">✓</div>
                          <div>
                            <span className="font-medium">Enseignement</span>
                            <p className="text-sm text-gray-600">Soutien scolaire, cours particuliers, apprentissage de langues...</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 text-gabon-green">✓</div>
                          <div>
                            <span className="font-medium">Médical et santé</span>
                            <p className="text-sm text-gray-600">Médecins, infirmiers, psychologues, dentistes...</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 text-gabon-green">✓</div>
                          <div>
                            <span className="font-medium">Animation</span>
                            <p className="text-sm text-gray-600">Organisation d'activités ludiques, sportives, artistiques...</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 text-gabon-green">✓</div>
                          <div>
                            <span className="font-medium">Administratif</span>
                            <p className="text-sm text-gray-600">Comptabilité, juridique, communication, informatique...</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 text-gabon-green">✓</div>
                          <div>
                            <span className="font-medium">Maintenance</span>
                            <p className="text-sm text-gray-600">Plomberie, électricité, menuiserie, jardinage...</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Comment devenir bénévole</CardTitle>
                      <CardDescription>
                        Processus simplifié pour vous engager auprès des orphelinats
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-gabon-green/10 w-8 h-8 rounded-full flex items-center justify-center text-gabon-green font-semibold mr-3">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Inscrivez-vous</h4>
                          <p className="text-sm text-gray-600">Remplissez le formulaire de bénévolat avec vos disponibilités et compétences</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-gabon-green/10 w-8 h-8 rounded-full flex items-center justify-center text-gabon-green font-semibold mr-3">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Entretien d'orientation</h4>
                          <p className="text-sm text-gray-600">Discussion avec un responsable pour déterminer comment vous pouvez aider</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-gabon-green/10 w-8 h-8 rounded-full flex items-center justify-center text-gabon-green font-semibold mr-3">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Intégration</h4>
                          <p className="text-sm text-gray-600">Visite de l'orphelinat et rencontre avec l'équipe et les enfants</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-gabon-green/10 w-8 h-8 rounded-full flex items-center justify-center text-gabon-green font-semibold mr-3">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium">Engagement</h4>
                          <p className="text-sm text-gray-600">Début de votre mission selon vos disponibilités et les besoins</p>
                        </div>
                      </div>
                      
                      <Button className="w-full btn-gabon mt-4">
                        S'inscrire comme bénévole
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Témoignages</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez l'impact de vos dons sur la vie des enfants et des orphelinats
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-gabon-green" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Grâce aux dons reçus, nous avons pu rénover notre cuisine et offrir des repas plus équilibrés à nos 42 enfants. Merci à tous les donateurs pour leur générosité !"
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">Marie Nguema</p>
                    <p className="text-sm text-gray-600">Directrice, Orphelinat Saint-Vincent de Paul</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-gabon-green" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "J'ai commencé comme donateur financier, puis je suis devenu bénévole. Voir le sourire des enfants chaque semaine lors de mes ateliers de lecture est ma plus belle récompense."
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">Jean-Pierre Moussavou</p>
                    <p className="text-sm text-gray-600">Bénévole, Centre d'accueil Les Enfants d'Abord</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-gabon-green" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "J'étudie aujourd'hui à l'université grâce au soutien que j'ai reçu à l'orphelinat. Les dons ont financé mes études et m'ont permis de poursuivre mon rêve de devenir médecin."
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">Émilie Ndong</p>
                    <p className="text-sm text-gray-600">Ancienne résidente, Fondation Espoir</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Donate;
