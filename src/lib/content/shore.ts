import type { Locale } from "@/lib/translations";

/**
 * Copy for the "Two Shores" home — a night walk between Milan and Istanbul.
 * The structure mirrors the ThreeUI "Kage" landing page (chapters, gate, pathways,
 * lessons, afterlight, colophon); every Japanese mark is replaced by an Italian /
 * Turkish counterpart. `alt` strings are the second-language flips shown on hover.
 */

export interface ShoreNavLink {
  href: string;
  label: string;
  alt: string;
}

export interface ShoreChip {
  num: string;
  title: string;
  text: string;
}

export interface ShorePlate {
  id: "milan" | "istanbul" | "rome";
  label: string;
  alt: string;
  meta: string;
  index: string;
  href: string;
}

export interface ShoreLesson {
  num: string;
  title: string;
  alt: string;
  text: string;
  time: string;
}

export interface ShoreFooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface ShoreContent {
  preloader: { mark: string; line: string };
  brand: { name: string; tag: string };
  nav: ShoreNavLink[];
  menu: string;
  hero: {
    eyebrow: string;
    lines: string[];
    sub: string;
    cue: string;
    chips: ShoreChip[];
    peekWord: string;
    peekCaption: string;
    side: string;
    word: string;
  };
  gate: {
    index: string;
    label: string;
    alt: string;
    heading: string;
    lead: string;
    body: string;
    link: string;
    stats: { value: string; label: string }[];
  };
  pathways: {
    index: string;
    label: string;
    alt: string;
    plates: ShorePlate[];
  };
  lessons: {
    index: string;
    label: string;
    alt: string;
    heading: string;
    body: string;
    items: ShoreLesson[];
  };
  eternity: {
    eyebrow: string;
    word: string;
    body: string;
    cta: string;
  };
  footer: {
    statement: string;
    columns: ShoreFooterColumn[];
    copyright: string;
    motto: string;
    colophon: string;
    language: string;
  };
  rail: string[];
}

