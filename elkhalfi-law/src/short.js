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

module.exports = { T, AREAS };
