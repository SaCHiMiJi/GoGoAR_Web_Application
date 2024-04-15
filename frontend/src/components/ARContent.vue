<script setup>
import UnityWebgl from 'unity-webgl';
import VueUnity from 'unity-webgl/vue';

function checkFile(url) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log(`The file ${url} exists`);
      } else {
        console.log(`The file ${url} does not exist`);
      }
    })
    .catch(error => {
      console.error(`Error checking file ${url}:`, error);
    });
}
const loaderUrl = '/unityapp/Build/Test1.loader.js';
const dataUrl = '/unityapp/Build/Test1.data';
const frameworkUrl = '/unityapp/Build/Test1.framework.js';
const codeUrl = '/unityapp/Build/Test1.wasm';

checkFile(loaderUrl);
checkFile(dataUrl);
checkFile(frameworkUrl);
checkFile(codeUrl);

const unityContext = new UnityWebgl({
  loaderUrl: loaderUrl,
  dataUrl: dataUrl,
  frameworkUrl: frameworkUrl,
  codeUrl: codeUrl
});

unityContext.on('device', () => alert('click device ...'));
</script>

<template>
  <VueUnity :unity="unityContext" width="800" height="600" />
</template>