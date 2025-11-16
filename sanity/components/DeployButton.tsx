import { useState } from 'react'
import { Button, Card, Stack, Text, Flex } from '@sanity/ui'
import { RocketIcon } from '@sanity/icons'

export function DeployButton() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployStatus, setDeployStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleDeploy = async () => {
    const githubToken = process.env.SANITY_STUDIO_GITHUB_TOKEN
    const githubRepo = process.env.SANITY_STUDIO_GITHUB_REPO // format: "owner/repo"
    const githubBranch = process.env.SANITY_STUDIO_GITHUB_BRANCH || 'main'

    if (!githubToken || !githubRepo) {
      setDeployStatus('error')
      setMessage('Deploy not configured. Please add SANITY_STUDIO_GITHUB_TOKEN and SANITY_STUDIO_GITHUB_REPO to your environment variables.')
      return
    }

    setIsDeploying(true)
    setDeployStatus('idle')
    setMessage('')

    try {
      // Trigger GitHub Actions workflow_dispatch
      const response = await fetch(
        `https://api.github.com/repos/${githubRepo}/actions/workflows/deploy.yml/dispatches`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ref: githubBranch,
            inputs: {
              reason: 'Manual deployment from Sanity CMS'
            }
          })
        }
      )

      if (response.status === 204 || response.ok) {
        setDeployStatus('success')
        setMessage('✅ Deployment started! Your website will update in 2-3 minutes.')
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`Deploy failed: ${errorData.message || response.statusText}`)
      }
    } catch (error) {
      setDeployStatus('error')
      setMessage('❌ Failed to trigger deployment. Please check your configuration or try again.')
      console.error('Deploy error:', error)
    } finally {
      setIsDeploying(false)
      
      // Clear message after 10 seconds
      setTimeout(() => {
        setDeployStatus('idle')
        setMessage('')
      }, 10000)
    }
  }

  return (
    <Card padding={4} radius={2} shadow={1} tone="primary">
      <Stack space={3}>
        <Flex align="center" gap={2}>
          <RocketIcon />
          <Text size={2} weight="semibold">
            Deploy Website
          </Text>
        </Flex>
        
        <Text size={1} muted>
          Click the button below to publish your changes to the live website. This takes about 2-3 minutes.
        </Text>

        <Button
          text={isDeploying ? 'Deploying...' : 'Deploy Website'}
          tone="primary"
          onClick={handleDeploy}
          disabled={isDeploying}
          icon={RocketIcon}
          mode="default"
        />

        {message && (
          <Card
            padding={3}
            radius={2}
            tone={deployStatus === 'success' ? 'positive' : deployStatus === 'error' ? 'critical' : 'default'}
          >
            <Text size={1}>{message}</Text>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
