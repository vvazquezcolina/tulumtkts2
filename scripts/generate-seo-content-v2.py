#!/usr/bin/env python3
"""
Script mejorado para generar contenido SEO de alta calidad
Versión mejorada con contenido más detallado y natural
"""

import csv
import re
import json
from pathlib import Path
from datetime import datetime
from typing import List, Dict

# Mejores traducciones al español natural
TRANSLATIONS = {
    # Meses
    "december": "diciembre", "january": "enero", "february": "febrero",
    "march": "marzo", "april": "abril", "may": "mayo", "june": "junio",
    "july": "julio", "august": "agosto", "september": "septiembre",
    "october": "octubre", "november": "noviembre",
    
    # Actividades y cosas
    "things to do": "cosas que hacer",
    "activities": "actividades",
    "tours": "tours",
    "attractions": "atracciones",
    
    # Alojamiento
    "hotels": "hoteles",
    "hotel": "hotel",
    "resorts": "resorts",
    "resort": "resort",
    "all inclusive": "todo incluido",
    "accommodations": "alojamientos",
    "airbnb": "airbnb",
    "villas": "villas",
    "villa": "villa",
    "boutique": "boutique",
    
    # Comida
    "restaurants": "restaurantes",
    "restaurant": "restaurante",
    "food": "comida",
    "tacos": "tacos",
    "breakfast": "desayuno",
    "lunch": "almuerzo",
    "dinner": "cena",
    
    # Lugar
    "beach": "playa",
    "beaches": "playas",
    "cenote": "cenote",
    "cenotes": "cenotes",
    "area": "zona",
    "areas": "zonas",
    
    # Clima
    "weather": "clima",
    "climate": "clima",
    "warm": "cálido",
    "rain": "lluvia",
    "temperature": "temperatura",
    
    # Otros
    "best": "mejores",
    "top": "mejores",
    "bars": "bares",
    "bar": "bar",
    "nightlife": "vida nocturna",
    "events": "eventos",
    "shopping": "compras",
    "spa": "spa",
    "yoga": "yoga",
}

def translate_natural(keyword: str) -> str:
    """Traduce keywords a español natural y fluido"""
    keyword_lower = keyword.lower()
    
    # Frases comunes completas
    if "things to do" in keyword_lower:
        keyword_lower = keyword_lower.replace("things to do", "cosas que hacer")
    if "best time to visit" in keyword_lower:
        keyword_lower = keyword_lower.replace("best time to visit", "mejor momento para visitar")
    if "all inclusive" in keyword_lower:
        keyword_lower = keyword_lower.replace("all inclusive", "todo incluido")
    if "adults only" in keyword_lower:
        keyword_lower = keyword_lower.replace("adults only", "solo adultos")
    
    # Traducir palabra por palabra
    words = keyword_lower.split()
    translated = []
    
    for word in words:
        clean_word = word.strip('.,!?;:')
        if clean_word in TRANSLATIONS:
            translated.append(TRANSLATIONS[clean_word])
        elif clean_word in ["tulum", "mexico", "mexico"]:
            continue  # Omitir estas palabras comunes
        elif clean_word.startswith("5"):
            translated.append("5 estrellas" if "star" in words[words.index(word)+1:words.index(word)+3] else word)
        else:
            translated.append(word)
    
    result = " ".join(translated).strip()
    # Limpiar espacios múltiples
    result = re.sub(r'\s+', ' ', result)
    
    return result

def generate_improved_title(keyword: str, tipo: str) -> str:
    """Genera títulos mejorados y más atractivos"""
    keyword_lower = keyword.lower()
    keyword_clean = keyword.replace("best ", "").replace("top ", "").replace(" in tulum", "").replace(" tulum", "").replace(" mexico", "")
    
    # Casos especiales
    if "tulum in december" == keyword_lower:
        return "Tulum en Diciembre 2025: Guía Completa del Clima, Actividades y Experiencias"
    
    if "is december a good time to visit tulum" == keyword_lower:
        return "¿Es Diciembre Buen Momento para Visitar Tulum? Todo lo que Necesitas Saber 2025"
    
    if "10 best things to do" in keyword_lower:
        return "Las 10 Mejores Cosas que Hacer en Tulum: Guía Definitiva 2025"
    
    if "best things to do" in keyword_lower or "things to do" in keyword_lower:
        return "Las Mejores Cosas que Hacer en Tulum: Actividades Imperdibles y Experiencias Únicas"
    
    if "best hotels" in keyword_lower or "best resorts" in keyword_lower:
        if "adults only" in keyword_lower:
            return "Los Mejores Hoteles Solo Adultos en Tulum: Guía de Reservas 2025"
        if "all inclusive" in keyword_lower:
            return "Los Mejores Resorts Todo Incluido en Tulum: Guía Completa 2025"
        return "Los Mejores Hoteles y Resorts en Tulum: Donde Hospedarse en 2025"
    
    if "best restaurants" in keyword_lower:
        return "Los Mejores Restaurantes en Tulum: Guía Gastronómica Completa 2025"
    
    if "best beach" in keyword_lower:
        return "Las Mejores Playas de Tulum: Guía Completa de Arenas Paradisíacas"
    
    if "best cenote" in keyword_lower:
        return "Los Mejores Cenotes de Tulum: Guía Completa para Explorar Aguas Sagradas"
    
    if "weather" in keyword_lower or "climate" in keyword_lower:
        return "Clima en Tulum: Guía Completa del Tiempo por Meses 2025"
    
    # Títulos genéricos mejorados
    if tipo == "Comercial":
        if keyword_clean.startswith("best ") or keyword_clean.startswith("top "):
            clean = keyword_clean.replace("best ", "").replace("top ", "")
            clean_esp = translate_natural(clean)
            return f"Los Mejores {clean_esp.title()} en Tulum: Guía Completa 2025"
        else:
            clean_esp = translate_natural(keyword_clean)
            return f"Mejores Opciones de {clean_esp.title()} en Tulum 2025"
    
    else:  # Informativo
        if keyword_clean.startswith(("is ", "does ", "can ")):
            clean_esp = translate_natural(keyword_clean)
            return f"¿{clean_esp.title()}? Guía Completa para Tulum 2025"
        else:
            clean_esp = translate_natural(keyword_clean)
            return f"{clean_esp.title()} en Tulum: Guía Completa 2025"
    
    return translate_natural(keyword).title()

