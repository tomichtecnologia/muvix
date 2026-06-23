// Static data for courses, plans and testimonials.
// `key` maps to i18n translation entries.

export const COURSES = [
  {
    key: "baixo",
    icon: "Guitar",
    image: "https://customer-assets.emergentagent.com/job_sound-master-lab/artifacts/0bi3x8yy_WhatsApp%20Image%202026-06-22%20at%2021.43.58.jpeg",
    lessons: 48,
  },
  {
    key: "guitarra",
    icon: "Guitar",
    image: "https://customer-assets.emergentagent.com/job_sound-master-lab/artifacts/mxwbpmv5_WhatsApp%20Image%202026-06-22%20at%2021.46.08.jpeg",
    lessons: 62,
  },
  {
    key: "violao",
    icon: "Music",
    image: "https://images.unsplash.com/photo-1648006916092-9abc41e56b7d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    lessons: 40,
  },
  {
    key: "teclado",
    icon: "Piano",
    image: "https://images.unsplash.com/photo-1681218865777-846f6b401d7e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    lessons: 54,
  },
  {
    key: "bateria",
    icon: "Drum",
    image: "https://images.pexels.com/photos/20252599/pexels-photo-20252599.jpeg?auto=compress&cs=tinysrgb&w=1000",
    lessons: 45,
  },
];

export const PLANS = [
  {
    key: "single",
    oldPrice: 97,
    price: 67,
    popular: false,
  },
  {
    key: "full",
    oldPrice: 497,
    price: 197,
    popular: true,
  },
  {
    key: "vip",
    oldPrice: 697,
    price: 397,
    popular: false,
  },
];

export const TESTIMONIALS = [
  { name: "Rafael M.", role: "Baixo", text: "Em 2 meses já tava tocando com a banda da igreja. Método direto, sem enrolação." },
  { name: "Carla S.", role: "Teclado", text: "As aulas de harmonia mudaram meu jeito de tocar. Finalmente entendi acordes!" },
  { name: "Diego P.", role: "Guitarra", text: "O tom no amp é igualzinho ao das aulas. Meus solos evoluíram absurdamente." },
  { name: "Bruna L.", role: "Violão", text: "Comecei do zero e hoje toco minhas músicas favoritas. Recomendo demais." },
  { name: "Thiago R.", role: "Bateria", text: "O metrônomo e os desafios semanais fizeram meu tempo ficar firme de verdade." },
  { name: "Aline F.", role: "Passe Completo", text: "Vale cada centavo. Acesso vitalício e sempre tem conteúdo novo. Top!" },
];

// Reference tuner notes (Hz)
export const TUNER_NOTES = [
  { note: "E", freq: 82.41, label: "E2" },
  { note: "A", freq: 110.0, label: "A2" },
  { note: "D", freq: 146.83, label: "D3" },
  { note: "G", freq: 196.0, label: "G3" },
  { note: "B", freq: 246.94, label: "B3" },
  { note: "e", freq: 329.63, label: "E4" },
];

export const COFFEE_AMOUNTS = [5, 15, 30];
