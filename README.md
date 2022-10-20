# patch-files

Create and apply patches for file changes in `node_modules`.

Useful if you want to create patches faster than with [`patch-package`](https://github.com/ds300/patch-package), which is slow if you patch a large module.

## Usage

To create a patch for a single file:

```bash
npx patch-files@latest node_modules/a/a.js
```

To create a patch for multiple files:

```bash
npx patch-files@latest node_modules/a/a.js,node_modules/b/b.js
```

> If you use [VSCode](https://code.visualstudio.com), you can right click on a file and select "Copy Relative File" to get file path quickly.

To apply patches:

```bash
npx patch-files@latest
```

You can apply patches in a `postinstall` script so patches are applied whenever you install your node modules:

```json
{
  "scripts": {
    "postinstall": "npx patch-files@latest"
  }
}
```

You may also want to add `.patch-files-cache` to your `.gitignore`. This is where the files that are compared with the files you changed are stored.

## Todo

- [ ] Tests
- [ ] CI
- [ ] Figure out why applying diffs deletes the file in `.patch-files-cache`