const fs = require('fs');
const path = require('path');

const imgDirectory = path.join(__dirname, '../public/img');
const outputDirectory = path.join(__dirname, '../src/data');
const outputFile = path.join(outputDirectory, 'images.json');

function scanAndClassify() {
  console.log('Scanning images in:', imgDirectory);
  
  if (!fs.existsSync(imgDirectory)) {
    console.error('Image directory does not exist:', imgDirectory);
    // Write an empty template to avoid compilation errors
    fs.mkdirSync(outputDirectory, { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify({ hotel: [], boutique: [], cabana: [], garden: [], piramide: [] }, null, 2));
    return;
  }

  const files = fs.readdirSync(imgDirectory);
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
      return; // Skip non-image files
    }

    const name = file.toLowerCase();
    
    // Classify based on prefix
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

  // Sort them naturally so hotel1 comes before hotel2, and hotel10 comes after hotel9 (or alphabetical sorting)
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  Object.keys(categories).forEach(key => {
    categories[key].sort(collator.compare);
  });

  console.log('Classification complete:', {
    hotel: categories.hotel.length,
    boutique: categories.boutique.length,
    cabana: categories.cabana.length,
    garden: categories.garden.length,
    piramide: categories.piramide.length,
  });

  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(categories, null, 2));
  console.log('Generated index file at:', outputFile);
}

scanAndClassify();
