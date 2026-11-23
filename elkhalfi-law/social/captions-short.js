// Short captions for Instagram/Facebook, shown on /copy/ with one-tap Copy buttons.
// date: day it was published (shown on the website, newest first). today: shown first on /copy.
// No address or phone in captions. Max 5 hashtags. One language per post.
const BIO_AR = "📩 لحجز استشارة: الرابط في البايو";
const BIO_FR = "📩 Rendez-vous : lien dans la bio";
const BIO_EN = "📩 Book a consultation: link in bio";
module.exports = [
  { id: "General · English", today: true, general: true, text: `⚖️ Maître Amal El Khalfi, lawyer in Rabat.
📩 Link in bio
#Lawyer #Rabat #Morocco #ElkhalfiAvocates` },
  { id: "General · Français", today: true, general: true, text: `⚖️ Maître Amal El Khalfi, avocate à Rabat.
📩 Lien dans la bio
#Avocate #Rabat #Maroc #ElkhalfiAvocates` },
  { id: "General · العربية", today: true, general: true, dir: "rtl", text: `⚖️ الأستاذة آمال الخلفي، محامية بالرباط.
📩 الرابط في البايو
#محامية #الرباط #المغرب #ElkhalfiAvocates` },
  { id: "FR 10", date: "2026-11-23", today: true, img: "dark-custody-fr.png", text: `👨‍👩‍👧 Garde des enfants au Maroc : la mère d'abord, et dès 15 ans l'enfant choisit (Code de la famille, art. 166 et 171).
${BIO_FR}
#CodeDeLaFamille #Garde #Avocate #Rabat #ElkhalfiAvocates` },
  { id: "AR 1", date: "2026-11-11", img: "dark-whatsapp-ar.png", dir: "rtl", text: `📱 رسائل الواتساب دليل أمام المحكمة؟ نعم، احتفظوا بها ووثّقوها.
${BIO_AR}
#محامية #الرباط #واتساب #ElkhalfiAvocates` },
  { id: "AR 2", date: "2026-11-10", img: "dark-moudawana-ar.png", dir: "rtl", text: `📘 تعديل مدونة الأسرة: أين وصل؟
المشروع لم يُعرض بعد على البرلمان، والمطبَّق اليوم هو مدونة 2004.
${BIO_AR}
#مدونة_الأسرة #محامية #الرباط #ElkhalfiAvocates` },
  { id: "AR 3", img: "dark-constitution-ar.png", dir: "rtl", text: `⚖️ الدفع بعدم دستورية القوانين
يبدأ العمل به في 1 يوليوز 2028 (الفصل 133 من الدستور).
${BIO_AR}
#الدستور #محامية #الرباط #ElkhalfiAvocates` },
  { id: "AR 4", img: "dark-copyright-ar.png", dir: "rtl", text: `💻 القرصنة الرقمية: قانون جديد
حماية أقوى لحقوق المؤلف. المبدعون والشركات: احموا أعمالكم.
${BIO_AR}
#حقوق_المؤلف #محامية #الرباط #ElkhalfiAvocates` },
  { id: "AR 5", date: "2026-11-18", img: "dark-divorce-ar.png", dir: "rtl", text: `⚖️ حقوق المطلّقة في المغرب: الصداق المؤخر، نفقة العدة، المتعة، والحضانة ونفقة الأطفال.
${BIO_AR}
#الطلاق #مدونة_الأسرة #محامية #ElkhalfiAvocates` },
  { id: "AR 6", note: "25 November only", img: "violence-women-ar.png", dir: "rtl", text: `🟠 25 نوفمبر: القانون يحميكِ
✅ القانون 103.13 يعاقب على كل أشكال العنف ضد النساء
✅ في حالة الخطر، اتصلي بالشرطة فوراً
${BIO_AR}
#25نوفمبر #العنف_ضد_النساء #محامية #الرباط #ElkhalfiAvocates` },
  { id: "AR 7", date: "2026-11-20", img: "dark-harassment-ar.png", dir: "rtl", text: `🚫 التحرش في الشارع أو عبر الرسائل جريمة يعاقب عليها القانون (الفصل ‎503-1-1‎).
${BIO_AR}
#التحرش #محامية #الرباط #ElkhalfiAvocates` },
  { id: "FR 9", date: "2026-11-20", img: "dark-harassment-fr.png", text: `🚫 Le harcèlement dans la rue ou par message est un délit puni par la loi (art. 503-1-1 du Code pénal).
${BIO_FR}
#harcèlement #avocate #Rabat #Maroc #ElkhalfiAvocates` },
  { id: "EN 3", date: "2026-11-20", img: "dark-harassment-en.png", text: `🚫 Harassment in the street or by message is a crime in Morocco (Criminal Code, art. 503-1-1).
${BIO_EN}
#Harassment #Morocco #MoroccoLawyer #Rabat #ElkhalfiAvocates` },
  { id: "EN 4", date: "2026-11-21", img: "dark-mutual-en.png", text: `🤝 Divorce by mutual consent in Morocco: both spouses agree, the family court approves (Family Code, art. 114).
${BIO_EN}
#Divorce #FamilyLaw #Morocco #ElkhalfiAvocates` },
  { id: "AR 8", date: "2026-11-22", img: "dark-childsupport-ar.png", dir: "rtl", text: `👨‍👩‍👧 نفقة الأطفال إلى سن الرشد، وإلى 25 سنة لمن يتابع دراسته (المادة 198 من مدونة الأسرة).
${BIO_AR}
#نفقة_الأطفال #مدونة_الأسرة #محامية #ElkhalfiAvocates` },
  { id: "AR 9", date: "2026-11-22", img: "dark-rehab-ar.png", dir: "rtl", text: `⚖️ رد الاعتبار بقوة القانون: بعد 6 أشهر للغرامة، سنتين للحبس 6 أشهر أو أقل، و4 سنوات للحبس حتى سنتين (المادة 688 من قانون المسطرة الجنائية).
${BIO_AR}
#رد_الاعتبار #المسطرة_الجنائية #محامية #ElkhalfiAvocates` },
  { id: "AR 10", img: "dark-hiba-ar.png", dir: "rtl", text: `🎁 الهبة تمليك بلا مقابل، ويجوز للأب والأم الاعتصار في هبة ولدهما بشروط (المادتان 283 و285)، أما الصدقة فلا رجوع فيها (مدونة الحقوق العينية).
${BIO_AR}
#الهبة #الصدقة #الاعتصار #ElkhalfiAvocates` },
  { id: "FR 1", img: "dark-whatsapp-fr.png", text: `📱 WhatsApp, une preuve en justice ? Oui : gardez vos messages et faites-les constater.
${BIO_FR}
#avocate #Rabat #WhatsApp #ElkhalfiAvocates` },
  { id: "FR 2", img: "trend-moudawana-fr.png", text: `📘 Réforme de la Moudawana : où en est-on ?
✅ Décembre 2024 : propositions validées par le Roi
✅ Le projet n'est pas encore au Parlement
✅ Le texte applicable reste le Code de 2004
${BIO_FR}
#Moudawana #codedelafamille #avocate #Rabat #ElkhalfiAvocates` },
  { id: "FR 3", img: "trend-constitution-fr.png", text: `⚖️ Bientôt : l'exception d'inconstitutionnalité
✅ Dès le 1er juillet 2028
✅ Contester une loi appliquée à son procès (art. 133 de la Constitution)
${BIO_FR}
#Constitution #droitmarocain #avocate #Rabat #ElkhalfiAvocates` },
  { id: "FR 4", img: "trend-copyright-fr.png", text: `💻 Piratage et streaming illégal : une nouvelle loi
✅ La loi 013.26 renforce le droit d'auteur
✅ Créateurs et entreprises : protégez vos œuvres
${BIO_FR}
#droitdauteur #piratage #avocate #Rabat #ElkhalfiAvocates` },
  { id: "FR 5", date: "2026-11-19", img: "dark-divorce-fr.png", text: `⚖️ Femme divorcée au Maroc : dot, pension de viduité, don de consolation, garde et pension des enfants.
${BIO_FR}
#divorce #Moudawana #avocate #ElkhalfiAvocates` },
  { id: "FR 6", note: "25 November only", img: "violence-women-fr.png", text: `🟠 25 novembre : la loi vous protège
✅ La loi 103-13 punit toutes les violences faites aux femmes
✅ En cas de danger, appelez la police
${BIO_FR}
#25novembre #violencesfaitesauxfemmes #avocate #Rabat #ElkhalfiAvocates` },
  { id: "FR 7", date: "2026-11-12", img: "dark-property-fr.png", text: `🏡 Étranger et acheteur au Maroc ? Vérifiez le titre foncier et payez en devises via une banque marocaine.
${BIO_FR}
#immobilierMaroc #avocate #Rabat #ElkhalfiAvocates` },
  { id: "FR 8", img: "intl-apostille-fr.png", text: `💍 Acte de mariage étranger au Maroc ?
✅ Apostille, ou légalisation consulaire
✅ Traduction en arabe par un traducteur assermenté
✅ Marocains : dépôt au consulat sous 3 mois (art. 15)
${BIO_FR}
#Apostille #mariagemixte #avocate #Rabat #ElkhalfiAvocates` },
  { id: "EN 1", img: "dark-property-en.png", text: `🏡 Buying property in Morocco? Check the land title and pay in foreign currency via a Moroccan bank.
${BIO_EN}
#MoroccoRealEstate #ExpatsInMorocco #Rabat #ElkhalfiAvocates` },
  { id: "EN 2", img: "intl-apostille-en-v2.png", text: `💍 Married abroad? Make it valid in Morocco.
✅ Apostille, or consular legalisation
✅ Sworn Arabic translation
✅ Moroccans: file with the consulate within 3 months (art. 15)
${BIO_EN}
#Apostille #MarriageInMorocco #ExpatsInMorocco #MoroccoLawyer #ElkhalfiAvocates` },
];
