# AGENTS.md — MultBilim Animation Studio

Ushbu fayl repository bilan ishlaydigan AI agentlar va dasturchilar uchun majburiy loyiha qo‘llanmasidir. Har qanday o‘zgarishdan oldin ushbu faylni va `README.md`ni to‘liq o‘qing.

## 1. Asosiy maqsad

MultBilim sayti oddiy bolalar kontenti landing page’i emas. U O‘zbekistondagi professional animatsiya studiyasining premium korporativ vitrinasidir.

Har bir o‘zgarish quyidagi taassurotni kuchaytirishi kerak:

- jiddiy va ishonchli studio;
- kuchli milliy identitet;
- xalqaro darajadagi ishlab chiqarish sifati;
- original olamlar va esda qoladigan qahramonlar;
- professional texnologiya, pipeline va jamoa;
- mijoz, hamkor, investor va mutaxassislar uchun tushunarli kompaniya.

Saytni haddan tashqari bolalarcha, shovqinli, o‘yinchoq yoki generic SaaS dashboard ko‘rinishiga aylantirmang.

## 2. Ish boshlash tartibi

Har bir topshiriqda:

1. `AGENTS.md`ni to‘liq o‘qing.
2. `README.md`ni o‘qing va foydalanuvchining umumlashtirilgan talablarini tushuning.
3. `git status --short` orqali mavjud o‘zgarishlarni tekshiring.
4. Topshiriqqa tegishli fayllarnigina oching.
5. Mavjud arxitektura, package manager va `.openai/hosting.json`ni saqlang.
6. Begona yoki foydalanuvchiga tegishli o‘zgarishlarni o‘chirmang.
7. O‘zgarishni tegishli build/lint bilan tekshiring.
8. Foydalanuvchi deploy yoki public natija so‘ragan bo‘lsa, mavjud Sites loyihasini qayta ishlating.

Repository ichida `.openai/hosting.json` bor. Sayt qurish yoki hostingga tegishli ishda Sites ko‘rsatmalariga amal qiling. Yangi Sites project yaratmang; mavjud `project_id`ni saqlang.

## 3. Til va muloqot

- Foydalanuvchi bilan asosan o‘zbek tilida gaplashing.
- Texnik bo‘lmagan foydalanuvchiga sodda, natijaga yo‘naltirilgan javob bering.
- UI matnlari hozir o‘zbek tilida.
- Apostrof va o‘zbek harflarini to‘g‘ri yozing: `O‘zbekiston`, `g‘oya`, `ko‘rish`, `ta’lim`, `o‘ziga xos`.
- Bir xil atamani sahifalar bo‘ylab izchil ishlating.
- Demo kontentni rasmiy fakt sifatida ko‘rsatmang.
- Real ma’lumot kelmagan joyda “demo”, “namunaviy” yoki “keyin almashtiriladi” kontekstini saqlang.

## 4. Dizaynning o‘zgarmas qoidalari

### Vizual xarakter

- premium minimalizm;
- cinematic kompozitsiya;
- chuqur qora-ko‘k fon;
- oq va yumshoq kulrang matn;
- sariq va premium ko‘k aksentlar;
- glassmorphism faqat kerakli joylarda;
- kuchli, katta va o‘qilishi oson tipografiya;
- tasvirlarga yetarli joy;
- bir xil radius va border tizimi.

### Taqiqlangan yo‘nalishlar

- har bir blokka turli rang berish;
- haddan tashqari neon yoki gaming estetika;
- keskin, tez yoki bezovta qiladigan animatsiya;
- o‘qishni qiyinlashtiradigan xira overlay;
- matn ustiga ortiqcha blur;
- bir joyda yumaloq, boshqa joyda keskin burchaklar;
- juda ko‘p emoji yoki tasodifiy icon uslublari;
- placeholder bo‘sh kartalar;
- Pixar yoki boshqa studiya dizaynini bevosita nusxalash.

### Referenslar

