/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Configuration schema
 */
export interface FileConfiguration {
  /**
   * The url of the api to get company informations
   */
  companyDataApi: string;
  /**
   * The web parser options
   */
  webParser: {
    /**
     * The base URL of the web site to parse
     */
    URL: string;
    /**
     * The id of a balise to narrow the search, otherwise body is used
     */
    baliseId?: string;
    /**
     * A pattern to find the information, the content of the first captring group is selected
     */
    patternToExtract: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
