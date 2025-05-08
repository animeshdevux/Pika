import { db } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default async function Page({
  searchParams,
}: {
  searchParams: { style?: string; category?: string };
}) {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });
  const styles = ["stroke", "solid", "colored", "duo-stroke", "duo-solid"];
  const icons = await db.icon.findMany({
    where: searchParams.category
      ? { category: { slug: searchParams.category } }
      : undefined,
    include: { category: true },
  });
  const filteredIcons = searchParams.style
    ? icons.filter((icon) => icon.style === searchParams.style)
    : icons;
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories?category=${category.slug}`}
                  className={`block px-4 py-2 rounded-lg ${
                    searchParams.category === category.slug
                      ? "bg-purple-100 text-purple-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h2 className="text-xl font-bold mt-8 mb-4">Styles</h2>
            <div className="space-y-2">
              {styles.map((style) => (
                <Link
                  key={style}
                  href={`/categories?style=${style}`}
                  className={`block px-4 py-2 rounded-lg ${
                    searchParams.style === style
                      ? "bg-purple-100 text-purple-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              {searchParams.category
                ? categories.find((c) => c.slug === searchParams.category)?.name
                : searchParams.style
                ? `${searchParams.style.charAt(0).toUpperCase() + searchParams.style.slice(1)} Icons`
                : "All Icons"}
            </h1>
            <Button variant="outline">Download All</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredIcons.map((icon) => (
              <Link key={icon.id} href={`/icons/${icon.id}`} className="group">
                <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-500 transition-colors">
                  <div className="w-12 h-12 mb-2 flex items-center justify-center">
                    <img
                      src={`/icons/${icon.id}.svg`}
                      alt={icon.name}
                      className="w-8 h-8"
                    />
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-purple-600">
                    {icon.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
