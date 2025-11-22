#!/usr/bin/env python3
"""
Script para completar información faltante en el CSV de contenido
"""
import csv
import re

def determine_tipo(keyword):
    """Determina el tipo de contenido basado en la keyword"""
    keyword_lower = keyword.lower()
    
    # Palabras clave para contenido informativo
    info_keywords = [
        'weather', 'rain', 'season', 'month', 'time to visit', 'time to go', 
        'when to', 'best time', 'best month', 'best weather', 'reisezeit',
        'temperature', 'hot', 'warm', 'cold', 'swim', 'seaweed', 'mosquito',
        'currency', 'exchange rate', 'wifi', 'does it', 'is it', 'can you',
        'how is', 'what is the best currency', 'bug spray'
    ]
    
    # Palabras clave para contenido comercial
    commercial_keywords = [
        'best', 'top', 'hotels', 'resorts', 'restaurants', 'bars', 'clubs',
        'tours', 'activities', 'things to do', 'places to', 'tacos', 'food',
        'beach', 'cenote', 'spa', 'massage', 'yoga', 'retreat', 'events',
        'nightlife', 'party', 'shop', 'shopping', 'rental', 'airbnb',
        'villas', 'boutique', 'luxury', 'all inclusive'
    ]
    
    # Verificar primero si es informativo
    for info_kw in info_keywords:
        if info_kw in keyword_lower:
            return 'Informativo'
    
    # Si no, probablemente es comercial
    return 'Comercial'

def estimate_volume(keyword):
    """Estima el volumen de búsqueda basado en la keyword"""
    keyword_lower = keyword.lower()
    
    # Keywords muy populares
    if any(kw in keyword_lower for kw in ['best hotels', 'best restaurants', 'things to do', 'best time to visit']):
        return '1000-5000'
    
    # Keywords populares
    if any(kw in keyword_lower for kw in ['best beach', 'best cenote', 'best tacos', 'best bar']):
        return '500-1000'
    
    # Keywords moderadas
    if any(kw in keyword_lower for kw in ['best hotel', 'best restaurant', 'best tour', 'best spa']):
        return '100-500'
    
    # Keywords específicas
    if any(kw in keyword_lower for kw in ['best', 'top']):
        return '50-100'
    
    # Keywords muy específicas
    return '10-50'

