// Short, scannable versions of the home-page texts (overrides content.js / content-extra.js).
const email = '<a href="mailto:elkhalfiavocates@gmail.com">elkhalfiavocates@gmail.com</a>';

const T = {
  ar: {
    "hero.lead": "محاميتان في الرباط · الأسرة، العقار، الأعمال والقضايا الجنائية · مواكبة الزبائن الدوليين.",
    "about.p1": "مكتب عائلي بالرباط تديره محاميتان شقيقتان، تكوّنتا في المغرب وفرنسا.",
    "about.p2": "استشارة قبل النزاع، ودفاع أمام جميع محاكم المملكة.",
    "areas.lead": "",
  },
  fr: {
    "hero.lead": "Deux avocates à Rabat · famille, immobilier, affaires, pénal · clients internationaux.",
    "about.p1": "Un cabinet familial à Rabat, dirigé par deux sœurs avocates formées au Maroc et en France.",
    "about.p2": "Conseil en amont, défense devant toutes les juridictions du Royaume.",
    "areas.lead": "",
  },
  en: {
    "hero.lead": "Two lawyers in Rabat · family, property, business, criminal · international clients.",
    "about.p1": "A family firm in Rabat, led by two sister lawyers trained in Morocco and France.",
    "about.p2": "Advice before disputes, representation before every Moroccan court.",
    "areas.lead": "",
  },
  es: {
    "hero.lead": "Dos abogadas en Rabat · familia, inmobiliario, empresas, penal · clientes internacionales.",
    "about.p1": "Un despacho familiar en Rabat, dirigido por dos hermanas abogadas formadas en Marruecos y Francia.",
    "about.p2": "Asesoramiento preventivo y defensa ante todos los tribunales de Marruecos.",
    "areas.lead": "",
  },
  de: {
    "hero.lead": "Zwei Anwältinnen in Rabat · Familie, Immobilien, Wirtschaft, Strafrecht · internationale Mandanten.",
    "about.p1": "Eine Familienkanzlei in Rabat, geführt von zwei Schwestern, ausgebildet in Marokko und Frankreich.",
    "about.p2": "Vorbeugende Beratung und Vertretung vor allen marokkanischen Gerichten.",
    "areas.lead": "",
  },
  nl: {
    "hero.lead": "Twee advocaten in Rabat · familie, vastgoed, ondernemingen, strafrecht · internationale cliënten.",
    "about.p1": "Een familiekantoor in Rabat, geleid door twee zussen, opgeleid in Marokko en Frankrijk.",
    "about.p2": "Preventief advies en verdediging voor alle Marokkaanse rechtbanken.",
    "areas.lead": "",
  },
};
for (const l of Object.keys(T)) T[l]["contact.emailV"] = email;