Yo‘nalish uchun Pixar, DreamWorks, Angel Studios, Illumination, Xilam, LAIKA va Flying Bark saytlari ishlatilgan. Ulardan tamoyillar olingan, kod, matn yoki dizayn bevosita ko‘chirilmasligi kerak.

## 5. Logo qoidalari

Header va footerdagi logo CSS asosidagi 3D matn logodir.

- `MULT` sariq;
- `BiLiM` oq va ko‘k hajmli;
- harflar semiz, yumaloq va puffy;
- original berilgan rasmga yaqin proporsiya;
- logoni ingichka, yassi yoki keskin shriftga aylantirmang;
- ortiqcha blur, doimiy tebranish yoki qiyshayish qo‘shmang;
- mobile, header va footer variantlari bir xil identitetni saqlashi kerak.

Logo bilan ishlashdan oldin `app/globals.css` ichidagi `.brand-mark`, `.brand-word--mult` va `.brand-word--bilim` qoidalarini tekshiring.

## 6. Animatsiya qoidalari

Foydalanuvchining asosiy talabi: barcha animatsiya sekin, mayin va yoqimli bo‘lishi kerak.

- scroll pastga va tepaga bo‘lganda ishlasin;
- element viewport’dan chiqib qayta kirsa animatsiya takrorlansin;
- kichik masofa, yumshoq opacity va tabiiy easing ishlating;
- katta sakrash, keskin scale yoki tez parallax ishlatmang;
- animatsiya kontentni kechiktirmasligi va menyuni bloklamasligi kerak;
- admin dashboard scroll animatsiyalaridan chiqarilgan — uni barqaror saqlang;
- `prefers-reduced-motion: reduce` har doim hurmat qilinsin.

Global scroll logikasi `app/components/GlobalScrollMotion.tsx`da. Takroriy individual observerlar qo‘shishdan oldin mavjud tizimni kengaytirish mumkinligini tekshiring.

## 7. Responsive va accessibility

Har qanday UI o‘zgarishi quyidagi ekranlarda ishlashi kerak:

- katta desktop;
- oddiy laptop;
- planshet;
- kichik telefon.

Majburiy talablar:

- horizontal overflow bo‘lmasin;
- touch target yetarli bo‘lsin;
- menyu va tugmalar keyboard bilan ishlasin;
- focus holati yo‘qolmasin;
- rasmga mazmunli `alt` yozilsin;
- dialog/modallarda mos ARIA atributlari bo‘lsin;
- heading tartibi mantiqiy bo‘lsin;
- dark va light rejimda kontrast saqlansin;
- animatsiyasiz rejim to‘liq foydalaniladigan bo‘lsin.

## 8. Saytning asosiy qismlari

Asosiy sahifa quyidagi bo‘limlarni saqlashi kerak:

- hero;
- studio manifesti;
- tanlangan loyihalar;
- studio statistikasi;
- sayt ichidagi video tomosha;
- xizmatlar / “G‘oyadan ekrangacha”;
- “Besh bosqich. Bitta sifat.” jarayoni;
- texnologiyalar;
- jamoa;
- karyera;
- FAQ;
- “Loyihangizni gaplashamiz” aloqa bo‘limi;
- batafsil footer;
- privacy choices.

Bo‘limni olib tashlash foydalanuvchining aniq so‘rovisiz mumkin emas. Yangi bo‘lim qo‘shilganda u mavjud vizual ritm va navigatsiyaga mos bo‘lsin.

## 9. Loyihalar va kontent modeli

Loyiha ma’lumotlarining asosiy manbasi:

`app/data/projects.ts`

Mavjud loyihalar:

- `alpomish`;
- `ikki-dunyo`;
- `zij`;
- `meva-cheva`;
- `megavoylar`;
- `sehrli-qalpoqcha`.

Har bir loyiha quyidagilarni saqlashi kerak:

- nom va eyebrow;
- asosiy rasm;
- qisqa tavsif va meta;
- rang aksentlari;
- format, auditoriya, janr va bosqich;
- logline;
- kengroq hikoya;
- qadriyatlar;
- bir nechta galereya rasmlari.

