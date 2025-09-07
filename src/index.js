const fs = require('fs');
const { exit } = require('process');
const puppeteer = require('puppeteer');

const { configureLogger, getLogger, shutdownLogger } = require('./logger');
const env = require('./environment-variables');
const { getVideoInfo, downloadThumbnail, downloadAudio } = require('./youtube-yt-dlp');
const { postEpisode } = require('./spotify-puppeteer');

const logger = getLogger();

// function validateYoutubeVideoId(id) {
//   if (id === undefined || id === null || typeof id !== 'string') {
//     throw new Error('Id not present in JSON');
//   }
// }

// function getYoutubeVideoId() {
//   try {
//     if (env.EPISODE_ID) {
//       validateYoutubeVideoId(env.EPISODE_ID);
//       return env.EPISODE_ID;
//     }
//     const json = JSON.parse(fs.readFileSync(env.EPISODE_PATH, 'utf-8'));
//     validateYoutubeVideoId(json.id);
//     return json.id;
//   } catch (err) {
//     throw new Error(`Unable to get youtube video id: ${err},
//     please make sure that either the environment variable EPISODE_ID is set with valid id
//     or episode path is set correctly using t he environment variables EPISODE_PATH and EPISODE_FILE`);
//   }
// }

async function main(youtubeVideoId, browser) {
  // const youtubeVideoId = getYoutubeVideoId();

  const youtubeVideoInfo = await getVideoInfo(youtubeVideoId);
  const { title, description, uploadDate } = youtubeVideoInfo;
  logger.info(`title: ${title}`);
  logger.info(`description: ${description}`);
  logger.info(`Upload date: ${JSON.stringify(uploadDate)}`);

  if (env.LOAD_THUMBNAIL) {
    await downloadThumbnail(youtubeVideoId);
  }
  await downloadAudio(youtubeVideoId);

  logger.info('Posting episode to spotify');
  await postEpisode(youtubeVideoInfo, browser);
}

configureLogger();

function clusterizing(array, index) {
  const init = index * 10;
  const final = init + 10;

  return array.slice(init, final);
}

async function exitSuccess() {
  await cleanUp();
  // exit(0);
}

async function exitFailure() {
  await cleanUp();
  exit(1);
}

function cleanUp() {
  return new Promise((resolve) => {
    shutdownLogger(() => resolve());
  });
}

