import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">About TechHub</h1>
      
      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Our Story</h2>
          <p className="mb-4 text-muted-foreground">
            Founded in 2020, TechHub began with a simple mission: to provide cutting-edge technology and exceptional service to tech enthusiasts everywhere. What started as a small electronics store has grown into a trusted destination for the latest gadgets and tech solutions.
          </p>
          <p className="mb-4 text-muted-foreground">
            Our founder, Sarah Johnson, spent years working in Silicon Valley before establishing TechHub with a vision to make premium technology accessible while providing expert guidance to customers.
          </p>
          <p className="text-muted-foreground">
            Today, we continue to curate the best in consumer electronics, from smartphones and laptops to smart home devices and gaming gear, all while maintaining our commitment to customer satisfaction and technical expertise.
          </p>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg"
            alt="Modern electronics store interior"
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-medium">Innovation</h3>
            <p className="text-sm text-muted-foreground">
              We stay ahead of the curve, offering the latest and most innovative technology products to our customers.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-medium">Quality</h3>
            <p className="text-sm text-muted-foreground">
              We partner with trusted brands and thoroughly test all products to ensure the highest quality standards.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-medium">Education</h3>
            <p className="text-sm text-muted-foreground">
              We believe in empowering our customers with knowledge about technology through workshops and expert advice.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="mb-6 text-2xl font-semibold">Our Team</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto mb-3 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
  },
  {
    name: "Michael Chen",
    role: "Head of Product",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
  },
  {
    name: "Emily Rodriguez",
    role: "Tech Specialist",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
  },
  {
    name: "David Wilson",
    role: "Operations Manager",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  }
]