Sluglarni sababsiz o‘zgartirmang. Slug o‘zgarsa eski URL uchun redirect kerak. Loyiha kartalari va detail sahifalari haqiqiy havola bo‘lib qolishi kerak.

## 10. Rasm va media

- Avval `public/media/` ichidagi MultBilim va PDF materiallaridan olingan mavjud aktivlarni qayta ishlating.
- Tasvirlarni cho‘zib yubormang; mos `object-fit` va `object-position` ishlating.
- Hero tasviri haddan tashqari xira bo‘lmasin.
- Rasm ustidagi gradient matn o‘qilishi uchun yetarli, lekin original ranglarni yo‘qotmaydigan bo‘lsin.
- Bo‘sh rasm kartalarini ship qilmang.
- Yangi uchinchi tomon tasviri qo‘shilsa, foydalanish huquqi va manbasini tekshiring.
- Model yozgan SVG illustratsiyalarni ishlatmang; mavjud rasm, CSS yoki mos iconlardan foydalaning.
- Public release’dan oldin media huquqlari studio tomonidan tasdiqlanishi kerakligini saqlang.

## 11. Video talablari

Asosiy video manbalari:

- `https://www.youtube.com/@BekvaLola`
- `https://www.youtube.com/@yashilmakonuz`

Video kartasi bosilganda foydalanuvchini YouTube’ga majburan olib ketmang. Video sayt ichida embed/player orqali ochilsin. Player:

- responsive;
- keyboard accessible;
- aniq close/control bilan;
- ortiqcha katta yoki noqulay modal bo‘lmasligi;
- mavjud sahifa dizayniga mos bo‘lishi kerak.

Video nomi, view soni yoki sanasi tasdiqlanmagan bo‘lsa uni real fakt sifatida ko‘rsatmang.

## 12. Theme qoidalari

- dark va light mode ikkalasi ham ishlashi kerak;
- foydalanuvchi tanlovi local storage’da eslab qolinadi;
- birinchi tashrifda system preference ishlatiladi;
- yangi rang yoki komponent ikkala theme’da ham tekshirilsin;
- faqat dark rejimda o‘qiladigan hardcoded ranglardan saqlaning;
- admin panel hozir mustaqil dark professional interfeys sifatida qoladi.

## 13. Privacy va analitika — xavfsizlik chegarasi

Analitika roziliksiz ishga tushmasligi kerak.

### Saqlash mumkin

- anonim visitor UUID;
- tashrif vaqti;
- ochilgan path;
- referrer origin;
- brauzer tili;
- qurilma turi;
- vaqt mintaqasi;
- consent versiyasi.

### Saqlash mumkin emas

- IP manzil;
- ism yoki familiya;
- telefon;
- email;
- aniq manzil;
- reklama yoki fingerprint profili;
- foydalanuvchining roziligisiz boshqa kuzatuvchi identifikator.

Qo‘shimcha qoidalar:

- Global Privacy Control va Do Not Track hurmat qilinsin;
- rad etilganda visitor identifikatori o‘chirilsin;
- consent tanlovi 6 oyga saqlanadi;
- analytics yozuvlari 13 oydan keyin o‘chadi;
- admin sahifaga kirish analytics event yaratmasin;
- privacy matni texnik xatti-harakat bilan mos bo‘lsin;
- yangi analytics maydoni qo‘shilsa policy va schema ham yangilansin;
- same-origin va server input validation’ni olib tashlamang.

Tegishli fayllar:

- `app/components/PrivacyCenter.tsx`;
- `app/privacy/page.tsx`;
- `app/api/analytics/route.ts`;
- `db/analytics.ts`;
- `db/schema.ts`;
- `drizzle/`.

## 14. Admin dashboard xavfsizligi

Admin sahifa: `/admin`.

Himoya qatlamlari:

1. server-side Sign in with ChatGPT;
2. `MULTBILIM_ADMIN_EMAILS` environment allowlist.

Majburiy qoidalar:

