
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface AlertFormProps {
  orphanageId?: number;
  onSuccess?: () => void;
}

const AlertForm = ({ orphanageId, onSuccess }: AlertFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi vers un backend
    setTimeout(() => {
      console.log({
        title,
        description,
        category,
        urgency,
        orphanageId
      });
      
      setIsSubmitting(false);
      toast.success("Alerte envoyée avec succès!");
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setUrgency('medium');
      
      if (onSuccess) onSuccess();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Titre de l'alerte</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Besoin urgent de fournitures scolaires"
          required
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description détaillée</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez en détail ce dont vous avez besoin..."
          required
          className="mt-1 min-h-[100px]"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Catégorie</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="category" className="mt-1">
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nourriture">Nourriture</SelectItem>
              <SelectItem value="vetements">Vêtements</SelectItem>
              <SelectItem value="fournitures">Fournitures scolaires</SelectItem>
              <SelectItem value="medicaments">Médicaments</SelectItem>
              <SelectItem value="mobilier">Mobilier</SelectItem>
              <SelectItem value="benevoles">Bénévoles</SelectItem>
              <SelectItem value="autres">Autres</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="urgency">Niveau d'urgence</Label>
          <Select value={urgency} onValueChange={setUrgency} required>
            <SelectTrigger id="urgency" className="mt-1">
              <SelectValue placeholder="Sélectionnez le niveau d'urgence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Normal</SelectItem>
              <SelectItem value="medium">Important</SelectItem>
              <SelectItem value="high">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full btn-gabon"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer l\'alerte'}
      </Button>
    </form>
  );
};

export default AlertForm;
