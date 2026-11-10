import { asset } from "../lib/asset";

/**
 * Official product logos, shown as a strip in each capability card's header.
 *
 * The files under public/assets/logos are the vendors' own marks, taken from
 * Devicon (MIT) except Databricks, which Devicon does not carry — that one is
 * the Simple Icons silhouette painted the official brand red. The trademarks
 * belong to their owners; they are used here nominatively, to name tools that
 * have actually been worked with.
 *
 * They are served as files rather than inlined because several of them carry
 * internal gradients under terse ids — SQL Server and PowerShell both define
 * `id="a"` — which would collide the moment two were inlined on one page.
 */

export type LogoName =
  | "azure"
  | "azuresqldatabase"
  | "cosmosdb"
  | "microsoftsqlserver"
  | "postgresql"
  | "mysql"
  | "powershell"
  | "python"
  | "githubactions"
  | "githubcopilot"
  | "azuredevops"
  | "terraform"
  | "grafana"
  | "yaml"
  | "claude"
  | "databricks";

const labels: Record<LogoName, string> = {
  azure: "Microsoft Azure",
  azuresqldatabase: "Azure SQL Database",
  cosmosdb: "Azure Cosmos DB",
  microsoftsqlserver: "Microsoft SQL Server",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  powershell: "PowerShell",
  python: "Python",
  githubactions: "GitHub Actions",
  githubcopilot: "GitHub Copilot",
  azuredevops: "Azure DevOps",
  terraform: "Terraform",
  grafana: "Grafana",
  yaml: "YAML",
  claude: "Claude",
  databricks: "Databricks",
};

export function Logo({ name }: { name: LogoName }) {
  return (
    <img
      src={asset(`/assets/logos/${name}.svg`)}
      alt={labels[name]}
      title={labels[name]}
      width={24}
      height={24}
      className="h-[1.45rem] w-[1.45rem] object-contain"
    />
  );
}

/** The strip itself. Renders nothing for the groups that name practices. */
export function LogoStrip({ names }: { names: readonly LogoName[] }) {
  if (names.length === 0) return null;

  return (
    <ul className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-2.5 pt-1">
      {names.map((name) => (
        <li key={name} className="flex">
          <Logo name={name} />
        </li>
      ))}
    </ul>
  );
}
