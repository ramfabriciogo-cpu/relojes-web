const relojes = [
  {
    id: 1,
    marca: "Rolex",
    modelo: "Submariner Date",
    referencia: "126610LN",
    año: 2020,
    tipo: "coleccion",
    descripcion: "Nacido en 1953 para acompañar a los primeros hombres que conquistaron las profundidades del océano, el Submariner es el reloj de buceo por excelencia. Setenta años de evolución cuidadosa lo han convertido en el icono más reconocible de la relojería moderna — y sin embargo, quien vea uno de 1954 junto a este 126610LN los reconocerá como el mismo reloj. Eso es diseño atemporal.",
    foto: "img/rolex-submariner.avif",
    specs: {
      diámetro: "41 mm",
      material: "Oystersteel 904L",
      movimiento: "Cal. 3235 automático",
      reserva: "70 horas",
      resistencia: "300 m / 1,000 ft",
      bisel: "Cerachrom negro"
    },
    precios: [
      { tienda: "Chrono24", precio: 14200, url: "https://www.chrono24.com/rolex/submariner-date--ref-126610ln--i1.htm" },
      { tienda: "eBay",     precio: 14950, url: "https://www.ebay.com/sch/i.html?_nkw=rolex+submariner+126610ln" },
      { tienda: "WatchBox", precio: 15400, url: "https://www.watchbox.com/search?q=rolex+submariner+126610ln" }
    ]
  },
  {
    id: 2,
    marca: "Patek Philippe",
    modelo: "Nautilus",
    referencia: "5711/1A-010",
    año: 2006,
    tipo: "coleccion",
    descripcion: "En 1976, Gérald Genta esbozó este reloj en cinco minutos sobre una servilleta, inspirado en los ojos de buey de los transatlánticos. Patek Philippe lo presentó en acero — un material que nadie consideraba digno de la alta relojería — y el mundo lo ignoró. Cuarenta años después, el 5711 se convirtió en el reloj más codiciado de la historia, con listas de espera de años y premios de mercado secundario de 300% sobre su precio de boutique.",
    foto: "img/patek-nautilus.avif",
    specs: {
      diámetro: "40 mm",
      material: "Acero inoxidable",
      movimiento: "Cal. 26-330 SC automático",
      reserva: "45 horas",
      resistencia: "120 m / 394 ft",
      dial: "Azul degradado"
    },
    precios: [
      { tienda: "Chrono24", precio: 135000, url: "https://www.chrono24.com/patekphilippe/nautilus--ref-5711-1a-010--i1.htm" },
      { tienda: "eBay",     precio: 138000, url: "https://www.ebay.com/sch/i.html?_nkw=patek+philippe+nautilus+5711" },
      { tienda: "Subdial",  precio: 142000, url: "https://subdial.com/search?q=patek+nautilus+5711" }
    ]
  },
  {
    id: 3,
    marca: "Audemars Piguet",
    modelo: "Royal Oak",
    referencia: "15500ST.OO.1220ST.01",
    año: 2019,
    tipo: "coleccion",
    descripcion: "En 1972, el mismo Gérald Genta que crearía el Nautilus cuatro años después diseñó el Royal Oak — el primer reloj deportivo de lujo en acero de la historia. Ocho tornillos hexagonales en el bisel octogonal, inspirados en los cascos de los buzos de la Royal Navy. El patrón Grande Tapisserie del dial. Un brazalete integrado sin precedentes. Medio siglo después, el 15500ST es su versión más pura y fiel al diseño original.",
    foto: "img/royal-oak.avif",
    specs: {
      diámetro: "41 mm",
      material: "Acero inoxidable",
      movimiento: "Cal. 4302 automático",
      reserva: "70 horas",
      resistencia: "50 m / 165 ft",
      dial: "Azul Grande Tapisserie"
    },
    precios: [
      { tienda: "Chrono24", precio: 89000, url: "https://www.chrono24.com/audemarspiguet/royal-oak--ref-15500st--i1.htm" },
      { tienda: "eBay",     precio: 92000, url: "https://www.ebay.com/sch/i.html?_nkw=audemars+piguet+royal+oak+15500" },
      { tienda: "WatchBox", precio: 95000, url: "https://www.watchbox.com/search?q=royal+oak+15500" }
    ]
  },
  {
    id: 4,
    marca: "Tudor",
    modelo: "Black Bay 58",
    referencia: "M79030N-0001",
    año: 2018,
    tipo: "coleccion",
    descripcion: "Tudor nació en 1926 como la alternativa accesible de Hans Wilsdorf — el mismo fundador de Rolex — para quienes querían rigor suizo sin el precio de Corona. El Black Bay 58 es un homenaje directo a los relojes de buceo Tudor de 1958: mismo diámetro compacto de 39 mm, misma caja de perfil bajo, misma corona sin protección. Moderno en cada detalle técnico, vintage en cada centímetro de alma.",
    foto: "img/tudor-blackbay58.avif",
    specs: {
      diámetro: "39 mm",
      material: "Acero inoxidable",
      movimiento: "Cal. MT5402 automático",
      reserva: "70 horas",
      resistencia: "200 m / 660 ft",
      bisel: "Aluminio negro"
    },
    precios: [
      { tienda: "Chrono24", precio: 3200, url: "https://www.chrono24.com/tudor/black-bay-58--ref-m79030n--i1.htm" },
      { tienda: "eBay",     precio: 3450, url: "https://www.ebay.com/sch/i.html?_nkw=tudor+black+bay+58+79030n" },
      { tienda: "WatchBox", precio: 3600, url: "https://www.watchbox.com/search?q=tudor+black+bay+58" }
    ]
  }
];