import React from "react";
import { Link } from "@cloakui/react-primitives/Link";
import { Button } from "@cloakui/react-primitives/Button";
import { HomeIcon, EditIcon, EyeIcon, DoubleChevronIcon } from "./icons";
import { getCloakWPConfig } from "cloakwp";
import { ContentSourceRegistry } from "cloakwp/cms";
import { useGlobals } from "../context/GlobalsContext";
import { useUser } from "../hooks/useUser";
import { cx, type ClassValue } from "@cloakui/styles";

export type AdminBarProps = {
  /** Add custom classes to the AdminBar's outermost div. */
  className?: ClassValue;
  /** When true, a link to the current page's WP REST API endpoint will render. */
  enableRestApiLink?: boolean;
  /** When true, AdminBar will be visible to non-logged-in users; you likely only want to use this during testing/development, if at all. */
  alwaysVisible?: boolean;
};

// TODO: build more of a Composition API for allowing custom menu items + dropdowns etc.

export const AdminBar: React.FC<AdminBarProps> = ({
  className,
  enableRestApiLink = true,
  alwaysVisible = false,
  ...props
}) => {
  // const [cmsMeta, setCmsMeta] = useState({ url: null, adminPath: null });
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { pageData, isPreview } = useGlobals();
  const { isLoggedIn = false } = useUser();
  const { apiRouterBasePath } = getCloakWPConfig();

  const wp = ContentSourceRegistry.get("wp");
  const { url, adminPath } = wp.getConfig();

  const status =
    {
      publish: "published",
      draft: "draft",
      pending: "pending",
      future: "scheduled",
      private: "private",
    }[pageData?.status] ?? "unknown";

  return (
    <>
      {(alwaysVisible || isLoggedIn) && (
        <div
          id="cloakwp-admin-bar"
          className={cx(
            "relative h-[38px] z-[101] flex items-center dark text-root-dim border-b border-root py-1.5",
            isCollapsed
              ? "w-auto absolute right-0 top-3 border-l border-t rounded-l-sm bg-root/30 backdrop-blur-sm transition-all duration-100"
              : "w-full px-3 bg-root",
            className
          )}
          {...props}
        >
          {!isCollapsed && (
            <div className="flex w-full gap-x-2 sm:gap-x-6 mb-0 text-sm">
              <a
                href={`${url}${adminPath}/edit.php`}
                target="_blank"
                className="flex items-center"
              >
                <HomeIcon className="mr-1.5" />
                <span className="hidden sm:flex">Dashboard</span>
              </a>
              {pageData && (
                <a
                  href={`${url}${adminPath}/post.php?post=${pageData.id}&action=edit`}
                  target="_blank"
                  className="flex items-center"
                >
                  <EditIcon className="mr-1.5" />
                  <span className="hidden sm:flex">Edit Page</span>
                </a>
              )}
              {enableRestApiLink && (
                <a
                  href={pageData?._links?.self[0]?.href}
                  target="_blank"
                  className="flex items-center"
                >
                  <EyeIcon className="mr-1.5" />
                  <span className="hidden sm:flex">REST API</span>
                </a>
              )}
              {isPreview && (
                <Button
                  variants={{ size: "sm", variant: "secondary" }}
                  className="ml-auto"
                  asChild={true}
                >
                  <Link
                    href={`${apiRouterBasePath}/exit-preview?pathname=${pageData.pathname}`}
                    openInNewTab={false}
                  >
                    Exit Preview
                  </Link>
                </Button>
              )}
              {pageData && (
                <div
                  className={cx(
                    "flex items-center gap-x-2 text-sm",
                    !isPreview && "ml-auto"
                  )}
                >
                  Status:
                  <span className="rounded-full bg-root text-root dark:bg-root-invert dark:text-root-invert py-0.5 px-2 uppercase tracking-normal text-xs font-medium">
                    {status}
                  </span>
                </div>
              )}
              <div className="absolute right-9 top-0 w-px h-full bg-root-invert-dim/20" />
            </div>
          )}
          <DoubleChevronIcon
            className={[
              "border-root cursor-pointer transition-all duration-200",
              isCollapsed ? "px-1 size-6" : "size-4 rotate-180 ml-6",
            ]}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
      )}
    </>
  );
};
