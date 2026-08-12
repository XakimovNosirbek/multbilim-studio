export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  image: string;
  description: string;
  meta: string;
  className: string;
  accent: string;
  accentSoft: string;
  format: string;
  audience: string;
  genre: string;
  stage: string;
  logline: string;
  story: string[];
  values: string[];
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "alpomish",
    title: "Alpomish",
    eyebrow: "Epik fantastika",
    image: "/media/alpomish.jpg",
    description:
      "Qadimiy doston ruhi, zamonaviy qahramonlik va katta ekran uchun yaratilgan milliy olam.",
    meta: "To‘liq metrajli · Ishlab chiqilmoqda",
    className: "project-card--wide",
    accent: "#ffc928",
    accentSoft: "#8d6120",
    format: "To‘liq metrajli film",
    audience: "Oilaviy · 7+",
    genre: "Epik fantasy · Sarguzasht",
    stage: "Konsept ishlab chiqish",
    logline:
      "Elni og‘ir zulmdan qutqarish uchun yosh bahodir kuchdan ham muhimroq qurol — va’daga sadoqat ekanini anglaydi.",
    story: [
      "Turon yurtida urug‘lar orasidagi birlik zaiflashgan bir paytda yovuz To‘ychixon barcha elni o‘z hukmiga bo‘ysundirishga urinadi. Yosh Hakimbek esa dostonlarda aytiladigan Alpomishga aylanish yo‘liga kiradi.",
      "Bu safar faqat jang haqida emas. Alpomish sevgi, do‘stlik, mas’uliyat va o‘z xalqiga bergan va’dasi orasida eng murakkab tanlovlarni qiladi.",
    ],
    values: ["Jasorat", "Sadoqat", "Milliy meros", "Birlik"],
    gallery: [1, 2, 3, 4].map((n) => `/media/projects/alpomish/gallery-${n}.jpg`),
  },
  {
    slug: "ikki-dunyo",
    title: "Ikki Dunyo",
    eyebrow: "Musiqiy fantasy",
    image: "/media/ikki-dunyo.jpg",
    description:
      "Tarix va bugunni musiqa, sirli portal va bir taqdir orqali bog‘laydigan sarguzasht.",
    meta: "Serial konsepti · 12 qism",
    className: "project-card--tall",
    accent: "#d4a85f",
    accentSoft: "#5f456f",
    format: "Animatsion serial",
    audience: "Oilaviy · 8+",
    genre: "Musiqiy fantasy · Drama",
    stage: "Serial bibliyasi",
    logline:
      "Zamonaviy qiz va qadimiy Xorazm shahzodasi ikki davr orasidagi darvozani faqat musiqa orqali ochish mumkinligini bilib qoladi.",
    story: [
      "Tarixiy musiqa asbobiga tegib ketgan Shahzoda o‘zini zamonaviy Toshkentda topadi. Bu yerda u qadimiy kuylarni sevadigan, ammo o‘z yo‘lini izlayotgan qiz bilan uchrashadi.",
      "Ularni birlashtirgan musiqa ikki dunyoni qutqarishi ham, butunlay ajratib yuborishi ham mumkin. Har bir qo‘shiq yo‘qolgan xotiraning bir qismini qaytaradi.",
    ],
    values: ["Musiqa", "Tarix", "O‘zlik", "Muhabbat"],
    gallery: [1, 2, 3, 4].map((n) => `/media/projects/ikki-dunyo/gallery-${n}.jpg`),
  },
  {
    slug: "zij",
    title: "Zij",
    eyebrow: "Ilmiy sarguzasht",
    image: "/media/zij.jpg",
    description:
      "Ulug‘bek merosi, kosmos va yosh ixtirochilarning kelajak sari sayohati.",
    meta: "Animatsion serial · Rivojlanishda",
    className: "",
    accent: "#7e83ff",
    accentSoft: "#26356f",
    format: "Animatsion serial",
    audience: "Bolalar · 7–12 yosh",
    genre: "Ilmiy fantasy · Sarguzasht",
    stage: "Konsept va personaj dizayni",
    logline:
      "Astronomiyaga qiziqqan Ulug‘bek qadimiy Zij jadvali va o‘zi yasagan robot yordamida tarix bilan kelajak orasidagi ilmiy sirlarni ochadi.",
    story: [
      "Ulug‘bek darsdagi oddiy kuzatuvni katta kashfiyotga aylantirishni yaxshi ko‘radi. Uning qo‘lbola raketasi va aqlli yordamchisi Anjom har tajribani kutilmagan sarguzashtga aylantiradi.",
      "Bir kuni eski kitobdan topilgan astronomik belgi uni Mirzo Ulug‘bek davriga eltadi. O‘tmishdagi bilim bilan zamonaviy texnologiya birlashganda yulduzlar yangi tilda gapira boshlaydi.",
    ],
    values: ["Ilm-fan", "Qiziquvchanlik", "Meros", "Ixtirochilik"],
    gallery: [1, 2, 3, 4].map((n) => `/media/projects/zij/gallery-${n}.jpg`),
  },
  {
    slug: "meva-cheva",
    title: "Meva-Cheva",
    eyebrow: "Maktabgacha yoshdagilar uchun",
    image: "/media/meva-cheva.jpg",
    description:
      "Quvnoq meva va sabzavotlar bolalarga do‘stlik, tartib va foydali odatlarni o‘rgatadi.",
    meta: "3D serial · 4–8 yosh",
    className: "",
    accent: "#70c63d",
    accentSoft: "#e95644",
    format: "Qisqa epizodli 3D serial",
    audience: "Maktabgacha · 4–8 yosh",
    genre: "Komediya · Ta’limiy",
    stage: "Serial konsepti",
    logline:
      "Cheva, Meva va Donaxon kundalik kichik muammolarni do‘stlik, ijodkorlik va birgalikdagi tajribalar orqali hal qiladi.",
    story: [
      "Meva-Cheva — har bir meva va sabzavot o‘z xarakteriga ega bo‘lgan yorqin shaharcha. Bu yerda yangi kun yangi savol, kichik muammo va kulgili tajriba bilan boshlanadi.",
      "Hikoyalar bolaga tayyor javob bermaydi. Qahramonlar xato qiladi, sinab ko‘radi va birgalikda to‘g‘ri yechimga keladi.",
    ],
    values: ["Do‘stlik", "Sog‘lom odat", "Tartib", "Hamkorlik"],
    gallery: [1, 2, 3, 4].map((n) => `/media/projects/meva-cheva/gallery-${n}.jpg`),
  },
  {
    slug: "megavoylar",
    title: "Megavoylar",
    eyebrow: "Texnologik ta’lim",
    image: "/media/megavoylar.jpg",
    description:
      "Raqamli xavfsizlik va texnologiyani sarguzashtga aylantirgan yangi avlod qahramonlari.",
    meta: "Ta’limiy serial · Konsept",
    className: "",
    accent: "#35d8f0",
    accentSoft: "#6450dc",
    format: "3D ta’limiy serial",
    audience: "Bolalar · 7–12 yosh",
    genre: "Texno-fantasy · Komediya",
    stage: "Personaj va olam dizayni",
    logline:
      "Kilobayt, Megabayt va Terabayt raqamli olamdagi muammolarni hal qilar ekan, yosh tomoshabinni texnologiya bilan ongli va xavfsiz tanishtiradi.",
    story: [
      "Megavoylar — hayotiy va fantastik unsurlar uyg‘unlashgan raqamli olam. Har bir epizodda axborot uzatish, algoritmik fikrlash, dasturlash asoslari va raqamli xavfsizlik voqea orqali sodda tilda ochiladi.",
      "Tezkor quyon Kilobayt, mulohazali pandacha Megabayt va dono bug‘u Terabayt xato qiladi, tajriba o‘tkazadi va birgalikda yechim topadi. Hikoyalar STEAM yondashuvi asosida mustaqil fikrlashni rag‘batlantiradi.",
    ],
    values: ["Raqamli savodxonlik", "Mantiq", "Jamoaviy ish", "Ijodiy fikrlash"],
    gallery: [1, 2, 3, 4].map((n) => `/media/projects/megavoylar/gallery-${n}.jpg`),
  },
  {
    slug: "sehrli-qalpoqcha",
    title: "Sehrli Qalpoqcha",
    eyebrow: "Maktab sarguzashti",
    image: "/media/sehrli-qalpoqcha.jpg",
    description:
      "Orzu, bilim va jasorat haqida zamonaviy o‘zbek maktabida kechadigan sehrli hikoya.",
    meta: "3D serial · Ishlab chiqilmoqda",
    className: "project-card--wide",
    accent: "#42c9d8",
    accentSoft: "#ef9c47",
    format: "3D animatsion serial",
    audience: "Bolalar · 7–12 yosh",
    genre: "Fantasy · Maktab komediyasi",
    stage: "Konsept ishlab chiqish",
    logline:
      "Qiziquvchan Hoshimjon maktab kutubxonasidan topilgan sehrli qalpoqcha yordamida bilimning haqiqiy kuchini kashf etadi.",
    story: [
      "Hoshimjon oddiy o‘quvchi, lekin tasavvuri chegarasiz. Maktabdagi sirli xonadan topilgan qalpoqcha uning fikrlarini jonlantirib, har bir darsni sarguzashtga aylantiradi.",
      "Sehr oson yechim bermaydi: u Hoshimjonning niyatini sinaydi. Har bir muammo do‘stlari bilan bilim, jasorat va hazil orqali yechiladi.",
    ],
    values: ["Bilim", "Do‘stlik", "Jasorat", "Mahalliy ruh"],
    gallery: [1, 2, 3, 4].map((n) => `/media/projects/sehrli-qalpoqcha/gallery-${n}.jpg`),
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
