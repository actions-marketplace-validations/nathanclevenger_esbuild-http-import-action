import fs from 'fs'
import core from '@actions/core'
import github from '@actions/github'
import esbuild from 'esbuild'
import httpPlugin from 'esbuild-plugin-http'

try {
  const time = (new Date()).toTimeString()

  const payload = JSON.stringify(github.context , null, 2)
  esbuild.build({
    entryPoints: [core.getInput('entryPoint')],
    bundle: core.getInput('bundle'),
    outfile: core.getInput('outfile'),
    plugins: [httpPlugin],
  }).catch(() => process.exit(1))

  const output = fs.readFileSync(core.getInput('bundle'))
  core.setOutput("bundle", output)
  
  console.log(`The ESBuild output: ${output}`)
} catch (error) {
  core.setFailed(error.stack)
}