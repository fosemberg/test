ID = 'fosemberg-audio';

selectAudio = () => document.querySelector(`#${ID}`);
deleteAudio = () => selectAudio()?.remove();

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
