import { useForm } from "@mantine/form";
import ActionIcon from "../ActionIcon";
import Input from "../Input";
import { saveMenu } from "./styles";
import { useRequest, useWorkspace } from "@lib/hooks";
import { useCallback, useEffect } from "react";
import TreeItem from "../TreeItem";
import { IconFolder, IconFolderPlus, IconPlus } from "@tabler/icons-react";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import CollectionsView, { SelectedContext } from "../CollectionsView";
import SidebarSearch from "../SidebarSearch";
import { on } from "events";
import { RequestConfig } from "@shared/types";

export type SaveMenuForm = {
  collection: {
    id: string;
    path: string;
  };
};

export type SaveMenuProps = {
  onClose: () => void;
};

export default function SaveMenu({ onClose }: SaveMenuProps) {
  const request = useRequest();
  const workspace = useWorkspace();
  const classes = saveMenu();

  const form = useForm<SaveMenuForm>({
    initialValues: {
      collection: {
        id: "",
        path: "",
      },
    },
  });

  //   useEffect(() => {
  //     if (!request?.values.label) return;
  //     form.setFieldValue("name", request.values.label);
  //     console.log("Setting collection path");
  //   }),
  //     [request?.values.label];

  const save = useCallback(async () => {
    if (!request?.values) return;

    const updatedRequest: RequestConfig = {
      ...request.values,
      isDraft: false,
    };

    await workspace.createRequest(form.values.collection.path, updatedRequest);
    request.setValues(updatedRequest);

    onClose();
  }, [request?.values, form.values.collection, onClose]);

  return (
    <div className={classes.menu}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div>
            <div className={classes.title}>Save Request</div>
            <div className={classes.subtitle}>
              Choose a name and a collection
            </div>
          </div>
          <ActionIcon icon="close" onClick={onClose} />
        </div>
        <Input
          placeholder="Request name"
          variant="compact"
          label="Request name"
          {...request?.getInputProps("label")}
        />
        <div className={classes.searchBar}>
          <div className={classes.treeLabel}>Select Collection</div>
          <SidebarSearch
            withPaddings={false}
            rightSection={
              <ActionIcon
                icon={IconPlus}
                onClick={() => workspace.createEmptyCollection("")}
              />
            }
            variant="compact"
          />
        </div>
      </div>
      <div className={classes.tree}>
        <SelectedContext.Provider value={form.values.collection.id}>
          <CollectionsView
            collections={workspace.collections}
            onCollectionClick={(col, event) => {
              event.stopPropagation();
              form.setFieldValue("collection", {
                id: col.id,
                path: `${col.path === "" ? col.path : `${col.path}/`}${col.slug}`,
              });
            }}
            rightSection={({ item }) => (
              <ActionIcon
                icon={IconFolderPlus}
                size={14}
                onClick={() =>
                  workspace.createEmptyCollection(
                    `${item.path === "" ? item.path : `${item.path}/`}${item.slug}`
                  )
                }
              />
            )}
          />
        </SelectedContext.Provider>
      </div>
      <div className={classes.actions}>
        <VSCodeButton
          className={classes.button}
          disabled={
            request?.values.label === "" || form.values.collection.id === ""
          }
          onClick={save}
        >
          <div className={classes.buttonText}>Save</div>
        </VSCodeButton>
      </div>
    </div>
  );
}
