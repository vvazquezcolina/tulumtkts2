# Guía de Deployment en Vercel

## ✅ Proyecto preparado y subido a GitHub

**Repositorio:** https://github.com/vvazquezcolina/tulumtkts2.git

## Pasos para Deploy en Vercel

### 1. Conectar el Repositorio

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **"New Project"**
3. Importa el repositorio: `vvazquezcolina/tulumtkts2`
4. Vercel detectará automáticamente la configuración

### 2. Configurar Variables de Entorno

En la configuración del proyecto en Vercel, agrega estas variables de entorno:

```
TRAVELPAYOUTS_API_TOKEN=9a350c3ebd492165ade7135359165af9
TRAVELPAYOUTS_MARKER=9a350c3ebd492165ade7135359165af9
NODE_ENV=production
```

**Cómo agregar:**
- Ve a **Settings** → **Environment Variables**
- Agrega cada variable una por una
- Asegúrate de seleccionar todos los ambientes (Production, Preview, Development)

### 3. Configuración de Build (Automática)

Vercel detectará automáticamente:
- **Build Command:** `npm run vercel-build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Framework:** Other (detectado automáticamente)

### 4. Deploy

1. Click en **"Deploy"**
2. Vercel construirá y desplegará tu aplicación
3. Una vez completado, recibirás una URL (ej: `tulumtkts2.vercel.app`)

## Verificación Post-Deploy

Después del deploy, verifica:

1. **API Status:** `https://tu-dominio.vercel.app/api/travelpayouts/status`
2. **Experiencias:** `https://tu-dominio.vercel.app/experiencias`
3. **Home:** `https://tu-dominio.vercel.app/`

## Notas Importantes

- ✅ El archivo `.env` está en `.gitignore` (no se sube al repo)
- ✅ Las variables de entorno deben configurarse en Vercel
- ✅ El build genera tanto el frontend (dist/public) como el backend (dist/index.js)
- ✅ Vercel usará `@vercel/node` para ejecutar el servidor Express

## Troubleshooting

Si hay problemas en el deploy:

1. Revisa los logs de build en Vercel
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que `TRAVELPAYOUTS_API_TOKEN` esté correctamente configurado
4. Revisa que el archivo `vercel.json` esté en la raíz del proyecto

## Estructura de Deploy

```
Vercel Serverless Functions:
  - server/index.ts → Función principal que maneja todas las rutas
  - API routes: /api/*
  - Frontend: Todas las demás rutas → SPA React
```