export const shoreContent: Record<Locale, ShoreContent> = {
  en: {
    preloader: { mark: "Due Sponde · İki Kıyı", line: "Raising the two shores" },
    brand: { name: "ALVOLO", tag: "MILANO · ROMA · ISTANBUL" },
    nav: [
      { href: "#gate", label: "Shores", alt: "Sponde" },
      { href: "#pathways", label: "Corridors", alt: "Corridoi" },
      { href: "#lessons", label: "Protocol", alt: "Protocollo" },
      { href: "#eternity", label: "Continuity", alt: "Süreklilik" },
    ],
    menu: "Menu",
    hero: {
      eyebrow: "Chapter 00 — Two Shores",
      lines: ["Where two shores", "become one", "market."],
      sub: "Enter Italy through Milan and reach Türkiye through Istanbul: incorporation, tax, relocation and sourcing on a single path.",
      cue: "Scroll to cross",
      chips: [
        { num: "01", title: "Italian Shore", text: "S.r.l. and S.p.A. incorporation, Codice Fiscale, permits and banking." },
        { num: "02", title: "Corridors", text: "Milan, Rome and Istanbul: three cities, one mandate." },
        { num: "03", title: "Protocol", text: "Four sequenced phases from audit to onboarding." },
        { num: "04", title: "Continuity", text: "Tax, payroll and partner management after the first invoice." },
      ],
      peekWord: "Milano",
      peekCaption: "Duomo — before the first filing",
      side: "Due Sponde",
      word: "ALVOLO",
    },
    gate: {
      index: "01",
      label: "The Italian Shore",
      alt: "La Sponda Italiana",
      heading: "Marble, stone, one gate left open.",
      lead: "Alvolo begins where the Duomo's spires meet the fog: a market of sixty million people, entered through a notary's deed, a Partita IVA and a bank willing to open its doors. The paperwork is how a company learns to survive its first Italian winter, and the first thing this shore asks you to understand.",
      body: "Cross the piazza and the Galleria lifts out of the mist, its glass roof lit from inside like a lantern the size of a city block. Above the roofs a pale moon holds its place, patient, half hidden. The city takes its time here, and for the next few weeks so will your incorporation.",
      link: "Cross the corridor",
      stats: [
        { value: "02", label: "Jurisdictions" },
        { value: "03", label: "Cities" },
        { value: "04", label: "Phases" },
        { value: "01", label: "Mandate" },
      ],
    },
    pathways: {
      index: "02",
      label: "Corridors",
      alt: "Corridoi",
      plates: [
        { id: "milan", label: "Milano", alt: "Inbound · Italy", meta: "The entry", index: "01 / 03", href: "/services/expansion/italy/" },
        { id: "istanbul", label: "Istanbul", alt: "Outbound · Sourcing", meta: "The source", index: "02 / 03", href: "/services/expansion/turkey/" },
        { id: "rome", label: "Roma", alt: "Regulatory · Ministries", meta: "The seal", index: "03 / 03", href: "/services/" },
      ],
    },
    lessons: {
      index: "03",
      label: "The Protocol",
      alt: "Protocollo",
      heading: "Four phases. One mandate. Two shores.",
      body: "Each phase is a walk. You arrive at the audit, cross the structuring, sit with the notary, and leave with a company that can invoice.",
      items: [
        { num: "01", title: "The Audit", alt: "Denetim", text: "Jurisdictional and compliance audit: licensing, immigration, AML and sector rules mapped before any structure is drawn.", time: "1–2 weeks" },
        { num: "02", title: "Tax Architecture", alt: "Architettura", text: "Entity choice, holding layers and treaty positioning, modelled quantitatively and signed off by the founders.", time: "2–3 weeks" },
        { num: "03", title: "Formation", alt: "Kuruluş", text: "Notarial deed, Partita IVA, PEC and banking in parallel with Codice Fiscale, permits and executive relocation.", time: "3–8 weeks" },
        { num: "04", title: "Onboarding", alt: "Onboarding", text: "Manufacturing partners audited and contracted, the Customs Union corridor designed, quality and IP governance embedded.", time: "4–14 weeks" },
        { num: "05", title: "The Pale Moon", alt: "Süreklilik", text: "The corridor stays open after the first invoice, and the mandate keeps walking it.", time: "ongoing" },
      ],
    },
    eternity: {
      eyebrow: "Chapter 04 — Continuity",
      word: "Continuity",
      body: "The gate stays open behind you. Tax filings, payroll, supplier reviews and the next expansion run on the same corridor, with the same advisor at your side.",
      cta: "Begin the mandate",
    },
    footer: {
      statement: "Alvolo takes companies and their people across the Italy–Türkiye corridor: from the first regulatory audit to an operating entity, with one senior advisor accountable from Milan to Istanbul.",
      columns: [
        {
          title: "Chapters",
          links: [
            { label: "The Italian Shore", href: "#gate" },
            { label: "Corridors", href: "#pathways" },
            { label: "The Protocol", href: "#lessons" },
            { label: "Continuity", href: "#eternity" },
          ],
        },
        {
          title: "Practice",
          links: [
            { label: "Italy expansion", href: "/services/expansion/italy/" },
            { label: "Türkiye sourcing", href: "/services/expansion/turkey/" },
            { label: "Startup corridor", href: "/services/startup-corridor/" },
            { label: "Your tailored mandate", href: "/brief/" },
          ],
        },
        {
          title: "Elsewhere",
          links: [
            { label: "Partners", href: "/about/" },
            { label: "Methodology", href: "/methodology/" },
            { label: "Client portal", href: "/portal/" },
            { label: "Contact", href: "/contact/" },
          ],
        },
      ],
      copyright: "© 2026 Alvolo Consulting — Due Sponde",
      motto: "İki kıyı, tek pazar · Due sponde, un solo mercato",
      colophon: "Milano · Roma · Istanbul",
      language: "Language",
    },
    rail: ["Two Shores", "The Italian Shore", "Corridors", "The Protocol", "Continuity", "Colophon"],
  },
  tr: {
    preloader: { mark: "İki Kıyı · Due Sponde", line: "İki kıyı yükseliyor" },
    brand: { name: "ALVOLO", tag: "MİLANO · ROMA · İSTANBUL" },
    nav: [
      { href: "#gate", label: "Kıyılar", alt: "Sponde" },
      { href: "#pathways", label: "Koridorlar", alt: "Corridoi" },
      { href: "#lessons", label: "Protokol", alt: "Protocollo" },
      { href: "#eternity", label: "Süreklilik", alt: "Continuità" },
    ],
    menu: "Menü",
    hero: {
      eyebrow: "Bölüm 00 — İki Kıyı",
      lines: ["İki kıyının", "tek pazar olduğu", "yer."],
      sub: "İtalya'ya Milano'dan girin, Türkiye'ye İstanbul'dan ulaşın: kuruluş, vergi, taşınma ve tedarik tek bir yolda.",
      cue: "Geçmek için kaydırın",
      chips: [
        { num: "01", title: "İtalyan Kıyısı", text: "S.r.l. ve S.p.A. kuruluşu, Codice Fiscale, izinler ve bankacılık." },
        { num: "02", title: "Koridorlar", text: "Milano, Roma ve İstanbul: üç şehir, tek mandat." },
        { num: "03", title: "Protokol", text: "Denetimden entegrasyona dört sıralı aşama." },
        { num: "04", title: "Süreklilik", text: "İlk faturadan sonra vergi, bordro ve ortak yönetimi." },
      ],
      peekWord: "Milano",
      peekCaption: "Duomo — ilk başvurudan önce",
      side: "İki Kıyı",
      word: "ALVOLO",
    },
    gate: {
      index: "01",
      label: "İtalyan Kıyısı",
      alt: "La Sponda Italiana",
      heading: "Mermer, taş, açık bırakılmış tek bir kapı.",
      lead: "Alvolo, Duomo'nun kulelerinin sisle buluştuğu yerde başlar: noter senedi, Partita IVA ve kapılarını açmaya hazır bir bankayla girilen altmış milyonluk bir pazar. Evrak, bir şirketin ilk İtalyan kışını atlatmayı öğrenme biçimidir ve bu kıyının sizden anlamanızı istediği ilk şeydir.",
      body: "Meydanı geçin; Galleria sisin içinden yükselir, cam çatısı bir blok büyüklüğünde bir fener gibi içeriden aydınlanır. Çatıların üzerinde solgun bir ay yerini korur, sabırlı, yarı gizli. Bu şehir acele etmez; önümüzdeki birkaç hafta boyunca kuruluşunuz da etmeyecek.",
      link: "Koridoru geçin",
      stats: [
        { value: "02", label: "Yargı alanı" },
        { value: "03", label: "Şehir" },
        { value: "04", label: "Aşama" },
        { value: "01", label: "Mandat" },
      ],
    },
    pathways: {
      index: "02",
      label: "Koridorlar",
      alt: "Corridoi",
      plates: [
        { id: "milan", label: "Milano", alt: "İçe dönük · İtalya", meta: "Giriş", index: "01 / 03", href: "/services/expansion/italy/" },
        { id: "istanbul", label: "İstanbul", alt: "Dışa dönük · Tedarik", meta: "Kaynak", index: "02 / 03", href: "/services/expansion/turkey/" },
        { id: "rome", label: "Roma", alt: "Düzenleyici · Bakanlıklar", meta: "Mühür", index: "03 / 03", href: "/services/" },
      ],
    },
    lessons: {
      index: "03",
      label: "Protokol",
      alt: "Protocollo",
      heading: "Dört aşama. Tek mandat. İki kıyı.",
      body: "Her aşama bir yürüyüştür. Denetime varır, yapılandırmayı geçer, noterle oturur ve fatura kesebilen bir şirketle ayrılırsınız.",
      items: [
        { num: "01", title: "Denetim", alt: "L'Audit", text: "Yargı alanı ve uyum denetimi: lisanslama, göç, AML ve sektör kuralları herhangi bir yapı çizilmeden önce haritalanır.", time: "1–2 hafta" },
        { num: "02", title: "Vergi Mimarisi", alt: "Architettura", text: "Şirket türü, holding katmanları ve anlaşma konumlandırması nicel olarak modellenir ve kurucular tarafından onaylanır.", time: "2–3 hafta" },
        { num: "03", title: "Kuruluş", alt: "Costituzione", text: "Noter senedi, Partita IVA, PEC ve bankacılık; Codice Fiscale, izinler ve yönetici taşınmasıyla paralel yürür.", time: "3–8 hafta" },
        { num: "04", title: "Entegrasyon", alt: "Onboarding", text: "İmalat ortakları denetlenir ve sözleşmeye bağlanır, Gümrük Birliği koridoru tasarlanır, kalite ve fikri mülkiyet yönetişimi yerleştirilir.", time: "4–14 hafta" },
        { num: "05", title: "Solgun Ay", alt: "Continuità", text: "Koridor ilk faturadan sonra da açık kalır; mandat o yolda yürümeye devam eder.", time: "sürekli" },
      ],
    },
    eternity: {
      eyebrow: "Bölüm 04 — Süreklilik",
      word: "Süreklilik",
      body: "Kapı arkanızdan açık kalır. Vergi beyanları, bordro, tedarikçi incelemeleri ve bir sonraki genişleme aynı koridorda, yanınızda aynı danışmanla ilerler.",
      cta: "Mandatı başlat",
    },
    footer: {
      statement: "Alvolo, şirketleri ve insanlarını İtalya–Türkiye koridorundan geçirir: ilk mevzuat denetiminden faaliyetteki şirkete kadar, Milano'dan İstanbul'a sorumluluğu üstlenen tek bir kıdemli danışmanla.",
      columns: [
        {
          title: "Bölümler",
          links: [
            { label: "İtalyan Kıyısı", href: "#gate" },
            { label: "Koridorlar", href: "#pathways" },
            { label: "Protokol", href: "#lessons" },
            { label: "Süreklilik", href: "#eternity" },
          ],
        },
        {
          title: "Pratik",
          links: [
            { label: "İtalya genişleme", href: "/services/expansion/italy/" },
            { label: "Türkiye tedarik", href: "/services/expansion/turkey/" },
            { label: "Startup koridoru", href: "/services/startup-corridor/" },
            { label: "Size özel mandat", href: "/brief/" },
          ],
        },
        {
          title: "Başka Yerde",
          links: [
            { label: "Ortaklar", href: "/about/" },
            { label: "Metodoloji", href: "/methodology/" },
            { label: "Müşteri portalı", href: "/portal/" },
            { label: "İletişim", href: "/contact/" },
          ],
        },
      ],
      copyright: "© 2026 Alvolo Consulting — İki Kıyı",
      motto: "Due sponde, un solo mercato · İki kıyı, tek pazar",
      colophon: "Milano · Roma · İstanbul",
      language: "Dil",
    },
    rail: ["İki Kıyı", "İtalyan Kıyısı", "Koridorlar", "Protokol", "Süreklilik", "Künye"],
  },
  it: {
    preloader: { mark: "Due Sponde · İki Kıyı", line: "Sollevando le due sponde" },
    brand: { name: "ALVOLO", tag: "MILANO · ROMA · ISTANBUL" },
    nav: [
      { href: "#gate", label: "Sponde", alt: "Kıyılar" },
      { href: "#pathways", label: "Corridoi", alt: "Koridorlar" },
      { href: "#lessons", label: "Protocollo", alt: "Protokol" },
      { href: "#eternity", label: "Continuità", alt: "Süreklilik" },
    ],
    menu: "Menu",
    hero: {
      eyebrow: "Capitolo 00 — Due Sponde",
      lines: ["Dove due sponde", "diventano un solo", "mercato."],
      sub: "Entra in Italia da Milano e raggiungi la Türkiye da Istanbul: costituzione, fisco, relocation e sourcing su un unico percorso.",
      cue: "Scorri per attraversare",
      chips: [
        { num: "01", title: "Sponda Italiana", text: "Costituzione S.r.l. e S.p.A., Codice Fiscale, permessi e banking." },
        { num: "02", title: "Corridoi", text: "Milano, Roma e Istanbul: tre città, un mandato." },
        { num: "03", title: "Protocollo", text: "Quattro fasi in sequenza, dall'audit all'onboarding." },
        { num: "04", title: "Continuità", text: "Fisco, payroll e gestione dei partner dopo la prima fattura." },
      ],
      peekWord: "Milano",
      peekCaption: "Duomo — prima del primo deposito",
      side: "İki Kıyı",
      word: "ALVOLO",
    },
    gate: {
      index: "01",
      label: "La Sponda Italiana",
      alt: "İtalyan Kıyısı",
      heading: "Marmo, pietra, una porta lasciata aperta.",
      lead: "Alvolo comincia dove le guglie del Duomo incontrano la nebbia: un mercato di sessanta milioni di persone, in cui si entra con un atto notarile, una Partita IVA e una banca disposta ad aprire le porte. Le carte sono il modo in cui un'impresa impara a superare il primo inverno italiano, e la prima cosa che questa sponda ti chiede di capire.",
      body: "Attraversa la piazza e la Galleria emerge dalla foschia, il tetto di vetro acceso dall'interno come una lanterna grande quanto un isolato. Sopra i tetti una luna pallida tiene il suo posto, paziente, mezza nascosta. La città qui prende il suo tempo, e per le prossime settimane lo prenderà anche la tua costituzione.",
      link: "Attraversa il corridoio",
      stats: [
        { value: "02", label: "Giurisdizioni" },
        { value: "03", label: "Città" },
        { value: "04", label: "Fasi" },
        { value: "01", label: "Mandato" },
      ],
    },
    pathways: {
      index: "02",
      label: "Corridoi",
      alt: "Koridorlar",
      plates: [
        { id: "milan", label: "Milano", alt: "Inbound · Italia", meta: "L'ingresso", index: "01 / 03", href: "/services/expansion/italy/" },
        { id: "istanbul", label: "Istanbul", alt: "Outbound · Sourcing", meta: "La fonte", index: "02 / 03", href: "/services/expansion/turkey/" },
        { id: "rome", label: "Roma", alt: "Regolatorio · Ministeri", meta: "Il sigillo", index: "03 / 03", href: "/services/" },
      ],
    },
    lessons: {
      index: "03",
      label: "Il Protocollo",
      alt: "Protokol",
      heading: "Quattro fasi. Un mandato. Due sponde.",
      body: "Ogni fase è una passeggiata. Arrivi all'audit, attraversi la strutturazione, siedi con il notaio e te ne vai con una società che può fatturare.",
      items: [
        { num: "01", title: "L'Audit", alt: "Denetim", text: "Audit giurisdizionale e di compliance: autorizzazioni, immigrazione, antiriciclaggio e norme di settore mappate prima di disegnare qualsiasi struttura.", time: "1–2 settimane" },
        { num: "02", title: "Architettura Fiscale", alt: "Vergi Mimarisi", text: "Scelta del veicolo, livelli di holding e posizionamento convenzionale, modellati quantitativamente e approvati dai founder.", time: "2–3 settimane" },
        { num: "03", title: "Costituzione", alt: "Kuruluş", text: "Atto notarile, Partita IVA, PEC e banking in parallelo con Codice Fiscale, permessi e relocation dei dirigenti.", time: "3–8 settimane" },
        { num: "04", title: "Onboarding", alt: "Entegrasyon", text: "Partner manifatturieri verificati e contrattualizzati, corridoio doganale progettato, governance di qualità e IP integrata.", time: "4–14 settimane" },
        { num: "05", title: "La Luna Pallida", alt: "Süreklilik", text: "Il corridoio resta aperto dopo la prima fattura, e il mandato continua a percorrerlo.", time: "continuativo" },
      ],
    },
    eternity: {
      eyebrow: "Capitolo 04 — Continuità",
      word: "Continuità",
      body: "La porta resta aperta alle tue spalle. Dichiarazioni fiscali, payroll, revisioni dei fornitori e la prossima espansione corrono sullo stesso corridoio, con lo stesso advisor al tuo fianco.",
      cta: "Inizia il mandato",
    },
    footer: {
      statement: "Alvolo accompagna imprese e persone lungo il corridoio Italia–Türkiye: dal primo audit regolatorio alla società operativa, con un unico consulente senior responsabile da Milano a Istanbul.",
      columns: [
        {
          title: "Capitoli",
          links: [
            { label: "La Sponda Italiana", href: "#gate" },
            { label: "Corridoi", href: "#pathways" },
            { label: "Il Protocollo", href: "#lessons" },
            { label: "Continuità", href: "#eternity" },
          ],
        },
        {
          title: "Pratica",
          links: [
            { label: "Espansione Italia", href: "/services/expansion/italy/" },
            { label: "Sourcing Türkiye", href: "/services/expansion/turkey/" },
            { label: "Corridoio startup", href: "/services/startup-corridor/" },
            { label: "Il vostro mandato su misura", href: "/brief/" },
          ],
        },
        {
          title: "Altrove",
          links: [
            { label: "Partner", href: "/about/" },
            { label: "Metodologia", href: "/methodology/" },
            { label: "Portale clienti", href: "/portal/" },
            { label: "Contatti", href: "/contact/" },
          ],
        },
      ],
      copyright: "© 2026 Alvolo Consulting — Due Sponde",
      motto: "İki kıyı, tek pazar · Due sponde, un solo mercato",
      colophon: "Milano · Roma · Istanbul",
      language: "Lingua",
    },
    rail: ["Due Sponde", "La Sponda Italiana", "Corridoi", "Il Protocollo", "Continuità", "Colophon"],
  },
};
