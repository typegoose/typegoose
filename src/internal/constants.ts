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
  Index = 'typegoose:indexes',
  /**
   * Storage location for Plugins
   * -> Use only for a class
   */
  Plugins = 'typegoose:plugins',
  /**
   * Storage location for Pre-Hooks
   * -> Use only for a class
   */
  HooksPre = 'typegoose:hooksPre',
  /**
   * Storage location for Post-Hooks
   * -> Use only for a class
   */
  HooksPost = 'typegoose:hooksPost',
  /**
   * Storage location for Virtual Populates
   * -> Use only for a class
   */
  VirtualPopulate = 'typegoose:virtualPopulate',
  /**
   * Storage location for Query Methods
   * -> Use only for a class
   */
  QueryMethod = 'typegoose:queryMethod',
  /**
   * Storage location for Nested Discriminators
   * -> Use only for a class
   */
  NestedDiscriminators = 'typegoose:nestedDiscriminators'
}

/** This Enum is meant for baseProp to decide for diffrent props (like if it is an arrayProp or prop or mapProp) */
export enum WhatIsIt {
  ARRAY,
  MAP,
  NONE
}

/** Severity levels for soft-warnings */
export enum Severity {
  ALLOW,
  WARN,
  ERROR
}
