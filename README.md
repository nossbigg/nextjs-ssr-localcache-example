# nextjs-ssr-localcache-example

This repository demonstrates the following proofs-of-concept:

1. **Server-side XHR request caching** (via `memcached`) to speed up page renders
1. **Server-only modules isolation** via import alias

## Details

1. Upon accessing the landing page (http://localhost:3000/), there are three pages that users can access:

   - `/user`: Makes XHR call to get user info, `getInitialProps()`, non-cached
   - `/user-cached-ip`: Makes XHR call to get user info, `getInitialProps()`, cached
   - `/user-cached-ssp`: Makes XHR call to get user info, `getServerSideProps()`, cached

1. The XHR call to get user info is deliberately delayed to last at least 2 seconds long, in order to demonstrate the effect of caching the XHR call.

   - Since the `/user` page XHR call is not cached, the page load will always be at least 2 seconds long
   - As `/user-cached-ip` and `/user-cached-ssp` pages both use caching, subsequent page loads (after the first page load) will be very fast.

1. Within the page links cluster, there is also a `Clear User Data Cache` button to clear out the cache (to invoke invalidated cache scenario)

## Prerequisites

- `node`
- `docker`

## Starting the project

1. Install node dependencies: `yarn`
1. Spin up memcached docker container: `docker-compose up`
1. Spin up next.js instance: `yarn dev`
1. Access landing page: http://localhost:3000/

_Addendum_

- Connect to memcached instance: `telnet localhost 11211`
- Verify server/client build contents: `yarn analyze`

## Related resources

- Next.js

  - [getServerSideProps()](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)
  - [getInitialProps()](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)
  - [next.config.js: Custom Webpack Config | Next.js](https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config)
  - [SSR and Server Only Modules](https://arunoda.me/blog/ssr-and-server-only-modules)

- Webpack
  - [Resolve | webpack](https://webpack.js.org/configuration/resolve/#resolvealias)
  - [Webpack 5 release (2020-10-10) | webpack](https://webpack.js.org/blog/2020-10-10-webpack-5-release/#deprecated-loaders)
- Memcached
  - [ConfiguringServer · memcached/memcached Wiki · GitHub](https://github.com/memcached/memcached/wiki/ConfiguringServer)
  - [memcached(1) - Linux man page](https://linux.die.net/man/1/memcached)
  - [Memcached Telnet Commands Example - JournalDev](https://www.journaldev.com/16/memcached-telnet-commands-example)
- Memcached (Node.js Client)
  - [memcached node.js client](https://github.com/3rd-Eden/memcached)
