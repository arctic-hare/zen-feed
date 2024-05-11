// Zen-feed by Ismail Valiev (Konrad Molitor) 2019
// Distributed under the terms of MIT License
// https://github.com/konrad-molitor/zen-feed
const convert = require('xml-js');

const configCheck = require('./modules/configCheck');
const {serveRss} = require('./modules/generateFeed');

const feed = {
    feed: makeFeed,
    configure
}

async function makeFeed (){
    if (!this.config)
        return 'No config provided! Call .config({config}) first.';
    else {
        let feedContentData = await this.config.getFeedContent();
        if (!feedContentData) {
            return 'getFeedContent() returned nothing.';
        } else if (Array.isArray(feedContentData) && feedContentData.length === 0) {
            return 'getFeedContent() returned empty array.';
        } else if (!Array.isArray(feedContentData)) {
            return `getFeedContent() returned ${typeof feedContentData} instead of array.`;
        } else if (feedContentData.some(item => typeof(item) !== 'object')){
            return 'getFeedContent() should return array of objects.';
        } else {
            return serveRss(this.config, feedContentData);
        }
    }
}

function configure(config) {
    try {
        if (configCheck(config)) {
            this.config = config;
        } else {
            throw new Error('Configure failed because unknown reason.');
        }
    } catch (err) {
        throw (err);
    }
}

module.exports = feed;
