import { Phone } from "lucide-react"

const Contact = () => {
  return (
    <div className="container py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Phone</h3>
          <p className="text-muted-foreground mb-4">Our customer support team is available 24/7 to assist you.</p>
          <p className="font-medium">+237 233 123 456</p>

          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mt-6 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail h-6 w-6 text-primary"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Email</h3>
          <p className="text-muted-foreground mb-4">Feel free to drop us a line.</p>
          <p className="font-medium">support@travelease.cm</p>

          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mt-6 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin h-6 w-6 text-primary"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Address</h3>
          <p className="text-muted-foreground mb-4">Visit our office.</p>
          <p className="font-medium">123 Avenue de l'Indépendance</p>
          <p className="font-medium">Douala, Cameroon</p>
        </div>

        {/* Map */}
        <div className="h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4047916.5803842307!2d9.2997275!3d4.1412344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10613753703e0f21%3A0x2b03c44599829b53!2sCameroon!5e0!3m2!1sen!2s!4v1617978657948!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="TravelEase Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact

