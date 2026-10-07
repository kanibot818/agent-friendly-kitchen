/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "feature-to-feature-via-barrel-only",
      comment:
        "Cross-feature imports must go through the target feature public barrel (index.ts/tsx). Complements eslint-plugin-boundaries.",
      severity: "error",
      from: {
        path: "^src/features/([^/]+)/",
      },
      to: {
        path: "^src/features/",
        pathNot: [
          "^src/features/$1/",
          "^src/features/[^/]+/index\\.tsx?$",
        ],
      },
    },
    {
      name: "app-entry-no-deep-feature-imports",
      comment:
        "src/app and entry points must not deep-import feature private paths; use the feature barrel.",
      severity: "error",
      from: {
        path: "^src/(app/|main\\.tsx$|App\\.tsx$)",
      },
      to: {
        path: "^src/features/[^/]+/",
        pathNot: "^src/features/[^/]+/index\\.tsx?$",
      },
    },
    {
      name: "no-deep-feature-imports-from-elsewhere",
      comment:
        "Any non-feature module must import features only via public barrels.",
      severity: "error",
      from: {
        path: "^src/",
        pathNot: "^src/(features/|app/|main\\.tsx$|App\\.tsx$)",
      },
      to: {
        path: "^src/features/[^/]+/",
        pathNot: "^src/features/[^/]+/index\\.tsx?$",
      },
    },
  ],
  options: {
    doNotFollow: {
      path: ["node_modules", "dist", "coverage", "logs", "playwright-report", "test-results"],
    },
    exclude: {
      path: ["node_modules", "dist", "coverage", "logs", "playwright-report", "test-results"],
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.app.json",
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"],
    },
  },
};
