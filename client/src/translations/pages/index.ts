// Índice de todas las traducciones de páginas
import homeTranslations from './home';
import experienciasTranslations from './experiencias';
import eventosTranslations from './eventos';
import villasTranslations from './villas';
import transporteTranslations from './transporte';
import contactoTranslations from './contacto';
import vuelosTranslations from './vuelos';
import hotelesTranslations from './hoteles';
import { cenotesTulum } from './cenotes-tulum';
import { tulumGuiaCompleta } from './tulum-guia-completa';
import { rivieraMaya } from './riviera-maya';

export default {
  es: {
    ...homeTranslations.es,
    experiencias: experienciasTranslations.es,
    eventos: eventosTranslations.es,
    villas: villasTranslations.es,
    transporte: transporteTranslations.es,
    contacto: contactoTranslations.es,
    vuelos: vuelosTranslations.es,
    hoteles: hotelesTranslations.es,
    cenotesTulum: cenotesTulum.es,
    tulumGuiaCompleta: tulumGuiaCompleta.es,
    rivieraMaya: rivieraMaya.es,
  },
  en: {
    ...homeTranslations.en,
    experiencias: experienciasTranslations.en,
    eventos: eventosTranslations.en,
    villas: villasTranslations.en,
    transporte: transporteTranslations.en,
    contacto: contactoTranslations.en,
    vuelos: vuelosTranslations.en,
    hoteles: hotelesTranslations.en,
    cenotesTulum: cenotesTulum.en,
    tulumGuiaCompleta: tulumGuiaCompleta.en,
    rivieraMaya: rivieraMaya.en,
  },
  fr: {
    ...homeTranslations.fr,
    experiencias: experienciasTranslations.fr,
    eventos: eventosTranslations.fr,
    villas: villasTranslations.fr,
    transporte: transporteTranslations.fr,
    contacto: contactoTranslations.fr,
    vuelos: vuelosTranslations.fr,
    hoteles: hotelesTranslations.fr,
    cenotesTulum: cenotesTulum.fr,
    tulumGuiaCompleta: tulumGuiaCompleta.fr,
    rivieraMaya: rivieraMaya.fr,
  },
  it: {
    ...homeTranslations.it,
    experiencias: experienciasTranslations.it,
    eventos: eventosTranslations.it,
    villas: villasTranslations.it,
    transporte: transporteTranslations.it,
    contacto: contactoTranslations.it,
    vuelos: vuelosTranslations.it,
    hoteles: hotelesTranslations.it,
    cenotesTulum: cenotesTulum.it,
    tulumGuiaCompleta: tulumGuiaCompleta.it,
    rivieraMaya: rivieraMaya.it,
  },
};

