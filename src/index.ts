#!/usr/bin/env node

import { getAppRootPath } from './utils';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const appPath = getAppRootPath();

function run() {
  const lessLangPath = join(appPath, 'node_modules/@angular-devkit/build-angular/src/tools/esbuild/stylesheets/less-language.js');
  if (!existsSync(lessLangPath)) throw new Error(`Not found ${lessLangPath}`);

  const content = readFileSync(lessLangPath).toString('utf8');
  const code = `/* unsafeInlineJavaScript */ false`;
  const newCode = `/* unsafeInlineJavaScript */ true`;

  writeFileSync(lessLangPath, content.replace(code, newCode));
  console.log(`Congratulations, less now supports javascriptEnabled`);
}

run();
