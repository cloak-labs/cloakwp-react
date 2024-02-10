import { FC, useEffect, useState } from "react";
import { getCloakWPConfig } from "cloakwp";
import { getCMSInstanceAsync } from "cloakwp/cms";
import { Link } from "@cloakui/react-primitives/Link";
import { Button } from "@cloakui/react-primitives/Button";
import { cx } from "@cloakui/styles";
import { useUser } from "../hooks/useUser";
import { HomeIcon, EditIcon, EyeIcon } from "./icons";
import { useGlobals } from "../context/GlobalsContext";

export type AdminBarProps = {
  /** Add custom classes to the AdminBar's outermost div. */
  className?: string;
  /** When true, a link to the current page's WP REST API endpoint will render. */
  enableRestApiLink?: boolean;
  /** When true, AdminBar will be visible to non-logged-in users; you likely only want to use this during testing/development, if at all. */
  alwaysVisible?: boolean;
};

// TODO: build more of a Composition API for allowing custom menu items + dropdowns etc.

export const AdminBar: FC<AdminBarProps> = ({
  className,
  enableRestApiLink = true,
  alwaysVisible = false,
  ...props
}) => {
  const [cmsMeta, setCmsMeta] = useState({ url: null, adminPath: null });
  const { pageData, isPreview } = useGlobals();
  let { isLoggedIn = false } = useUser();
  const { apiRouterBasePath } = getCloakWPConfig();

  useEffect(() => {
    const loadCMSInstance = async () => {
      const { url, adminPath } = await getCMSInstanceAsync();
      setCmsMeta({ url, adminPath });
    };

    loadCMSInstance();
  }, []);

  const status =
    {
      publish: "published",
      draft: "draft",
      pending: "pending",
      future: "scheduled",
      private: "private",
    }[pageData?.status] ??
    pageData?.status ??
    "revision";

  return (
    <>
      {(alwaysVisible || isLoggedIn) && (
        <div
          id="cloakwp-admin-bar"
          className={cx(
            "w-full h-[38px] flex items-center bg-root-invert text-root-invert dark:bg-root-dim dark:text-root-dim border-b border-root-dim px-3 lg:px-4 py-1.5",
            className
          )}
          {...props}
        >
          <div className="w-full flex gap-x-2 sm:gap-x-6 mb-0 text-sm">
            <a
              href={`${cmsMeta.url}${cmsMeta.adminPath}/edit.php`}
              target="_blank"
              className="flex items-center"
            >
              <HomeIcon className="mr-1.5" />
              <span className="hidden sm:flex">Dashboard</span>
            </a>
            {pageData && (
              <a
                href={`${cmsMeta.url}${cmsMeta.adminPath}/post.php?post=${pageData.id}&action=edit`}
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
                  "flex items-center gap-x-2",
                  !isPreview && "ml-auto"
                )}
              >
                Status:
                <span className="rounded-full bg-root text-root dark:bg-root-invert dark:text-root-invert py-0.5 px-2 uppercase tracking-normal text-xs font-medium">
                  {status}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
