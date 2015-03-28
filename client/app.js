'use strict';

var $ = require('jquery'),
    R = require('ramda'),
    P = require('pointfree-fantasy'),
    B = require('baconjs'),
    io = require('./io'),
    http = require('./http'),
    Maybe = require('./maybe');

io.extendFn();

/*
 * HELPERS
 */

var compose = P.compose;
var map     = P.map;
var log     = function(x) { console.log(x); return x; };
var fork    = R.curry(function(error, success, task) { return task.fork(error, success); });
var setHtml = R.curry(function(sel, x) { return $(sel).html(x); });

// Helper to curry and switch args order when calling Bacon's fromEvent function
// We need it because we know the eventName (keyup) and want to curry waiting for the target
var eventToStream = R.curry(function(eventName, target) { return B.fromEvent(target, eventName); });

// Helper to get the last element in an Array
var lastElementIn = function(array) { return array[array.length - 1]; };


// Helper to curry and switch args order using jQuery data function
// We need it because we know the propertyName (youtubeid) and want to curry waiting for the DOMElement
var getDataFrom = R.curry(function(name,elt) { return $(elt).data(name); });

/*
 * PURE
 */

//  domSelectorToIO :: Selector -> IO DOM
var domSelectorToIO = $.toIO();

//  keyUpEventToStream :: DOM -> EventStream DOMEvent
var keyUpEventToStream = eventToStream('keyup');

// After examining in the browser the object containing the keyUpEventToStream output,
// we saw that we need to get the 'target' property and inside that, the 'value' property.
// An example of 'value' could be "tarkovsk" because:
//    - we are looking for "tarkovsky" videos and
//    - we already have typed in "tarkovsk"
//
//  eventValue :: DOMEvent -> String
var eventValue = compose(R.prop('value'), R.prop('target'));
//  valueToStream :: DOM -> EventStream String
var valueToStream = compose(map(eventValue), keyUpEventToStream);

// The search URL we are targeting looks like:
//    http://gdata.youtube.com/feeds/api/videos?q=[SEARCH_TERM]&alt=json
//  searchTermToURL :: String -> URL
var searchTermToURL = function(searchTerm) {
  return 'http://gdata.youtube.com/feeds/api/videos?' + $.param({q: searchTerm, alt: 'json'});
};
//  urlToStream :: DOM -> EventStream URL
var urlToStream = compose(map(searchTermToURL), valueToStream);

//  domSelectorToIOStream :: Selector -> IO EventStream URL
var domSelectorToIOStream = compose(map(urlToStream), domSelectorToIO);

// After examining in the browser the Youtube Response to our query,
// we saw that we need to get two bits of that Response object (and it's pretty nested):
//  -> the 'feed' property    (it's an Object)
//    -> the 'entry' property (it's an Array of Objects)
//      -> for each 'entry' (Object) the 'id' property (it's an Object too)
//        -> which encapsulates a '$t' property with a value like:
//          "http://gdata.youtube.com/feeds/api/videos/cZ9rlRqMQNA"
//      -> for each 'entry' (Object) the 'title' property (it's an Object too)
//        -> which encapsulates a '$t' property with a value like:
//          "G & S 4 - Domino World Record - The Longest 3D Structure"
// TL;DR: We need the Video URL ('id') and the Video Title ('title')
//
// We are going to do this in 2 steps:
//  1st: get the 'entry' array
//  2nd: dive into each 'entry' of the array and build the <li>s with
//        - the video title, and
//        - the youtube video id

//  entryToListItem :: Entry -> DOM
var entryToListItem = function(entry) {
  return $('<li/>', { text: entry.title.$t, 'data-youtubeid': entry.id.$t });
};

//  videoEntries :: YoutubeResponse -> [DOM]
var videoEntries = compose(map(entryToListItem), R.prop('entry'), R.prop('feed'));

// NOTE: The former Folktale's data.future is now Folktale's data.task.
//       It has the same intent:
//        "A monad for time-dependant values, providing explicit effects
//         for delayed computations, latency, etc."
//       https://github.com/folktale/data.task
//  search :: URL -> Task [DOM]
var search = compose(map(videoEntries), http.getJSON);

//  clickEventToStream :: DOM -> EventStream DOMEvent
var clickEventToStream = eventToStream('click');

// After examining the output from clickEventToStream
// (which happens to be a MouseEvent),
// we need to get the 'target' property, so:
//  clickTargetToStream :: DOM -> EventStream String
var clickTargetToStream = compose(map(R.prop('target')), clickEventToStream);

// This is a real output from clickToStream
//  <li data-youtubeid="http://gdata.youtube.com/feeds/api/videos/PBZsj8FPSbo">Best sequence shot ever - Tarkovsky</li>
// and we need the video id
//  PBZsj8FPSbo
// So
//  youtubeURLToYoutubeId :: URL -> YoutubeId (a String)
var youtubeURLToYoutubeId = compose(lastElementIn, R.split('/'));

//  maybeYoutubeId :: DOMElement (a String) -> Maybe YoutubeId (a Maybe String)
var maybeYoutubeId = compose(map(youtubeURLToYoutubeId), Maybe, getDataFrom('youtubeid'));

exports.lastElementIn         = lastElementIn;
exports.youtubeURLToYoutubeId = youtubeURLToYoutubeId;
exports.getDataFrom           = getDataFrom;
exports.maybeYoutubeId        = maybeYoutubeId;

/*
 * IMPURE
 */

exports.renderVideoList = domSelectorToIOStream('#search').runIO().onValue( compose(fork(log, setHtml('#results')), search) );

exports.logClickEventToStream    = clickEventToStream(document).onValue(log);
exports.logClickTargetToStream   = clickTargetToStream(document).onValue(log);
exports.logYoutubeURLToYoutubeId = clickTargetToStream(document).onValue(compose(log, youtubeURLToYoutubeId, getDataFrom('youtubeid')));
exports.logMaybeYoutubeId        = clickTargetToStream(document).onValue(compose(log, maybeYoutubeId));

