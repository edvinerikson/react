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

const NS = Symbol('cache');

const map = new WeakMap();

function isCreatingCache(element) {
  return map.has(element);
}

function setCreatingCache(element) {
  map.set(element, true);
}

function isCacheSubject(type) {
  if (typeof type !== 'function') {
    return false;
  }
  var ns = type[NS];
  if (ns && typeof ns.genCacheKey === 'function') {
    return true;
  }

  return false;
}

function getCacheKey(element, context) {
  var ns = element.type[NS];
  if (ns && typeof ns.genCacheKey === 'function') {
    return ns.genCacheKey(element.props, context);
  }
}

module.exports = {
  isCreatingCache,
  setCreatingCache,
  isCacheSubject,
  getCacheKey,
  NS,
}