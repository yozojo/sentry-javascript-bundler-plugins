import {
  sentryUnpluginFactory,
  Options,
  createRollupReleaseInjectionHooks,
  createRollupModuleMetadataInjectionHooks,
  createRollupDebugIdInjectionHooks,
  createRollupDebugIdUploadHooks,
  SentrySDKBuildFlags,
  createRollupBundleSizeOptimizationHooks,
  createComponentNameAnnotateHooks,
} from "xd-sentry-bundler-plugin-core";
import { UnpluginOptions } from "unplugin";

function viteReleaseInjectionPlugin(injectionCode: string): UnpluginOptions {
  return {
    name: "sentry-vite-release-injection-plugin",
    // run `post` to avoid tripping up @rollup/plugin-commonjs when cjs is used
    // as we inject an `import` statement
    enforce: "post" as const, // need this so that vite runs the resolveId hook
    vite: createRollupReleaseInjectionHooks(injectionCode),
  };
}

function viteComponentNameAnnotatePlugin(): UnpluginOptions {
  return {
    name: "sentry-vite-component-name-annotate-plugin",
    enforce: "pre" as const,
    vite: createComponentNameAnnotateHooks(),
  };
}

function viteDebugIdInjectionPlugin(): UnpluginOptions {
  return {
    name: "sentry-vite-debug-id-injection-plugin",
    vite: createRollupDebugIdInjectionHooks(),
  };
}

function viteModuleMetadataInjectionPlugin(injectionCode: string): UnpluginOptions {
  return {
    name: "sentry-vite-module-metadata-injection-plugin",
    vite: createRollupModuleMetadataInjectionHooks(injectionCode),
  };
}

function viteDebugIdUploadPlugin(
  upload: (buildArtifacts: string[]) => Promise<void>
): UnpluginOptions {
  return {
    name: "sentry-vite-debug-id-upload-plugin",
    vite: createRollupDebugIdUploadHooks(upload),
  };
}

function viteBundleSizeOptimizationsPlugin(
  replacementValues: SentrySDKBuildFlags
): UnpluginOptions {
  return {
    name: "sentry-vite-bundle-size-optimizations-plugin",
    vite: createRollupBundleSizeOptimizationHooks(replacementValues),
  };
}

const sentryUnplugin = sentryUnpluginFactory({
  releaseInjectionPlugin: viteReleaseInjectionPlugin,
  componentNameAnnotatePlugin: viteComponentNameAnnotatePlugin,
  debugIdInjectionPlugin: viteDebugIdInjectionPlugin,
  moduleMetadataInjectionPlugin: viteModuleMetadataInjectionPlugin,
  debugIdUploadPlugin: viteDebugIdUploadPlugin,
  bundleSizeOptimizationsPlugin: viteBundleSizeOptimizationsPlugin,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sentryVitePlugin: (options?: Options) => any = sentryUnplugin.vite;

export type { Options as SentryVitePluginOptions } from "xd-sentry-bundler-plugin-core";
export { sentryCliBinaryExists } from "xd-sentry-bundler-plugin-core";
