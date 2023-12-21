import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import * as colors from 'ansi-colors';

function finished(): Rule {
  return (_: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());

    context.logger.info(colors.green(`✓  FINISHED`));
  };
}

export default function (): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packagePath = 'package.json';
    const json = JSON.parse(tree.read(packagePath)!.toString('utf-8'));
    if (typeof json.scripts !== 'object') json.scripts = {};
    if (typeof json.scripts.postinstall !== 'string') json.scripts.postinstall = '';
    if (json.scripts.postinstall.length > 0) json.scripts.postinstall += ' && ';
    json.scripts.postinstall += 'ng-less-javascript-enabled-patch';
    tree.overwrite(packagePath, JSON.stringify(json, null, 2));
    return chain([finished()])(tree, context);
  };
}
