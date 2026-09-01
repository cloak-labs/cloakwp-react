"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { type RestApiBlockData } from "cloakwp/blocks";
import {
  getConfiguredWpOrigin,
  handleWPBlockIframeMessage,
  resolvePreviewTargetOrigin,
  sendPreviewReadyToWp,
  watchForDocumentHeightChanges,
} from "cloakwp/editor";

export type RenderPreviewBlock = (
  blockData: RestApiBlockData,
  pathname: string,
) => ReactNode | Promise<ReactNode>;

export type BlockPreviewFrameProps = {
  pathname?: string;
  previewKey: string;
  renderBlock: RenderPreviewBlock;
  initialContent?: ReactNode;
  targetOrigin?: string;
  renderContainer?: (content: ReactNode) => ReactNode;
};

/**
 * Framework-neutral React client for CloakWP's block-preview iframe protocol.
 * Framework adapters provide the renderer and optional application shell.
 */
export function BlockPreviewFrame({
  pathname = "",
  previewKey,
  renderBlock,
  initialContent = null,
  targetOrigin: configuredTargetOrigin,
  renderContainer = (content) => <div id="root">{content}</div>,
}: BlockPreviewFrameProps) {
  const [content, setContent] = useState<ReactNode>(initialContent);
  const renderBlockRef = useRef(renderBlock);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    renderBlockRef.current = renderBlock;
  }, [renderBlock]);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = "body { background-color: transparent; }";
    document.head.appendChild(styleTag);
    document.body.classList.add("gutenberg-preview");

    return () => {
      document.head.removeChild(styleTag);
      document.body.classList.remove("gutenberg-preview");
    };
  }, []);

  useEffect(() => {
    const targetOrigin =
      resolvePreviewTargetOrigin(configuredTargetOrigin) ??
      getConfiguredWpOrigin();
    if (!targetOrigin) {
      console.error(
        "[BlockPreviewFrame] Cannot resolve the configured WordPress origin",
      );
      return;
    }

    let renderGeneration = 0;

    const handleMessages = (event: MessageEvent) => {
      try {
        handleWPBlockIframeMessage(event, {
          previewKey,
          targetOrigin,
          onBlockDataReceipt: (blockData: RestApiBlockData) => {
            renderGeneration += 1;
            const generation = renderGeneration;

            void Promise.resolve(
              renderBlockRef.current(blockData, pathnameRef.current),
            )
              .then((rendered) => {
                if (generation === renderGeneration) {
                  setContent(rendered);
                }
              })
              .catch((error) => {
                if (generation === renderGeneration) {
                  console.error(
                    "[BlockPreviewFrame] Block rendering failed",
                    error,
                  );
                }
              });
          },
        });
      } catch (error) {
        console.error(
          "[BlockPreviewFrame] Preview message handling failed",
          error,
        );
      }
    };

    window.addEventListener("message", handleMessages);
    sendPreviewReadyToWp(previewKey, targetOrigin);
    const heightObserver = watchForDocumentHeightChanges({
      previewKey,
      targetOrigin,
    });

    return () => {
      renderGeneration += 1;
      window.removeEventListener("message", handleMessages);
      heightObserver?.disconnect();
    };
  }, [configuredTargetOrigin, previewKey]);

  return renderContainer(content);
}
