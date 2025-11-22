// Índice de todas las traducciones de páginas
import homeTranslations from './home';
import experienciasTranslations from './experiencias';
import eventosTranslations from './eventos';
import villasTranslations from './villas';
import transporteTranslations from './transporte';
import contactoTranslations from './contacto';
import { cenotesTulum } from './cenotes-tulum';
import { tulumGuiaCompleta } from './tulum-guia-completa';

export default {
  es: {
    ...homeTranslations.es,
    experiencias: experienciasTranslations.es,
    eventos: eventosTranslations.es,
    villas: villasTranslations.es,
    transporte: transporteTranslations.es,
    contacto: contactoTranslations.es,
    cenotesTulum: cenotesTulum.es,
    tulumGuiaCompleta: tulumGuiaCompleta.es,
  },
  en: {
    ...homeTranslations.en,
    experiencias: experienciasTranslations.en,
    eventos: eventosTranslations.en,
    villas: villasTranslations.en,
    transporte: transporteTranslations.en,
    contacto: contactoTranslations.en,
    cenotesTulum: cenotesTulum.en,
    tulumGuiaCompleta: tulumGuiaCompleta.en,
  },
  fr: {
    ...homeTranslations.fr,
    experiencias: experienciasTranslations.fr,
    eventos: eventosTranslations.fr,
    villas: villasTranslations.fr,
    transporte: transporteTranslations.fr,
    contacto: contactoTranslations.fr,
    cenotesTulum: cenotesTulum.fr,
    tulumGuiaCompleta: tulumGuiaCompleta.fr,
  },
  it: {
    ...homeTranslations.it,
    experiencias: experienciasTranslations.it,
    eventos: eventosTranslations.it,
    villas: villasTranslations.it,
    transporte: transporteTranslations.it,
    contacto: contactoTranslations.it,
    cenotesTulum: cenotesTulum.it,
    tulumGuiaCompleta: tulumGuiaCompleta.it,
  },
};

