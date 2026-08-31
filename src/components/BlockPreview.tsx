"use client";

import React, { useMemo } from "react";
import { BlockPreviewFrame } from "./BlockPreviewFrame";
import { type RestApiBlockData } from "cloakwp/blocks";
import { type WPReactBlockRenderer } from "../WPReactBlockRenderer";

export type BlockPreviewProps = {
  data?: RestApiBlockData;
  pathname?: string;
  previewKey: string;
  blockRenderer: WPReactBlockRenderer;
};

export const BlockPreview: React.FC<BlockPreviewProps> = ({
  data,
  pathname = "",
  previewKey,
  blockRenderer,
}) => {
  const initialContent = useMemo(() => {
    if (!data) return null;

    return blockRenderer.render([data], {
      fromParent: { isIframePreview: true },
    });
  }, [blockRenderer, data]);

  return (
    <BlockPreviewFrame
      pathname={pathname}
      previewKey={previewKey}
      initialContent={initialContent}
      renderBlock={(blockData) =>
        blockRenderer.render([blockData], {
          fromParent: { isIframePreview: true },
        })
      }
    />
  );
};
