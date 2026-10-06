// Calendario de contenido de la campaña «Publica el juicio»: lo que se publica cada semana y desde dónde.
// La pestaña «Contenido» del panel lo enseña; también lo lee scripts/dev/contenido.test.mjs desde Node.
// Mismas reglas que plantillas.js: solo se afirma lo que el producto hace hoy, sin nombrar a competidores y
// sin enlaces en el texto (el enlace medido va en el primer comentario).
//   semana    = lunes de la semana en que toca publicarla (AAAA-MM-DD)
//   dia       = "martes" | "jueves" (orientativo; martes la pieza con asset, jueves el texto)
//   red       = "linkedin" (por defecto) | "instagram" | "youtube"
//   perfil    = "elvira" (perfil personal; por defecto) | "empresa" (página de TogApp) | "ig" | "yt"
//   formato   = "texto" (por defecto) | "video" | "carrusel" | "reel"
//   campana   = identificador para medir los clics (tabla campaigns, migraciones 0013 y 0014)
//   destino   = clave de destino de web/ir.html (empresas | empresa-nueva | registro | inicio)
//   descargas = [{ etiqueta, ruta }] ficheros en web/media/ (vídeo, PDF, subtítulos)
//   alt       = texto alternativo del vídeo o carrusel (accesibilidad; LinkedIn lo pide al subirlo)
//   estado    = "aprobada" | "borrador"  ← nada con «borrador» se publica: primero el OK del usuario
// Los ficheros de web/media/ los genera media/ (Remotion + voz); ver docs/contenido.md.
(function (root) {
  "use strict";

  const CONTENIDO = [
    {
      semana: "2026-10-05",
      titulo: "El grupo de WhatsApp",
      campana: "li-post-equipo",
      destino: "empresas",
      estado: "aprobada",
      texto: `«¿Alguien puede cubrirme una vista el jueves en Getafe?»

Si llevas un despacho que pisa sala, has escrito ese mensaje más de una vez. Y casi siempre funciona: un compañero de confianza responde y va. Luego toca lo de siempre: acordarse de pagarle, pedirle la factura, cuadrar la retención.

Lo que cubre la vista es la confianza. Lo que falla es todo lo de alrededor.

Por eso en TogApp la cuenta de despacho gira alrededor de «Tu Equipo»: invitas a los compañeros que ya te cubren, les diriges el juicio y, si lo aceptan, queda cerrado. El pago queda retenido hasta que el acto se realiza y la factura de honorarios llega al CIF del despacho con la retención desglosada.

Los mismos compañeros de siempre. Sin perseguir a nadie después.

¿Cómo lo organizáis en vuestro despacho: grupo de WhatsApp, agenda propia o agencia?

#abogacía #sustitucionesjudiciales #despachos`,
    },
    {
      semana: "2026-10-12",
      dia: "jueves",
      titulo: "Tu red, no una agencia",
      campana: "li-post-red",
      destino: "empresas",
      estado: "aprobada",
      texto: `Hay dos formas de cubrir una vista a la que no llegas.

Una: se lo encargas a alguien que te asigna un sustituto. No lo eliges y la tarifa viene cerrada.

Otra: lo eliges tú. Ves quién se ofrece, su perfil y sus reseñas, y los honorarios los fijas tú.

En TogApp apostamos por la segunda. No asignamos sustitutos: decides tú, o diriges el juicio directamente a tu propio equipo. La relación profesional es tuya. La plataforma pone lo que una relación entre compañeros no tiene por sí sola: la colegiación verificada, el pago en custodia y la factura automática.

Quien firma el asunto eres tú. Quien entra en sala en tu nombre debería ser alguien a quien has elegido.

¿Qué pesa más para ti al elegir sustituto: conocerlo, sus reseñas o el precio?

#abogacía #sustitucionesjudiciales #procesal`,
    },

    // ---- Semana del 19 de octubre: lanzamiento del vídeo ----
    {
      semana: "2026-10-19",
      dia: "martes",
      titulo: "Publica el juicio — qué es TogApp en un minuto",
      pilar: "Así funciona",
      formato: "video",
      campana: "li-video-intro",
      destino: "empresas",
      estado: "borrador",
      descargas: [
        { etiqueta: "Vídeo para el post (cuadrado)", ruta: "media/li-video-intro-cuadrado.mp4" },
        { etiqueta: "Vídeo para el destacado del perfil (16:9)", ruta: "media/li-video-intro-ancho.mp4" },
        { etiqueta: "Subtítulos (.srt)", ruta: "media/li-video-intro.srt" },
      ],
      alt: "Vídeo de un minuto que muestra TogApp en el móvil: publicar un juicio, ver candidatos con colegiación verificada, confirmar, pago en custodia, facturas automáticas y la función Tu Equipo para despachos.",
      texto: `Un minuto para explicar qué es TogApp.

Llevamos meses contándolo despacho a despacho, así que lo hemos puesto en vídeo: publicas el juicio, los compañeros se postulan, eliges tú, el pago queda en custodia hasta que se celebra y las facturas salen solas. Para los despachos, Tu Equipo: los mismos compañeros de siempre, sin perseguir a nadie después.

Publicar es gratis.

¿Qué parte de una sustitución os quita más tiempo hoy: encontrar a quien vaya, o todo lo que viene después?

#abogacía #sustitucionesjudiciales #despachos`,
    },
    {
      semana: "2026-10-19",
      dia: "martes",
      red: "instagram",
      perfil: "ig",
      titulo: "Reel: qué es TogApp en un minuto",
      formato: "reel",
      campana: "ig-reel-intro",
      destino: "registro",
      estado: "borrador",
      descargas: [{ etiqueta: "Reel (9:16)", ruta: "media/li-video-intro-reel.mp4" }],
      alt: "Vídeo vertical de un minuto que muestra TogApp en el móvil: publicar un juicio, ver candidatos verificados, confirmar, pago en custodia y facturas automáticas.",
      texto: `Dos señalamientos a la misma hora. Un grupo de WhatsApp que no contesta. Y el juicio es hoy.

TogApp es el marketplace de sustituciones judiciales entre abogados colegiados: publicas el juicio, los compañeros se postulan, eliges tú, el pago queda en custodia y las facturas salen solas.

Publicar es gratis. Enlace en la bio.

#abogados #abogacía #sustitucionesjudiciales #procesal #despachos #legaltech`,
    },
    {
      semana: "2026-10-19",
      dia: "martes",
      red: "youtube",
      perfil: "yt",
      titulo: "YouTube: Publica el juicio — qué es TogApp en un minuto",
      formato: "video",
      campana: "yt-intro",
      destino: "empresas",
      estado: "borrador",
      descargas: [
        { etiqueta: "Vídeo (16:9)", ruta: "media/li-video-intro-ancho.mp4" },
        { etiqueta: "Subtítulos (.srt)", ruta: "media/li-video-intro.srt" },
      ],
      alt: "Vídeo de un minuto que muestra TogApp: publicar un juicio, candidatos verificados, confirmar, pago en custodia, facturas automáticas y Tu Equipo para despachos.",
      texto: `TogApp es el marketplace de sustituciones judiciales entre abogados colegiados en España.

Publicas el juicio (fecha, juzgado, honorarios y documentación), los compañeros se postulan, eliges tú y confirmas. El pago queda en custodia hasta que el juicio se celebra y las facturas salen solas. Para los despachos, la cuenta de empresa incluye Tu Equipo: invitas a los compañeros que ya te cubren y les diriges el juicio directamente.

Publicar es gratis. Sin cuota de alta ni mensualidad.`,
    },
    {
      semana: "2026-10-19",
      dia: "jueves",
      titulo: "El papeleo de una sustitución",
      campana: "li-post-papeleo",
      destino: "empresas",
      estado: "aprobada",
      texto: `Una sustitución dura lo que dura la vista. Su papeleo, bastante más.

Pedir los datos al compañero. Hacer la transferencia. Reclamar la factura. Comprobar la retención de IRPF. Guardarlo todo para el modelo 111 y, en enero, para el 190.

Multiplícalo por las vistas que un despacho encarga fuera de su plaza cada mes.

Es la parte que menos se ve y la que más tiempo se lleva en administración. En TogApp la hemos quitado de en medio: el cargo es automático, con la tarjeta o el saldo de empresa; el pago queda retenido hasta que el acto se realiza; y la factura de honorarios llega al CIF del despacho con el desglose de la retención.

Y la cuenta la puede llevar quien gestiona la agenda, aunque no sea abogado.

¿Quién se encarga de esto en vuestro despacho?

#abogacía #gestióndedespachos #sustitucionesjudiciales`,
    },

    // ---- Semana del 26 de octubre ----
    {
      semana: "2026-10-26",
      dia: "martes",
      titulo: "La retención de IRPF en una sustitución",
      pilar: "Oficio",
      formato: "carrusel",
      campana: "li-carrusel-irpf",
      destino: "empresas",
      estado: "borrador",
      descargas: [{ etiqueta: "Carrusel (PDF)", ruta: "media/li-carrusel-irpf.pdf" }],
      alt: "Carrusel de ocho páginas sobre la retención de IRPF al pagar una sustitución judicial: quién retiene, tipos del 15 % y 7 %, ejemplo de factura de 150 €, por qué el Bizum no retiene, modelos 111 y 190, y cierre de TogApp.",
      texto: `Una sustitución dura lo que dura la vista. Su retención de IRPF, hasta enero.

Cada vez que un despacho paga a un compañero por cubrir un señalamiento, nace una obligación fiscal que casi nadie tiene en la cabeza ese día: retener, ingresarla en el 111, declararla en el 190 y emitir el certificado.

He resumido en siete pantallas lo que conviene saber antes de hacer la transferencia (o el Bizum).

¿Quién lleva esto en vuestro despacho: administración, la gestoría o nadie hasta que llega enero?

#abogacía #sustitucionesjudiciales #gestióndedespachos`,
    },
    {
      semana: "2026-10-26",
      dia: "jueves",
      titulo: "Dos vistas a la misma hora",
      campana: "li-post-solape",
      destino: "registro",
      estado: "aprobada",
      texto: `Dos señalamientos, el mismo día, a la misma hora, en dos juzgados distintos.

A cualquier abogado que pisa sala le ha pasado. Y la salida suele ser la misma: una cadena de llamadas a compañeros hasta que alguien puede.

TogApp nació para ese momento. Publicas el juicio que no puedes cubrir, eliges tú al sustituto y fijas los honorarios. Todos son abogados con la colegiación verificada, el pago queda en custodia hasta que el juicio se celebra y la factura sale sola.

Y funciona también al revés: si tienes huecos en la agenda, puedes cubrir juicios de otros compañeros con el cobro garantizado.

Registrarse es gratis. Dejo el enlace en el primer comentario.

¿Cómo lo resolviste la última vez que te coincidieron dos vistas?

#abogacía #sustitucionesjudiciales #abogados`,
    },

    // ---- Semana del 2 de noviembre ----
    {
      semana: "2026-11-02",
      dia: "martes",
      titulo: "Tu Equipo, en 40 segundos",
      pilar: "Así funciona",
      formato: "video",
      campana: "li-video-equipo",
      destino: "empresas",
      estado: "borrador",
      descargas: [
        { etiqueta: "Vídeo para el post (cuadrado)", ruta: "media/li-video-equipo-cuadrado.mp4" },
        { etiqueta: "Subtítulos (.srt)", ruta: "media/li-video-equipo.srt" },
      ],
      alt: "Vídeo corto que muestra la función Tu Equipo de TogApp para despachos: invitar por enlace a los compañeros de confianza, dirigirles el juicio y, si no pueden, abrirlo al resto de colegiados verificados.",
      texto: `La función que más nos piden los despachos no es encontrar sustitutos nuevos. Es dejar de perseguir a los de siempre.

Tu Equipo funciona así: invitas por enlace a los compañeros que ya te cubren, publicas el juicio y se lo diriges a ellos. Si lo aceptan, queda cerrado. Si ese día nadie puede, lo abres al resto de colegiados verificados y eliges tú.

El pago queda en custodia y la factura llega al CIF del despacho con la retención desglosada. Lo de siempre, sin lo de después.

¿Cuántos compañeros tenéis «de confianza» para cubrir vistas fuera de vuestra plaza?

#abogacía #despachos #sustitucionesjudiciales`,
    },
    {
      semana: "2026-11-02",
      dia: "jueves",
      titulo: "Por qué 3,99 € fijos",
      pilar: "Construyendo TogApp",
      campana: "li-post-399",
      destino: "empresas",
      estado: "borrador",
      texto: `«¿Y vosotros cuánto os lleváis?»

Es la primera pregunta que nos hace casi todo despacho. La respuesta corta: publicar es gratis. Sin cuota de alta, sin mensualidad, sin comisión adicional por ser empresa.

La larga: en la modalidad estándar, la comisión de plataforma son 3,99 € más IVA por sustitución (más el coste de la pasarela de pago, al céntimo), y se descuenta al sustituto. Fija. La misma para una vista de 90 € que para una de 400 €.

Lo decidimos así por una razón sencilla: una comisión en porcentaje convierte a la plataforma en socia de cada honorario, y empuja a cerrar las sustituciones por fuera en cuanto el importe sube. Una cuota fija no compite con los honorarios del compañero: paga la verificación, la custodia y las facturas. Nada más.

Los honorarios los fija quien publica. Entre colegiados, ese número es vuestro.

¿Qué os parece más justo para una sustitución: una cuota fija o un porcentaje?

#abogacía #sustitucionesjudiciales #legaltech`,
    },

    // ---- Semana del 9 de noviembre ----
    {
      semana: "2026-11-09",
      dia: "martes",
      titulo: "La instructa que un sustituto agradece",
      pilar: "Oficio",
      formato: "carrusel",
      campana: "li-carrusel-instructa",
      destino: "registro",
      estado: "borrador",
      descargas: [{ etiqueta: "Carrusel (PDF)", ruta: "media/li-carrusel-instructa.pdf" }],
      alt: "Carrusel de ocho páginas con lo que conviene entregar a un compañero que cubre una vista: lo esencial en una página, los hechos en orden, prueba y testigos, representación, lo que puede pasar en sala y un teléfono que conteste.",
      texto: `Delegar una vista no es mandar el expediente. Es mandar lo que hace falta para entrar en sala como si fuera tuya.

He juntado en siete pantallas lo que, después de muchas sustituciones en los dos lados, un compañero agradece recibir el día antes: lo esencial en una página, los hechos en orden, la prueba y los testigos, quién comparece y con qué poder, qué puede pasar y, sobre todo, un teléfono que conteste a las 9:55.

¿Qué echáis de menos cuando os toca cubrir la vista de otro?

#abogacía #procesal #sustitucionesjudiciales`,
    },
    {
      semana: "2026-11-09",
      dia: "jueves",
      titulo: "Por qué el pago queda en custodia",
      pilar: "Construyendo TogApp",
      campana: "li-post-custodia",
      destino: "empresas",
      estado: "borrador",
      texto: `Cuando un compañero te cubre una vista, los dos confiáis. Él, en que le pagarás. Tú, en que irá.

Casi siempre sale bien. Pero el sistema se sostiene sobre un «casi» que nadie quiere ser.

Por eso en TogApp el pago no va de un bolsillo a otro: queda retenido en la plataforma cuando confirmas al sustituto y se libera cuando el juicio se celebra, con tu conformidad o, si no hay incidencia, pasadas 48 horas hábiles.

Quien publica sabe que no paga por un juicio que no se hizo. El sustituto sabe que el dinero ya está ahí antes de entrar en sala. Y la factura sale sola después.

No es desconfianza. Es quitarle el «casi» a la confianza.

¿Habéis tenido alguna vez un pago de una sustitución que se alargó más que el propio pleito?

#abogacía #sustitucionesjudiciales #despachos`,
    },
  ];

  if (typeof module === "object" && module && module.exports) module.exports = CONTENIDO;
  else root.CONTENIDO = CONTENIDO;
})(typeof window !== "undefined" ? window : globalThis);
