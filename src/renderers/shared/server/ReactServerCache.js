/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactServerCache
 */

'use strict';

const map = new WeakMap();

function isCreatingCache(element) {
  return map.has(element);
}

function setCreatingCache(element) {
  map.set(element, true);
}

function isCacheSubject(type, config) {
  return config.has(type);
}

function getCacheKey(element, context, config) {
  if (element && element.type) {
    var cacheConfig = config.get(element.type);
    if (cacheConfig && typeof cacheConfig.genCacheKey === 'function') {
      return cacheConfig.genCacheKey(element.props, context);
    }
  }
}

module.exports = {
  isCreatingCache,
  setCreatingCache,
  isCacheSubject,
  getCacheKey,
};