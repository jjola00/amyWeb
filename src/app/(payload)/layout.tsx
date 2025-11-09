// Force all Payload routes to be dynamic
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}