def generate_urls(keyword):
    """Genera URLs de ejemplo relevantes para la keyword"""
    keyword_lower = keyword.lower()
    urls = []
    
    # URLs base comunes
    base_urls = {
        'tripadvisor': 'https://www.tripadvisor.com',
        'travel_usnews': 'https://travel.usnews.com',
        'travelandleisure': 'https://www.travelandleisure.com',
        'booking': 'https://www.booking.com',
        'tulum_travel_blog': 'https://tulumtravel.blog',
        'bucketlistbri': 'https://bucketlistbri.com',
        'racheloffduty': 'https://racheloffduty.com'
    }
    
    # URLs específicas según el tipo de keyword
    if 'hotel' in keyword_lower or 'resort' in keyword_lower:
        urls.extend([
            'https://www.booking.com/searchresults.html?ss=Tulum',
            'https://www.tripadvisor.com/Hotels-g150813-Tulum_Yucatan_Peninsula-Hotels.html',
            'https://travel.usnews.com/Tulum_Mexico/Hotels/'
        ])
    
    if 'restaurant' in keyword_lower or 'food' in keyword_lower or 'tacos' in keyword_lower:
        urls.extend([
            'https://www.tripadvisor.com/Restaurants-g150813-Tulum_Yucatan_Peninsula.html',
            'https://www.timeout.com/tulum/restaurants',
            'https://eater.com/maps/best-restaurants-tulum-mexico'
        ])
    
    if 'things to do' in keyword_lower or 'activities' in keyword_lower or 'tours' in keyword_lower:
        urls.extend([
            'https://www.tripadvisor.com/Attractions-g150813-Activities-Tulum_Yucatan_Peninsula.html',
            'https://travel.usnews.com/Tulum_Mexico/Things_To_Do/',
            'https://www.getyourguide.com/s/?q=tulum'
        ])
    
    if 'beach' in keyword_lower:
        urls.extend([
            'https://www.tripadvisor.com/Attractions-g150813-Activities-c61-t163-Tulum_Yucatan_Peninsula.html',
            'https://travel.usnews.com/Tulum_Mexico/Things_To_Do/',
            'https://tulumtravel.blog/best-beaches-in-tulum/'
        ])
    
    if 'cenote' in keyword_lower:
        urls.extend([
            'https://www.tripadvisor.com/Attractions-g150813-Activities-c61-t52-Tulum_Yucatan_Peninsula.html',
            'https://travel.usnews.com/Tulum_Mexico/Things_To_Do/',
            'https://www.cenotekaan.com/'
        ])
    
    if 'weather' in keyword_lower or 'time to visit' in keyword_lower or 'best time' in keyword_lower:
        urls.extend([
            'https://travel.usnews.com/Tulum_Mexico/When_To_Visit/',
            'https://www.travelandleisure.com/best-time-to-visit-tulum-7503285',
            'https://tulumtravel.blog/best-time-to-visit-tulum/'
        ])
    
    if 'bar' in keyword_lower or 'nightlife' in keyword_lower or 'club' in keyword_lower:
        urls.extend([
            'https://www.tripadvisor.com/Attractions-g150813-Activities-c20-Tulum_Yucatan_Peninsula.html',
            'https://www.tulumbible.com/tulum-nightlife',
            'https://tulumtravel.blog/tulum-nightlife/'
        ])
    
    # Si no hay URLs específicas, agregar URLs generales
    if not urls:
        urls.extend([
            'https://www.tripadvisor.com/Tourism-g150813-Tulum_Yucatan_Peninsula-Vacations.html',
            'https://travel.usnews.com/Tulum_Mexico/',
            'https://tulumtravel.blog/'
        ])
    
    return '\n'.join(urls[:5])  # Máximo 5 URLs

def generate_nota(tipo, keyword):
    """Genera la nota según el tipo de contenido"""
    keyword_lower = keyword.lower()
    
    if tipo == 'Informativo':
        if 'event' in keyword_lower:
            return 'Usaremos una estrategia "Topic Clusters": Es decir mipagina.com/eventos-tulum-diciembre/. Esta sección será un HUB y crearemos el contenido y texto martillo de los eventos sin adentrarnos a ellos, con una llamada de acción de leer más o saber más. Al darle clic mantendremos la URL mipagina.com/eventos-tulum-diciembre/+nombre_evento.'
        else:
            return 'Contenido informativo, integraremos los widgets de tours, vuelos y traslados'
    
    elif tipo == 'Comercial':
        return 'Contenido Comercial, integraremos botones con enlaces a los tours'
    
    return 'Contenido, integraremos los widgets correspondientes'

def complete_csv(input_file, output_file):
    """Completa la información faltante en el CSV"""
    rows = []
    
    # Leer el CSV
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            rows.append(row)
    
    # Procesar cada fila
    header = rows[0]
    completed_rows = [header]
    
    for i, row in enumerate(rows[1:], start=1):
        # Normalizar la fila a 7 columnas
        while len(row) < 7:
            row.append('')
        
        keyword = row[0].strip() if row[0] else ''
        
        if not keyword:
            completed_rows.append(row)
            continue
        
        # Completar campos faltantes
        if not row[3] or not row[3].strip():  # Tipo
            row[3] = determine_tipo(keyword)
        
        if not row[4] or not row[4].strip():  # Volume
            row[4] = estimate_volume(keyword)
        
        if not row[5] or not row[5].strip():  # URLs
            row[5] = generate_urls(keyword)
        
        if not row[6] or not row[6].strip():  # NOTA
            row[6] = generate_nota(row[3], keyword)
        
        completed_rows.append(row)
    
    # Escribir el CSV completado
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(completed_rows)
    
    print(f'✅ CSV completado: {len(completed_rows)-1} filas procesadas')
    print(f'📄 Guardado en: {output_file}')

if __name__ == '__main__':
    input_file = 'Contenido - Primer jale.csv'
    output_file = 'Contenido - Primer jale.csv'
    complete_csv(input_file, output_file)

