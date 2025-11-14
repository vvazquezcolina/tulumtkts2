/**
 * Helper script to generate blog posts data structure
 * This file helps organize the 100 blogs we need to create
 */

const blogCategories = {
  seasons: [
    { month: 'march', name: 'Marzo', keywords: ['tulum in march', 'tulum march weather'] },
    { month: 'april', name: 'Abril', keywords: ['tulum in april', 'tulum april weather'] },
    { month: 'may', name: 'Mayo', keywords: ['tulum in may', 'tulum may weather'] },
    { month: 'june', name: 'Junio', keywords: ['tulum in june', 'tulum june weather'] },
    { month: 'july', name: 'Julio', keywords: ['tulum in july', 'tulum july weather'] },
    { month: 'august', name: 'Agosto', keywords: ['tulum in august', 'tulum august weather'] },
    { month: 'september', name: 'Septiembre', keywords: ['tulum in september', 'tulum september weather'] },
    { month: 'october', name: 'Octubre', keywords: ['tulum in october', 'tulum october weather'] },
    { month: 'november', name: 'Noviembre', keywords: ['tulum in november', 'tulum november weather'] },
  ],
  cenotes: [
    { name: 'Gran Cenote', keywords: ['gran cenote tulum', 'gran cenote snorkel'] },
    { name: 'Cenote Dos Ojos', keywords: ['cenote dos ojos tulum', 'dos ojos diving'] },
    { name: 'Cenote Calavera', keywords: ['cenote calavera tulum', 'temple of doom cenote'] },
    { name: 'Cenote Azul', keywords: ['cenote azul tulum', 'cenote azul swimming'] },
    { name: 'Cenote Carwash', keywords: ['cenote carwash tulum', 'aktun ha cenote'] },
    { name: 'Cenote Cristal', keywords: ['cenote cristal tulum'] },
    { name: 'Cenote Zacil-Ha', keywords: ['cenote zacil ha tulum'] },
    { name: 'Cenote Escondido', keywords: ['cenote escondido tulum'] },
    { name: 'Cenote Aktun Chen', keywords: ['aktun chen cenote tulum'] },
    { name: 'Cenote Suytun', keywords: ['cenote suytun tulum', 'suytun cenote valladolid'] },
  ],
  activities: [
    { name: 'Snorkel', keywords: ['tulum snorkel', 'snorkeling tulum'] },
    { name: 'Buceo', keywords: ['tulum diving', 'scuba diving tulum'] },
    { name: 'Ruinas', keywords: ['tulum ruins', 'mayan ruins tulum'] },
    { name: 'Cenotes', keywords: ['tulum cenotes', 'best cenotes tulum'] },
    { name: 'Playas', keywords: ['tulum beaches', 'best beaches tulum'] },
    { name: 'Sian Ka\'an', keywords: ['sian kaan tulum', 'sian kaan biosphere'] },
    { name: 'Yoga', keywords: ['tulum yoga', 'yoga retreat tulum'] },
    { name: 'Beach Clubs', keywords: ['tulum beach clubs', 'best beach clubs tulum'] },
    { name: 'Nightlife', keywords: ['tulum nightlife', 'tulum parties'] },
    { name: 'Eco Tours', keywords: ['tulum eco tours', 'tulum nature tours'] },
  ]
};

// Export for use in blog generation
export default blogCategories;

