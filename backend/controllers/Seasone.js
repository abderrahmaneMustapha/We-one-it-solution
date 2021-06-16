'use strict';

var utils = require('../utils/writer.js');

var Seasone = require("../services/SeasoneService");

module.exports.getEpisodesBySeasons = function getEpisodesBySeasons (req, res, next) {
    Seasone.getEpisodesBySeasons()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};
  