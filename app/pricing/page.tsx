import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for personal projects and exploration",
      features: ["Access to 100+ icons", "SVG format", "Personal use only", "Basic customization"],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      price: "$19",
      period: "one-time payment",
      description: "For professional designers and developers",
      features: [
        "Access to 1000+ icons",
        "SVG, PNG, and Figma formats",
        "Commercial use",
        "Advanced customization",
        "Regular updates",
        "Priority support",
      ],
      buttonText: "Buy Now",
      buttonVariant: "default" as const,
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Custom icon requests",
        "Dedicated support",
        "Team collaboration",
        "Extended license",
        "API access",
      ],
      buttonText: "Contact Us",
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the plan that's right for you and get access to our beautiful icon library.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <Card key={index} className={`flex flex-col ${plan.highlighted ? "border-purple-500 shadow-lg" : ""}`}>
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-500 text-sm ml-2">{plan.period}</span>}
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={plan.buttonVariant}
                className={`w-full ${plan.highlighted ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}`}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
