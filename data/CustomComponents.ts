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

/*--Feature 1--*/
const feature1 =[
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
const feature2 =[
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
const portfolio =[
  {
    img: "BTC_bull.jpg",
    title: "Verificar la procedencia y calidad de los productos",
    subtext: "Información detallada del origen, ingredientes y prácticas de producción.",
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
const pricePlan =[
  {
    title: "Plan Regular",
    price: "3M",
    plan: "ANUAL",
    desc:"El Plan Regular le permite personalizar contratos inteligentes utilizando su cuenta.",
    buttoncolor:"primary"
  },
  {
    title: "Plan Master",
    price: "7M",
    plan: "ANUAL",
    desc:"El Plan Master le permite personalizar contratos inteligentes utilizando su cuenta.",
    buttoncolor:"error"
  },
  {
    title: "Plan Premium",
    price: "15M",
    plan: "YEARLY",
    desc:"El Plan Premium le permite personalizar contratos inteligentes utilizando su cuenta.",
    buttoncolor:"primary"
  },
];

/*--Team--*/
const team =[
  {
    img: "l3mik3l.png",
    title: "Michael Arias Fajardo",
    subtitle: "Product Manager Specialist",
    desc: "WEB & MOBILE APP DEVELOPER | PROJECT MANAGER | IT ENGINEER | GROWTH HACKER.",
    socialicon: [
      {
        url: "/",
        icon: "mdi mdi-facebook",
      },
      {
        url: "/",
        icon: "mdi mdi-twitter",
      },
      {
        url: "/",
        icon: "mdi mdi-instagram",
      },
      {
        url: "/",
        icon: "mdi mdi-youtube",
      },
    ],
  },
  {
    img: "l3mik3l.png",
    title: "Michael Arias Fajardo",
    subtitle: "Product Manager Specialist",
    desc: "WEB & MOBILE APP DEVELOPER | PROJECT MANAGER | IT ENGINEER | GROWTH HACKER.",
    socialicon: [
      {
        url: "/",
        icon: "mdi mdi-facebook",
      },
      {
        url: "/",
        icon: "mdi mdi-twitter",
      },
      {
        url: "/",
        icon: "mdi mdi-instagram",
      },
      {
        url: "/",
        icon: "mdi mdi-youtube",
      },
    ],
  },
];

/*--Testimonials--*/
const Testimonials =[
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
const Blog =[
  {
    img: "esencia auténtica.jpg",
    title: "Verificar la procedencia y calidad de los productos",
    desc: "Información detallada del origen, ingredientes y prácticas de producción.",
    month: "Oct",
    date: "23",
  },
  {
    img: "Seguimiento seguro.jpg",
    title: "Garantizar la trazabilidad",
    desc: "Registrar cada etapa de la cadena de producción.",
    month: "Oct",
    date: "23",
  },
  {
    img: "crypto market.jpg",
    title: "Asegurar la transparencia.",
    desc: "Información verificada para gestión de procesos críticos.",
    month: "Oct",
    date: "23",
  },
];

export { headerMenu,feature1,feature2,portfolio,pricePlan,team,Testimonials,Blog};
