import { IconArrowsTransferDown } from "@tabler/icons-vue";
import { IconArrowsTransferUp } from "@tabler/icons-vue";

/*--Navigation Links---*/
const headerMenu = [
  {
    title: "Nosotros",
    href: "#nosotros",
  },
  {
    title: "Productos",
    href: "#trackwise",
  },
  {
    title: "Soluciones",
    href: "#casos-uso",
  },
  {
    title: "Precios",
    href: "#tarifas",
  },
  {
    title: "Contacto",
    href: "#form-contacto",
  },
];

const headerDashBoard = [

  {
    title: "Agregar a contrato",
    href: "#updateContract",
    logo: IconArrowsTransferDown,
    action: 'update',
    group: [
      {
        title: "Catálogos",
        href: "#trackCatalog",
        logo: IconArrowsTransferUp,
        index: 1
      },
      {
        title: "Productos",
        href: "#trackProduct",
        logo: IconArrowsTransferUp,
        index: 2
      },
      {
        title: "Rastros",
        href: "#trackInfo",
        logo: IconArrowsTransferUp,
        index: 3
      }
    ]
  },
  {
    title: "Leer contrato",
    href: "#readContract",
    logo: IconArrowsTransferDown,
    action: 'read',
    group: [
      {
        title: "Catálogos",
        href: "#trackCatalog",
        logo: IconArrowsTransferUp,
        index: 4
      },
      {
        title: "Productos",
        href: "#trackProduct",
        logo: IconArrowsTransferUp,
        index: 5
      },
      {
        title: "Rastros",
        href: "#trackInfo",
        logo: IconArrowsTransferUp,
        index: 6
      }
    ]
  },
];

/*--Feature 1--*/
const feature1 = [
  {
    title: "Reducir desperdicio de productos",
    icon: "mdi mdi-star",
    desc: "Optimizamos la cadena de suministro para reducir el desperdicio de productos, aumentando la eficiencia y la sostenibilidad.",
  },
  {
    title: "Información veraz para procesos críticos y cadenas de producción",
    icon: "mdi mdi-check-circle",
    desc: "Proporcionamos información veraz y confiable en tiempo real para garantizar procesos críticos y cadenas de producción eficientes y transparentes.",
  },
  {
    title: "Determine el impacto de la huella de carbón",
    icon: "mdi mdi-star",
    desc: "Medimos y evaluamos el impacto de la huella de carbono de tus productos, brindando información precisa para fomentar la sostenibilidad ambiental.",
  },
  {
    title: "Seguimiento seguro de medicamentos y dispositivos médicos",
    icon: "mdi mdi-check-circle",
    desc: "Aseguramos un seguimiento seguro y confiable de medicamentos y dispositivos médicos en toda su cadena de suministro, garantizando la calidad y la seguridad del paciente.",
  },
];

/*--Feature 2--*/
const feature2 = [
  {
    title: "Identifique productos fraudulentos.",
    img: "img1.jpg",
  },
  {
    title: "Entregue información veraz a su cliente.",
    img: "img2.jpg",
  },
  {
    title: "Verificación de prescripciones médicas.",
    img: "img3.jpg",
  },
  {
    title: "Agilice entregas con Contratos inteligentes",
    img: "img4.jpg",
  },
];

/*--Portfolio--*/
const portfolio = [
  {
    img: "BTC_bull.jpg",
    title: "Verificar la procedencia y calidad de los productos",
    subtext:
      "Información detallada del origen, ingredientes y prácticas de producción.",
  },
  {
    img: "BTC_crypto.jpg",
    title: "Garantizar la trazabilidad",
    subtext: "Registrar cada etapa de la cadena de producción.",
  },
  {
    img: "ether.jpg",
    title: "Asegurar la transparencia",
    subtext: "Información verificada para gestión de procesos críticos.",
  },
];

/*--Pricing Plan--*/
const pricePlan = [
  {
    title: "Plan Regular",
    price: "Gratuito",
    plan: "PERSONAL",
    desc: "El Plan Regular permite interactuar con contratos inteligentes utilizando su cuenta.",
    buttoncolor: "primary",
    route: "/dashboard",
  },
  {
    title: "Plan Master",
    price: "Por alcance",
    plan: "EMPRESARIAL",
    desc: "El Plan Master le permite personalizar contratos inteligentes utilizando su cuenta.",
    buttoncolor: "error",
    route: "#form-contacto",
  },
];

/*--Team--*/
const team = [
  {
    img: "l3mik3l.png",
    title: "Michael Arias Fajardo",
    subtitle: "Especialista en Gerencia de Producto",
    desc: "WEB3/WEB2/MOBILE DEVELOPER | IT PRODUCT MANAGER | GROWTH HACKER.",
    socialicon: [
      {
        url: "https://www.linkedin.com/in/nkiq%C3%AC/",
        icon: "mdi mdi-linkedin",
      },
      {
        url: "https://www.facebook.com/YoguiMind/",
        icon: "mdi mdi-facebook",
      },
      {
        url: "/",
        icon: "mdi mdi-twitter",
      },
      {
        url: "https://www.instagram.com/nkiqi/",
        icon: "mdi mdi-instagram",
      },
    ],
  },
];

/*--Testimonials--*/
const Testimonials = [
  {
    img: "1.jpg",
    testimonial:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.",
    name: "MICHELLE ANDERSON",
    socialicon: [
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-muted" },
    ],
  },
  {
    img: "2.jpg",
    testimonial:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.",
    name: "MARK MESTY",
    socialicon: [
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-muted" },
    ],
  },
  {
    img: "3.jpg",
    testimonial:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.",
    name: "LIMPSY ADAM",
    socialicon: [
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-error" },
      { icon: "mdi mdi-star text-muted" },
    ],
  },
];

