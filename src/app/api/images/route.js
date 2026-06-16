import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import fallbackImages from '@/data/images.json';

export async function GET() {
  try {
    const imgDir = path.join(process.cwd(), 'public/img');
    
    if (!fs.existsSync(imgDir)) {
      console.warn('API Images: Directory does not exist, using fallback.');
      return NextResponse.json(fallbackImages);
    }

    const files = fs.readdirSync(imgDir);
    const categories = {
      hotel: [],
      boutique: [],
      cabana: [],
      garden: [],
      piramide: []
    };

    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        return;
      }

      const name = file.toLowerCase();
      if (name.startsWith('boutique')) {
        categories.boutique.push(`/img/${file}`);
      } else if (name.startsWith('cabana')) {
        categories.cabana.push(`/img/${file}`);
      } else if (name.startsWith('garden')) {
        categories.garden.push(`/img/${file}`);
      } else if (name.startsWith('piramide')) {
        categories.piramide.push(`/img/${file}`);
      } else if (name.startsWith('hotel')) {
        categories.hotel.push(`/img/${file}`);
      }
    });

    // Sort files naturally
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    Object.keys(categories).forEach(key => {
      categories[key].sort(collator.compare);
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('API Images: Error scanning directory, returning fallback. Error:', error);
    return NextResponse.json(fallbackImages);
  }
}