const idsBackup = [
  'eT9mhPT9pNE',
  'srJyN304X18',
  'kE8-8eGLteg',
  '5wqq3fCf3i4',
  'if73shhQ4JU',
  'Ax63IBhhM3s',
  'YeFcwOMiOk4',
  'h7Sg_A8m9_g',
  'WwMZLadlk8c',
  'OzclevyTCO4',
  'MfodleGVM64',
  'T_oTEOoyxlE',
  'SgIC49Ndt6E',
  'YRrxWv4W2Hk',
  '8Pspj2gpy_0',
  'SsRsSd3D55k',
  'n6fV9CCfUOk',
  'aV19hClPzQE',
  'Y92uF7RBFas',
  '_dGjWSkZbRo',
  'LnmEeimlhCw',
  'A5DcqSyAsh4',
  'sKR3q20avtY',
  'cV4FDWVFfTg',
  '0jObq_bS5Gc',
  'wg9tsYUp-SA',
  'hH7iHGT9luU',
  'aCkRN4ZY4Kg',
  'XpkzvCHYc6I',
  'BxkgdEB8nGo',
  'jS9jDWoex0U',
  'FhljCpO5GVs',
  '_TWtmpBHkHU',
  'GkZTTIYU_Bc',
  'qo0F_FqfxXQ',
  'kjNbOjSpQns',
  '_I_SnTl1It0',
  '4NetYlvGekI',
  'pdM7A35m1-s',
  'iIQYwBRc0tI',
  'tvmh8V_pMQQ',
  'CTM_hOW0T8I',
  'K7vy0HpPfu4',
  'pC-GzKWAIlo',
  'XEdOKS6la1U',
  'lqCNIFsVp40',
  'Z4nksEQ7SB8',
  '9bbuSxGVuFs',
  'P2_TENrUUvs',
  'kHJSQi7inEI',
  'OUmwqsTnuOs',
  'CEyNsXJnDFQ',
  'pTQ6Vj_jVoM',
  'M7z2gH2L6n8',
  'hFV_jb9BTkQ',
  'FrF4KLh7Ag8',
  '3tsLAHNruLo',
  'cWEr3mFU31k',
  'mmzojbS1rS0',
  'LrQoS1qnEPo',
  '1qO-6ChXMhM',
  'Jq-eLFg6qZI',
  '6g5SJqhzXvE',
  'QIGb4072Hjo',
  'UjOrQVSNRF8',
  'ZTws5zKagpU',
  'MPiXpfdl0MI',
  'dzQWMSlHFv4',
  'lJIT4rhwIQs',
  'YE4I97fsMxU',
  'CbtQoiMUaDs',
  'IuGYc7L98S0',
  'ONz4Ggv4-GM',
  'Z24UswhXB3U',
  'C7f3EHoobqc',
  'W3cjaWiyuR4',
  'ABf0OLzLJ-g',
  'wY1QA-1kMwo',
  'ZdguHOBgSwA',
  'x3TgbXYci4A',
  '40wfr3rUZeg',
  'lnqmOnUw7Zc',
  'tGnIMJ_IZRA',
  '67V9SpDF-gg',
  '5v7NCJJp8Sc',
  's26ZC3hvixQ',
  'JZolBYTgZwU',
  'sVDUznhBO-I',
  '3h12POpBxdA',
  'wQS57t4bioE',
  '7g6Yse5AXz8',
  'UejcpEO8y_o',
  'Er0vetBBq5w',
  'iRUEccxNX_0',
  'vkmgfE31_0s',
  'JCdqyoi76dE',
  'E4OlmCRtNB0',
  'nyyy7VYJP6Q',
  'h9-114jhi04',
  'pa7fkoQUVZo',
  '6_nTr7q0eKs',
  'V5WPcJOByw0',
  'u0m4Ts9NXQ4',
  'he1IUqeLGCo',
  'qu3m3tkWg1c',
  'JQjGanCH1gM',
  'mtNcun4E6G0',
  'tf5UAclqi6U',
  'XIhbmP82eBE',
  'fGGEMPC63Mc',
  '0NaVAVWaQNg',
  'M6Pkl6sciaY',
  'dT9WgJ4r6sg',
  'uiLncmdVn4s',
  'co_k5xaiVeY',
  'FDDcF9dlHJU',
  'f2MDVGoEnyA',
  'oVqN4P6X9cY',
  'GUVkPSwT0F4',
  'EnuBdbgcdfw',
  'cfPvdqYz2zk',
  'R7NzekKYTJo',
  'i13cPXgYda0',
  'VfkyVRR5NKA',
  'K1rEQRwoGrw',
  'uZL2lFGtZwM',
  '4yInILbrces',
  '_9D513IrkrI',
  'LKyoS56_w7U',
  'jsAxuCMYolI',
  '2qxg45vv4Sc',
  'Gv2zKdVxz1Y',
  'UtEEBnry9Fk',
  '_ll789FSFs0',
  'zX6TvPegSWs',
  'M6jXpxtN2s4',
  'RC225y69FGo',
  'rNfNjdSGQr0',
  'sYyQRGCwO3g',
  '55DspAnC8GQ',
  'fdV9qW2ammc',
  'TRFerk_79mo',
  'inOXKDT4J2M',
  'xCDrewAVLSU',
  'g1ArXfHHsNg',
  'QJ_972o0E4o',
  'Hg1l0L4k4oc',
  'kQ9Ekt_wrlE',
  'kn5oiv4pKnI',
  'd8tjtyhylQ4',
  'OujDDL24CfU',
  '3jLKVQJVM_A',
  'Lr2CN0AaSN8',
  'R6WetYj6diU',
  'WOgbfrT7koI',
  'GaVkCGhB_Mw',
  '9wyhpVj8_Os',
  'b9UVynx8MrY',
  'RubduNqxgUY',
  'Z_lSsKJ-LNo',
  'APaEzge44pM',
  'wGAeZSDMusE',
  'ystBVzYn2K8',
  'Fk5CXkqevHM',
  'eNkTXAOX2xA',
  'K0N-ggUcjLc',
  'ymriaoaNHAU',
  'pMldm275nsY',
  'PwIh6xb6z5A',
  '71hEUjwMQ78',
  'l2cMMWwQ4L4',
  'iAYg7TQNAkQ',
  'jo0njVFEfXg',
  'KwFKDiIMljg',
];

