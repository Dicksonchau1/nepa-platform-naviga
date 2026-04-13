import { useKV } from '@/hooks/useKV'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { MagnifyingGlass, EnvelopeSimple, Trash, ArrowsClockwise } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { sendContactFormNotification } from '@/lib/emailNotifications'

type ContactSubmission = {
  id: string
  name: string
  email: string
  company: string
  subject: string
  message: string
  timestamp: string
}

export function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useKV<ContactSubmission[]>('aura-contact-submissions', [])
  const [searchQuery, setSearchQuery] = useState('')
  const [resending, setResending] = useState<string | null>(null)

  const filteredSubmissions = (submissions || []).filter(sub => {
    const query = searchQuery.toLowerCase()
    return (
      sub.name.toLowerCase().includes(query) ||
      sub.email.toLowerCase().includes(query) ||
      sub.company.toLowerCase().includes(query) ||
      sub.subject.toLowerCase().includes(query) ||
      sub.message.toLowerCase().includes(query)
    )
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const handleResendNotification = async (submission: ContactSubmission) => {
    setResending(submission.id)
    
    try {
      const result = await sendContactFormNotification(
        {
          name: submission.name,
          email: submission.email,
          company: submission.company,
          subject: submission.subject,
          message: submission.message
        },
        submission.timestamp
      )

      if (result.success) {
        toast.success(
          'Notification resent',
          {
            description: `Email sent to: ${result.recipients.join(', ')}`
          }
        )
      } else {
        toast.error('Failed to resend notification')
      }
    } catch (error) {
      console.error('Resend error:', error)
      toast.error('Failed to resend notification')
    } finally {
      setResending(null)
    }
  }

  const handleDelete = (id: string) => {
    setSubmissions((current) => (current || []).filter(sub => sub.id !== id))
    toast.success('Submission deleted')
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all contact form submissions?')) {
      setSubmissions([])
      toast.success('All submissions cleared')
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Contact Form Submissions</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all contact form submissions with email notification history
          </p>
        </div>
        {(submissions || []).length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="text-destructive border-destructive/30 hover:bg-destructive/10"
          >
            <Trash size={16} className="mr-2" />
            Clear all
          </Button>
        )}
      </div>

      <div className="mb-6">
        <div className="relative">
          <MagnifyingGlass
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, company, or message..."
            className="pl-10 bg-card/30"
          />
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <Card className="p-16 text-center bg-card/30">
          <EnvelopeSimple size={48} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">
            {searchQuery ? 'No submissions found' : 'No contact form submissions yet'}
          </p>
          <p className="text-sm text-muted-foreground">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'New submissions will appear here when users fill out the contact form'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="p-6 bg-card/30 border-border/30">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{submission.name}</h3>
                    <Badge variant="outline" className="font-mono text-xs">
                      {submission.subject}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <EnvelopeSimple size={14} />
                      {submission.email}
                    </span>
                    {submission.company && (
                      <span>• {submission.company}</span>
                    )}
                    <span>
                      • {new Date(submission.timestamp).toLocaleDateString('en-HK', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResendNotification(submission)}
                    disabled={resending === submission.id}
                  >
                    <ArrowsClockwise
                      size={16}
                      className={resending === submission.id ? 'animate-spin' : ''}
                    />
                    <span className="ml-2">Resend</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(submission.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
              <div className="border-t border-border/30 pt-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {submission.message}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!searchQuery && (submissions || []).length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''} total
        </div>
      )}
    </div>
  )
}
