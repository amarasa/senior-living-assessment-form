
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import {
  require_semver
} from "../esm-chunks/chunk-TLQCAGE2.js";
import {
  __toESM
} from "../esm-chunks/chunk-6BT4RYQJ.js";

// src/build/plugin-context.ts
var import_semver = __toESM(require_semver(), 1);
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join, relative, resolve } from "node:path";
import { join as posixJoin, relative as posixRelative } from "node:path/posix";
import { fileURLToPath } from "node:url";
var MODULE_DIR = fileURLToPath(new URL(".", import.meta.url));
var PLUGIN_DIR = join(MODULE_DIR, "../..");
var DEFAULT_PUBLISH_DIR = ".next";
var SERVER_HANDLER_NAME = "___netlify-server-handler";
var EDGE_HANDLER_NAME = "___netlify-edge-handler";
var PluginContext = class {
  featureFlags;
  netlifyConfig;
  pluginName;
  pluginVersion;
  utils;
  constants;
  packageJSON;
  /** Absolute path of the next runtime plugin directory */
  pluginDir = PLUGIN_DIR;
  get relPublishDir() {
    return this.constants.PUBLISH_DIR ?? join(this.constants.PACKAGE_PATH || "", DEFAULT_PUBLISH_DIR);
  }
  /** Temporary directory for stashing the build output */
  get tempPublishDir() {
    return this.resolveFromPackagePath(".netlify/.next");
  }
  /** Absolute path of the publish directory */
  get publishDir() {
    return resolve(this.relPublishDir);
  }
  /**
   * Relative package path in non monorepo setups this is an empty string
   * This path is provided by Next.js RequiredServerFiles manifest
   * @example ''
   * @example 'apps/my-app'
   */
  get relativeAppDir() {
    return this.requiredServerFiles.relativeAppDir ?? "";
  }
  /**
   * The working directory inside the lambda that is used for monorepos to execute the serverless function
   */
  get lambdaWorkingDirectory() {
    return join("/var/task", this.distDirParent);
  }
  /**
   * Retrieves the root of the `.next/standalone` directory
   */
  get standaloneRootDir() {
    return join(this.publishDir, "standalone");
  }
  /**
   * The resolved relative next dist directory defaults to `.next`,
   * but can be configured through the next.config.js. For monorepos this will include the packagePath
   * If we need just the plain dist dir use the `nextDistDir`
   */
  get distDir() {
    const dir = this.buildConfig.distDir ?? DEFAULT_PUBLISH_DIR;
    return relative(process.cwd(), resolve(this.relativeAppDir, dir));
  }
  /** Represents the parent directory of the .next folder or custom distDir */
  get distDirParent() {
    return join(this.distDir, "..");
  }
  /** The `.next` folder or what the custom dist dir is set to */
  get nextDistDir() {
    return relative(this.distDirParent, this.distDir);
  }
  /** Retrieves the `.next/standalone/` directory monorepo aware */
  get standaloneDir() {
    return join(this.standaloneRootDir, this.distDirParent);
  }
  /**
   * Absolute path of the directory that is published and deployed to the Netlify CDN
   * Will be swapped with the publish directory
   * `.netlify/static`
   */
  get staticDir() {
    return this.resolveFromPackagePath(".netlify/static");
  }
  /**
   * Absolute path of the directory that will be deployed to the blob store
   * region aware: `.netlify/deploy/v1/blobs/deploy`
   * default: `.netlify/blobs/deploy`
   */
  get blobDir() {
    if (this.useRegionalBlobs) {
      return this.resolveFromPackagePath(".netlify/deploy/v1/blobs/deploy");
    }
    return this.resolveFromPackagePath(".netlify/blobs/deploy");
  }
  get buildVersion() {
    return this.constants.NETLIFY_BUILD_VERSION || "v0.0.0";
  }
  get useRegionalBlobs() {
    const REQUIRED_BUILD_VERSION = ">=29.41.5";
    return (0, import_semver.satisfies)(this.buildVersion, REQUIRED_BUILD_VERSION, { includePrerelease: true });
  }
  /**
   * Absolute path of the directory containing the files for the serverless lambda function
   * `.netlify/functions-internal`
   */
  get serverFunctionsDir() {
    return this.resolveFromPackagePath(".netlify/functions-internal");
  }
  /** Absolute path of the server handler */
  get serverHandlerRootDir() {
    return join(this.serverFunctionsDir, SERVER_HANDLER_NAME);
  }
  get serverHandlerDir() {
    if (this.relativeAppDir.length === 0) {
      return this.serverHandlerRootDir;
    }
    return join(this.serverHandlerRootDir, this.distDirParent);
  }
  get serverHandlerRuntimeModulesDir() {
    return join(this.serverHandlerDir, ".netlify");
  }
  get nextServerHandler() {
    if (this.relativeAppDir.length !== 0) {
      return join(this.lambdaWorkingDirectory, ".netlify/dist/run/handlers/server.js");
    }
    return "./.netlify/dist/run/handlers/server.js";
  }
  /**
   * Absolute path of the directory containing the files for deno edge functions
   * `.netlify/edge-functions`
   */
  get edgeFunctionsDir() {
    return this.resolveFromPackagePath(".netlify/edge-functions");
  }
  /** Absolute path of the edge handler */
  get edgeHandlerDir() {
    return join(this.edgeFunctionsDir, EDGE_HANDLER_NAME);
  }
  constructor(options) {
    this.constants = options.constants;
    this.featureFlags = options.featureFlags;
    this.netlifyConfig = options.netlifyConfig;
    this.packageJSON = JSON.parse(readFileSync(join(PLUGIN_DIR, "package.json"), "utf-8"));
    this.pluginName = this.packageJSON.name;
    this.pluginVersion = this.packageJSON.version;
    this.utils = options.utils;
  }
  /** Resolves a path correctly with mono repository awareness for .netlify directories mainly  */
  resolveFromPackagePath(...args) {
    return resolve(this.constants.PACKAGE_PATH || "", ...args);
  }
  /** Resolves a path correctly from site directory */
  resolveFromSiteDir(...args) {
    return resolve(this.requiredServerFiles.appDir, ...args);
  }
  /** Get the next prerender-manifest.json */
  async getPrerenderManifest() {
    return JSON.parse(await readFile(join(this.publishDir, "prerender-manifest.json"), "utf-8"));
  }
  /**
   * Uses various heuristics to try to find the .next dir.
   * Works by looking for BUILD_ID, so requires the site to have been built
   */
  findDotNext() {
    for (const dir of [
      // The publish directory
      this.publishDir,
      // In the root
      resolve(DEFAULT_PUBLISH_DIR),
      // The sibling of the publish directory
      resolve(this.publishDir, "..", DEFAULT_PUBLISH_DIR),
      // In the package dir
      resolve(this.constants.PACKAGE_PATH || "", DEFAULT_PUBLISH_DIR)
    ]) {
      if (existsSync(join(dir, "BUILD_ID"))) {
        return dir;
      }
    }
    return false;
  }
  /**
   * Get Next.js middleware config from the build output
   */
  async getMiddlewareManifest() {
    return JSON.parse(
      await readFile(join(this.publishDir, "server/middleware-manifest.json"), "utf-8")
    );
  }
  // don't make private as it is handy inside testing to override the config
  _requiredServerFiles = null;
  /** Get RequiredServerFiles manifest from build output **/
  get requiredServerFiles() {
    if (!this._requiredServerFiles) {
      let requiredServerFilesJson = join(this.publishDir, "required-server-files.json");
      if (!existsSync(requiredServerFilesJson)) {
        const dotNext = this.findDotNext();
        if (dotNext) {
          requiredServerFilesJson = join(dotNext, "required-server-files.json");
        }
      }
      this._requiredServerFiles = JSON.parse(
        readFileSync(requiredServerFilesJson, "utf-8")
      );
    }
    return this._requiredServerFiles;
  }
  #exportDetail = null;
  /** Get metadata when output = export */
  get exportDetail() {
    if (this.buildConfig.output !== "export") {
      return null;
    }
    if (!this.#exportDetail) {
      const detailFile = join(
        this.requiredServerFiles.appDir,
        this.buildConfig.distDir,
        "export-detail.json"
      );
      if (!existsSync(detailFile)) {
        return null;
      }
      try {
        this.#exportDetail = JSON.parse(readFileSync(detailFile, "utf-8"));
      } catch {
      }
    }
    return this.#exportDetail;
  }
  /** Get Next Config from build output **/
  get buildConfig() {
    return this.requiredServerFiles.config;
  }
  /**
   * Get Next.js routes manifest from the build output
   */
  async getRoutesManifest() {
    return JSON.parse(await readFile(join(this.publishDir, "routes-manifest.json"), "utf-8"));
  }
  #nextVersion = void 0;
  /**
   * Get Next.js version that was used to build the site
   */
  get nextVersion() {
    if (this.#nextVersion === void 0) {
      try {
        const serverHandlerRequire = createRequire(posixJoin(this.standaloneRootDir, ":internal:"));
        const { version } = serverHandlerRequire("next/package.json");
        this.#nextVersion = version;
      } catch {
        this.#nextVersion = null;
      }
    }
    return this.#nextVersion;
  }
  #fallbacks = null;
  /**
   * Get an array of localized fallback routes
   *
   * Example return value for non-i18n site: `['blog/[slug]']`
   *
   * Example return value for i18n site: `['en/blog/[slug]', 'fr/blog/[slug]']`
   */
  getFallbacks(prerenderManifest) {
    if (!this.#fallbacks) {
      const locales = this.buildConfig.i18n?.locales ?? [""];
      this.#fallbacks = Object.entries(prerenderManifest.dynamicRoutes).reduce(
        (fallbacks, [route, meta]) => {
          if (typeof meta.fallback === "string") {
            for (const locale of locales) {
              const localizedRoute = posixJoin(locale, route.replace(/^\/+/g, ""));
              fallbacks.push(localizedRoute);
            }
          }
          return fallbacks;
        },
        []
      );
    }
    return this.#fallbacks;
  }
  #fullyStaticHtmlPages = null;
  /**
   * Get an array of fully static pages router pages (no `getServerSideProps` or `getStaticProps`).
   * Those are being served as-is without involving CacheHandler, so we need to keep track of them
   * to make sure we apply permanent caching headers for responses that use them.
   */
  async getFullyStaticHtmlPages() {
    if (!this.#fullyStaticHtmlPages) {
      const pagesManifest = JSON.parse(
        await readFile(join(this.publishDir, "server/pages-manifest.json"), "utf-8")
      );
      this.#fullyStaticHtmlPages = Object.values(pagesManifest).filter(
        (filePath) => (
          // Limit handling to pages router files (App Router pages should not be included in pages-manifest.json
          // as they have their own app-paths-manifest.json)
          filePath.startsWith("pages/") && // Fully static pages will have entries in the pages-manifest.json pointing to .html files.
          // Pages with data fetching exports will point to .js files.
          filePath.endsWith(".html")
        )
      ).map((filePath) => posixRelative("pages", filePath));
    }
    return this.#fullyStaticHtmlPages;
  }
  /** Fails a build with a message and an optional error */
  failBuild(message, error) {
    return this.utils.build.failBuild(message, error instanceof Error ? { error } : void 0);
  }
};
export {
  EDGE_HANDLER_NAME,
  PluginContext,
  SERVER_HANDLER_NAME
};
