/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { NODE_ENV, REST_BASE_URL, GRAPHQL_BASE_URL } from "@env";

export interface Config {
  nodeEnv: string;

  restBaseURL: string;
  graphqlBaseURL: string;
}

export const config: Config = {
  nodeEnv: NODE_ENV || "development",

  restBaseURL: REST_BASE_URL || "",
  graphqlBaseURL: GRAPHQL_BASE_URL || "",
};
