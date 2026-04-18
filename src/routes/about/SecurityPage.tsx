import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck, Lock, Key, Detective, CloudArrowUp, FileCode, UserCheck, Bug } from '@phosphor-icons/react'

export function SecurityPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="page-bg">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="mb-12">
          <Badge className="mb-4 mono" variant="outline">LEGAL · SECURITY</Badge>
          <h1 className="text-5xl font-bold mb-6">Security</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            How we protect the NEPA platform and safeguard your data through comprehensive security 
            practices, certifications, and responsible disclosure.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: April 15, 2026
          </p>
        </div>

        <Card className="glass-card mb-8 border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0" weight="duotone" />
              <div>
                <h2 className="text-xl font-semibold mb-3">Our Security Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Security is foundational to NEPA's architecture. From edge-first processing that keeps 
                  camera feeds local to end-to-end encryption for cloud sync, we've designed every layer 
                  with security in mind. This page details our security posture, compliance certifications, 
                  and how you can responsibly report vulnerabilities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Lock className="w-7 h-7 text-primary" weight="duotone" />
              Infrastructure & Data Protection
            </h2>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Encryption Standards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p><strong>Data in Transit:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>TLS 1.3 for all API communications</li>
                  <li>Perfect forward secrecy (PFS) with ECDHE key exchange</li>
                  <li>Certificate pinning for edge-to-cloud sync</li>
                  <li>WebSocket connections secured with WSS protocol</li>
                </ul>
                <p className="mt-4"><strong>Data at Rest:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AES-256 encryption for signature map storage</li>
                  <li>Database-level encryption with hardware security modules (HSMs)</li>
                  <li>Encrypted backups with separate key management</li>
                  <li>Encrypted volumes for all cloud infrastructure</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Cloud Infrastructure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Hosting:</strong> SOC 2 Type II certified cloud providers with multi-region redundancy</li>
                  <li><strong>Network isolation:</strong> Virtual private clouds (VPCs) with strict firewall rules</li>
                  <li><strong>DDoS protection:</strong> Cloud-native DDoS mitigation and rate limiting</li>
                  <li><strong>Access controls:</strong> Zero-trust network architecture with least-privilege access</li>
                  <li><strong>Monitoring:</strong> 24/7 automated intrusion detection and incident response</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Edge Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>NEPA edge runtime is designed for secure on-premises deployment:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Local processing:</strong> Camera feeds never leave your network—only anonymized signature maps sync to cloud</li>
                  <li><strong>Signed binaries:</strong> All edge software is cryptographically signed and verified on installation</li>
                  <li><strong>Secure boot:</strong> Support for hardware-backed secure boot on compatible devices</li>
                  <li><strong>Automatic updates:</strong> Security patches delivered via signed OTA updates</li>
                  <li><strong>Network segmentation:</strong> Edge nodes can run in isolated VLANs</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Key className="w-7 h-7 text-primary" weight="duotone" />
              Authentication & Access Control
            </h2>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Password requirements:</strong> Minimum 12 characters, complexity enforcement, bcrypt hashing with per-user salts</li>
                  <li><strong>Two-factor authentication (2FA):</strong> TOTP-based 2FA available for all accounts (required for Enterprise tier)</li>
                  <li><strong>Session management:</strong> Short-lived JWT tokens with automatic refresh and revocation</li>
                  <li><strong>API keys:</strong> Scoped API keys with IP restrictions and rate limiting</li>
                  <li><strong>SSO support:</strong> SAML 2.0 and OAuth 2.0 for Enterprise customers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Role-Based Access Control (RBAC)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>Fine-grained permissions for team collaboration:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Owner:</strong> Full administrative access</li>
                  <li><strong>Admin:</strong> Configuration and user management (no billing access)</li>
                  <li><strong>Developer:</strong> API access and edge node deployment</li>
                  <li><strong>Viewer:</strong> Read-only dashboard access</li>
                  <li><strong>Custom roles:</strong> Enterprise tier supports custom permission sets</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Detective className="w-7 h-7 text-primary" weight="duotone" />
              Security Operations
            </h2>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Monitoring & Incident Response</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>SIEM integration:</strong> Real-time security event logging and correlation</li>
                  <li><strong>Automated alerts:</strong> Anomaly detection for suspicious login attempts, API abuse, and data exfiltration patterns</li>
                  <li><strong>Incident response plan:</strong> Documented procedures with &lt;48hr notification for security incidents affecting customer data</li>
                  <li><strong>Forensic logging:</strong> Immutable audit logs retained for 1 year (Enterprise: customizable)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Vulnerability Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Dependency scanning:</strong> Automated checks for known vulnerabilities in third-party libraries</li>
                  <li><strong>Penetration testing:</strong> Annual third-party penetration tests by certified security firms</li>
                  <li><strong>Bug bounty program:</strong> Coordinated disclosure program with security researchers (see below)</li>
                  <li><strong>Patch management:</strong> Critical security patches deployed within 48 hours of discovery</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <UserCheck className="w-7 h-7 text-primary" weight="duotone" />
              Compliance & Certifications
            </h2>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" weight="duotone" />
                      SOC 2 Type II
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Annual audit covering security, availability, and confidentiality criteria
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" weight="duotone" />
                      GDPR Compliant
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Data processing agreements and data subject rights support for EU customers
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" weight="duotone" />
                      ISO 27001 (In Progress)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Information security management system certification expected Q2 2024
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" weight="duotone" />
                      CCPA Compliant
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      California consumer privacy rights including data deletion and opt-out
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Compliance documentation and audit reports available to Enterprise customers under NDA.
                  Contact <strong>compliance@aurasensehk.com</strong> for details.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <CloudArrowUp className="w-7 h-7 text-primary" weight="duotone" />
              Backup & Business Continuity
            </h2>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Automated backups:</strong> Hourly incremental backups with 30-day retention (Growth), custom retention for Enterprise</li>
                  <li><strong>Geographic redundancy:</strong> Data replicated across 3+ availability zones</li>
                  <li><strong>Disaster recovery:</strong> RTO (Recovery Time Objective): 4 hours, RPO (Recovery Point Objective): 1 hour</li>
                  <li><strong>Backup encryption:</strong> All backups encrypted at rest with separate key storage</li>
                  <li><strong>Point-in-time recovery:</strong> Restore signature maps to any point within retention window</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <FileCode className="w-7 h-7 text-primary" weight="duotone" />
              Secure Development Practices
            </h2>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Code reviews:</strong> Mandatory peer review for all code changes</li>
                  <li><strong>Static analysis:</strong> Automated SAST (Static Application Security Testing) in CI/CD pipeline</li>
                  <li><strong>Secret management:</strong> Secrets stored in encrypted vaults, never committed to repositories</li>
                  <li><strong>Least privilege:</strong> Production infrastructure access limited to on-call engineers with MFA</li>
                  <li><strong>Security training:</strong> Annual security awareness training for all engineering staff</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Bug className="w-7 h-7 text-primary" weight="duotone" />
              Responsible Disclosure Program
            </h2>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle>Report a Vulnerability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We value the security research community and welcome responsible disclosure of security 
                  vulnerabilities. If you've discovered a potential security issue with NEPA, please report 
                  it to our security team.
                </p>

                <div className="bg-card/50 border border-border/30 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground">How to Report</h4>
                  <p className="text-sm">
                    <strong>Email:</strong> security@aurasensehk.com (PGP key available on request)
                  </p>
                  <p className="text-sm">
                    <strong>Include:</strong> Detailed description, reproduction steps, affected components, 
                    and impact assessment
                  </p>
                  <p className="text-sm">
                    <strong>Response SLA:</strong> Initial acknowledgment within 48 hours, status updates every 
                    7 days until resolution
                  </p>
                </div>

                <div className="bg-card/50 border border-border/30 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground">Guidelines</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                    <li>Do not access, modify, or delete user data without explicit permission</li>
                    <li>Do not publicly disclose the vulnerability before we've issued a fix</li>
                    <li>Make a good faith effort to avoid privacy violations and service disruption</li>
                    <li>Do not exploit the vulnerability beyond the minimum necessary to demonstrate it</li>
                  </ul>
                </div>

                <div className="bg-card/50 border border-border/30 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground">Recognition & Rewards</h4>
                  <p className="text-sm">
                    We acknowledge security researchers on our Security Hall of Fame (with your permission). 
                    Monetary rewards are evaluated on a case-by-case basis depending on severity and impact. 
                    Critical vulnerabilities may qualify for bounties up to $5,000 USD.
                  </p>
                </div>

                <p className="text-sm mt-4">
                  <strong>Out of scope:</strong> Social engineering, physical attacks, DoS/DDoS, 
                  issues requiring user interaction (e.g., self-XSS), vulnerabilities in third-party services.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Security Updates</h2>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Stay Informed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  We publish security advisories for vulnerabilities affecting NEPA components. Critical 
                  vulnerabilities are communicated directly to affected customers via email.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li><strong>Security feed:</strong> security-advisories@aurasensehk.com (subscribe for notifications)</li>
                  <li><strong>Changelog:</strong> Security updates documented at <span className="mono text-sm">/docs/changelog</span></li>
                  <li><strong>Status page:</strong> Real-time incident updates at <span className="mono text-sm">/docs/status</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-primary/30">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Questions About Security?</h3>
              <p className="text-muted-foreground mb-4">
                For general security inquiries, compliance questions, or enterprise security requirements, 
                contact our security team.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Security Team:</strong> security@aurasensehk.com</p>
                <p><strong>Compliance Inquiries:</strong> compliance@aurasensehk.com</p>
                <p><strong>Incident Reports:</strong> incidents@aurasensehk.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
