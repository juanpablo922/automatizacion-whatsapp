# Petit Bébé - WhatsApp Business Suite

Una plataforma integral de onboarding, verificación oficial, bot de pauta, enrutamiento multiagente y cierre de ventas para Petit Bébé.

## 🚀 Características

- ✅ **Identidad de Negocio**: Configuración de marca y datos de contacto
- ✅ **Perfil de Bot**: Setup del bot con cupones y promociones
- ✅ **Asesoras Inteligentes**: Gestión de múltiples asesoras con enrutamiento
- ✅ **Handoff de Catálogo**: Transición sin fricción entre bot y humano
- ✅ **Overview 360°**: Presentación completa del embudo de ventas

## 📋 Tech Stack

- **React 19** + **TypeScript**
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **Material Symbols** para iconografía
- Fuentes: Inter + Plus Jakarta Sans

## 🔧 Instalación Local

### Requisitos previos
- Node.js 18+
- npm o yarn

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/juanpablo922/automatizacion-whatsapp.git
cd automatizacion-whatsapp

# 2. Instalar dependencias
npm install

# 3. Ejecutar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# Automáticamente se abre en http://localhost:3000
```

## 🏗️ Construcción y Despliegue

### Build para producción
```bash
npm run build
```

Esto genera los archivos optimizados en la carpeta `dist/`.

### Publicar en GitHub Pages

El repositorio está configurado con GitHub Actions. Los pasos son:

1. **Configurar GitHub Pages en el repositorio**:
   - Ve a Settings → Pages
   - En "Build and deployment" selecciona **GitHub Actions**
   - Guarda los cambios

2. **Hacer push a main**:
   ```bash
   git add .
   git commit -m "Tu mensaje"
   git push origin main
   ```

3. **Esperar a que se complete el workflow**:
   - Ve a Actions en tu repo
   - Verifica que el workflow `Deploy to GitHub Pages` se complete correctamente

4. **Acceder al sitio**:
   ```
   https://juanpablo922.github.io/automatizacion-whatsapp/
   ```

## 📁 Estructura del Proyecto

```
automatizacion-whatsapp/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx
│   │   ├── Step1Identity.tsx
│   │   ├── Step2ProfileBot.tsx
│   │   ├── Step3AutoResponder.tsx
│   │   ├── Step4CatalogHandoff.tsx
│   │   ├── Step5Overview360.tsx
│   │   ├── ProductModal.tsx
│   │   ├── ChatLiveModal.tsx
│   │   ├── RegisterAgentModal.tsx
│   │   └── PdfSummaryModal.tsx
│   ├── App.tsx              # Componente raíz
│   ├── main.tsx             # Punto de entrada
│   ├── index.css            # Estilos globales
│   └── types.ts             # Tipos TypeScript
├── public/                  # Activos estáticos
├── .github/workflows/       # GitHub Actions
├── index.html               # HTML principal
├── vite.config.ts           # Configuración de Vite
├── tsconfig.json            # Configuración de TypeScript
├── tailwind.config.ts       # Configuración de Tailwind
└── package.json             # Dependencias
```

## 🌍 Variables de Entorno

- `VITE_APP_ENV`: Establecida automáticamente en GitHub Actions como `production`
- `DISABLE_HMR`: Configurada a `false` en desarrollo (puede ser `true` en AI Studio)

## 🔐 Notas de Seguridad

- El flujo cumple con normas de privacidad para datos de recién nacido
- Cifrado de extremo a extremo en cada sesión
- Tokens de GitHub y credenciales manejados de forma segura en Actions

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Compila para producción
npm run preview  # Vista previa de la build
npm run lint     # Verifica tipos TypeScript
npm run clean    # Limpia dist y node_modules
```

## 🐛 Troubleshooting

### La app muestra página en blanco

**Problema**: El navegador no carga la aplicación correctamente.

**Solución**:
1. Abre las Developer Tools (F12)
2. Ve a la pestaña **Console** y busca errores
3. Borra el caché del navegador (Ctrl+Shift+Del)
4. Recarga la página

### El build falla en GitHub Actions

**Problema**: El workflow reporta error en la construcción.

**Solución**:
1. Ve a Actions → último workflow fallido
2. Lee el log para ver el error específico
3. Comúnmente es por dependencias faltantes: ejecuta `npm ci` localmente
4. Haz commit de `package-lock.json` si falta

### GitHub Pages no actualiza

**Problema**: Cambios no se reflejan en el sitio publicado.

**Solución**:
1. Asegúrate que el workflow completó exitosamente
2. Borra caché del navegador
3. Espera 2-3 minutos después del deploy
4. Verifica que la rama `gh-pages` tenga contenido en Settings

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en el repositorio.

---

**Última actualización**: 2026-10-06  
**Versión**: 1.0.0
