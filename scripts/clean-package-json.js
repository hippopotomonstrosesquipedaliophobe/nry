import { pathJoin, writeJsonFileSync, getPackageJsonSync } from '@vvi/node';
import { isNull } from '@vvi/is';
import { dirname } from 'node:path';

const packageJsonResponse = getPackageJsonSync();

if (isNull(packageJsonResponse)) {
  throw new RangeError('未能识别配置文件 package.json');
}

let packageJson = packageJsonResponse.content;

[
  'jja',
  'scripts',
  'devDependencies',
  'lint-staged',
  'private',
  'dependencies',
  'packageManager',
].forEach(key => delete packageJson[key]);

packageJson = {
  ...packageJson,
  author: {
    name: '泥豆君',
    email: 'MudBean@outlook.com',
    url: 'https://mudbean.cn',
  },
  description: '更替及管理 npm、yarn、pnpm registry',
  license: 'MIT',
  files: [
    'bin.js',
    'LICENSE',
    'README.md',
    'THIRD-PARTY-LICENSES.txt',
    'CHANGELOG.md',
  ],
  keywords: ['nry', 'npm', 'pnpm', 'yarn', 'registry', 'vvi'],
  homepage: 'https://npms.gleanings.cn/nry',
  bugs: {
    url: 'https://github.com/hippopotomonstrosesquipedaliophobe/nry/issues',
    email: 'MudBean@outlook.com',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/hippopotomonstrosesquipedaliophobe/nry.git',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  bin: {
    nry: 'bin.js',
  },
  engines: {
    // 新增：声明 Node.js 兼容版本
    node: '>=18.0.0',
  },
};

{
  writeJsonFileSync(
    pathJoin(dirname(packageJsonResponse.path), './dist/package.json'),
    packageJson,
  );
}
