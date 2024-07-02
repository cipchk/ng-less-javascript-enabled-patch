#!/usr/bin/env node

import { getAppRootPath } from './utils';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const appPath = getAppRootPath();

function run() {
  const lessLangPath = join(appPath, 'node_modules/@angular-devkit/build-angular/src/tools/esbuild/stylesheets/less-language.js');
  if (!existsSync(lessLangPath)) {
    const tips = `Not found ${lessLangPath}, ignore change angular-cli LESS no longer supports javascript by default`;
    console.error(tips);
    console.error(tips);
    console.error(tips);
    return;
  }

  const content = readFileSync(lessLangPath).toString('utf8');
  const code = `/* unsafeInlineJavaScript */ false`;
  const newCode = `/* unsafeInlineJavaScript */ true`;

  writeFileSync(lessLangPath, content.replace(code, newCode));
  console.log(`Congratulations, less now supports javascriptEnabled`);
}

run();
