import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Database, Eye, UserCircle, FileText } from '@phosphor-icons/react'

export function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="page-bg">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="mb-12">
          <Badge className="mb-4 mono" variant="outline">LEGAL · PRIVACY</Badge>
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            How we collect, use, and protect your data when you use the NEPA platform.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: April 15, 2026
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-primary mt-1" weight="duotone" />
                <div>
                  <CardTitle className="text-2xl mb-3">Our Privacy Commitment</CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    AuraSense NEPA is designed with privacy at its core. We believe in transparency about
                    what data we collect and how we use it. This policy explains our practices for the
                    NEPA platform, including edge deployments, cloud services, and our web dashboard.
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Database className="w-7 h-7 text-primary" weight="duotone" />
              Data We Collect
            </h2>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>When you create a NEPA account, we collect:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and email address</li>
                  <li>Company or organization details</li>
                  <li>Account credentials (passwords are hashed and never stored in plain text)</li>
                  <li>Billing information (processed securely through third-party payment providers)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Camera Feed & Signature Map Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  NEPA processes camera feeds on your edge devices to generate signature maps. We prioritize
                  privacy in this process:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Edge-first processing:</strong> Video analysis happens locally on your hardware. Raw camera feeds are never transmitted to our cloud.</li>
                  <li><strong>Signature maps:</strong> Only anonymized spatial-temporal signatures (mathematical representations of detected entities) are synchronized with our cloud for queries and analytics.</li>
                  <li><strong>No personally identifiable information:</strong> Signature maps do not contain facial recognition data, license plates, or other PII unless you explicitly configure NEPA to extract such features.</li>
                  <li><strong>Retention:</strong> Signature map data is retained according to your subscription tier (90 days for Growth, custom for Enterprise).</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Usage & Telemetry Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>To improve service reliability and performance, we collect:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>API request logs (endpoints called, response times, error rates)</li>
                  <li>Edge node health metrics (CPU, memory, network usage)</li>
                  <li>Dashboard analytics (page views, feature usage patterns)</li>
                  <li>Browser and device information for compatibility</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Eye className="w-7 h-7 text-primary" weight="duotone" />
              How We Use Your Data
            </h2>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p>We use collected data exclusively for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service delivery:</strong> Operating NEPA's world model, APIs, and dashboard</li>
                  <li><strong>Support:</strong> Diagnosing technical issues and responding to your inquiries</li>
                  <li><strong>Improvements:</strong> Enhancing detection accuracy, system performance, and user experience</li>
                  <li><strong>Security:</strong> Detecting and preventing fraud, abuse, or unauthorized access</li>
                  <li><strong>Compliance:</strong> Meeting legal obligations and enforcing our Terms of Service</li>
                </ul>
                <p className="mt-6">
                  <strong>We do not:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Sell your data to third parties</li>
                  <li>Use your signature maps to train models for other customers</li>
                  <li>Share identifiable information without your explicit consent (except as legally required)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Lock className="w-7 h-7 text-primary" weight="duotone" />
              Data Security
            </h2>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Encryption:</strong> All data in transit uses TLS 1.3+. Data at rest is encrypted using AES-256.</li>
                  <li><strong>Access controls:</strong> Role-based permissions ensure only authorized team members can access your data.</li>
                  <li><strong>Infrastructure:</strong> Cloud services hosted on SOC 2 Type II compliant infrastructure.</li>
                  <li><strong>Monitoring:</strong> 24/7 automated threat detection and incident response protocols.</li>
                  <li><strong>Audits:</strong> Regular third-party security assessments and penetration testing.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <UserCircle className="w-7 h-7 text-primary" weight="duotone" />
              Your Rights
            </h2>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p>You have the following rights regarding your data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of all data we hold about you</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate account information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and associated data (subject to legal retention requirements)</li>
                  <li><strong>Export:</strong> Download your signature maps and configuration data in standard formats</li>
                  <li><strong>Objection:</strong> Opt out of non-essential data collection or processing</li>
                </ul>
                <p className="mt-6">
                  To exercise these rights, contact us at <strong>privacy@aurasensehk.com</strong>.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <FileText className="w-7 h-7 text-primary" weight="duotone" />
              Additional Information
            </h2>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>NEPA integrates with trusted third-party providers for specific functions:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Payment processing:</strong> Stripe (subject to their privacy policy)</li>
                  <li><strong>Email delivery:</strong> SendGrid for transactional emails and notifications</li>
                  <li><strong>Analytics:</strong> Privacy-focused analytics to understand feature usage (no third-party tracking pixels)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  AuraSense is based in Hong Kong SAR. If you're accessing NEPA from outside Hong Kong,
                  your data may be transferred to and processed in regions where our cloud infrastructure
                  operates. We use standard contractual clauses and ensure adequate data protection measures
                  for all transfers.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  NEPA is not directed at individuals under 18. We do not knowingly collect data from
                  minors. If we discover we have inadvertently collected such data, we will delete it
                  promptly.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Policy Updates</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices or
                  legal requirements. Material changes will be communicated via email or prominent dashboard
                  notice at least 30 days before taking effect. Continued use of NEPA after changes
                  constitutes acceptance.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-primary/30">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Questions or Concerns?</h3>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or how we handle your data, we're here to help.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@aurasensehk.com</p>
                <p><strong>Postal Address:</strong> AuraSense Technologies Ltd, Hong Kong SAR</p>
                <p><strong>Data Protection Officer:</strong> dpo@aurasensehk.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
