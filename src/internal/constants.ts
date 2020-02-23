/**
 * Collection of Reflect Types for easy maintenance
 */
export enum DecoratorKeys {
  /** Get the Typescript assigned Type at runtime */
  Type = 'design:type',
  /**
   * "@prop" Cache
   * -> Use only for a class
   */
  PropCache = 'typegoose:properties',
  /**
   * Storage location for Model Options
   * -> Use only for a class
   */
  ModelOptions = 'typegoose:options',
  /**
   * Storage location for Indexes
   * -> Use only for a class
   */
  Index = 'typegoose:indexes'
}

/** This Enum is meant for baseProp to decide for diffrent props (like if it is an arrayProp or prop or mapProp) */
export enum WhatIsIt {
  ARRAY,
  MAP,
  NONE
}

export enum Severity {
  ALLOW,
  WARN,
  ERROR
}