/*--Blogs--*/
const Blog = [
  {
    img: "esencia auténtica.jpg",
    title: "Blockchain Revoluciona la Transparencia en la Cadena de Suministro",
    desc: "Información detallada del origen, ingredientes y prácticas de producción.",
    route: "/blog-article/1",
    month: "Oct",
    date: "23",
  },
  {
    img: "Seguimiento seguro.jpg",
    title: "Trazabilidad: La Clave para la Toma de Decisiones en la Cadena de Producción",
    desc: "Registrar cada etapa de la cadena de producción.",
    route: "/blog-article/2",
    month: "Oct",
    date: "23",
  },
  {
    img: "crypto market.jpg",
    title: "Transparencia Asegurada: La Clave para la Gestión Efectiva de Procesos Críticos",
    desc: "Información verificada para gestión de procesos críticos.",
    route: "/blog-article/3",
    month: "Oct",
    date: "23",
  },
];


/*--BlogArticle--*/
const BlogArticle = [
  {
    img: "esencia auténtica.jpg",
    title: "Blockchain Revoluciona la Transparencia en la Cadena de Suministro",
    subtitle: "PrimalTrace asegura la autenticidad de tus productos con tecnología de vanguardia.",
    route: "1",
    descA: "La transparencia en la cadena de suministro es crucial para los consumidores conscientes de la calidad y procedencia de los productos que adquieren. En un mundo cada vez más preocupado por la sostenibilidad y la autenticidad, las empresas se enfrentan al desafío de garantizar que los productos que llegan a los consumidores cumplan con estándares de calidad. PrimalTrace, líder en la integración de la tecnología blockchain en la cadena de suministro, proporciona una solución innovadora que garantiza la trazabilidad y la autenticidad de los productos, desde su origen hasta su destino final. ",
    descB: "Con el uso de sistemas de archivos distribuidos e interacción con contratos inteligentes en la cadena de bloques, PrimalTrace permite a las empresas de HealthTech y FoodTech verificar la procedencia y calidad de sus productos de manera confiable. ¿Cómo lo logra? Proporcionando a los consumidores información detallada sobre el origen de los productos, los ingredientes utilizados y las prácticas de producción empleadas. A través de la tecnología blockchain, cada paso del proceso de producción se registra de manera inmutable, lo que brinda a los consumidores la tranquilidad de saber que están adquiriendo productos genuinos y de alta calidad.",
    month: "Oct",
    date: "23",
  },
  {
    img: "Seguimiento seguro.jpg",
    title: "Trazabilidad: La Clave para la Toma de Decisiones en la Cadena de Producción",
    subtitle: "PrimalTrace registra de forma infalible cada paso crucial en la cadena de producción asegurando calidad y autenticidad",
    route: "2",
    descA: "La trazabilidad es un factor fundamental en la industria actual, especialmente cuando se trata de garantizar la calidad y la autenticidad de los productos. PrimalTrace se posiciona como un líder en la implementación de soluciones innovadoras que permiten a las empresas de HealthTech y FoodTech garantizar la trazabilidad completa de sus productos en cada etapa de la cadena de producción. Utilizando tecnología blockchain y sistemas de archivos distribuidos, PrimalTrace registra de manera infalible cada fase crítica del proceso de producción, desde el origen de los ingredientes hasta la entrega final del producto. ",
    descB: "La capacidad de registrar cada etapa de la cadena de producción proporciona a las empresas y consumidores la tranquilidad de saber exactamente cómo se fabrica y procesa cada artículo. Desde el cultivo de ingredientes hasta el empaque final, PrimalTrace utiliza su plataforma única para documentar cada paso y garantizar que se cumplan los más altos estándares de calidad y seguridad. Al proporcionar un rastro ininterrumpido de la cadena de producción, PrimalTrace fortalece la confianza del consumidor y ayuda a las empresas a demostrar su compromiso con la integridad y la transparencia en todas las etapas del proceso.",
    month: "Oct",
    date: "23",
  },
  {
    img: "crypto market.jpg",
    title: "Transparencia Asegurada: La Clave para la Gestión Efectiva de Procesos Críticos",
    subtitle: "PrimalTrace brinda información verificada para una gestión de procesos críticos impecable, asegurando la transparencia en cada etapa del camino",
    route: "3",
    descA: "En un mundo empresarial cada vez más exigente, la transparencia es esencial para la gestión efectiva de los procesos críticos. PrimalTrace, a la vanguardia de la integración de la tecnología blockchain y sistemas de archivos distribuidos, se destaca al ofrecer información verificada que garantiza una gestión de procesos sin fisuras para las empresas de HealthTech y FoodTech. Al proporcionar transparencia asegurada en cada etapa del camino, PrimalTrace permite a las empresas tomar decisiones estratégicas informadas basadas en datos confiables y precisos. ",
    descB: "La información verificada proporcionada va más allá de simplemente garantizar la autenticidad de los productos; también permite a las empresas optimizar sus procesos críticos para maximizar la eficiencia y la calidad. Al brindar una visión clara y detallada de cada aspecto de la cadena de suministro y producción, PrimalTrace capacita a las empresas para identificar y abordar áreas de mejora, fomentando así una gestión más eficiente y rentable en todos los niveles. Con PrimalTrace como su socio en transparencia, las empresas pueden asegurarse de mantener estándares de calidad óptimos y cumplir con las expectativas de los consumidores en un mercado en constante evolución.",
    month: "Oct",
    date: "23",
  },
];

export {
  headerMenu,
  headerDashBoard,
  feature1,
  feature2,
  portfolio,
  pricePlan,
  team,
  Testimonials,
  Blog,
  BlogArticle
};
