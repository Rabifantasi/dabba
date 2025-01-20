import { createClient } from "next-sanity";

// Use environment variables for dynamic configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your environment variable
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Replace with your environment variable
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2022-03-07", // Optional: default version fallback
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production for faster delivery
});
