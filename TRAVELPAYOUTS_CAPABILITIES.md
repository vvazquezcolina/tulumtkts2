# Travelpayouts API - Capacidades Disponibles

## ✅ Lo que ya está implementado y funcionando

### 1. **Vuelos** ✈️
- ✅ Búsqueda de vuelos económicos (`/v1/prices/cheap`)
- ✅ Direcciones de ciudad (`/v1/city-directions`)
- ✅ Generación de links de afiliado para vuelos
- **Datos disponibles:**
  - Precios de vuelos
  - Aerolíneas
  - Fechas de salida/regreso
  - Número de escalas
  - Números de vuelo
  - Fechas de expiración de precios

### 2. **Hoteles** 🏨
- ✅ Generación de links de afiliado para hoteles
- ⚠️ **Nota:** La búsqueda de hoteles requiere API adicional (Hotellook API) que puede requerir aprobación

### 3. **Actividades/Tours** 🎯
- ✅ Sistema de datos de actividades de Tulum (mock data con links de afiliado)
- ⚠️ **Nota:** Travelpayouts no tiene API directa de actividades, pero ofrece:
  - **Viator Data Feed** (requiere aprobación)
  - **WeGoTrip API** (requiere aprobación)

## 🔄 Lo que se puede agregar fácilmente

### 4. **Vuelos Mensuales** 📅
- Precios mensuales de vuelos para un destino
- Endpoint: `/v1/prices/monthly`
- Útil para mostrar calendarios de precios

### 5. **Calendario de Precios** 📆
- Precios por día del mes
- Endpoint: `/v1/prices/calendar`
- Ideal para widgets de búsqueda de vuelos

### 6. **Aeropuertos y Ciudades** 🗺️
- Lista de aeropuertos
- Lista de ciudades
- Códigos IATA/ICAO
- Endpoint: `/data/airports.json` y `/data/cities.json`

### 7. **Estadísticas de Afiliados** 📊
- Balance de cuenta
- Estadísticas de reservas
- Pagos recibidos
- Endpoint: Requiere API de estadísticas (puede requerir aprobación)

## 🚀 APIs Adicionales (Requieren Aprobación)

### 8. **Alquiler de Coches** 🚗
- **DiscoverCars API**
- Ubicaciones activas
- Tipos de vehículos
- Políticas de combustible
- Métodos de pago

### 9. **Traslados** 🚐
- **GetTransfer API**
- Información sobre traslados
- Crear solicitudes de traslado

### 10. **eSIM para Viajeros** 📱
- **Airalo Data Feed**
- Precios de eSIM por país
- Período de validez
- Operadores disponibles

### 11. **Tours y Actividades** (APIs Externas)
- **Viator Data Feed**
  - Tours con descuento
  - Fotos y descripciones
  - Precios y enlaces
  
- **WeGoTrip API**
  - Tours disponibles
  - Idiomas soportados
  - Reseñas de productos

## 📝 Endpoints Disponibles con tu Token Actual

Con el token `9a350c3ebd492165ade7135359165af9` puedes usar:

1. ✅ `/v1/city-directions` - Direcciones de vuelos entre ciudades
2. ✅ `/v1/prices/cheap` - Vuelos más económicos
3. ✅ `/v1/prices/monthly` - Precios mensuales
4. ✅ `/v1/prices/calendar` - Calendario de precios
5. ✅ `/data/airports.json` - Lista de aeropuertos
6. ✅ `/data/cities.json` - Lista de ciudades
7. ✅ `/data/airlines.json` - Lista de aerolíneas

## 💡 Recomendaciones para TulumTkts

Para tu sitio de Tulum, las funcionalidades más útiles serían:

1. **Búsqueda de Vuelos a Cancún/Tulum** (CUN airport)
   - Mostrar vuelos económicos desde diferentes ciudades
   - Calendario de precios mensual
   - Widget de búsqueda de vuelos

2. **Hoteles en Tulum y Riviera Maya**
   - Integrar con Hotellook API (si está disponible)
   - Generar links de afiliado para hoteles

3. **Tours y Actividades**
   - Solicitar acceso a Viator Data Feed o WeGoTrip API
   - O mantener el sistema actual con datos mock pero con links de Travelpayouts

4. **Traslados desde el Aeropuerto**
   - Integrar GetTransfer API para traslados desde CUN a Tulum

5. **eSIM para Viajeros**
   - Agregar opción de eSIM para México
   - Útil para turistas internacionales

## 🔗 Links de Afiliado Disponibles

- **Aviasales** - Vuelos (aviasales.com)
- **Hotellook** - Hoteles (hotellook.com)
- **Travelpayouts** - Búsqueda general de viajes



