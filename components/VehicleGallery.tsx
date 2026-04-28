"use client";

import { useState } from 'react';

export default function VehicleGallery({ images, alt }: { images: string[], alt: string }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-6">
      {/* MAIN VIEW */}
      <div className="aspect-[16/10] bg-[#E0E0E0] dark:bg-slate-800 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
        <img 
          src={mainImage} 
          alt={alt} 
          className="w-full h-full object-cover transition-opacity duration-300" 
        />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all bg-slate-100 ${
              mainImage === img ? 'border-[#2DA7D7] scale-95 shadow-inner' : 'border-transparent'
            }`}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}