// One short line per practice area, same order as AREAS in content.js.
const AREAS = {
  ar: ["الطلاق، الحضانة، النفقة، الإرث", "العقود، التعويض، استخلاص الديون", "البيع، الكراء، التحفيظ، السانديك", "الشركات، العقود التجارية، الشيكات", "الضحايا والمتابَعون، كل المراحل", "الفصل التعسفي، حوادث الشغل", "الطعن ضد الإدارة، نزع الملكية", "التعويض، شركات التأمين", "استشارات، صياغة ومراجعة العقود"],
  fr: ["Divorce, garde, pension, successions", "Contrats, indemnisation, recouvrement", "Vente, bail, titre foncier, syndic", "Sociétés, contrats, chèques", "Victimes et défense, à chaque étape", "Licenciement, accidents du travail", "Recours contre l'administration", "Indemnisation, assurances", "Consultations, rédaction de contrats"],
  en: ["Divorce, custody, maintenance, inheritance", "Contracts, compensation, debt recovery", "Sales, leases, land titles, syndic", "Companies, contracts, cheques", "Victims and defence, every stage", "Dismissal, workplace accidents", "Claims against public authorities", "Compensation, insurers", "Consultations, contract drafting"],
  es: ["Divorcio, custodia, pensión, herencias", "Contratos, indemnizaciones, cobros", "Compraventa, alquiler, registro, comunidad", "Sociedades, contratos, cheques", "Víctimas y defensa, en cada etapa", "Despido, accidentes laborales", "Recursos contra la Administración", "Indemnizaciones, aseguradoras", "Consultas, redacción de contratos"],
  de: ["Scheidung, Sorgerecht, Unterhalt, Erbe", "Verträge, Schadensersatz, Inkasso", "Kauf, Miete, Grundbuch, Verwalter", "Gesellschaften, Verträge, Schecks", "Opfer und Verteidigung, jede Phase", "Kündigung, Arbeitsunfälle", "Klagen gegen Behörden", "Entschädigung, Versicherungen", "Beratung, Vertragsentwürfe"],
  nl: ["Echtscheiding, gezag, alimentatie, erfenis", "Contracten, schadevergoeding, incasso", "Koop, huur, kadaster, syndicus", "Vennootschappen, contracten, cheques", "Slachtoffers en verdediging, elke fase", "Ontslag, arbeidsongevallen", "Beroep tegen de overheid", "Schadevergoeding, verzekeraars", "Advies, opstellen van contracten"],
};

