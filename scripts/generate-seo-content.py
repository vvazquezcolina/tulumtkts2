#!/usr/bin/env python3
"""
Script para generar contenido SEO basado en el CSV de keywords
Según las reglas SEO del usuario
"""

import csv
import re
import json
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Tuple

def extract_keyword_variations(keyword: str, secondary_keywords: str = "") -> List[str]:
    """Extrae todas las variaciones y sinónimos de la keyword"""
    variations = [keyword]
    
    if secondary_keywords:
        # Separar por comas o pipes
        sec_list = re.split(r'[,|]', secondary_keywords)
        variations.extend([kw.strip() for kw in sec_list if kw.strip()])
    
    return variations

def translate_keyword_to_spanish(keyword: str) -> str:
    """Traduce la keyword al español natural"""
    keyword_lower = keyword.lower()
    
    # Traducciones de frases completas primero
    phrase_translations = {
        "things to do": "cosas que hacer",
        "things to do in tulum mexico": "cosas que hacer en tulum",
        "things to do in tulum": "cosas que hacer en tulum",
        "best things to do": "mejores cosas que hacer",
        "10 best things to do": "10 mejores cosas que hacer",
        "activities to do": "actividades que hacer",
        "best activities": "mejores actividades",
        "all inclusive": "todo incluido",
        "adults only": "solo adultos",
        "for couples": "para parejas",
        "for families": "para familias",
        "for groups": "para grupos",
        "on the beach": "en la playa",
        "travel guide": "guía de viaje",
        "time to visit": "momento para visitar",
        "best time to visit": "mejor momento para visitar",
        "real estate": "bienes raíces",
        "airbnb": "airbnb",
        "car rental": "renta de autos",
        "airport transfer": "traslado del aeropuerto",
        "airport to": "del aeropuerto a",
        "authentic mexican food": "comida mexicana auténtica",
    }
    
    # Traducciones de palabras individuales
    word_translations = {
        "december": "diciembre", "january": "enero", "february": "febrero",
        "march": "marzo", "april": "abril", "may": "mayo", "june": "junio",
        "july": "julio", "august": "agosto", "september": "septiembre",
        "october": "octubre", "november": "noviembre",
        "best": "mejores", "top": "mejores", "activities": "actividades",
        "hotels": "hoteles", "resorts": "resorts", "restaurants": "restaurantes",
        "food": "comida", "weather": "clima", "climate": "clima",
        "warm": "cálido", "rain": "lluvia", "mosquitoes": "mosquitos",
        "swim": "nadar", "events": "eventos", "accommodations": "alojamientos",
        "hotel": "hotel", "resort": "resort", "restaurant": "restaurante",
        "tacos": "tacos", "beach": "playa", "bars": "bares", "bar": "bar",
        "nightlife": "vida nocturna", "cenote": "cenote", "cenotes": "cenotes",
        "villa": "villa", "villas": "villas", "area": "área", "areas": "áreas",
        "transfers": "traslados", "transportation": "transporte", "shuttle": "traslado",
        "tours": "tours", "attractions": "atracciones", "boutique": "boutique",
    }
    
    # Buscar traducciones de frases primero
    for phrase_eng, phrase_esp in phrase_translations.items():
        if phrase_eng in keyword_lower:
            keyword_lower = keyword_lower.replace(phrase_eng, phrase_esp)
    
    # Traducir palabras individuales
    words = keyword_lower.split()
    translated_words = []
    for word in words:
        # Remover caracteres especiales temporalmente
        clean_word = word.strip('.,!?;:')
        if clean_word in word_translations:
            translated = word_translations[clean_word]
            # Mantener caracteres especiales si existían
            if word != clean_word:
                translated = word.replace(clean_word, translated)
            translated_words.append(translated)
        else:
            translated_words.append(word)
    
    return " ".join(translated_words)

