"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconUpload } from "@/components/admin/icon-upload"
import { CategoryManager } from "@/components/admin/category-manager"
import { IconManager } from "@/components/admin/icon-manager"
import { UserManager } from "@/components/admin/user-manager"

export function AdminTabs() {
  const [activeTab, setActiveTab] = useState("icons")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="icons">Icons</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
      </TabsList>
      <TabsContent value="icons" className="space-y-4">
        <IconManager />
      </TabsContent>
      <TabsContent value="categories" className="space-y-4">
        <CategoryManager />
      </TabsContent>
      <TabsContent value="upload" className="space-y-4">
        <IconUpload />
      </TabsContent>
      <TabsContent value="users" className="space-y-4">
        <UserManager />
      </TabsContent>
    </Tabs>
  )
}
