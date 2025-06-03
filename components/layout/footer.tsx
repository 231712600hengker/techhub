import Link from "next/link"
import { Laptop, Mail, MapPin, Phone, Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Laptop className="h-6 w-6" />
              <span className="text-lg font-bold">TechHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted destination for cutting-edge technology and electronics. Bringing innovation to your fingertips since 2020.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/shop" className="block text-sm text-muted-foreground hover:text-foreground">
                Shop
              </Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Contact Info</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start">
                <MapPin className="mr-3 h-4 w-4 shrink-0 translate-y-1" />
                <span>123 Tech Street, Digital City, 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-4 w-4 shrink-0" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-4 w-4 shrink-0" />
                <span>support@techhub.com</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Follow Us</h3>
            <div className="flex space-x-2">
              <Link href="#" className="rounded-md p-2 hover:bg-muted">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="rounded-md p-2 hover:bg-muted">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="rounded-md p-2 hover:bg-muted">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TechHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}