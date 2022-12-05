import fs from 'fs'

const srcDir = `./dist`;
const destDir = `../ReactLensExample/node_modules/react-native-lens/dist`;

fs.watch("./src/", {recursive: true}, () => {
  console.log('copying...')
  fs.cp(srcDir, destDir, { overwrite: true, recursive: true }, function() {
    console.log('copied')
  })
});