// Lawyer bios (short): Amal Moroccan-French, doctorate (Perpignan), interior design; Latifa Rabat Bar, Mohammed V University.
const BIOS = {
 "ar": [
  "الدكتورة آمال الخلفي حاصلة على الدكتوراه في القانون المدني والتجاري من جامعة بربينيان (فرنسا)، بميزة مشرف جداً مع تهنئة لجنة المناقشة، عن أطروحة حول «التضامن في الالتزامات في القانون المغربي: مساهمة في تاريخ مؤسسة رومانية إسلامية». مارست المحاماة في فرنسا قبل أن تستقر مع أسرتها في المغرب. وقبل دراسة القانون، تخرّجت في التصميم الداخلي.",
  "دكتوراه في القانون المدني والتجاري – جامعة بربينيان (فرنسا)",
  "أطروحة: التضامن في الالتزامات في القانون المغربي",
  "محامية سابقاً في فرنسا، واليوم في الرباط",
  "محامية بهيئة المحامين بالرباط، خرّيجة جامعة محمد الخامس بالرباط.",
  "محامية بهيئة المحامين بالرباط",
  "خرّيجة جامعة محمد الخامس – الرباط"
 ],
 "fr": [
  "Dr Amal Elkhalfi est docteure en droit civil et commercial de l'Université de Perpignan Via Domitia (France), avec la mention très honorable et les félicitations du jury, pour sa thèse «Les obligations solidaires en droit marocain – contribution à l'histoire d'une institution romano-islamique». Elle a exercé comme avocate en France avant de s'installer au Maroc avec sa famille. Avant le droit, elle était diplômée en architecture d'intérieur.",
  "Doctorat en droit civil et commercial – Université de Perpignan (France)",
  "Thèse : les obligations solidaires en droit marocain",
  "Avocate en France, aujourd'hui à Rabat",
  "Avocate au barreau de Rabat, diplômée de l'Université Mohammed V de Rabat.",
  "Avocate au barreau de Rabat",
  "Diplômée de l'Université Mohammed V – Rabat"
 ],
 "en": [
  "Dr. Amal Elkhalfi holds a Doctorate in civil and commercial law from the University of Perpignan Via Domitia (France), awarded with highest honours and the jury's congratulations, for her thesis on joint and several obligations in Moroccan law, a contribution to the history of a Romano-Islamic institution. She practised as a lawyer in France before settling in Morocco with her family. Before law, she graduated in interior design.",
  "Doctorate in civil & commercial law – University of Perpignan (France)",
  "Thesis: joint and several obligations in Moroccan law",
  "Former lawyer in France, now in Rabat",
  "Lawyer at the Rabat Bar, graduate of Mohammed V University, Rabat.",
  "Member of the Rabat Bar",
  "Graduate of Mohammed V University – Rabat"
 ],
 "es": [
  "La Dra. Amal Elkhalfi es doctora en Derecho civil y mercantil por la Universidad de Perpiñán Via Domitia (Francia), con la máxima calificación y felicitaciones del tribunal, por su tesis sobre las obligaciones solidarias en el derecho marroquí. Ejerció como abogada en Francia antes de instalarse en Marruecos con su familia. Antes del Derecho, se graduó en diseño de interiores.",
  "Doctorado en Derecho civil y mercantil – Universidad de Perpiñán (Francia)",
  "Tesis: obligaciones solidarias en el derecho marroquí",
  "Abogada en Francia, hoy en Rabat",
  "Abogada del Colegio de Abogados de Rabat, licenciada por la Universidad Mohammed V de Rabat.",
  "Colegio de Abogados de Rabat",
  "Licenciada por la Universidad Mohammed V – Rabat"
 ],
 "de": [
  "Dr. Amal Elkhalfi ist promoviert im Zivil- und Handelsrecht an der Universität Perpignan Via Domitia (Frankreich), mit höchster Auszeichnung und Glückwünschen der Jury, mit einer Dissertation über die Gesamtschuld im marokkanischen Recht. Sie war als Anwältin in Frankreich tätig, bevor sie sich mit ihrer Familie in Marokko niederließ. Vor dem Jurastudium schloss sie ein Studium der Innenarchitektur ab.",
  "Promotion im Zivil- und Handelsrecht – Universität Perpignan (Frankreich)",
  "Dissertation: Gesamtschuld im marokkanischen Recht",
  "Früher Anwältin in Frankreich, heute in Rabat",
  "Rechtsanwältin der Anwaltskammer Rabat, Absolventin der Universität Mohammed V in Rabat.",
  "Anwaltskammer Rabat",
  "Absolventin der Universität Mohammed V – Rabat"
 ],
 "nl": [
  "Dr. Amal Elkhalfi is doctor in het burgerlijk en handelsrecht aan de Universiteit van Perpignan Via Domitia (Frankrijk), met de hoogste onderscheiding en felicitaties van de jury, met een proefschrift over hoofdelijke verbintenissen in het Marokkaanse recht. Zij was advocaat in Frankrijk voordat zij zich met haar gezin in Marokko vestigde. Vóór de rechten studeerde zij af in binnenhuisarchitectuur.",
  "Doctoraat in het burgerlijk en handelsrecht – Universiteit van Perpignan (Frankrijk)",
  "Proefschrift: hoofdelijke verbintenissen in het Marokkaanse recht",
  "Voorheen advocaat in Frankrijk, nu in Rabat",
  "Advocaat bij de balie van Rabat, afgestudeerd aan de Universiteit Mohammed V in Rabat.",
  "Balie van Rabat",
  "Afgestudeerd aan de Universiteit Mohammed V – Rabat"
 ]
};
for (const [l, b] of Object.entries(BIOS)) Object.assign(T[l], { "amal.bio": b[0], "amal.f1": b[1], "amal.f2": b[2], "amal.f3": b[3], "latifa.bio": b[4], "latifa.f1": b[5], "latifa.f2": b[6] });

const HOURS = {"ar": "الإثنين – الجمعة، 9:00 – 18:00", "fr": "Lundi – vendredi, 9h – 18h", "en": "Monday – Friday, 9:00 – 18:00", "es": "Lunes – viernes, 9:00 – 18:00", "de": "Montag – Freitag, 9:00 – 18:00", "nl": "Maandag – vrijdag, 9:00 – 18:00"};
for (const [l, h] of Object.entries(HOURS)) T[l]["contact.hoursV"] = h;

module.exports = { T, AREAS };