def generate_improved_meta_description(keyword: str, tipo: str, title: str) -> str:
    """Genera meta descriptions optimizadas y convincentes"""
    keyword_lower = keyword.lower()
    keyword_esp = translate_natural(keyword)
    
    if tipo == "Comercial":
        if "hotels" in keyword_lower or "resorts" in keyword_lower:
            return f"Descubre los mejores hoteles y resorts en Tulum. Compara opciones, precios y servicios. Reserva tu estancia perfecta con nuestra guía completa actualizada 2025."
        
        if "restaurants" in keyword_lower or "food" in keyword_lower:
            return f"Explora los mejores restaurantes en Tulum. Desde comida mexicana auténtica hasta opciones internacionales. Guía completa con recomendaciones y reseñas actualizadas 2025."
        
        if "things to do" in keyword_lower or "activities" in keyword_lower:
            return f"Descubre las mejores actividades y cosas que hacer en Tulum. Playas, cenotes, ruinas mayas y más. Guía completa con recomendaciones y consejos para tu viaje 2025."
        
        return f"Encuentra las mejores opciones de {keyword_esp} en Tulum. Guía completa con recomendaciones, precios y consejos actualizados para 2025. Reserva tu experiencia perfecta."
    
    else:  # Informativo
        if "december" in keyword_lower:
            return f"Descubre todo sobre Tulum en diciembre: clima perfecto, temperaturas ideales, actividades imperdibles y eventos especiales. Guía completa para planificar tu viaje 2025."
        
        if "weather" in keyword_lower or "climate" in keyword_lower:
            return f"Información completa sobre el clima en Tulum por meses. Temperaturas, lluvias, mejores épocas para visitar y qué esperar del tiempo. Guía actualizada 2025."
        
        return f"Información completa sobre {keyword_esp} en Tulum. Guía detallada con todo lo que necesitas saber para planificar tu viaje perfecto 2025."
    
    return f"Guía completa sobre {keyword_esp} en Tulum. Información actualizada, recomendaciones y consejos para tu viaje 2025."

def generate_improved_excerpt(keyword: str, tipo: str) -> str:
    """Genera excerpts más atractivos y convincentes"""
    keyword_lower = keyword.lower()
    keyword_esp = translate_natural(keyword)
    
    if tipo == "Comercial":
        if "hotels" in keyword_lower:
            return "Encuentra el hotel perfecto en Tulum. Compara opciones de lujo, boutique y ecológicos. Reserva con las mejores tarifas y promociones disponibles."
        
        if "restaurants" in keyword_lower:
            return "Descubre la mejor gastronomía de Tulum. Restaurantes de playa, comida mexicana auténtica y opciones internacionales. Reserva tu mesa en los mejores lugares."
        
        if "things to do" in keyword_lower:
            return "Explora las mejores actividades en Tulum: cenotes sagrados, ruinas mayas, playas paradisíacas y experiencias únicas. Planifica tu itinerario perfecto."
        
        return f"Descubre las mejores opciones de {keyword_esp} en Tulum. Recomendaciones actualizadas con precios, ubicaciones y consejos para tu viaje."
    
    else:  # Informativo
        if "december" in keyword_lower:
            return "Diciembre es uno de los mejores meses para visitar Tulum. Clima perfecto, eventos especiales y actividades increíbles. Descubre todo lo que necesitas saber."
        
        if "weather" in keyword_lower:
            return "Conoce el clima de Tulum mes a mes. Temperaturas, lluvias y mejores épocas para visitar. Planifica tu viaje con información precisa y actualizada."
        
        return f"Información completa sobre {keyword_esp} en Tulum. Guía detallada para planificar tu viaje con datos actualizados y consejos útiles."
    
    return f"Guía completa sobre {keyword_esp} en Tulum. Información actualizada para planificar tu viaje perfecto."

# ... continuará con más mejoras en el siguiente paso

