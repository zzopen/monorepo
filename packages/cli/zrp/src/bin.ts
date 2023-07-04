#!/usr/bin/env node

import { build } from './index'

async function main(){
  await build()
}

main().catch((err) => {
 console.error(err);
  process.exit(1);
})
