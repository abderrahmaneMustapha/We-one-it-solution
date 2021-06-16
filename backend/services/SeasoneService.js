"use strict";
const fetch = require("node-fetch");

/**
 * Get all seasones grouped by episodes
 *
 *
 * returns episodes
 **/
const APIURL = "http://stapi.co/api/v1/rest/";
exports.getEpisodesBySeasons = async function () {
    return new Promise( async function (resolve, reject) {
        var results = [];
         var result = {};
        await fetch(`${APIURL}episode/search`)
            .then((response) => response.json())
            .then((data) => {
                // extract unique titles from the dataset
                const uniqueSeasonsTitles = [
                    ...new Set(
                        data["episodes"].map((episode) => episode.season.uid)
                    ),
                ];

                results = reformulateData(uniqueSeasonsTitles, data);
            })
            .catch((err) => {
                console.log(err);
            });

          result["application/json"] = results;
        if (Object.keys(result).length > 0) {
            resolve(result[Object.keys(result)[0]]);
        } else {
            resolve();
        }
    });
};
function reformulateData(uniqueSeasonsTitles, data) {
    var results = [];
    uniqueSeasonsTitles.forEach((uid) => {
        var resultObject = {};
        data.episodes.forEach((episode) => {
            if (episode.season.uid === uid) {
                if (resultObject.episodes) {
                    resultObject.episodes.push({
                        episodeUid: episode.uid,
                        episodeTitle: episode.title,
                        episodeNumber: episode.episodeNumber,
                        episodeSerialNumber: episode.productionSerialNumber,
                    });
                } else {
                    resultObject = {
                        seasonNumber: episode.seasonNumber,
                        episodes: [
                            {
                                episodeUid: episode.uid,
                                episodeTitle: episode.title,
                                episodeNumber: episode.episodeNumber,
                                episodeSerialNumber:
                                    episode.productionSerialNumber,
                            },
                        ],
                    };
                    results.push(resultObject);
                }
            }
        });
    });

    return results;
}
