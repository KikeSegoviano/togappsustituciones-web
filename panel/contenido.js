// Publicaciones de LinkedIn para el perfil de Elvira: una por semana. El panel enseña la de la
// semana en curso (la más reciente cuya fecha ya ha llegado) en la pestaña «Contenido».
// Mismas reglas que plantillas.js: solo se afirma lo que el producto hace hoy, sin nombrar a
// competidores y sin enlaces en el texto (el enlace medido va en el primer comentario).
//   semana   = lunes de la semana en que toca publicarla (AAAA-MM-DD)
//   campana  = identificador para medir los clics (tabla campaigns, ver migración 0013)
//   destino  = clave de destino de web/ir.html (empresas | empresa-nueva | registro | inicio)
window.CONTENIDO = [
  {
    semana: "2026-10-05",
    titulo: "El grupo de WhatsApp",
    campana: "li-post-equipo",
    destino: "empresas",
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
    titulo: "Tu red, no una agencia",
    campana: "li-post-red",
    destino: "empresas",
    texto: `Hay dos formas de cubrir una vista a la que no llegas.

Una: se lo encargas a alguien que te asigna un sustituto. No lo eliges y la tarifa viene cerrada.

Otra: lo eliges tú. Ves quién se ofrece, su perfil y sus reseñas, y los honorarios los fijas tú.

En TogApp apostamos por la segunda. No asignamos sustitutos: decides tú, o diriges el juicio directamente a tu propio equipo. La relación profesional es tuya. La plataforma pone lo que una relación entre compañeros no tiene por sí sola: la colegiación verificada, el pago en custodia y la factura automática.

Quien firma el asunto eres tú. Quien entra en sala en tu nombre debería ser alguien a quien has elegido.

¿Qué pesa más para ti al elegir sustituto: conocerlo, sus reseñas o el precio?

#abogacía #sustitucionesjudiciales #procesal`,
  },
  {
    semana: "2026-10-19",
    titulo: "El papeleo de una sustitución",
    campana: "li-post-papeleo",
    destino: "empresas",
    texto: `Una sustitución dura lo que dura la vista. Su papeleo, bastante más.

Pedir los datos al compañero. Hacer la transferencia. Reclamar la factura. Comprobar la retención de IRPF. Guardarlo todo para el modelo 111 y, en enero, para el 190.

Multiplícalo por las vistas que un despacho encarga fuera de su plaza cada mes.

Es la parte que menos se ve y la que más tiempo se lleva en administración. En TogApp la hemos quitado de en medio: el cargo es automático, con la tarjeta o el saldo de empresa; el pago queda retenido hasta que el acto se realiza; y la factura de honorarios llega al CIF del despacho con el desglose de la retención.

Y la cuenta la puede llevar quien gestiona la agenda, aunque no sea abogado.

¿Quién se encarga de esto en vuestro despacho?

#abogacía #gestióndedespachos #sustitucionesjudiciales`,
  },
  {
    semana: "2026-10-26",
    titulo: "Dos vistas a la misma hora",
    campana: "li-post-solape",
    destino: "registro",
    texto: `Dos señalamientos, el mismo día, a la misma hora, en dos juzgados distintos.

A cualquier abogado que pisa sala le ha pasado. Y la salida suele ser la misma: una cadena de llamadas a compañeros hasta que alguien puede.

TogApp nació para ese momento. Publicas el juicio que no puedes cubrir, eliges tú al sustituto y fijas los honorarios. Todos son abogados con la colegiación verificada, el pago queda en custodia hasta que el juicio se celebra y la factura sale sola.

Y funciona también al revés: si tienes huecos en la agenda, puedes cubrir juicios de otros compañeros con el cobro garantizado.

Registrarse es gratis. Dejo el enlace en el primer comentario.

¿Cómo lo resolviste la última vez que te coincidieron dos vistas?

#abogacía #sustitucionesjudiciales #abogados`,
  },
];
