
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Données fictives pour la galerie
const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1571210862729-78a52d3779a2",
    title: "Journée du sport",
    description: "Les enfants participent à des activités sportives dans la cour de l'orphelinat.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754",
    title: "Atelier de peinture",
    description: "Atelier créatif où les enfants expriment leur talent artistique.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1511108690759-009324a90311",
    title: "Fête de Noël",
    description: "Distribution de cadeaux aux enfants pendant les fêtes de fin d'année.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f",
    title: "Cours de lecture",
    description: "Séance d'apprentissage de la lecture pour les plus jeunes.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1597135037761-29631a2208c2",
    title: "Repas communautaire",
    description: "Moment de partage autour d'un repas préparé par des bénévoles.",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1612831455359-970e23a1e4e9",
    title: "Visite médicale",
    description: "Contrôle médical régulier pour assurer la santé des enfants.",
  },
];

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = galleryItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img 
              src={galleryItems[selectedImage].image} 
              alt={galleryItems[selectedImage].title} 
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="bg-white p-4 rounded-b-lg">
              <h3 className="font-semibold text-lg">{galleryItems[selectedImage].title}</h3>
              <p className="text-gray-600">{galleryItems[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item, index) => (
          <Card key={item.id} className="overflow-hidden orphanage-card cursor-pointer" onClick={() => setSelectedImage(indexOfFirstItem + index)}>
            <div className="aspect-w-16 aspect-h-10 h-48 relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }} 
                />
              </PaginationItem>
            )}
            
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  href="#" 
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }} 
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Gallery;
