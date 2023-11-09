// ==UserScript==
// @name         youtube audio
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  try to take over the world!
// @author       You
// @match        https://m.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

ID = 'fosemberg-audio';

selectAudio = () => document.querySelector(`#${ID}`);

createAudio = (src) => {
  audio = document.createElement('audio');
  audio.id = ID;
  audio.style.position = 'fixed';
  audio.style.zIndex = '9999999999';
  audio.style.bottom = '0';
  audio.style.right = '0';
  audio.controls = true;
  document.body.append(audio);
  audio.src = src;
  return audio;
}

deleteAudio = () => {
  audio = selectAudio();
  if (!audio) {
    return;
  }
  audio.pause();
  audio.remove();
}

getPlayer = () => document.querySelector("#movie_player");

getAudioSrc = () => {
  player = getPlayer();
  playerResponse = player?.getPlayerResponse();
  adaptiveFormats = playerResponse?.streamingData?.adaptiveFormats;
  src = adaptiveFormats?.filter(({url, audioQuality}) => url && audioQuality)[0]?.url;
  return src;
}

prepareAudio = async () => {
  deleteAudio();
  src = getAudioSrc();
  if (!src) {
    console.error('src', src);
    console.error('adaptiveFormats', adaptiveFormats);
    return;
  }
  player = getPlayer();
  if (!player || player.isMuted()) {
    return;
  }
  audio = createAudio(src);
}

playAudio = () => {
  audio.play();
}

prepareAudio();
addEventListener("visibilitychange", () => {
  if (document.hidden) {
    playAudio();
  }
});