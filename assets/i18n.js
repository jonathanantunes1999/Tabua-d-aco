/* ============================================================
   Tábua d'Aço — motor de tradução (PT · EN · DE · ES · FR)
   PT é o texto original no HTML; aqui ficam as traduções.
   Elementos com [data-i18n] / [data-i18n-ph] são traduzidos.
   ============================================================ */
(function(){
  var T = {
    en: {
      /* navegação + rodapé */
      nav_home:"Home", nav_about:"About", nav_menu:"Menu", nav_contact:"Contact",
      footer_tag:"Douro cuisine with a Tyrolean accent. On the river's left bank, in Tabuaço, since 2003.",
      foot_nav:"Navigate", foot_visit:"Visit us",
      foot_rights:"© 2026 Tábua d'Aço — All rights reserved",
      /* contactos */
      c_k:"Contact", c_h1:"Come <span class='accent'>find us.</span>",
      c_sub:"Opposite the Tabuaço Municipal Pools, on the left bank of the Douro.",
      c_addr:"Address", c_phone:"Phone", c_email:"Email", c_hours:"Opening hours",
      c_d1:"Tuesday to Friday", c_d2:"Saturday", c_d3:"Sunday", c_d4:"Monday", c_closed:"Closed",
      c_form_h:"Booking request",
      c_form_sub:"Leave your details and we'll confirm your table by phone or email.",
      c_l_name:"Name", c_l_contact:"Contact", c_l_people:"Guests", c_l_day:"Day", c_l_time:"Time", c_l_msg:"Message",
      c_ph_name:"Your name", c_ph_phone:"Phone", c_opt_more:"7 or more",
      c_ph_msg:"Special occasion, dietary restrictions…", c_submit:"Send request"
    },
    de: {
      nav_home:"Start", nav_about:"Über uns", nav_menu:"Speisekarte", nav_contact:"Kontakt",
      footer_tag:"Douro-Küche mit Tiroler Akzent. Am linken Flussufer, in Tabuaço, seit 2003.",
      foot_nav:"Navigation", foot_visit:"Besuchen Sie uns",
      foot_rights:"© 2026 Tábua d'Aço — Alle Rechte vorbehalten",
      c_k:"Kontakt", c_h1:"Besuchen Sie <span class='accent'>uns.</span>",
      c_sub:"Gegenüber dem städtischen Schwimmbad von Tabuaço, am linken Douro-Ufer.",
      c_addr:"Adresse", c_phone:"Telefon", c_email:"E-Mail", c_hours:"Öffnungszeiten",
      c_d1:"Dienstag bis Freitag", c_d2:"Samstag", c_d3:"Sonntag", c_d4:"Montag", c_closed:"Geschlossen",
      c_form_h:"Reservierungsanfrage",
      c_form_sub:"Hinterlassen Sie Ihre Daten und wir bestätigen den Tisch per Telefon oder E-Mail.",
      c_l_name:"Name", c_l_contact:"Kontakt", c_l_people:"Personen", c_l_day:"Tag", c_l_time:"Uhrzeit", c_l_msg:"Nachricht",
      c_ph_name:"Ihr Name", c_ph_phone:"Telefon", c_opt_more:"7 oder mehr",
      c_ph_msg:"Besonderer Anlass, Ernährungshinweise…", c_submit:"Anfrage senden"
    },
    es: {
      nav_home:"Inicio", nav_about:"Nosotros", nav_menu:"Menú", nav_contact:"Contacto",
      footer_tag:"Cocina del Duero con acento tirolés. En la margen izquierda del río, en Tabuaço, desde 2003.",
      foot_nav:"Navegar", foot_visit:"Visítenos",
      foot_rights:"© 2026 Tábua d'Aço — Todos los derechos reservados",
      c_k:"Contacto", c_h1:"Venga a <span class='accent'>vernos.</span>",
      c_sub:"Frente a las Piscinas Municipales de Tabuaço, en la margen izquierda del Duero.",
      c_addr:"Dirección", c_phone:"Teléfono", c_email:"Correo", c_hours:"Horario",
      c_d1:"Martes a viernes", c_d2:"Sábado", c_d3:"Domingo", c_d4:"Lunes", c_closed:"Cerrado",
      c_form_h:"Solicitud de reserva",
      c_form_sub:"Déjenos sus datos y le confirmamos la mesa por teléfono o correo.",
      c_l_name:"Nombre", c_l_contact:"Contacto", c_l_people:"Personas", c_l_day:"Día", c_l_time:"Hora", c_l_msg:"Mensaje",
      c_ph_name:"Su nombre", c_ph_phone:"Teléfono", c_opt_more:"7 o más",
      c_ph_msg:"Ocasión especial, restricciones alimentarias…", c_submit:"Enviar solicitud"
    },
    fr: {
      nav_home:"Accueil", nav_about:"À propos", nav_menu:"Carte", nav_contact:"Contact",
      footer_tag:"Cuisine du Douro à l'accent tyrolien. Sur la rive gauche du fleuve, à Tabuaço, depuis 2003.",
      foot_nav:"Navigation", foot_visit:"Visitez-nous",
      foot_rights:"© 2026 Tábua d'Aço — Tous droits réservés",
      c_k:"Contact", c_h1:"Venez nous <span class='accent'>voir.</span>",
      c_sub:"En face des Piscines Municipales de Tabuaço, sur la rive gauche du Douro.",
      c_addr:"Adresse", c_phone:"Téléphone", c_email:"E-mail", c_hours:"Horaires",
      c_d1:"Mardi à vendredi", c_d2:"Samedi", c_d3:"Dimanche", c_d4:"Lundi", c_closed:"Fermé",
      c_form_h:"Demande de réservation",
      c_form_sub:"Laissez vos coordonnées et nous confirmons la table par téléphone ou e-mail.",
      c_l_name:"Nom", c_l_contact:"Contact", c_l_people:"Personnes", c_l_day:"Jour", c_l_time:"Heure", c_l_msg:"Message",
      c_ph_name:"Votre nom", c_ph_phone:"Téléphone", c_opt_more:"7 ou plus",
      c_ph_msg:"Occasion spéciale, restrictions alimentaires…", c_submit:"Envoyer la demande"
    }
  };

  var orig = new WeakMap();

  function apply(lang){
    var d = T[lang];
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      if(!orig.has(el)) orig.set(el, el.innerHTML);
      var k = el.getAttribute('data-i18n');
      if(lang==='pt' || !d || d[k]===undefined) el.innerHTML = orig.get(el);
      else el.innerHTML = d[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      if(el.__ph==null) el.__ph = el.getAttribute('placeholder')||'';
      var k = el.getAttribute('data-i18n-ph');
      if(lang==='pt' || !d || d[k]===undefined) el.setAttribute('placeholder', el.__ph);
      else el.setAttribute('placeholder', d[k]);
    });
    document.documentElement.setAttribute('lang', lang);
    try{ localStorage.setItem('lang', lang); }catch(e){}
  }

  window.I18N = { apply: apply, T: T };
})();
