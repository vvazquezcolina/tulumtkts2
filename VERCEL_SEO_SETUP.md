# Configuración SEO para Vercel - TulumTkts

## ✅ Cambios Implementados para Producción en Vercel

### 1. Script de Generación de Sitemap Data
- **Archivo**: `scripts/generate-sitemap-data.mjs`
- **Función**: Genera un archivo JSON con todos los datos del blog necesarios para el sitemap
- **Cuándo se ejecuta**: Automáticamente antes del build (`prebuild` script)
- **Output**: `public/sitemap-blog-data.json` y `dist/public/sitemap-blog-data.json`

### 2. Configuración de Build
- **Pre-build**: Genera el JSON con datos del blog
- **Build**: Vite copia automáticamente los archivos de `public/` a `dist/public/`
- **Post-build**: Copia explícita del JSON al output directory

### 3. Rutas en Vercel
- **`/sitemap.xml`** → Rewrite a `/api/sitemap` (manejado por serverless function)
- **`/robots.txt`** → Rewrite a `/api/robots` (manejado por serverless function)
- **Headers**: Configurados en `vercel.json` para cache y content-type correctos

### 4. Endpoints API
- **`/api/sitemap`**: Genera el sitemap XML dinámicamente
- **`/api/robots`**: Genera el robots.txt dinámicamente
- **Detectan URL**: Automáticamente usando `VERCEL_URL` o `req.host`

### 5. Fallbacks Implementados
- **Detección de URL**: 
  1. `SITE_URL` (env var)
  2. `VERCEL_URL` (automático en Vercel)
  3. `req.protocol + '://' + req.get('host')` (fallback)
  
- **Lectura de JSON**:
  1. `dist/public/sitemap-blog-data.json` (producción)
  2. `public/sitemap-blog-data.json` (desarrollo)
  3. Lectura directa de archivos TypeScript (fallback)

## 📋 Variables de Entorno en Vercel

Configura estas variables en el dashboard de Vercel (Settings → Environment Variables):

```
SITE_URL=https://tu-dominio.com  # (Opcional, se detecta automáticamente)
```

## 🚀 Verificación Post-Deploy

Después de hacer deploy en Vercel, verifica:

1. **Sitemap**: `https://tu-dominio.com/sitemap.xml`
   - Debe mostrar XML válido
   - Debe incluir todas las páginas estáticas + 102 blogs

2. **Robots**: `https://tu-dominio.com/robots.txt`
   - Debe mostrar las reglas
   - Debe incluir referencia al sitemap

3. **Google Search Console**:
   - Envía el sitemap manualmente: `https://tu-dominio.com/sitemap.xml`
   - Verifica que no haya errores

## 🔍 Debugging en Vercel

Si el sitemap no funciona:

1. **Revisa los logs de Vercel**:
   - Ve a tu proyecto en Vercel
   - Tab "Deployments" → Click en el último deploy
   - Tab "Functions" → Revisa logs de `/api/sitemap`

2. **Verifica que el JSON existe**:
   - El script debería ejecutarse durante el build
   - Busca en los logs: "✅ Generated sitemap data"

3. **Verifica las rutas**:
   - Las rutas `/sitemap.xml` y `/robots.txt` deberían funcionar
   - Si no, verifica `vercel.json` rewrites

## 📝 Notas Importantes

- El sitemap se genera dinámicamente en cada request (con cache de 1 hora)
- El JSON se genera durante el build, no en runtime
- Si agregas nuevos blogs, necesitas hacer redeploy para que aparezcan en el sitemap
- El script detecta automáticamente la URL del sitio en Vercel

## ✅ Checklist Pre-Deploy

- [ ] Script `generate-sitemap-data.mjs` funciona localmente
- [ ] Archivo `public/sitemap-blog-data.json` se genera correctamente
- [ ] Variable `SITE_URL` está configurada en Vercel (opcional)
- [ ] `vercel.json` tiene los rewrites correctos
- [ ] Build exitoso sin errores

## 🎯 Próximos Pasos Después del Deploy

1. **Google Search Console**:
   - Agrega tu propiedad
   - Envía el sitemap: `https://tu-dominio.com/sitemap.xml`
   - Verifica indexación

2. **Bing Webmaster Tools**:
   - Agrega tu sitio
   - Envía el mismo sitemap

3. **Verificación SEO**:
   - Usa herramientas como Screaming Frog para verificar todas las URLs
   - Verifica structured data con Schema.org Validator
   - Verifica OG tags con Facebook Debugger

