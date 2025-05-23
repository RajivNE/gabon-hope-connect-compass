
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface DonationCardProps {
  title: string;
  description: string;
  image: string;
  orphanageId?: number;
}

const DonationCard = ({ title, description, image, orphanageId }: DonationCardProps) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const presetAmounts = ['5000', '10000', '25000', '50000'];

  const handleDonation = () => {
    if (!donationAmount || isNaN(Number(donationAmount)) || Number(donationAmount) <= 0) {
      toast.error("Veuillez entrer un montant valide");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulation de traitement de don
    setTimeout(() => {
      console.log({
        amount: donationAmount,
        orphanageId,
        title
      });
      
      toast.success(`Merci pour votre don de ${donationAmount} FCFA!`);
      setDonationAmount('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="amount">Montant du don (FCFA)</Label>
          <Input
            id="amount"
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Entrer un montant"
            className="mt-1"
          />
        </div>
        
        <div>
          <div className="text-sm text-gray-500 mb-2">Montants suggérés (FCFA)</div>
          <div className="flex flex-wrap gap-2">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                type="button"
                variant="outline"
                className="flex-1 min-w-[70px]"
                onClick={() => setDonationAmount(amount)}
              >
                {amount}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-gabon-green hover:bg-gabon-green/90"
          disabled={isSubmitting}
          onClick={handleDonation}
        >
          {isSubmitting ? "Traitement..." : "Faire un don"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonationCard;
