## Find me on the web!

On any terminal, run:

```bash
npx murtuzaalisurti
```

That's it.


## Releasing

```sh
npm version patch          # or minor; runs a smoke test, commits, and tags vX.Y.Z
git push --follow-tags
```

Pushing the tag runs [`.github/workflows/publish.yml`](.github/workflows/publish.yml). It checks the tag matches `package.json`, smoke-tests the CLI, stages the package on npm through trusted publishing, and creates a GitHub release. Approve the staged package on npmjs.com to make it public.

Pre-releases (`npm version prerelease --preid beta`) are staged under the `beta` dist-tag, so `latest` is unchanged.