- autentifikatsiyani faqat client-side komponentga ishonib qurmang;
- allowlist bo‘lmasa dashboard’ni ochmang;
- environment qiymatini repository’ga yozmang;
- admin uchun public analytics API yaratmang;
- D1 agregatsiyalarini server tarafida bajaring;
- IP yoki boshqa keraksiz shaxsiy ma’lumotni dashboardga qo‘shmang;
- metadata’da admin sahifa indekslanmasin;
- public sayt keyin ochiq bo‘lsa ham `/admin` alohida himoyalangan qolishi kerak.

Dashboard asosiy statistikasi:

- 30 kunlik ko‘rishlar;
- noyob tashrifchilar;
- bugungi faollik;
- pages per visitor;
- oldingi davr bilan trend;
- daily chart;
- qurilmalar;
- mashhur sahifalar;
- referrer manbalari;
- oxirgi anonim tashriflar.

## 15. Database va migration

Database Cloudflare D1 / SQLite asosida.

- schema o‘zgarishi `db/schema.ts`da qilinsin;
- kerak bo‘lsa `npm run db:generate` ishlatilsin;
- generatsiya qilingan migration tekshirilsin;
- mavjud production ma’lumotni buzadigan migration yozmang;
- destructiv schema o‘zgarishida alohida ehtiyotkorlik va foydalanuvchi tasdig‘i kerak;
- query’larni indekslar bilan mos tuting;
- runtime D1 resource ID yoki credential repository’ga kiritilmasin.

## 16. Fayllar bo‘yicha mas’uliyat

```text
app/page.tsx                       bosh sahifa kontenti va bo‘limlari
app/globals.css                    design system, responsive va animatsiyalar
app/layout.tsx                     metadata, theme bootstrap va umumiy layout
app/data/projects.ts               barcha loyiha ma’lumotlari
app/projects/[slug]/page.tsx       loyiha detail template
app/components/SiteChrome.tsx      header, navigation va footer
app/components/VideoGallery.tsx    video player va video kartalar
app/components/GlobalScrollMotion  global qayta ishlaydigan scroll animatsiya
app/components/PrivacyCenter.tsx   consent banner va privacy settings
app/admin/page.tsx                 himoyalangan dashboard UI
db/analytics-dashboard.ts          dashboard query va agregatsiyalar
public/media/                       loyiha va jamoa rasmlari
.openai/hosting.json               mavjud Sites loyiha va logical bindinglar
```

Katta refactor qilishdan oldin bu mas’uliyat chegaralarini saqlashga harakat qiling.

## 17. Kod qoidalari

- TypeScript strict rejimini saqlang.
- Mavjud React/vinext arxitekturasini almashtirmang.
- Keraksiz dependency o‘rnatmang.
- Faqat animatsiya uchun katta kutubxona qo‘shmang; mavjud CSS va observer tizimini afzal ko‘ring.
- Client component faqat browser state yoki interaktivlik kerak bo‘lsa ishlatilsin.
- Server-side ma’lumotni client’ga keraksiz uzatmang.
- Input’ni serverda validate qiling.
- HTML ichiga ishonchsiz matnni xavfsizlantirmasdan qo‘ymang.
- Secret, token, credential va shaxsiy ma’lumotni commit qilmang.
- Mavjud `.gitignore`ni zaiflashtirmang.
- Keng mechanical rewrite yoki formatlash bilan foydalanuvchi diffini shishirmang.

## 18. Tekshiruvlar

O‘zgarish turiga mos tekshiruv bajaring.

### Minimal

```bash
npm run build
```

### Kod sifati

```bash
npm run lint
```

Repository’da avvaldan boshqa fayllarga tegishli lint warning/error bo‘lishi mumkin. O‘zingiz o‘zgartirgan fayllarda yangi xato qoldirmang va mavjud muammoni topshiriqqa aloqasi bo‘lmasa ommaviy refactor qilmang.

### Vizual o‘zgarishda

