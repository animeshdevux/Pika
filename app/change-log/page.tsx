import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChangeLogPage() {
  const changes = [
    {
      version: "v1.2.0",
      date: "May 1, 2023",
      title: "New Categories & Improved Customization",
      description: "Added 200+ new icons across 5 new categories. Enhanced customization options in Figma.",
      changes: [
        "Added 200+ new icons",
        "Introduced 5 new categories",
        "Improved Figma component structure",
        "Enhanced customization options",
        "Fixed alignment issues in several icons",
      ],
    },
    {
      version: "v1.1.0",
      date: "March 15, 2023",
      title: "Performance Optimization",
      description: "Optimized SVG files for better performance and smaller file sizes.",
      changes: [
        "Reduced average SVG file size by 30%",
        "Improved rendering performance",
        "Added 50 new icons",
        "Fixed inconsistencies in stroke width",
        "Updated documentation",
      ],
    },
    {
      version: "v1.0.0",
      date: "January 10, 2023",
      title: "Initial Release",
      description: "First public release of Pikaicons with 500+ icons in 10 categories.",
      changes: [
        "Released 500+ icons",
        "Organized into 10 categories",
        "Figma library published",
        "SVG and PNG download options",
        "Basic customization features",
      ],
    },
  ]

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Change Log</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Track our progress and see what's new in Pikaicons.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {changes.map((change, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {change.version}
                    <span className="text-sm font-normal text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      {change.date}
                    </span>
                  </CardTitle>
                  <CardDescription className="text-lg font-medium mt-1">{change.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{change.description}</p>
              <ul className="space-y-2">
                {change.changes.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
