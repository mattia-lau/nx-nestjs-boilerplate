import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  installPackagesTask,
  joinPathFragments,
  Tree,
} from '@nrwl/devkit';
import { initGenerator } from '@nrwl/node';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

export const generator = async (tree: Tree, schema: any) => {
  const { appsDir } = getWorkspaceLayout(tree);
  const { name } = schema;
  const path = `${appsDir}/${name}`;
  addProjectConfiguration(tree, name, {
    name,
    root: path,
  });
  const initTask = await initGenerator(tree, schema);
  runTasksInSerial(initTask);

  generateFiles(tree, joinPathFragments(__dirname, './files'), path, {
    ...schema,
    tmpl: '',
  });

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
};

export default generator;
