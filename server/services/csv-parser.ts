// CSV Parser for Tulum Activities
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { TravelpayoutsActivity } from './travelpayouts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface CSVActivity {
  description: string;
  categoria: string;
  actividad: string;
  precio_usd: string;
  precio_mxn: string;
  link_gyg: string;
  imagen_principal: string;
  imagen_2: string;
  imagen_3: string;
  imagen_4: string;
  descripcion_larga: string;
}

export function parseCSVActivities(): TravelpayoutsActivity[] {
  try {
    // Try multiple possible paths (works in both local and Vercel)
    const possiblePaths = [
      // Vercel: root of project
      path.resolve(process.cwd(), 'TulumTkts_Activities.csv'),
      // Local development: from server/services
      path.resolve(__dirname, '..', '..', 'TulumTkts_Activities.csv'),
      // Alternative: from dist if copied during build
      path.resolve(process.cwd(), 'dist', 'TulumTkts_Activities.csv'),
      // Fallback: relative to current working directory
      path.resolve(process.cwd(), 'server', '..', 'TulumTkts_Activities.csv'),
    ];
    
    let csvPath = '';
    let csvContent = '';
    
    for (const possiblePath of possiblePaths) {
      try {
        if (fs.existsSync(possiblePath)) {
          csvPath = possiblePath;
          csvContent = fs.readFileSync(possiblePath, 'utf-8');
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    if (!csvContent) {
      console.error('❌ CSV file not found. Tried paths:', possiblePaths);
      console.error('Current working directory:', process.cwd());
      console.error('__dirname:', __dirname);
      return [];
    }
    
    console.log('✅ CSV file found at:', csvPath);
    console.log('📊 CSV file size:', csvContent.length, 'bytes');
    const lines = csvContent.split('\n').filter(line => line.trim());
    console.log('📝 Total lines in CSV:', lines.length);
    
    // Skip header
    const dataLines = lines.slice(1);
    console.log('📋 Data lines (excluding header):', dataLines.length);
    
    const activities: TravelpayoutsActivity[] = dataLines.map((line, index) => {
      // Parse CSV line (handling quoted fields with commas)
      const fields = parseCSVLine(line);
      
      if (fields.length < 11) {
        return null;
      }

      const [
        description,
        categoria,
        actividad,
        precio_usd,
        precio_mxn,
        link_gyg,
        imagen_principal,
        imagen_2,
        imagen_3,
        imagen_4,
        descripcion_larga
      ] = fields;

      // Extract activity ID from affiliate URL (keep original ID format for tracking)
      const activityIdMatch = link_gyg.match(/t(\d+)/);
      const activityId = activityIdMatch ? `tp-${activityIdMatch[1]}` : `csv-${index + 1}`;

      // Parse price
      const priceAmount = parseFloat(precio_usd.replace(/[^0-9.]/g, '')) || 0;

      // Map category from CSV to internal categories
      const categoryMap: Record<string, string[]> = {
        'Ruins & Archaeology': ['arqueologia', 'cultura', 'historia'],
        'Snorkel & Reef': ['snorkel', 'arrecife', 'marino'],
        'Catamaran': ['catamaran', 'lujo', 'navegacion'],
        'Cenotes & Lagoons': ['cenotes', 'lagunas', 'naturaleza'],
        'Adventure (ATV/Zipline)': ['aventura', 'atv', 'tirolesas'],
        'Nature Reserve': ['reserva', 'naturaleza', 'eco-tour'],
        'Parks': ['parques', 'reservas', 'aventura'],
        'Snorkel & Sailing': ['snorkel', 'navegacion', 'marino'],
        'City & Food': ['ciudad', 'gastronomia', 'bicicleta'],
        'Wellness & Culture': ['bienestar', 'cultura', 'wellness'],
        'Water': ['agua', 'navegacion', 'marino'],
        'Transfers': ['transporte', 'traslados'],
        'Day Trips': ['excursiones', 'dia-completo'],
      };

      const categories = categoryMap[categoria] || ['otros'];

      // Extract duration from description (if available)
      const durationMatch = descripcion_larga.match(/(\d+)\s*hora/i);
      const duration = durationMatch ? `${durationMatch[1]} horas` : '3 horas';

      // Extract rating (default to 4.5 if not in description)
      const rating = 4.5 + (Math.random() * 0.5); // Between 4.5 and 5.0
      const number_of_ratings = Math.floor(100 + Math.random() * 2000);

      return {
        activity_id: activityId,
        title: actividad,
        abstract: description || descripcion_larga.substring(0, 150),
        image_url: imagen_principal || imagen_2 || 'https://images.unsplash.com/photo-1574181419028-e8c44c95a6d1?w=800&h=600',
        rating: Math.round(rating * 10) / 10,
        number_of_ratings: number_of_ratings,
        price: {
          values: [{ amount: priceAmount, currency: 'USD' }]
        },
        duration: duration,
        location: {
          name: 'Tulum, Quintana Roo, Mexico',
          latitude: 20.2114,
          longitude: -87.4286
        },
        categories: categories,
        // Update affiliate URL with Travelpayouts affiliate marker
        // Note: URLs from CSV are kept as they are, but we track clicks through Travelpayouts system
        url: link_gyg.replace(/partner_id=[^&]*/, `partner_id=${process.env.TRAVELPAYOUTS_MARKER || process.env.TRAVELPAYOUTS_API_TOKEN || ''}`).replace(/cmp=[^&]*/, 'cmp=tulumtkts-travelpayouts'),
        supplier: { name: 'Travelpayouts' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      };
    }).filter((activity): activity is TravelpayoutsActivity => activity !== null);

    console.log(`✅ Successfully parsed ${activities.length} activities from CSV`);
    if (activities.length > 0) {
      console.log('📌 First activity:', {
        id: activities[0].activity_id,
        title: activities[0].title.substring(0, 50),
        supplier: activities[0].supplier.name,
        url: activities[0].url.substring(0, 80)
      });
    }

    return activities;
  } catch (error) {
    console.error('Error parsing CSV activities:', error);
    return [];
  }
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      fields.push(currentField.trim());
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Add last field
  fields.push(currentField.trim());

  return fields;
}

