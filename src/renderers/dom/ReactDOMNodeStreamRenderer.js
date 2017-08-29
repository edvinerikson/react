/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMNodeStreamRenderer
 */

'use strict';

var invariant = require('fbjs/lib/invariant');
var React = require('react');
var ReactPartialRenderer = require('ReactPartialRenderer');
var ReactCachingRenderer = require('ReactCachingRenderer');
var ReactFeatureFlags = require('ReactFeatureFlags');

var Readable = require('stream').Readable;

// This is a Readable Node.js stream which wraps the ReactDOMPartialRenderer.
class ReactMarkupReadableStream extends Readable {
  constructor(element, makeStaticMarkup, cacheMap) {
    // Calls the stream.Readable(options) constructor. Consider exposing built-in
    // features like highWaterMark in the future.
    super({});
    this.partialRenderer = cacheMap ? new ReactCachingRenderer(element, makeStaticMarkup, cacheMap) : new ReactPartialRenderer(element, makeStaticMarkup);
  }

  _read(size) {
    try {
      this.push(this.partialRenderer.read(size));
    } catch (err) {
      this.emit('error', err);
    }
  }
}
/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://facebook.github.io/react/docs/react-dom-stream.html#rendertonodestream
 */
function renderToNodeStream(element) {
  const disableNewFiberFeatures = ReactFeatureFlags.disableNewFiberFeatures;
  if (disableNewFiberFeatures) {
    invariant(
      React.isValidElement(element),
      'renderToNodeStream(): Invalid component element.',
    );
  }
  return new ReactMarkupReadableStream(element, false);
}

/**
 * Similar to renderToNodeStream, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://facebook.github.io/react/docs/react-dom-stream.html#rendertostaticnodestream
 */
function renderToStaticNodeStream(element) {
  const disableNewFiberFeatures = ReactFeatureFlags.disableNewFiberFeatures;
  if (disableNewFiberFeatures) {
    invariant(
      React.isValidElement(element),
      'renderToStaticNodeStream(): Invalid component element.',
    );
  }
  return new ReactMarkupReadableStream(element, true);
}

/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://facebook.github.io/react/docs/react-dom-stream.html#rendertonodestream
 */
function renderToNodeStreamWithCache(element, cacheMap) {
  const disableNewFiberFeatures = ReactFeatureFlags.disableNewFiberFeatures;
  if (disableNewFiberFeatures) {
    invariant(
      React.isValidElement(element),
      'renderToNodeStream(): Invalid component element.',
    );
  }
  return new ReactMarkupReadableStream(element, false, cacheMap);
}

/**
 * Similar to renderToNodeStream, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://facebook.github.io/react/docs/react-dom-stream.html#rendertostaticnodestream
 */
function renderToStaticNodeStreamWithCache(element, cacheMap) {
  const disableNewFiberFeatures = ReactFeatureFlags.disableNewFiberFeatures;
  if (disableNewFiberFeatures) {
    invariant(
      React.isValidElement(element),
      'renderToStaticNodeStream(): Invalid component element.',
    );
  }
  return new ReactMarkupReadableStream(element, true, cacheMap);
}

module.exports = {
  renderToNodeStream: renderToNodeStream,
  renderToStaticNodeStream: renderToStaticNodeStream,
  renderToNodeStreamWithCache: renderToNodeStreamWithCache,
  renderToStaticNodeStreamWithCache: renderToStaticNodeStreamWithCache,
};
