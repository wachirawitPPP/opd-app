'use client'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const useMetadata = (title:string, description:string) => {
  

  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description, usePathname]);
};

export default useMetadata;