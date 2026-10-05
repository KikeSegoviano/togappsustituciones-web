// Plantillas de captación de TogApp: FUENTE ÚNICA de todos los textos que salen a un despacho
// (nota de conexión, primer mensaje, seguimiento y respuestas rápidas). La usan tres sitios:
//   - el panel (web/panel/index.html), como <script>;
//   - los scripts de Node (importar-cuentas, resegmentar), con import;
//   - el workflow n8n 03-score, donde scripts/dev/plantillas-build.mjs la incrusta tal cual.
// Sin dependencias y sin acceso a red: solo funciones puras.
//
// Reglas de contenido (docs/estrategia-captacion.md):
//   - Cada afirmación sobre el producto sale de su página de empresas o de sus condiciones.
//   - Una sola frase personalizada por nota, y solo con datos reales del despacho.
//   - No se promete carga masiva, API, factura mensual, urgencias ni cobertura en una plaza.
//   - No se nombra a ningún competidor.
(function (root) {
  "use strict";

  const INTRO = "soy Elvira, CEO de TogApp (sustituciones judiciales entre abogados).";
  const CIERRE = " Me gustaría conectar contigo.";
  const NOTA_MAX = 200; // límite de la nota de conexión en LinkedIn gratuito
  const WEB = "https://togappsustituciones.com";

  const SEGMENTOS = {
    recurrente: "Despacho recurrente",
    masivo: "Litigación masiva",
    pequeno: "Despacho pequeño",
  };

  const VARIANTES = {
    "peq-areas-nombre-v2": "Pequeño · áreas y nombre del despacho",
    "peq-areas-v2": "Pequeño · áreas",
    "peq-despacho-v2": "Pequeño · solo la plaza",
    "peq-minima-v2": "Pequeño · mínima",
    "emp-sedes-v1": "Despacho · varias sedes",
    "emp-nacional-v1": "Despacho · toda España",
    "emp-areas-v1": "Despacho · áreas",
    "emp-generica-v1": "Despacho · solo la plaza",
    "emp-minima-v1": "Despacho · mínima",
    "peq-ind-v2": "Individual · solapes y cubrir juicios",
    "peq-eq-v2": "Equipo pequeño · solapes",
    "emp-equipo-v1": "Despacho · Tu Equipo",
  };

  // Orden = prioridad de sala. Las áreas consultivas (fiscal, compliance...) no se mencionan.
  const AREA_LABELS = [
    ["penal", "penal"], ["civil", "civil"], ["laboral", "laboral"], ["familia", "familia"],
    ["mercantil", "mercantil"], ["extranjeria", "extranjería"], ["accidentes", "accidentes"],
    ["administrativo", "administrativo"], ["sucesiones", "sucesiones"], ["seguros", "seguros"],
    ["bancario", "bancario"], ["concursal", "concursal"], ["inmobiliario", "inmobiliario"],
    ["urbanismo", "urbanismo"],
  ];
  function fraseAreas(areas, max) {
    const l = AREA_LABELS.filter(([k]) => (areas || []).includes(k)).map(([, v]) => v).slice(0, max);
    if (l.length < 2) return l.join("");
    const last = l[l.length - 1];
    return l.slice(0, -1).join(", ") + (/^h?i/i.test(last) ? " e " : " y ") + last;
  }

  const esEmpresa = (segmento) => segmento === "recurrente" || segmento === "masivo";
  const pila = (nombre) => String(nombre || "").trim().split(/\s+/)[0] || "";

  // ---------- Despacho pequeño / abogado individual (textos aprobados el 2026-10-03) ----------
  function notaPequeno(tipo, nombre, areas, ciudad) {
    const a3 = fraseAreas(areas, 3), a2 = fraseAreas(areas, 2);
    const cands = [];
    if (tipo === "individual") {
      if (a3) cands.push(["peq-areas-v2", `He visto que llevas ${a3} en ${ciudad}.`]);
      if (a2) cands.push(["peq-areas-v2", `He visto que llevas ${a2} en ${ciudad}.`]);
      cands.push(["peq-despacho-v2", `He visto tu despacho en ${ciudad}.`]);
    } else {
      if (a3 && nombre) cands.push(["peq-areas-nombre-v2", `He visto que en ${nombre} lleváis ${a3} en ${ciudad}.`]);
      if (a3) cands.push(["peq-areas-v2", `He visto que lleváis ${a3} en ${ciudad}.`]);
      if (a2) cands.push(["peq-areas-v2", `He visto que lleváis ${a2} en ${ciudad}.`]);
      cands.push(["peq-despacho-v2", `He visto vuestro despacho en ${ciudad}.`]);
    }
    for (const [id, c] of cands) {
      const t = `Hola, ${INTRO} ${c}${CIERRE}`;
      if (t.length <= NOTA_MAX) return { texto: t, variante: id };
    }
    return { texto: `Hola, ${INTRO}${CIERRE}`, variante: "peq-minima-v2" };
  }

  function mensajePequeno(tipo, areas, ciudad) {
    const a = fraseAreas(areas, 3);
    if (tipo === "individual") {
      return {
        variante: "peq-ind-v2",
        texto: `Gracias por aceptar. Te cuento por qué te escribí. TogApp es una plataforma de sustituciones judiciales entre abogados colegiados: cuando se te solapan dos señalamientos o tienes una vista fuera de ${ciudad}, publicas el juicio y eliges tú al sustituto y el precio. Todos tienen la colegiación verificada, el pago queda en custodia hasta que el juicio se celebra y la factura sale sola. Y al revés: si tienes huecos, puedes cubrir juicios de otros compañeros con el cobro garantizado. ${a ? `Llevando ${a}, ¿cómo` : "¿Cómo"} lo resuelves hoy cuando te coinciden dos vistas?`,
      };
    }
    return {
      variante: "peq-eq-v2",
      texto: `Gracias por aceptar. Te cuento por qué te escribí. TogApp es una plataforma de sustituciones judiciales entre abogados colegiados: cuando se os solapan dos señalamientos o tenéis una vista fuera de ${ciudad}, publicáis el juicio y elegís vosotros al sustituto y el precio. Todos tienen la colegiación verificada, el pago queda en custodia hasta que el juicio se celebra y la factura sale sola. ${a ? `Llevando ${a}, imagino` : "Imagino"} que os pasa de vez en cuando. ¿Cómo lo resolvéis hoy: tirando del grupo de WhatsApp de compañeros?`,
    };
  }

  // ---------- Despacho recurrente / litigación masiva (cuenta de empresa) ----------
  // La frase personalizada sale de las señales públicas del despacho (segmento_senales).
  function notaEmpresa(nombre, areas, ciudad, senales, nombrePila) {
    const s = senales || {};
    const a2 = fraseAreas(areas, 2);
    const en = nombre ? `en ${nombre} ` : "";
    const cands = [];
    if (Number(s.sedes) >= 2) {
      cands.push(["emp-sedes-v1", `He visto que ${en}tenéis despacho en varias ciudades.`]);
      cands.push(["emp-sedes-v1", "He visto que tenéis despacho en varias ciudades."]);
    }
    if (s.nacional) {
      cands.push(["emp-nacional-v1", `He visto que ${en}lleváis asuntos en toda España.`]);
      cands.push(["emp-nacional-v1", "He visto que lleváis asuntos en toda España."]);
    }
    if (a2 && ciudad) cands.push(["emp-areas-v1", `He visto que lleváis ${a2} en ${ciudad}.`]);
    if (ciudad) cands.push(["emp-generica-v1", `He visto vuestro despacho en ${ciudad}.`]);
    const saludos = nombrePila ? [`Hola ${nombrePila},`, "Hola,"] : ["Hola,"];
    for (const [id, c] of cands) {
      for (const saludo of saludos) {
        const t = `${saludo} ${INTRO} ${c}${CIERRE}`;
        if (t.length <= NOTA_MAX) return { texto: t, variante: id };
      }
    }
    return { texto: `Hola, ${INTRO}${CIERRE}`, variante: "emp-minima-v1" };
  }

  function mensajeEmpresa(ciudad, senales, nombrePila) {
    const s = senales || {};
    const fuera = Number(s.sedes) >= 2 || s.nacional || !ciudad ? "fuera de vuestra plaza" : `fuera de ${ciudad}`;
    return {
      variante: "emp-equipo-v1",
      texto: `Gracias por aceptar${nombrePila ? `, ${nombrePila}` : ""}. Te cuento por qué te escribí. En TogApp un despacho cubre sus sustituciones con su propio equipo de confianza: invitáis a los compañeros que ya os cubren, les dirigís el juicio y, si lo aceptan, queda cerrado. El sustituto tiene la colegiación verificada, el pago queda retenido hasta que el acto se realiza y la factura de honorarios llega a vuestro CIF con la retención de IRPF desglosada. Y si ese día vuestro compañero no puede, lo abrís al resto de colegiados verificados y elegís vosotros. ¿Cómo cubrís hoy las vistas ${fuera}: con compañeros de confianza o con agencia?`,
    };
  }

  // Los dos borradores de un lead, con el identificador de la plantilla usada (para medir).
  function borradores(o) {
    const d = o || {};
    const ciudad = d.ciudad || "";
    let nota, mensaje;
    if (esEmpresa(d.segmento)) {
      const np = pila(d.nombrePila);
      nota = notaEmpresa(d.nombre || "", d.areas, ciudad, d.senales, np);
      mensaje = mensajeEmpresa(ciudad, d.senales, np);
    } else {
      const tipo = d.tipo === "individual" ? "individual" : "equipo";
      nota = notaPequeno(tipo, d.nombre || "", d.areas, ciudad || "Madrid");
      mensaje = mensajePequeno(tipo, d.areas, ciudad || "Madrid");
    }
    return {
      connect_note: nota.texto,
      connect_note_variant: nota.variante,
      first_message: mensaje.texto,
      first_message_variant: mensaje.variante,
    };
  }

  // Enlace medido por campaña (nunca por persona): pasa por web/ir.html y acaba en togapp.es.
  function enlace(campana, destino) {
    return `${WEB}/ir.html?c=${encodeURIComponent(campana)}&d=${encodeURIComponent(destino)}`;
  }

  // Un único seguimiento suave si no hay respuesta al primer mensaje. Después no se insiste.
  function seguimiento(o) {
    const d = o || {};
    if (esEmpresa(d.segmento)) {
      return {
        id: "seg-emp-v1",
        texto: "Hola de nuevo. Por si se traspapeló mi mensaje: si alguna vez os quedáis sin compañero para una vista fuera de vuestra plaza, en TogApp podéis publicarla y elegir entre abogados con la colegiación verificada, con el pago retenido hasta que se celebra. Si no es para vosotros, sin problema: no insisto más.",
      };
    }
    if (d.tipo === "individual") {
      return {
        id: "seg-peq-ind-v1",
        texto: "Hola de nuevo. Por si se traspapeló mi mensaje: si alguna vez te coinciden dos vistas, en TogApp puedes publicar el juicio y elegir tú al sustituto, con el pago en custodia hasta que se celebra. Si no es para ti, sin problema: no insisto más.",
      };
    }
    return {
      id: "seg-peq-eq-v1",
      texto: "Hola de nuevo. Por si se traspapeló mi mensaje: si alguna vez os coinciden dos vistas, en TogApp podéis publicar el juicio y elegir vosotros al sustituto, con el pago en custodia hasta que se celebra. Si no es para vosotros, sin problema: no insisto más.",
    };
  }

  // Respuestas rápidas a lo que suelen contestar. `t(tú, vosotros)` elige el trato.
  function respuestas(o) {
    const d = o || {};
    const emp = esEmpresa(d.segmento);
    const plural = emp || d.tipo !== "individual";
    const t = (tu, vosotros) => (plural ? vosotros : tu);
    const lista = [];

    lista.push({
      id: "r-companeros",
      objecion: "«Ya tengo mis compañeros de confianza»",
      texto: emp
        ? "Justo para eso está «Tu Equipo»: invitáis por enlace a esos mismos compañeros y les dirigís el juicio. Si lo aceptan queda cerrado, con el pago retenido hasta que se celebra y la factura de honorarios a vuestro CIF con la retención desglosada. Seguís trabajando con quien ya confiáis, sin transferencias ni facturas sueltas."
        : t(
          "Puedes seguir con ellos: en TogApp eliges tú al sustituto, así que si tus compañeros están registrados sigues trabajando con quien ya confías. Lo que cambia es que el pago queda en custodia hasta que el juicio se celebra y la factura sale sola.",
          "Podéis seguir con ellos: en TogApp elegís vosotros al sustituto, así que si vuestros compañeros están registrados seguís trabajando con quien ya confiáis. Lo que cambia es que el pago queda en custodia hasta que el juicio se celebra y la factura sale sola."),
    });
    lista.push({
      id: "r-agencia",
      objecion: "«Ya lo llevo con una agencia»",
      texto: t(
        "La diferencia es que aquí no te asignan a nadie: los honorarios los fijas tú y eliges al sustituto viendo su perfil y sus reseñas. La relación profesional es tuya; TogApp pone la verificación de la colegiación, la custodia del pago y la factura.",
        "La diferencia es que aquí no os asignan a nadie: los honorarios los fijáis vosotros y elegís al sustituto viendo su perfil y sus reseñas. La relación profesional es vuestra; TogApp pone la verificación de la colegiación, la custodia del pago y la factura."),
    });
    lista.push({
      id: "r-precio",
      objecion: "«¿Cuánto cuesta?»",
      texto: emp
        ? "La cuenta de empresa no tiene cuota de alta ni mensualidad, y publicar es gratis. Los honorarios del sustituto los fijáis vosotros y se cargan al confirmar la sustitución. En la modalidad estándar quien publica no paga comisión a TogApp: la comisión (3,99 € + IVA) se descuenta de lo que cobra el sustituto."
        : t(
          "Registrarte y publicar es gratis. Los honorarios los fijas tú y se cobran al confirmar al sustituto. En la modalidad estándar quien publica no paga comisión a TogApp: la comisión (3,99 € + IVA) se descuenta de lo que cobra el sustituto.",
          "Registrarse y publicar es gratis. Los honorarios los fijáis vosotros y se cobran al confirmar al sustituto. En la modalidad estándar quien publica no paga comisión a TogApp: la comisión (3,99 € + IVA) se descuenta de lo que cobra el sustituto."),
    });
    lista.push({
      id: "r-confianza",
      objecion: "«¿Y si no conozco al sustituto?»",
      texto: t(
        "Todos tienen la colegiación verificada y ves su perfil y sus reseñas antes de confirmar. El pago queda retenido hasta que el sustituto marca el juicio como realizado, y te queda constancia por escrito de lo que pasó en sala.",
        "Todos tienen la colegiación verificada y veis su perfil y sus reseñas antes de confirmar. El pago queda retenido hasta que el sustituto marca el juicio como realizado, y os queda constancia por escrito de lo que pasó en sala."),
    });
    lista.push({
      id: "r-cobertura",
      objecion: "«¿Tenéis gente en mi plaza?»",
      texto: emp
        ? "Depende de la plaza: estamos creciendo y no quiero prometeros lo que no hay. Dime en qué partidos judiciales soléis tener vistas y te digo dónde hay ya compañeros verificados. Y con «Tu Equipo» podéis traer a los vuestros desde el primer día."
        : t(
          "Depende de la plaza: estamos creciendo y no quiero prometerte lo que no hay. Dime en qué partidos judiciales sueles tener vistas y te digo dónde hay ya compañeros verificados.",
          "Depende de la plaza: estamos creciendo y no quiero prometeros lo que no hay. Dime en qué partidos judiciales soléis tener vistas y te digo dónde hay ya compañeros verificados."),
    });
    if (emp) {
      lista.push({
        id: "r-administracion",
        objecion: "«Esto lo lleva administración» / «No tengo tiempo»",
        texto: "La cuenta de empresa la puede llevar quien gestiona la agenda aunque no sea abogado, con varios gestores y una política de gasto que fijáis vosotros. Si quieres, hacemos una llamada de 15 minutos y os dejo la cuenta y el equipo montados.",
      });
      lista.push({
        id: "r-volumen",
        objecion: "«¿Hay carga masiva o factura mensual?»",
        texto: "Hoy no: cada vista se publica por separado y lleva su factura al CIF del despacho. Si eso os frena, dime qué volumen manejáis al mes y lo traslado al equipo de producto.",
      });
    }
    lista.push({
      id: "r-empezar",
      objecion: "«Me interesa, ¿cómo empiezo?»",
      texto: emp
        ? `Genial. La cuenta de empresa se crea aquí: ${enlace("li-respuesta", "empresa-nueva")} Pide los datos fiscales del despacho, una declaración responsable y un método de pago. Si lo prefieres, lo hacemos juntos en una llamada de 15 minutos.`
        : t(
          `Genial. El registro es gratuito: ${enlace("li-respuesta", "registro")} Te pedirá verificar tu colegiación antes de publicar. Si te atascas en algún paso, me dices.`,
          `Genial. El registro es gratuito: ${enlace("li-respuesta", "registro")} Si el despacho quiere publicar a su nombre, con factura a su CIF, existe la cuenta de empresa: ${enlace("li-respuesta", "empresas")} Si os atascáis en algún paso, me decís.`),
    });
    lista.push({
      id: "r-no",
      objecion: "«No me interesa»",
      texto: "Entendido, gracias por decírmelo. No te escribo más. Un saludo.",
    });
    return lista;
  }

  // Por qué este despacho es objetivo, en una frase para quien envía. null = nada que decir.
  function motivo(segmento, senales) {
    const s = senales || {};
    if (segmento === "recurrente") {
      const extra = Number(s.sedes) >= 2 ? `con ${s.sedes} sedes` : s.nacional ? "que trabaja en toda España" : "con equipo";
      return `Despacho ${extra} y actividad en sala: candidato a cuenta de empresa con su propio equipo.`;
    }
    if (segmento === "masivo") {
      return "Litigación en volumen: prueba pequeña. Puede pedir carga masiva o factura mensual, que hoy no existen.";
    }
    return null;
  }

  const API = { SEGMENTOS, VARIANTES, NOTA_MAX, borradores, seguimiento, respuestas, motivo, enlace, fraseAreas };
  if (typeof module === "object" && module && module.exports) module.exports = API;
  else root.PLANTILLAS = API;
})(typeof window !== "undefined" ? window : globalThis);
