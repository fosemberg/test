// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://m.youtube.com/watch?v=lUDo3TW6DHw
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
}

deleteAudio = () => selectAudio()?.remove();

player = document.querySelector("#movie_player");
playerResponse = player?.getPlayerResponse();
adaptiveFormats = playerResponse?.streamingData?.adaptiveFormats;
src = adaptiveFormats?.filter(({url, audioQuality}) => url && audioQuality)[0]?.url;
deleteAudio();
if (!src) {
  console.error('src', src);
  console.error('adaptiveFormats', adaptiveFormats);
} else {
  createAudio(src);
}