#!/usr/bin/env node
const { spawn } = require('node:child_process')

function run(name, cmdString) {
  const child = spawn(cmdString, {
    stdio: 'inherit',
    env: process.env,
    shell: true,
  })
  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`[${name}] exited with code ${code}`)
      process.exitCode = code
    }
  })
  return child
}

const p16 = run('react16', 'npm run dev -w react16')
const p18 = run('react18', 'npm run dev -w react18')

function shutdown() {
  if (p16 && !p16.killed) p16.kill()
  if (p18 && !p18.killed) p18.kill()
  process.exit()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
