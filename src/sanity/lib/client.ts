import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: "8gl1jkrt",
  dataset: "production",
  apiVersion : "2022-03-07",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
