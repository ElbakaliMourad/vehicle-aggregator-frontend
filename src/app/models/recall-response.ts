/**
 * Represents a single safety recall from the NHTSA database.
 * This perfectly matches the RecallSummary.java record in our Spring Boot backend.
 */
export interface RecallSummary {
  campaignNumber: string;
  reportReceivedDate: string;
  component: string;
  summary: string;
  consequence: string;
  remedy: string;
}

/**
 * Represents the top-level response envelope from our backend API.
 * This perfectly matches the RecallResponse.java record in our Spring Boot backend.
 */
export interface RecallResponse {
  count: number;
  message: string;
  results: RecallSummary[];
}