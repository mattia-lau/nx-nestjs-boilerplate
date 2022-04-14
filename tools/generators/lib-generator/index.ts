import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  installPackagesTask,
  joinPathFragments,
  names,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { initGenerator } from '@nrwl/node';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { getRootTsConfigPathInTree } from '@nrwl/workspace/src/utilities/typescript';

const updateRootTsConfig = (host, options) => {
  updateJson(host, getRootTsConfigPathInTree(host), (json) => {
    const c = json.compilerOptions;
    c.paths = c.paths || {};
    delete c.paths[options.name];
    if (c.paths[options.importPath]) {
      throw new Error(
        `You already have a library using the import path "${options.importPath}". Make sure to specify a unique one.`
      );
    }
    c.paths[options.importPath] = [
      joinPathFragments(
        options.projectRoot,
        './src',
        `index.${options.js ? 'js' : 'ts'}`
      ),
    ];
    return json;
  });
};

const getCaseAwareFileName = (options) => {
  const normalized = names(options.fileName);
  return options.pascalCaseFiles ? normalized.className : normalized.fileName;
};

const normalizeOptions = (tree, options) => {
  const { npmScope, libsDir } = getWorkspaceLayout(tree);
  const defaultPrefix = npmScope;
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(/\//g, '-');
  const fileName = getCaseAwareFileName({
    fileName: options.simpleModuleName ? name : projectName,
    pascalCaseFiles: options.pascalCaseFiles,
  });
  const projectRoot = joinPathFragments(libsDir, projectDirectory);
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];
  const importPath =
    options.importPath || `@${defaultPrefix}/${projectDirectory}`;
  return {
    ...options,
    prefix: defaultPrefix, // we could also allow customizing this
    fileName,
    name: projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    importPath,
  };
};

export const generator = async (tree: Tree, schema: any) => {
  const options = normalizeOptions(tree, schema);
  const { libsDir } = getWorkspaceLayout(tree);
  const { name } = schema;
  const path = `${libsDir}/${name}`;
  addProjectConfiguration(tree, name, {
    name,
    root: path,
  });

  const initTask = await initGenerator(tree, {
    ...schema,
    ...options,
    testEnvironment: 'node',
    skipFormat: true,
  });
  runTasksInSerial(initTask);

  generateFiles(tree, joinPathFragments(__dirname, './files'), path, {
    ...schema,
    ...options,
    tmpl: '',
  });

  await formatFiles(tree);

  updateRootTsConfig(tree, options);

  return () => {
    installPackagesTask(tree);
  };
};

export default generator;