const ids = [
  'eT9mhPT9pNE',
  'srJyN304X18',
  'kE8-8eGLteg',
  '5wqq3fCf3i4',
  'if73shhQ4JU',
  'Ax63IBhhM3s',
  'YeFcwOMiOk4',
  'h7Sg_A8m9_g',
  'WwMZLadlk8c',
  'OzclevyTCO4',
  'MfodleGVM64',
  'T_oTEOoyxlE',
  'SgIC49Ndt6E',
  'YRrxWv4W2Hk',
  '8Pspj2gpy_0',
  'SsRsSd3D55k',
  'n6fV9CCfUOk',
  'aV19hClPzQE',
  'Y92uF7RBFas',
  '_dGjWSkZbRo',
  'LnmEeimlhCw',
  'A5DcqSyAsh4',
  'sKR3q20avtY',
  'cV4FDWVFfTg',
  '0jObq_bS5Gc',
  'wg9tsYUp-SA',
  'hH7iHGT9luU',
  'aCkRN4ZY4Kg',
  'XpkzvCHYc6I',
  'BxkgdEB8nGo',
  'jS9jDWoex0U',
  'FhljCpO5GVs',
  '_TWtmpBHkHU',
  'GkZTTIYU_Bc',
  'qo0F_FqfxXQ',
  'kjNbOjSpQns',
  '_I_SnTl1It0',
  '4NetYlvGekI',
  'pdM7A35m1-s',
  'iIQYwBRc0tI',
  'tvmh8V_pMQQ',
  'CTM_hOW0T8I',
  'K7vy0HpPfu4',
  'pC-GzKWAIlo',
  'XEdOKS6la1U',
  'lqCNIFsVp40',
  'Z4nksEQ7SB8',
  '9bbuSxGVuFs',
  'P2_TENrUUvs',
  'kHJSQi7inEI',
  'OUmwqsTnuOs',
  'CEyNsXJnDFQ',
  'pTQ6Vj_jVoM',
  'M7z2gH2L6n8',
  'hFV_jb9BTkQ',
  'FrF4KLh7Ag8',
  '3tsLAHNruLo',
  'cWEr3mFU31k',
  'mmzojbS1rS0',
  'LrQoS1qnEPo',
  '1qO-6ChXMhM',
  'Jq-eLFg6qZI',
  '6g5SJqhzXvE',
  'QIGb4072Hjo',
  'UjOrQVSNRF8',
  'ZTws5zKagpU',
  'MPiXpfdl0MI',
  'dzQWMSlHFv4',
  'lJIT4rhwIQs',
  'YE4I97fsMxU',
  'CbtQoiMUaDs',
  'IuGYc7L98S0',
  'ONz4Ggv4-GM',
  'Z24UswhXB3U',
  'C7f3EHoobqc',
  'W3cjaWiyuR4',
  'ABf0OLzLJ-g',
  'wY1QA-1kMwo',
  'ZdguHOBgSwA',
  'x3TgbXYci4A',
  '40wfr3rUZeg',
  'lnqmOnUw7Zc',
  'tGnIMJ_IZRA',
  '67V9SpDF-gg',
  '5v7NCJJp8Sc',
  's26ZC3hvixQ',
  'JZolBYTgZwU',
  'sVDUznhBO-I',
  '3h12POpBxdA',
  'wQS57t4bioE',
  '7g6Yse5AXz8',
  'UejcpEO8y_o',
  'Er0vetBBq5w',
  'iRUEccxNX_0',
  'vkmgfE31_0s',
  'JCdqyoi76dE',
  'E4OlmCRtNB0',
  'nyyy7VYJP6Q',
  'h9-114jhi04',
  'pa7fkoQUVZo',
  '6_nTr7q0eKs',
  'V5WPcJOByw0',
  'u0m4Ts9NXQ4',
  'he1IUqeLGCo',
  'qu3m3tkWg1c',
  'JQjGanCH1gM',
  'mtNcun4E6G0',
  'tf5UAclqi6U',
  'XIhbmP82eBE',
  'fGGEMPC63Mc',
  '0NaVAVWaQNg',
  'M6Pkl6sciaY',
  'dT9WgJ4r6sg',
  'uiLncmdVn4s',
  'co_k5xaiVeY',
  'FDDcF9dlHJU',
  'f2MDVGoEnyA',
  'oVqN4P6X9cY',
  'GUVkPSwT0F4',
  'EnuBdbgcdfw',
  'cfPvdqYz2zk',
  'R7NzekKYTJo',
  'i13cPXgYda0',
  'VfkyVRR5NKA',
  'K1rEQRwoGrw',
  'uZL2lFGtZwM',
  '4yInILbrces',
  '_9D513IrkrI',
  'LKyoS56_w7U',
  'jsAxuCMYolI',
  '2qxg45vv4Sc',
  'Gv2zKdVxz1Y',
  'UtEEBnry9Fk',
  '_ll789FSFs0',
  'zX6TvPegSWs',
  'M6jXpxtN2s4',
  'RC225y69FGo',
  'rNfNjdSGQr0',
  'sYyQRGCwO3g',
  '55DspAnC8GQ',
  'fdV9qW2ammc',
  'TRFerk_79mo',
  'inOXKDT4J2M',
  'xCDrewAVLSU',
  'g1ArXfHHsNg',
  'QJ_972o0E4o',
  'Hg1l0L4k4oc',
  'kQ9Ekt_wrlE',
  'kn5oiv4pKnI',
  'd8tjtyhylQ4',
  'OujDDL24CfU',
  '3jLKVQJVM_A',
  'Lr2CN0AaSN8',
  'R6WetYj6diU',
  'WOgbfrT7koI',
  'GaVkCGhB_Mw',
  '9wyhpVj8_Os',
  'b9UVynx8MrY',
  'RubduNqxgUY',
  'Z_lSsKJ-LNo',
  'APaEzge44pM',
  'wGAeZSDMusE',
  'ystBVzYn2K8',
  'Fk5CXkqevHM',
  'eNkTXAOX2xA',
  'K0N-ggUcjLc',
  'ymriaoaNHAU',
  'pMldm275nsY',
  'PwIh6xb6z5A',
  '71hEUjwMQ78',
  'l2cMMWwQ4L4',
  'iAYg7TQNAkQ',
  'jo0njVFEfXg',
  'KwFKDiIMljg',
];

// const idsTests = ['kE8-8eGLteg'];

const clusterIndex = 0;

const videosArray = clusterizing(ids.reverse(), clusterIndex);

async function processItemsSequentially(array) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/baf99d2f-a251-4e34-9821-2b8c28a8918e',
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    headless: false,
  });

  for (let i = 0; i < array.length; i++) {
    console.log(`Iteração: ${i}`);
    await main(array[i], browser);
  }

  // await browser.disconnect();
}

processItemsSequentially(videosArray);
