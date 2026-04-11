import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react'
import { toast } from 'sonner'

type ContactSubmission = {
  id: string
  name: string
  email: string
  company: string
  subject: string
  message: string
  timestamp: string
}

const SUBJECT_OPTIONS = [
  'Pilot partnership',
  'Investment / funding',
  'Technology licensing',
  'Research collaboration',
  'Careers',
  'General enquiry',
]

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissions, setSubmissions] = useKV<ContactSubmission[]>('aura-contact-submissions', [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 800))

    const submission: ContactSubmission = {
      id: `contact-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      ...formData,
      timestamp: new Date().toISOString(),
    }

    setSubmissions((current) => [...(current || []), submission])

    toast.success('Message sent successfully! We\'ll be in touch soon.')
    setFormData({ name: '', email: '', company: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary mb-4">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Get in touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Whether you're interested in a pilot deployment, partnership, or just
            want to learn more about NEPA — we'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="flex items-start gap-4">
            <div className="text-primary mt-1">
              <EnvelopeSimple size={20} weight="duotone" />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Email</p>
              <p className="text-sm text-muted-foreground">
                hello@aurasensehk.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-primary mt-1">
              <MapPin size={20} weight="duotone" />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Location</p>
              <p className="text-sm text-muted-foreground">
                Hong Kong SAR
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-primary mt-1">
              <Phone size={20} weight="duotone" />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Business inquiries</p>
              <p className="text-sm text-muted-foreground">
                Available on request
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-card/30 border-border/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-card/30 border-border/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company / Organization
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-card/30 border-border/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">
                  Subject *
                </Label>
                <Select value={formData.subject} onValueChange={handleSelectChange} required>
                  <SelectTrigger className="bg-card/30 border-border/40">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECT_OPTIONS.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-card/30 border-border/40 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="border border-border/30 rounded-lg p-6 bg-card/30">
              <h3 className="text-sm font-semibold mb-3">Sales & Partnerships</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Interested in deploying NEPA for your retail, logistics, or
                property operations?
              </p>
              <p className="text-sm text-muted-foreground">
                sales@aurasensehk.com
              </p>
            </div>

            <div className="border border-border/30 rounded-lg p-6 bg-card/30">
              <h3 className="text-sm font-semibold mb-3">Developer Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Technical questions about the NEPA SDK, agent configuration, or
                edge deployment?
              </p>
              <p className="text-sm text-muted-foreground">
                developers@aurasensehk.com
              </p>
            </div>

            <div className="border border-border/30 rounded-lg p-6 bg-card/30">
              <h3 className="text-sm font-semibold mb-3">Press & Media</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                For media inquiries, press kits, or interview requests.
              </p>
              <p className="text-sm text-muted-foreground">
                press@aurasensehk.com
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
