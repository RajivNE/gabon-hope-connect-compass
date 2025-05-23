
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import AlertResponseModal from './AlertResponseModal';

export interface AlertProps {
  id: number;
  title: string;
  orphanageName: string;
  orphanageId: number;
  description: string;
  categories: string[];
  urgency: 'low' | 'medium' | 'high';
  date: string;
}

const Alert = ({ alert }: { alert: AlertProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gabon-green/20 text-gabon-green';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{alert.title}</CardTitle>
            <Badge className={getUrgencyColor(alert.urgency)}>
              {alert.urgency === 'high' 
                ? "Urgent" 
                : alert.urgency === 'medium' 
                  ? "Important" 
                  : "Normal"}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {alert.orphanageName}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{alert.description}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {alert.categories.map((category, index) => (
              <Badge key={index} variant="outline" className="bg-blue-50">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{alert.date}</span>
          </div>
          <Button 
            className="bg-gabon-green hover:bg-gabon-green/90"
            onClick={() => setIsModalOpen(true)}
          >
            Répondre
          </Button>
        </CardFooter>
      </Card>

      <AlertResponseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alert={alert}
        isLoggedIn={false} // À remplacer par l'état réel de connexion quand l'authentification sera implémentée
      />
    </>
  );
};

export default Alert;
