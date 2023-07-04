import {defineBuildConfig} from './src/index.js'

export default defineBuildConfig({
  declaration: true,
  declarationDir: './dist/types',
  plugin: {trip: false},
})
