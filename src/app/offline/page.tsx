"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WifiOff } from 'lucide-react'

export default function Offline() {
  return (
    <div className="container mx-auto p-4 h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">You're Offline</CardTitle>
          <CardDescription className="text-center">
            <WifiOff className="mx-auto mt-4" size={48} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            It looks like you've lost your internet connection. Please check your network settings and try again.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}