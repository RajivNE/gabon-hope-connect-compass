
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertProps } from '@/components/Alert';
import { toast } from 'sonner';
import { Check } from 'lucide-react';

interface ResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: AlertProps | null;
  isLoggedIn?: boolean;
}

const AlertResponseModal = ({ 
  isOpen, 
  onClose, 
  alert, 
  isLoggedIn = false 
}: ResponseModalProps) => {
  const [responseType, setResponseType] = useState<'material' | 'money'>('material');
  const [userTab, setUserTab] = useState<'anonymous' | 'register'>('anonymous');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    
    // Simuler l'envoi d'une réponse à l'alerte
    setTimeout(() => {
      console.log('Réponse envoyée:', {
        alertId: alert?.id,
        responseType,
        userInfo: userTab === 'anonymous' ? { name } : { email, wantsAccount: true },
        message,
        transactionId: responseType === 'money' ? transactionId : null,
        deliveryDate: responseType === 'material' ? deliveryDate : null
      });
      
      setSubmitting(false);
      toast.success("Votre aide a été enregistrée, merci pour votre générosité !");
      onClose();
    }, 1000);
  };

  if (!alert) return null;

  const isCategoryMaterial = alert.categories.some(cat => 
    ['Médicaments', 'Vêtements', 'Matériel', 'Fournitures'].includes(cat)
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Répondre à l'alerte</DialogTitle>
          <DialogDescription>
            Vous répondez à l'alerte "{alert.title}" de {alert.orphanageName}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {!isLoggedIn && (
            <div className="mb-6">
              <Tabs defaultValue="anonymous" onValueChange={(value) => setUserTab(value as 'anonymous' | 'register')}>
                <TabsList className="w-full mb-2">
                  <TabsTrigger value="anonymous" className="flex-1">Rester anonyme</TabsTrigger>
                  <TabsTrigger value="register" className="flex-1">Créer un compte</TabsTrigger>
                </TabsList>
                <TabsContent value="anonymous">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Votre nom (optionnel)</Label>
                      <Input 
                        id="name" 
                        placeholder="Comment souhaitez-vous être identifié?" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="register">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="votre@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Créez un mot de passe" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <Tabs defaultValue={isCategoryMaterial ? "material" : "money"} onValueChange={(value) => setResponseType(value as 'material' | 'money')}>
            <TabsList className="w-full mb-2">
              <TabsTrigger value="material" className="flex-1">Don matériel</TabsTrigger>
              <TabsTrigger value="money" className="flex-1">Don financier</TabsTrigger>
            </TabsList>
            <TabsContent value="material">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="delivery-date">Date prévue de livraison</Label>
                  <Input 
                    id="delivery-date" 
                    type="date" 
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="material-message">Message (optionnel)</Label>
                  <Textarea 
                    id="material-message" 
                    placeholder="Précisez votre don (nature, quantité, etc.)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="money">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">Coordonnées bancaires</h4>
                  <div>
                    <p className="text-sm">Mobile Money: <span className="font-medium">+241 74 XX XX XX</span></p>
                    <p className="text-sm">IBAN: <span className="font-medium">GA21 XXXX XXXX XXXX XXXX XXXX</span></p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="transaction-id">N° de transaction (optionnel)</Label>
                  <Input 
                    id="transaction-id" 
                    placeholder="Si disponible" 
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="money-message">Message (optionnel)</Label>
                  <Textarea 
                    id="money-message" 
                    placeholder="Laissez un message à l'orphelinat"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button 
            className="bg-gabon-green hover:bg-gabon-green/90"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Envoi...' : 'Confirmer mon aide'}
            {!submitting && <Check className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertResponseModal;
