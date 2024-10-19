    🎃 SombrIAs Creaaciones 🎃

Bienvenido a **SombrIAs Creaciones**, una web diseñada para participar de la [Hackathon de Cloudinary]("https://cloudinary.com/blog/cloudinary-cloudcreate-spooky-ai-hackathon") en colaboración con [MiduDev]("https://x.com/midudev") (Miguel Ángel Durán), con temática de Halloween. Donde utilizando la inteligencia artificial de Cloudinary, podrás subir una foto y probarte diversos disfraces de monstruos y personajes temáticos de Halloween. Además, podrás sumergirte en escenarios espeluznantes generados automáticamente por IA. ¡Todo esto con un par de clics!

## 🖼️ Imágenes de la web

![Inicio]("https://res.cloudinary.com/doh9z4wqr/image/upload/v1729296454/SombrIAs_Creaciones_yxwehf.png")

![Editor]("https://res.cloudinary.com/doh9z4wqr/image/upload/v1729296454/SombrIAs_Creaciones_2_g9qynk.png")

![Imagen generada]("https://res.cloudinary.com/doh9z4wqr/image/upload/v1729296456/SombrIAs_Creaciones_3_bzrreq.png")

## 🚀 Características del Proyecto

- **Generación de disfraces y escenarios de Halloween:** Sube una foto y la IA integrada de Cloudinary, te permitirá transformarte en una amplia variedad de disfraces y colocarte en entornos terroríficos.
- **Interfaz moderna y personalizable:** Desarrollado con **Next.js**, el sitio es rápido, escalable y optimizado para una experiencia de usuario de alto rendimiento.
- **Estilos personalizados:** Gracias a **TailwindCSS** y **Shadcn**, los diseños son totalmente responsivos, fáciles de personalizar y estéticamente atractivos, con un toque tenebroso perfecto para la temática.
- **Lenguaje Tipado:** El uso de **Typescript** garantiza un código más robusto y menos propenso a errores.
- **Inteligencia Artificial:** La magia detrás de las transformaciones es posible gracias a la integración con **Cloudinary**, que potencia la generación de disfraces y escenarios mediante IA.

## 🛠️ Tecnologías Utilizadas

- [**Next.js**]("https://nextjs.org/"): Framework de React para aplicaciones web rápidas y escalables.
- [**TailwindCSS**]("https://tailwindcss.com/"): Un framework de utilidades CSS para crear interfaces modernas y eficientes.
- [**Typescript**]("https://www.typescriptlang.org/"): Un superconjunto de JavaScript que añade tipado estático para un código más seguro y mantenible.
- [**Shadcn**]("https://ui.shadcn.com/"): Un conjunto de componentes personalizados con soporte para Dark Mode y fácilmente integrables.
- [**Next Cloudinary**]("https://next.cloudinary.dev/"): SDK de Cloudinary para Next.js, que te permitirá utilizar las herramientas de procesamiento de imágenes y videos..

## 🌐 Funcionalidades Principales

1. **Subida de Fotos:** Los usuarios pueden subir imágenes que serán procesadas por Cloudinary. De preferencia de cuerpo completo.
2. **Generación de Disfraces con IA:** Con un toque, la IA aplicará un disfraz virtual a la imagen del usuario.
3. **Creación de Escenarios:** Además del disfraz, los usuarios pueden colocarse en escenarios de Halloween, como cementerios, mansiones embrujadas o bosques oscuros.
4. **Galería de fotos**: Los usuarios podrán ver todas las imágenes creadas en una galería. Solo podrán ver sus propias imágenes.
5. **Compartir las imágenes:** Los usuarios podrán compartir todas las imágenes que creen en las redes sociales.

## 📦 Instalación y Uso

### Requisitos

- Node.js v20+
- Npm, Pnpm o Yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/SpagnoloCarlos/sombrias-creaciones.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd sombrias-creaciones
   ```

3. Instala las dependencias:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

4. Ejecuta la aplicación en modo de desarrollo:

   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

5. La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🤖 Integración con Cloudinary

La plataforma utiliza la API de **Cloudinary** para aplicar los efectos de disfraces y escenarios mediante inteligencia artificial. Este servicio procesa la imagen que el usuario sube, generando transformaciones de alta calidad de manera rápida.

### Configuración

1. Crea un archivo `.env` con la siguiente variable de entorno:

   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=[Nombre de usuario]
   ```

   Donde el valor es el nombre de usuario de tu cuenta de Cloudinary.

2. En el componente `CldUploadWidget`, en la propiedad `uploadPreset`, debes especificar el nombre del preset o carpeta donde se almacenarán las imágenes que suban los usuarios.

```jsx
<CldUploadWidget
  uploadPreset="upload-unsigned-images"
  onSuccess={handleSuccess}
>
  {({ open }) => {
    return <Button onClick={() => open()}>Subir imagen</Button>;
  }}
</CldUploadWidget>
```

3. Para más información puedes visitar el video sobre la Hackathon de MiduDev, donde lo explica con más detalles. [Video de Youtube]("https://www.youtube.com/watch?v=7MT1oPDBc5I&t=1808s")

## 🧛‍♂️ Contribuciones

Si te gustaría contribuir a este proyecto, siéntete libre de abrir un pull request o crear un [issue]("https://github.com/SpagnoloCarlos/helmsman-task/issues"). ¡Nos encantaría ver tus sugerencias para hacerlo aún más terrorífico y divertido!

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](/LICENSE) para más detalles.

## 🖥️ Autor

- Portafolio - [Carlos Andres Spagnolo](https://spagnolo-carlos.netlify.app/)
- LinkedIn - [Carlos Andres Spagnolo](https://www.linkedin.com/in/carlos-spagnolo-andres/)
- Instagram - [@carlos.spagnolo.dev](https://www.instagram.com/carlos.spagnolo.dev/)
- Email - [carlos.andres.spagnolo@gmail.com](mailto:your.email@gmail.com)

---

¡Gracias por visitar **SombrIAs Creaciones**! ¡Prepárate para dar miedo con estilo!
