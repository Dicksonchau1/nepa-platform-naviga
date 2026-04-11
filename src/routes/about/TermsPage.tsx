import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Gavel, Warning, CheckCircle } from '@phosphor-icons/react'

export function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="page-bg">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="mb-12">
          <Badge className="mb-4 mono" variant="outline">LEGAL · TERMS</Badge>
          <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Legal agreement governing your use of the AuraSense NEPA platform and related services.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: January 15, 2024 · Effective: January 15, 2024
          </p>
        </div>

        <Card className="glass-card mb-8">
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms") constitute a legally binding agreement between you 
              (whether as an individual or representing an organization) and AuraSense Technologies Ltd 
              ("AuraSense," "we," "us," or "our") regarding your use of the NEPA platform, including 
              edge runtime software, cloud APIs, dashboard, and documentation.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              By creating an account, deploying NEPA software, or accessing our services, you agree to 
              be bound by these Terms. If you do not agree, you may not use NEPA.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-primary" weight="duotone" />
              1. Account & Registration
            </h2>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Account Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You must be at least 18 years old or the age of majority in your jurisdiction</li>
                  <li>You must provide accurate, current, and complete registration information</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You are responsible for all activities under your account</li>
                  <li>You must notify us immediately of any unauthorized use or security breach</li>
                  <li>One person or legal entity may not maintain multiple accounts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Organization Accounts</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  If you're creating an account on behalf of an organization, you represent and warrant 
                  that you have the authority to bind that organization to these Terms. In such cases, 
                  "you" refers to both you as an individual and the organization.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <FileText className="w-7 h-7 text-primary" weight="duotone" />
              2. Acceptable Use
            </h2>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Permitted Uses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>NEPA is designed for legitimate business and research applications, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Retail analytics (customer flow, queue detection, occupancy monitoring)</li>
                  <li>Logistics optimization (package tracking, warehouse efficiency)</li>
                  <li>Property management (space utilization, security monitoring)</li>
                  <li>Academic research (with appropriate institutional oversight)</li>
                  <li>Public infrastructure optimization (with proper legal authorization)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-destructive/30">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Warning className="w-6 h-6 text-destructive mt-1" weight="duotone" />
                  <CardTitle className="text-destructive">Prohibited Uses</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>You may not use NEPA to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Conduct surveillance without proper legal authorization and notification</li>
                  <li>Infringe privacy rights or collect biometric data without explicit consent</li>
                  <li>Discriminate against protected classes or enable discriminatory practices</li>
                  <li>Engage in harassment, stalking, or tracking of individuals</li>
                  <li>Interfere with or disrupt our infrastructure or other users' access</li>
                  <li>Reverse engineer, decompile, or attempt to extract source code</li>
                  <li>Resell, sublicense, or otherwise commercialize NEPA without authorization</li>
                  <li>Remove, obscure, or alter any proprietary notices or branding</li>
                </ul>
                <p className="mt-4 font-semibold">
                  We reserve the right to investigate suspected violations and suspend or terminate 
                  accounts engaged in prohibited activities.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">3. Licensing & Intellectual Property</h2>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>License Grant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Subject to these Terms and payment of applicable fees, we grant you a limited, 
                  non-exclusive, non-transferable, revocable license to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Install and run NEPA edge runtime on your hardware</li>
                  <li>Access and use our cloud APIs and dashboard</li>
                  <li>Generate and query signature maps from your camera feeds</li>
                </ul>
                <p className="mt-4">
                  This license terminates automatically upon subscription expiration or violation of these Terms.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Ownership & Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p><strong>Our IP:</strong> NEPA software, APIs, documentation, algorithms, models, and 
                trademarks remain our exclusive property. These Terms do not transfer ownership.</p>
                <p className="mt-3"><strong>Your Data:</strong> You retain all rights to your camera feeds, 
                signature maps, and configurations. We claim no ownership but require a license (per our 
                Privacy Policy) to operate the service.</p>
                <p className="mt-3"><strong>Feedback:</strong> Any suggestions, feature requests, or feedback 
                you provide may be used by us without obligation or compensation to you.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Gavel className="w-7 h-7 text-primary" weight="duotone" />
              4. Subscription & Payment
            </h2>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Pricing & Billing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Subscription tiers:</strong> Growth (monthly), Enterprise (annual), and custom plans</li>
                  <li><strong>Automatic renewal:</strong> Subscriptions renew automatically unless canceled at least 7 days before the renewal date</li>
                  <li><strong>Price changes:</strong> We may modify pricing with 30 days' notice. Continued use after notice constitutes acceptance</li>
                  <li><strong>Taxes:</strong> Fees exclude applicable sales tax, VAT, or GST, which you are responsible for</li>
                  <li><strong>Payment methods:</strong> Major credit cards and wire transfer (Enterprise only)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Refunds & Cancellation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  <strong>Growth tier:</strong> Cancel anytime. No refunds for partial months. Access continues until end of billing period.
                </p>
                <p className="mt-3">
                  <strong>Enterprise tier:</strong> Cancellation and refund terms governed by your custom agreement.
                </p>
                <p className="mt-3">
                  <strong>Trials:</strong> Free trials may be offered. Converting to paid after trial waives right to refund.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">5. Service Availability & Support</h2>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p><strong>Uptime SLA:</strong> Growth tier: 99.9%, Enterprise tier: 99.95% (measured monthly)</p>
                <p className="mt-3"><strong>Maintenance:</strong> We may perform scheduled maintenance with advance notice</p>
                <p className="mt-3"><strong>Support:</strong> Email support (24hr response Growth, 1hr critical Enterprise)</p>
                <p className="mt-3"><strong>Modifications:</strong> We may update, modify, or discontinue features with reasonable notice</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">6. Limitation of Liability</h2>

            <Card className="glass-card border-warning/30">
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p className="uppercase font-semibold text-sm">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>NEPA is provided "as is" without warranties of any kind, express or implied</li>
                  <li>We are not liable for indirect, incidental, consequential, or punitive damages</li>
                  <li>Our total liability for any claims is limited to fees paid by you in the 12 months prior to the claim</li>
                  <li>We are not responsible for damages arising from your use of NEPA, including but not limited to: business losses, data loss, regulatory violations, or third-party claims</li>
                  <li>You are solely responsible for compliance with applicable privacy and surveillance laws</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">7. Indemnification</h2>

            <Card className="glass-card">
              <CardContent className="pt-6 text-muted-foreground">
                <p>
                  You agree to indemnify, defend, and hold harmless AuraSense and its affiliates from 
                  any claims, damages, or expenses (including legal fees) arising from: (a) your use of 
                  NEPA, (b) violation of these Terms, (c) violation of any law or third-party rights, or 
                  (d) your camera feeds or data processing activities.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">8. Termination</h2>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p><strong>By you:</strong> Cancel your subscription at any time via the dashboard</p>
                <p className="mt-3"><strong>By us:</strong> We may suspend or terminate your account for violations, non-payment, or at our discretion with 30 days' notice</p>
                <p className="mt-3"><strong>Effect of termination:</strong> Your license terminates immediately. We will retain your data per our Privacy Policy, then delete it within 30 days unless legally required to retain longer.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">9. Dispute Resolution</h2>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p><strong>Governing law:</strong> These Terms are governed by the laws of Hong Kong SAR</p>
                <p className="mt-3"><strong>Jurisdiction:</strong> Disputes shall be resolved in Hong Kong courts</p>
                <p className="mt-3"><strong>Informal resolution:</strong> Contact legal@aurasensehk.com to attempt resolution before litigation</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">10. Miscellaneous</h2>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p><strong>Entire agreement:</strong> These Terms, along with our Privacy Policy, constitute the complete agreement</p>
                <p className="mt-3"><strong>Modifications:</strong> We may update these Terms with 30 days' notice for material changes</p>
                <p className="mt-3"><strong>Severability:</strong> If any provision is unenforceable, the remainder stays in effect</p>
                <p className="mt-3"><strong>No waiver:</strong> Failure to enforce a right does not waive it</p>
                <p className="mt-3"><strong>Assignment:</strong> You may not transfer your account without our written consent</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-primary/30">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Questions About These Terms?</h3>
              <p className="text-muted-foreground mb-4">
                If you have questions or need clarification on any provision, contact our legal team.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> legal@aurasensehk.com</p>
                <p><strong>Postal Address:</strong> AuraSense Technologies Ltd, Hong Kong SAR</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
