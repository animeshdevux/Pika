export function TrustedBy() {
  const companies = [
    { name: "Instadapp", logo: "INSTADAPP" },
    { name: "Netcompany", logo: "Netcompany" },
    { name: "Healthify", logo: "Healthify" },
    { name: "JUSPAY", logo: "JUSPAY" },
    { name: "Sling", logo: "sling" },
    { name: "Fashion Nova", logo: "FASHION NOVA" },
    { name: "Cyfrin", logo: "Cyfrin" },
    { name: "Wonde", logo: "wonde" },
    { name: "GL6", logo: "gl6" },
    { name: "Global", logo: "global" },
    { name: "Layerswap", logo: "Layerswap" },
    { name: "Kapture", logo: "kapture" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
      {companies.map((company, index) => (
        <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
          <div className="text-gray-500 font-medium">{company.logo}</div>
        </div>
      ))}
    </div>
  )
}