- desktop va mobil layout;
- dark/light theme;
- navigation;
- loyiha linklari;
- video open/close;
- scroll yuqoriga/pastga;
- reduced motion;
- overflow va matn kesilishi.

### Privacy/admin o‘zgarishida

- consent qabul/rad;
- DNT/GPC;
- admin authentication;
- email allowlist;
- D1 mavjud va bo‘sh holat;
- ruxsatsiz foydalanuvchiga ma’lumot chiqmasligi.

## 19. Git va repository

Asosiy public repository:

`https://github.com/XakimovNosirbek/multbilim-studio`

- default branch: `main`;
- qisqa, mazmunli commit yozing;
- unrelated fayllarni commit qilmang;
- foydalanuvchi o‘zgarishini reset yoki checkout bilan o‘chirmang;
- force push qilmang;
- tokenni remote URL ichiga yozmang;
- public repository ekanini yodda tuting.

README kontent briefi va tashqi hujjatdir. `AGENTS.md` esa ichki ishlash qoidasi. Funksiya yoki talab sezilarli o‘zgarsa, ikkalasini ham mos ravishda yangilang.

## 20. Hosting va deploy

To‘liq sayt GitHub Pages uchun mos emas, chunki u quyidagilarga ega:

- server API;
- D1 database;
- server-side authentication;
- dynamic admin dashboard.

GitHub source control uchun. Production sayt Sites/Cloudflare-compatible deployment’da qoladi.

Deploy qoidalari:

- `.openai/hosting.json`dagi mavjud project’dan foydalaning;
- yangi project yaratmang;
- build muvaffaqiyatli bo‘lmasdan publish qilmang;
- schema o‘zgarsa migration mavjudligini tekshiring;
- runtime environment qiymatlarini Sites orqali boshqaring;
- custom domain qo‘shilganda DNS validation yozuvlarini aniq bering;
- public/private access’ni foydalanuvchi niyatisiz o‘zgartirmang;
- admin allowlist’ni domen yoki public access o‘zgarganda ham saqlang.

## 21. Custom domain

Foydalanuvchi domen xarid qilmoqda. Domen nomi berilgach:

1. aynan qaysi hostname ishlatilishini tasdiqlang (`multbilim.uz`, `www.multbilim.uz` va hokazo);
2. custom domain’ni mavjud Sites project’ga qo‘shing;
3. qaytgan A/CNAME va validation yozuvlarini domen DNS boshqaruviga kiriting yoki foydalanuvchiga aniq ko‘rsatma bering;
4. SSL va provider status’ni active bo‘lguncha tekshiring;
5. canonical metadata va GitHub homepage URL’ni yangi domenga yangilang;
6. eski public linkni darhol o‘chirmang — redirect yoki fallback sifatida saqlang.

## 22. Demo va real kontent chegarasi

Quyidagilar hozir demo bo‘lishi mumkin:

- xodim ismlari va rasmlari;
- vakansiyalar;
- loyiha holati va ayrim synopsis’lar;
- statistika va view sonlari;
- aloqa email va studio rekvizitlari;
- ayrim xizmat matnlari.

Real kontent kelganda:

- foydalanuvchi bergan ma’lumot ustuvor;
- rasm/fayl nomlarini tushunarli qiling;
- bir xil ma’lumot takrorlangan barcha joyni yangilang;
- metadata, alt, schema va dashboard page mapping’ni ham tekshiring;
- demo belgilarini real tasdiqlangan joylardan olib tashlang;
- tasdiqlanmagan ma’lumotni o‘zingiz to‘qib rasmiylashtirmang.

## 23. Yakuniy handoff

Ish tugaganda foydalanuvchiga qisqa tarzda:

- nima o‘zgarganini;
- qayerdan ko‘rishini;
- muhim demo yoki xavfsizlik holatini;
- undan keyin kerak bo‘ladigan bitta aniq qadamni

ayting.

Ichki buyruqlar, tokenlar, project ID, vaqtinchalik arxivlar yoki keraksiz texnik loglarni foydalanuvchiga chiqarmang.
