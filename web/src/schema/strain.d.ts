/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Schema for a Cannabis Strain
 */
export type Strain = {
  [k: string]: unknown;
} & {
  /**
   * Strain ID (Autoset on Convert)
   */
  id?: string;
  /**
   * Strain Name
   */
  name: string;
  /**
   * Strain Description (Markdown)
   */
  description: string;
  /**
   * Genetic of the Strain
   */
  genetics: string;
  /**
   * List of Main-Terpenes
   */
  terpene?: string[];
  /**
   * THC range in %
   */
  thc?: {
    min: number;
    max: number;
  };
  /**
   * CBD range in %
   */
  cbd?: {
    min: number;
    max: number;
  };
};
