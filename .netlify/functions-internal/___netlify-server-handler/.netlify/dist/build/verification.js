
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import {
  require_out
} from "../esm-chunks/chunk-YUXQHOYO.js";
import {
  require_semver
} from "../esm-chunks/chunk-TLQCAGE2.js";
import {
  __toESM
} from "../esm-chunks/chunk-6BT4RYQJ.js";

// src/build/verification.ts
var import_fast_glob = __toESM(require_out(), 1);
var import_semver = __toESM(require_semver(), 1);
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ApiRouteType, getAPIRoutesConfigs } from "./advanced-api-routes.js";
var SUPPORTED_NEXT_VERSIONS = ">=13.5.0";
var verifications = /* @__PURE__ */ new Set();
function verifyPublishDir(ctx) {
  if (!existsSync(ctx.publishDir)) {
    ctx.failBuild(
      `Your publish directory was not found at: ${ctx.publishDir}. Please check your build settings`
    );
  }
  if (ctx.publishDir === ctx.resolveFromPackagePath("")) {
    ctx.failBuild(
      `Your publish directory cannot be the same as the base directory of your site. Please check your build settings`
    );
  }
  try {
    ctx.buildConfig;
  } catch {
    ctx.failBuild(
      "Your publish directory does not contain expected Next.js build output. Please check your build settings"
    );
  }
  if (ctx.buildConfig.output === "standalone" || ctx.buildConfig.output === void 0) {
    if (!existsSync(join(ctx.publishDir, "BUILD_ID"))) {
      ctx.failBuild(
        "Your publish directory does not contain expected Next.js build output. Please check your build settings"
      );
    }
    if (!existsSync(ctx.standaloneRootDir)) {
      ctx.failBuild(
        `Your publish directory does not contain expected Next.js build output. Please make sure you are using Next.js version (${SUPPORTED_NEXT_VERSIONS})`
      );
    }
    if (ctx.nextVersion && !(0, import_semver.satisfies)(ctx.nextVersion, SUPPORTED_NEXT_VERSIONS, { includePrerelease: true })) {
      ctx.failBuild(
        `@netlify/plugin-nextjs@5 requires Next.js version ${SUPPORTED_NEXT_VERSIONS}, but found ${ctx.nextVersion}. Please upgrade your project's Next.js version.`
      );
    }
  }
  if (ctx.buildConfig.output === "export") {
    if (!ctx.exportDetail?.success) {
      ctx.failBuild(`Your export failed to build. Please check your build settings`);
    }
    if (!existsSync(ctx.exportDetail?.outDirectory)) {
      ctx.failBuild(
        `Your export directory was not found at: ${ctx.exportDetail?.outDirectory}. Please check your build settings`
      );
    }
  }
}
async function verifyAdvancedAPIRoutes(ctx) {
  const apiRoutesConfigs = await getAPIRoutesConfigs(ctx);
  const unsupportedAPIRoutes = apiRoutesConfigs.filter((apiRouteConfig) => {
    return apiRouteConfig.config.type === ApiRouteType.BACKGROUND || apiRouteConfig.config.type === ApiRouteType.SCHEDULED;
  });
  if (unsupportedAPIRoutes.length !== 0) {
    ctx.failBuild(
      `@netlify/plugin-nextjs@5 does not support advanced API routes. The following API routes should be migrated to Netlify background or scheduled functions:
${unsupportedAPIRoutes.map((apiRouteConfig) => ` - ${apiRouteConfig.apiRoute} (type: "${apiRouteConfig.config.type}")`).join("\n")}

Refer to https://ntl.fyi/next-scheduled-bg-function-migration as migration example.`
    );
  }
}
var formDetectionRegex = /<form[^>]*?\s(netlify|data-netlify)[=>\s]/;
async function verifyNetlifyFormsWorkaround(ctx) {
  const srcDir = ctx.resolveFromSiteDir("public");
  const paths = await (0, import_fast_glob.glob)("**/*.html", {
    cwd: srcDir,
    dot: true
  });
  try {
    for (const path of paths) {
      const html = await readFile(join(srcDir, path), "utf-8");
      if (formDetectionRegex.test(html)) {
        verifications.add("netlifyFormsWorkaround");
        return;
      }
    }
  } catch (error) {
    ctx.failBuild("Failed verifying public files", error);
  }
}
function verifyNetlifyForms(ctx, html) {
  if (process.env.NETLIFY_NEXT_VERIFY_FORMS !== "0" && process.env.NETLIFY_NEXT_VERIFY_FORMS?.toUpperCase() !== "FALSE" && !verifications.has("netlifyFormsWorkaround") && formDetectionRegex.test(html)) {
    ctx.failBuild(
      "@netlify/plugin-nextjs@5 requires migration steps to support Netlify Forms. Refer to https://ntl.fyi/next-runtime-forms-migration for migration example."
    );
  }
}
export {
  verifyAdvancedAPIRoutes,
  verifyNetlifyForms,
  verifyNetlifyFormsWorkaround,
  verifyPublishDir
};
