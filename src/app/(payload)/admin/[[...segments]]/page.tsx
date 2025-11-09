/* THIS FILE IS REQUIRED FOR PAYLOAD'S ADMIN PANEL TO FUNCTION */
import { RootPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'

import config from '@payload-config'
import { importMap as rootImportMap } from '../../../../../importMap.js'
import { importMap as generatedImportMap } from '../importMap.js'

// Merge the import maps
const importMap = {
  ...rootImportMap,
  ...generatedImportMap
}

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Disable static optimization for admin pages
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Payload Admin',
  description: 'Payload CMS Admin Panel',
}

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap })

export default Page