def determine_content_structure(keyword: str, tipo: str) -> Dict:
    """Determina la estructura del contenido basado en la keyword y tipo"""
    keyword_lower = keyword.lower()
    keyword_spanish = translate_keyword_to_spanish(keyword)
    
    structure = {
        "h1": "",
        "h2_sections": [],
        "word_count_target": 2000,  # Por defecto 2000 palabras
        "needs_faq": True,
        "needs_lists": True
    }
    
    # Generar H1 basado en la keyword traducida
    if "tulum in december" in keyword_lower or "tulum december" in keyword_lower:
        structure["h1"] = "Tulum en Diciembre: Guía Completa del Clima, Actividades y Qué Esperar"
    elif "is december a good time to visit tulum" in keyword_lower:
        structure["h1"] = "¿Es Diciembre un Buen Momento para Visitar Tulum? Guía Completa 2025"
    elif "is tulum warm in december" in keyword_lower:
        structure["h1"] = "¿Hace Calor en Tulum en Diciembre? Clima y Temperaturas"
    elif "things to do in tulum in december" in keyword_lower:
        structure["h1"] = "Cosas que Hacer en Tulum en Diciembre: 10 Actividades Imperdibles"
    elif "tulum december events" in keyword_lower:
        structure["h1"] = "Eventos en Tulum en Diciembre: Festividades y Celebraciones"
    elif "can you swim in tulum in december" in keyword_lower:
        structure["h1"] = "¿Se Puede Nadar en Tulum en Diciembre? Guía Completa"
    elif "does it rain in tulum in december" in keyword_lower:
        structure["h1"] = "¿Llueve en Tulum en Diciembre? Clima y Precipitaciones"
    elif "mosquitoes in tulum in december" in keyword_lower:
        structure["h1"] = "Mosquitos en Tulum en Diciembre: Prevención y Consejos"
    elif "10 best things to do in tulum mexico" in keyword_lower or "10 best things to do in tulum" in keyword_lower:
        structure["h1"] = "Las 10 Mejores Cosas que Hacer en Tulum, México: Guía Completa 2025"
    elif "best things to do" in keyword_lower or "things to do" in keyword_lower:
        structure["h1"] = "Las Mejores Cosas que Hacer en Tulum: Guía Completa"
    elif "best" in keyword_lower or "top" in keyword_lower:
        # Remover "best", "top", "in tulum", "tulum mexico" para generar título
        clean_keyword = keyword.replace("best ", "").replace("top ", "").replace(" in tulum mexico", "").replace(" in tulum", "").replace(" tulum mexico", "").replace(" tulum", "").replace(" mexico", "")
        clean_keyword_spanish = translate_keyword_to_spanish(clean_keyword)
        # Capitalizar correctamente
        clean_keyword_spanish = clean_keyword_spanish.title()
        structure["h1"] = f"Los Mejores {clean_keyword_spanish} en Tulum: Guía Completa 2025"
    elif "is" in keyword_lower or "does" in keyword_lower or "can you" in keyword_lower:
        # Traducir pregunta completa
        question_spanish = translate_keyword_to_spanish(keyword)
        structure["h1"] = f"¿{question_spanish.title()}? Guía Completa para Tulum"
    elif "things to do" in keyword_lower or "activities" in keyword_lower:
        structure["h1"] = "Las 10 Mejores Cosas que Hacer en Tulum: Guía Completa"
    elif "hotels" in keyword_lower or "resorts" in keyword_lower:
        structure["h1"] = "Los Mejores Hoteles y Resorts en Tulum: Guía de Reservas 2025"
    elif "restaurants" in keyword_lower or "food" in keyword_lower:
        structure["h1"] = "Los Mejores Restaurantes y Comida en Tulum: Guía Gastronómica"
    elif "weather" in keyword_lower or "climate" in keyword_lower:
        structure["h1"] = "Clima y Temperatura en Tulum: Guía Completa por Meses"
    else:
        structure["h1"] = f"{keyword_spanish.title()}: Guía Completa para Tulum"
    
    # Determinar secciones H2 basadas en el tipo y keyword
    if tipo == "Informativo":
        if "weather" in keyword_lower or "climate" in keyword_lower:
            structure["h2_sections"] = [
                "Clima y Temperatura en Tulum",
                "Mejor Época para Visitar Tulum",
                "Qué Esperar del Clima",
                "Consejos para tu Viaje"
            ]
        elif "time to visit" in keyword_lower or "best time" in keyword_lower:
            structure["h2_sections"] = [
                "¿Cuándo es el Mejor Momento para Visitar Tulum?",
                "Temporada Alta vs Temporada Baja",
                "Temporadas por Mes",
                "Consideraciones Importantes"
            ]
        elif "december" in keyword_lower:
            structure["h2_sections"] = [
                "Tulum en Diciembre: Clima y Condiciones",
                "Actividades Disponibles en Diciembre",
                "Eventos y Celebraciones en Diciembre",
                "Consejos de Viaje para Diciembre"
            ]
        elif "month" in keyword_lower or any(m in keyword_lower for m in ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november"]):
            month_map = {
                "january": "enero", "february": "febrero", "march": "marzo", "april": "abril",
                "may": "mayo", "june": "junio", "july": "julio", "august": "agosto",
                "september": "septiembre", "october": "octubre", "november": "noviembre"
            }
            month_spanish = "mes"
            for eng_month, span_month in month_map.items():
                if eng_month in keyword_lower:
                    month_spanish = span_month.title()
                    break
            structure["h2_sections"] = [
                f"Tulum en {month_spanish}: Clima y Condiciones",
                f"Actividades Disponibles en {month_spanish}",
                f"Eventos y Celebraciones en {month_spanish}",
                f"Consejos de Viaje para {month_spanish}"
            ]
        else:
            structure["h2_sections"] = [
                "Introducción",
                "Información Principal",
                "Detalles Importantes",
                "Consejos y Recomendaciones"
            ]
    else:  # Comercial
        if "things to do" in keyword_lower or "activities" in keyword_lower:
            structure["h2_sections"] = [
                "Las 10 Mejores Actividades en Tulum",
                "Tours y Experiencias Recomendadas",
                "Consejos para Disfrutar al Máximo",
                "Planificación de tu Itinerario"
            ]
            structure["word_count_target"] = 2500
        elif "hotels" in keyword_lower or "resorts" in keyword_lower:
            structure["h2_sections"] = [
                "Los Mejores Hoteles en Tulum",
                "Tipos de Alojamiento",
                "Ubicaciones Recomendadas",
                "Reservar tu Estancia"
            ]
            structure["word_count_target"] = 3000
        elif "restaurants" in keyword_lower or "food" in keyword_lower:
            structure["h2_sections"] = [
                "Los Mejores Restaurantes en Tulum",
                "Tipos de Cocina",
                "Ubicaciones Recomendadas",
                "Experiencias Gastronómicas"
            ]
            structure["word_count_target"] = 2500
        else:
            structure["h2_sections"] = [
                "Mejores Opciones",
                "Recomendaciones",
                "Información Útil",
                "Cómo Reservar"
            ]
    
    return structure

def generate_intro(keyword: str, tipo: str) -> str:
    """Genera la introducción del artículo"""
    keyword_lower = keyword.lower()
    
    if tipo == "Informativo":
        if "december" in keyword_lower:
            return f"""<p>Tulum en diciembre es una experiencia única que combina el clima perfecto del Caribe mexicano con la magia de las festividades de fin de año. Este destino paradisíaco ofrece condiciones ideales para disfrutar de playas espectaculares, cenotes sagrados y una cultura rica que se fusiona con celebraciones internacionales.</p>

<p>Durante el mes de diciembre, Tulum se transforma en un refugio tropical perfecto para aquellos que buscan escapar del frío invierno. Con temperaturas cálidas pero agradables, días soleados la mayoría del tiempo y un ambiente festivo único, esta época del año es considerada por muchos como la mejor para visitar este destino caribeño.</p>

<p>En esta guía completa, te proporcionaremos toda la información necesaria para planificar tu viaje a Tulum en diciembre, desde detalles sobre el clima y las temperaturas hasta las mejores actividades, eventos especiales y consejos prácticos para hacer de tu estadía una experiencia inolvidable.</p>"""
        
        elif "weather" in keyword_lower or "climate" in keyword_lower:
            return f"""<p>El clima de Tulum es uno de los factores más importantes a considerar al planificar tu viaje a este destino caribeño. Con un clima tropical cálido durante todo el año, Tulum ofrece condiciones ideales para disfrutar de playas, actividades al aire libre y explorar los tesoros naturales de la Riviera Maya.</p>

<p>Comprender las variaciones climáticas, las temporadas de lluvia y los patrones de temperatura te ayudará a elegir el mejor momento para tu visita y a empacar adecuadamente. En esta guía completa, te proporcionamos toda la información detallada sobre el clima en Tulum para que puedas planificar tu viaje de manera óptima.</p>"""
        
        else:
            return f"""<p>Tulum se ha convertido en uno de los destinos más populares de la Riviera Maya, atrayendo a viajeros de todo el mundo con su combinación única de playas paradisíacas, ruinas mayas impresionantes, cenotes sagrados y una vibrante escena cultural y gastronómica.</p>

<p>Si estás considerando visitar Tulum, es importante tener información precisa y actualizada sobre {keyword.lower()} para tomar las mejores decisiones durante tu viaje. Esta guía completa te proporcionará todos los detalles que necesitas saber.</p>"""
    
    else:  # Comercial
        if "things to do" in keyword_lower or "activities" in keyword_lower:
            return f"""<p>Tulum es un destino que ofrece una increíble variedad de actividades y experiencias para todos los tipos de viajeros. Desde aventuras en la naturaleza hasta experiencias culturales profundas, pasando por actividades acuáticas espectaculares y momentos de relajación en playas de ensueño.</p>

<p>Ya sea que busques explorar las ruinas mayas históricas, nadar en cenotes sagrados, practicar yoga en la playa al amanecer o disfrutar de la vida nocturna, Tulum tiene algo especial para cada visitante. En esta guía, te presentamos las mejores actividades y cosas que hacer en Tulum para que puedas planificar un itinerario perfecto.</p>"""
        
        elif "hotels" in keyword_lower or "resorts" in keyword_lower:
            return f"""<p>Encontrar el alojamiento perfecto en Tulum es fundamental para disfrutar al máximo de tu experiencia en este paraíso caribeño. Desde resorts de lujo frente al mar hasta hoteles boutique ecológicos y opciones más económicas, Tulum ofrece una amplia variedad de opciones de hospedaje para todos los presupuestos y preferencias.</p>

<p>En esta guía completa, te presentamos los mejores hoteles y resorts en Tulum, junto con recomendaciones detalladas sobre ubicaciones, servicios y qué esperar de cada tipo de alojamiento para que puedas tomar la mejor decisión para tu viaje.</p>"""
        
        else:
            return f"""<p>Tulum es conocido por ofrecer algunas de las mejores opciones en {keyword.lower()} en toda la Riviera Maya. Con una combinación única de calidad, autenticidad y ubicaciones excepcionales, este destino caribeño ha logrado posicionarse como referente en la región.</p>

<p>En esta guía completa, exploramos las mejores opciones disponibles en Tulum, proporcionándote información detallada y recomendaciones basadas en experiencias reales para que puedas tomar decisiones informadas durante tu visita.</p>"""
    
    return ""

def generate_h2_section(title: str, keyword: str, tipo: str, section_index: int) -> str:
    """Genera el contenido de una sección H2"""
    keyword_lower = keyword.lower()
    
    # Contenido base para cada tipo de sección
    content = f"""<h2>{title}</h2>"""
    
    if "Clima" in title or "Temperatura" in title:
        content += """<p>El clima en Tulum durante diciembre es excepcionalmente agradable. Las temperaturas promedio oscilan entre los 24°C (75°F) y los 28°C (82°F), creando condiciones ideales para actividades al aire libre sin el calor extremo de los meses de verano.</p>

<p><strong>Temperaturas promedio en diciembre:</strong></p>
<ul>
<li>Temperatura máxima: 28°C (82°F)</li>
<li>Temperatura mínima: 24°C (75°F)</li>
<li>Temperatura del agua: 26°C (79°F)</li>
</ul>

<p>Los días son mayormente soleados con pocas nubes, lo que permite disfrutar de las playas y actividades al aire libre durante la mayor parte del día. Las lluvias son poco frecuentes y generalmente breves, típicamente ocurriendo durante la tarde o noche.</p>"""
    
    elif "Actividades" in title:
        content += """<p>Diciembre ofrece una amplia variedad de actividades en Tulum que aprovechan el clima perfecto de esta época del año. Desde explorar las icónicas ruinas mayas hasta nadar en cenotes cristalinos, las opciones son numerosas.</p>

<p><strong>Actividades principales en Tulum durante diciembre:</strong></p>
<ul>
<li><strong>Visitar las Ruinas Mayas:</strong> Las ruinas de Tulum son uno de los sitios arqueológicos más fotografiados de México, ubicadas en un acantilado con vistas espectaculares al mar Caribe.</li>
<li><strong>Explorar Cenotes:</strong> Tulum es famoso por sus cenotes sagrados, formaciones naturales de agua dulce que ofrecen experiencias de snorkel y buceo únicas.</li>
<li><strong>Disfrutar de las Playas:</strong> Las playas de Tulum son consideradas entre las más hermosas del Caribe, con arena blanca y aguas turquesas cristalinas.</li>
<li><strong>Practicar Yoga y Wellness:</strong> Tulum es un centro reconocido mundialmente para retiros de yoga, meditación y bienestar.</li>
<li><strong>Vida Nocturna y Gastronomía:</strong> La zona hotelera de Tulum cuenta con una escena gastronómica y nocturna vibrante con restaurantes y bares de clase mundial.</li>
</ul>"""
    
    elif "Hoteles" in title or "Resorts" in title:
        content += """<p>La oferta hotelera en Tulum es diversa y de alta calidad, desde resorts de lujo todo incluido hasta hoteles boutique ecológicos que destacan por su diseño sostenible y arquitectura única.</p>

<p><strong>Categorías de alojamiento en Tulum:</strong></p>
<ul>
<li><strong>Resorts de Lujo:</strong> Ofrecen todas las comodidades, spa, múltiples restaurantes y acceso directo a la playa.</li>
<li><strong>Hoteles Boutique:</strong> Propiedades pequeñas y exclusivas con diseño único y atención personalizada.</li>
<li><strong>Hoteles Ecológicos:</strong> Alojamientos sostenibles que priorizan la conservación del medio ambiente y la integración con la naturaleza.</li>
<li><strong>Hoteles en el Centro:</strong> Opciones más económicas ubicadas en el pueblo de Tulum, cerca de restaurantes locales y tiendas.</li>
</ul>"""
    
    elif "Restaurantes" in title or "Comida" in title:
        content += """<p>La escena gastronómica de Tulum es reconocida internacionalmente, combinando cocina mexicana auténtica con influencias internacionales y un enfoque en ingredientes frescos y locales.</p>

<p><strong>Tipos de restaurantes en Tulum:</strong></p>
<ul>
<li><strong>Cocina Mexicana Auténtica:</strong> Restaurantes que ofrecen platillos tradicionales de la región con ingredientes locales frescos.</li>
<li><strong>Cocina Internacional de Alta Gama:</strong> Restaurantes dirigidos por chefs reconocidos que fusionan técnicas modernas con sabores locales.</li>
<li><strong>Opciones Saludables y Veganas:</strong> Tulum cuenta con numerosos restaurantes enfocados en alimentación saludable, vegana y vegetariana.</li>
<li><strong>Restaurantes en la Playa:</strong> Experiencias culinarias únicas en ubicaciones frente al mar con vistas espectaculares.</li>
</ul>"""
    
    else:
        content += f"""<p>Esta sección proporciona información detallada sobre {keyword.lower()} en Tulum. Es importante considerar varios aspectos al tomar decisiones relacionadas con tu viaje a este destino caribeño.</p>

<p>La experiencia en Tulum se caracteriza por su combinación única de naturaleza, cultura e infraestructura turística de calidad. Cada aspecto contribuye a crear una experiencia memorable para los visitantes.</p>

<p>Al planificar tu visita, es recomendable investigar las opciones disponibles, leer reseñas recientes y considerar tus preferencias personales y presupuesto para tomar las mejores decisiones.</p>"""
    
    return content

def generate_faq(keyword: str, tipo: str) -> str:
    """Genera preguntas frecuentes basadas en la keyword"""
    keyword_lower = keyword.lower()
    
    faq_content = """<h2>Preguntas Frecuentes</h2>"""
    
    # Preguntas específicas según el tipo de keyword
    if "december" in keyword_lower:
        faqs = [
            ("¿Es diciembre un buen mes para visitar Tulum?", "Sí, diciembre es considerado uno de los mejores meses para visitar Tulum. El clima es perfecto con temperaturas cálidas pero no sofocantes, hay menos lluvia que en otros meses y la temporada está en pleno apogeo con muchas actividades y eventos disponibles."),
            ("¿Cuál es la temperatura en Tulum en diciembre?", "En diciembre, las temperaturas en Tulum oscilan entre los 24°C (75°F) y los 28°C (82°F), con temperaturas del agua alrededor de 26°C (79°F). Es un clima ideal para actividades al aire libre y disfrutar de las playas."),
            ("¿Llueve mucho en Tulum en diciembre?", "No, diciembre es parte de la temporada seca en Tulum. Las lluvias son poco frecuentes y generalmente breves. La mayoría de los días son soleados con condiciones ideales para actividades al aire libre."),
            ("¿Está lleno de turistas en Tulum en diciembre?", "Diciembre es temporada alta en Tulum, por lo que hay más turistas que en otros meses. Sin embargo, el destino no se siente abrumadoramente lleno. Es recomendable reservar hoteles y actividades con anticipación."),
        ]
    elif "weather" in keyword_lower or "climate" in keyword_lower:
        faqs = [
            ("¿Cuál es el mejor mes para visitar Tulum en términos de clima?", "El período de noviembre a abril ofrece el mejor clima en Tulum, con temperaturas agradables, menos humedad y pocas lluvias. Diciembre y enero son particularmente populares por su clima casi perfecto."),
            ("¿Qué tan caliente es Tulum durante el año?", "Tulum mantiene temperaturas cálidas todo el año, con promedios entre 24°C (75°F) y 32°C (90°F). Los meses más calurosos son mayo a septiembre, mientras que diciembre a febrero son los más frescos pero aún muy agradables."),
            ("¿Cuándo es la temporada de lluvias en Tulum?", "La temporada de lluvias en Tulum generalmente va de junio a octubre, con septiembre siendo el mes más lluvioso. Sin embargo, las lluvias son típicamente breves y ocurren principalmente por las tardes."),
        ]
    elif "things to do" in keyword_lower or "activities" in keyword_lower:
        faqs = [
            ("¿Cuáles son las actividades imprescindibles en Tulum?", "Las actividades más importantes incluyen visitar las ruinas mayas, explorar cenotes como Gran Cenote o Dos Ojos, disfrutar de las playas, practicar yoga en la playa y explorar la zona hotelera con sus restaurantes y tiendas."),
            ("¿Cuántos días se necesitan para ver Tulum?", "Se recomienda al menos 3-4 días para tener una experiencia completa de Tulum, incluyendo tiempo para las ruinas, cenotes, playas y la vida nocturna. Si también planeas explorar la Riviera Maya, una semana es ideal."),
            ("¿Se puede hacer snorkel en Tulum?", "Sí, hay excelentes oportunidades de snorkel en los cenotes de Tulum y también en las barreras de coral cercanas. Algunos tours incluyen snorkel en el arrecife de coral de la Riviera Maya."),
        ]
    elif "hotels" in keyword_lower or "resorts" in keyword_lower:
        faqs = [
            ("¿Cuál es la mejor zona para hospedarse en Tulum?", "La zona hotelera frente a la playa es la más popular para quienes buscan acceso directo a la playa y la vida nocturna. El pueblo de Tulum ofrece opciones más económicas y acceso a restaurantes locales auténticos."),
            ("¿Cuánto cuesta en promedio un hotel en Tulum?", "Los precios varían ampliamente. Hoteles boutique y resorts de lujo pueden costar desde $150 hasta más de $500 USD por noche. Hay opciones más económicas en el pueblo desde $50 USD por noche."),
            ("¿Es necesario reservar con anticipación en Tulum?", "Sí, especialmente durante temporada alta (diciembre a abril) y en fines de semana largos. Los mejores hoteles se reservan con semanas o meses de anticipación."),
        ]
    else:
        faqs = [
            (f"¿Qué necesito saber sobre {keyword.lower()} en Tulum?", f"Tulum ofrece excelentes opciones relacionadas con {keyword.lower()}. Es importante investigar las opciones disponibles, leer reseñas recientes y reservar con anticipación durante temporada alta."),
            ("¿Cuándo es la mejor época para visitar Tulum?", "El período de noviembre a abril ofrece las mejores condiciones climáticas. Diciembre y enero son particularmente populares por su clima perfecto, aunque también son los meses con más turistas."),
        ]
    
    # Generar HTML para FAQs
    for question, answer in faqs:
        faq_content += f"""
<p><strong>{question}</strong></p>
<p>{answer}</p>
"""
    
    return faq_content

def generate_full_content(keyword: str, secondary_keywords: str, tipo: str, url_raiz: str, nota: str) -> str:
    """Genera el contenido completo del artículo con mejor calidad"""
    structure = determine_content_structure(keyword, tipo)
    
    content_parts = []
    
    # H1 principal (agregar al inicio del contenido)
    content_parts.append(f"<h1>{structure['h1']}</h1>")
    
    # Introducción mejorada
    intro = generate_intro(keyword, tipo)
    content_parts.append(intro)
    
    # Secciones H2 con contenido más detallado
    for i, h2_title in enumerate(structure["h2_sections"], 1):
        section_content = generate_h2_section(h2_title, keyword, tipo, i)
        content_parts.append(section_content)
    
    # Sección adicional con tips prácticos
    if tipo == "Comercial":
        content_parts.append("""<h2>Consejos Prácticos para tu Visita</h2>
<p>Para aprovechar al máximo tu experiencia en Tulum, considera estos consejos prácticos:</p>
<ul>
<li><strong>Reserva con anticipación:</strong> Especialmente durante temporada alta (diciembre a abril), reserva hoteles, tours y restaurantes con al menos 2-3 meses de anticipación.</li>
<li><strong>Presupuesto:</strong> Tulum puede ser costoso, especialmente en la zona hotelera. Planifica tu presupuesto considerando comidas, actividades y alojamiento.</li>
<li><strong>Transporte:</strong> Considera rentar una bicicleta para moverte por la zona hotelera, o usa taxis que son abundantes pero establecen sus precios.</li>
<li><strong>Moneda:</strong> Lleva efectivo (pesos mexicanos) para lugares pequeños, aunque la mayoría acepta tarjetas de crédito.</li>
<li><strong>Seguridad:</strong> Tulum es relativamente seguro, pero como en cualquier destino turístico, mantén tus objetos de valor seguros y sé consciente de tu entorno.</li>
</ul>""")
    
    # Conclusión mejorada
    conclusion = f"""<h2>Conclusión</h2>
<p>Tulum ofrece una experiencia única que combina lo mejor de la naturaleza, la cultura y el turismo moderno. Ya sea que busques relajación en playas paradisíacas, aventura en cenotes sagrados, exploración de ruinas históricas o experiencias gastronómicas excepcionales, este destino caribeño tiene algo especial para cada visitante.</p>

<p>Al planificar tu viaje a Tulum, considera la información proporcionada en esta guía para tomar decisiones informadas que maximicen tu experiencia. Recuerda reservar con anticipación durante temporada alta y mantener flexibilidad para disfrutar de todo lo que este increíble destino tiene para ofrecer.</p>

<p>Con esta guía completa, estás listo para planificar y disfrutar de una experiencia inolvidable en uno de los destinos más hermosos y emocionantes de México. ¡Que disfrutes tu viaje a Tulum!</p>"""
    content_parts.append(conclusion)
    
    # FAQ mejorada
    if structure["needs_faq"]:
        content_parts.append(generate_faq(keyword, tipo))
    
    return "\n\n".join(content_parts)

def process_csv_row(row: List[str], output_dir: Path) -> Dict:
    """Procesa una fila del CSV y genera el contenido SEO"""
    if len(row) < 7:
        return None
    
    keyword = row[0].strip()
    url_raiz = row[1].strip() if len(row) > 1 else ""
    secondary_keywords = row[2].strip() if len(row) > 2 else ""
    tipo = row[3].strip() if len(row) > 3 else "Informativo"
    volume = row[4].strip() if len(row) > 4 else ""
    urls_ejemplos = row[5].strip() if len(row) > 5 else ""
    nota = row[6].strip() if len(row) > 6 else ""
    
    if not keyword:
        return None
    
    # Generar slug desde la URL raíz o keyword
    if url_raiz:
        slug = url_raiz.split('/')[-1] if '/' in url_raiz else keyword.lower().replace(' ', '-')
    else:
        slug = keyword.lower().replace(' ', '-')
    
    # Generar título y meta mejorados
    structure = determine_content_structure(keyword, tipo)
    title = structure["h1"]
    
    # Meta title optimizado (máximo 60 caracteres)
    if len(title) > 55:
        meta_title = f"{title[:52]}... | TulumTkts 2025"
    else:
        meta_title = f"{title} | TulumTkts 2025"
    
    # Meta description mejorada y más atractiva (140-160 caracteres)
    keyword_esp = translate_keyword_to_spanish(keyword)
    
    if tipo == "Comercial":
        if "hotels" in keyword.lower() or "resorts" in keyword.lower():
            meta_desc = "Compara y reserva los mejores hoteles en Tulum. Opciones de lujo, boutique y económicas. Guía completa con precios y ubicaciones 2025."
        elif "restaurants" in keyword.lower():
            meta_desc = "Descubre los mejores restaurantes en Tulum. Cocina mexicana auténtica, internacional y opciones veganas. Reserva tu mesa en lugares únicos."
        elif "things to do" in keyword.lower():
            meta_desc = "Las mejores actividades en Tulum: cenotes, ruinas mayas, playas y tours. Guía completa con recomendaciones y precios actualizados 2025."
        else:
            meta_desc = f"Encuentra las mejores opciones de {keyword_esp.lower()} en Tulum. Recomendaciones, precios y consejos actualizados para tu viaje 2025."
    else:
        if "december" in keyword.lower():
            meta_desc = "Tulum en diciembre: clima perfecto, actividades imperdibles y eventos especiales. Guía completa para planificar tu viaje ideal 2025."
        elif "weather" in keyword.lower():
            meta_desc = "Clima en Tulum por meses: temperaturas, lluvias y mejores épocas para visitar. Información detallada y actualizada para tu viaje."
        else:
            meta_desc = f"Información completa sobre {keyword_esp.lower()} en Tulum. Guía detallada con todo lo que necesitas saber para tu viaje 2025."
    
    # Asegurar longitud óptima (140-160 caracteres)
    if len(meta_desc) > 160:
        meta_desc = meta_desc[:157] + "..."
    
    # Generar excerpt mejorado
    if tipo == "Comercial":
        if "hotels" in keyword.lower():
            excerpt = "Encuentra el hotel perfecto en Tulum. Compara opciones de lujo, boutique y ecológicas. Reserva con las mejores tarifas disponibles."
        elif "restaurants" in keyword.lower():
            excerpt = "Descubre la mejor gastronomía de Tulum. Restaurantes de playa, comida mexicana auténtica y opciones internacionales únicas."
        elif "things to do" in keyword.lower():
            excerpt = "Explora las mejores actividades en Tulum: cenotes sagrados, ruinas mayas y playas paradisíacas. Planifica tu itinerario perfecto."
        else:
            excerpt = f"Descubre las mejores opciones de {keyword_esp.lower()} en Tulum. Recomendaciones actualizadas con precios y consejos útiles."
    else:
        if "december" in keyword.lower():
            excerpt = "Diciembre es uno de los mejores meses para visitar Tulum. Clima perfecto, eventos especiales y actividades increíbles te esperan."
        elif "weather" in keyword.lower():
            excerpt = "Conoce el clima de Tulum mes a mes. Temperaturas, lluvias y mejores épocas para visitar con información precisa y actualizada."
        else:
            excerpt = f"Información completa sobre {keyword_esp.lower()} en Tulum. Guía detallada para planificar tu viaje perfecto."
    
    # Generar contenido
    content = generate_full_content(keyword, secondary_keywords, tipo, url_raiz, nota)
    
    # Extraer keywords
    keywords_list = extract_keyword_variations(keyword, secondary_keywords)
    
    # Determinar categoría
    category_map = {
        "Informativo": "Guías de Viaje",
        "Comercial": "Recomendaciones"
    }
    category = category_map.get(tipo, "Guías de Viaje")
    
    # Generar pexels query
    pexels_query = f"tulum mexico {keyword.lower()}"
    
    return {
        "id": slug,
        "slug": slug,
        "title": title,
        "metaTitle": meta_title,
        "metaDescription": meta_desc,
        "excerpt": excerpt,
        "category": category,
        "author": "Equipo TulumTkts",
        "publishDate": datetime.now().strftime("%Y-%m-%d"),
        "readTime": f"{len(content.split()) // 200} min",
        "views": 0,
        "featured": False,
        "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "pexelsQuery": pexels_query,
        "keywords": keywords_list,
        "type": tipo.lower(),
        "content": content
    }

def main():
    """Función principal para generar contenido SEO"""
    import sys
    
    # Verificar si se quiere generar todos los artículos
    generate_all = '--all' in sys.argv
    
    csv_file = Path("Contenido - Primer jale.csv")
    output_dir = Path("generated-content")
    output_dir.mkdir(exist_ok=True)
    
    # Leer CSV
    articles = []
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        rows = list(reader)
        
        # Determinar cuántas filas procesar
        if generate_all:
            rows_to_process = rows[1:]  # Todas las filas excepto el header
            print(f"📝 Generando TODOS los artículos ({len(rows_to_process)} filas)...\n")
        else:
            rows_to_process = rows[1:21]  # Solo las primeras 20 como ejemplo
            print(f"📝 Generando contenido de ejemplo (20 filas)...\n")
        
        for i, row in enumerate(rows_to_process, 1):
            try:
                article = process_csv_row(row, output_dir)
                if article:
                    articles.append(article)
                    
                    # Guardar artículo individual
                    article_file = output_dir / f"{article['slug']}.json"
                    with open(article_file, 'w', encoding='utf-8') as af:
                        json.dump(article, af, ensure_ascii=False, indent=2)
                    
                    if i % 10 == 0 or not generate_all:
                        print(f"✅ [{i}/{len(rows_to_process)}] Generado: {article['title']}")
            except Exception as e:
                print(f"❌ Error procesando fila {i}: {e}")
                continue
    
    # Guardar todos los artículos en un archivo
    all_articles_file = output_dir / "all-articles.json"
    with open(all_articles_file, 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    
    print(f"\n🎉 Generados {len(articles)} artículos SEO")
    print(f"📁 Archivos guardados en: {output_dir}")
    if not generate_all:
        print(f"\n💡 Para generar TODOS los artículos, ejecuta:")
        print(f"   python3 scripts/generate-seo-content.py --all")

if __name__ == "__main__":
    main()

