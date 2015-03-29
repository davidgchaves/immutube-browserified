'use strict';

var io = require('./io'),
    Player = require('./player');

var pure                  = require('./pure'),
    domSelectorToIOStream = pure.domSelectorToIOStream,
    search                = pure.search,
    clickTargetToStream   = pure.clickTargetToStream,
    maybeYoutubeId        = pure.maybeYoutubeId;

var helpers = require('./helpers'),
    compose = helpers.compose,
    map     = helpers.map,
    log     = helpers.log,
    fork    = helpers.fork,
    setHtml = helpers.setHtml;

io.extendFn();

var playYoutubeVideo = compose(setHtml('#player'), Player.create);

exports.renderVideoList   = domSelectorToIOStream('#search').runIO().onValue( compose(fork(log, setHtml('#results')), search) );
exports.playSelectedVideo = clickTargetToStream(document).onValue( compose(map(playYoutubeVideo), maybeYoutubeId) );

