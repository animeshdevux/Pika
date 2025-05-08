import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue={session.user?.name || ""}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={session.user?.email || ""}
                className="mt-1"
                disabled
              />
            </div>
            <Button>Update Profile</Button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <select
                id="theme"
                className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <Label htmlFor="notifications">Email Notifications</Label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  New icon updates
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Newsletter
                </label>
              </div>
            </div>
            <Button>Save Preferences</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 