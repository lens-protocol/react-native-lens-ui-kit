import fs from 'fs'

const srcDir = `./dist`;
const destDir = `../RNLensExpoTesting/node_modules/@lens-protocol/react-native-lens-ui-kit/dist`;

fs.watch("./dist/", {recursive: true}, () => {
  console.log('copying...')
  fs.cp(srcDir, destDir, { overwrite: true, recursive: true }, function() {
    console.log('copied')
  })
});