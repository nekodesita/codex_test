import { open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { basename } from "@tauri-apps/api/path";

const editor = document.getElementById("editor");
const filePathLabel = document.getElementById("file-path");
const charCountLabel = document.getElementById("char-count");

const newButton = document.getElementById("new-file");
const openButton = document.getElementById("open-file");
const saveButton = document.getElementById("save-file");
const saveAsButton = document.getElementById("save-as");

let currentPath = null;

const updateCharCount = () => {
  charCountLabel.textContent = `${editor.value.length} 文字`;
};

const updateFileLabel = async (path) => {
  if (!path) {
    filePathLabel.textContent = "未保存";
    return;
  }
  const name = await basename(path);
  filePathLabel.textContent = `${name} (${path})`;
};

const resetEditor = () => {
  editor.value = "";
  currentPath = null;
  updateCharCount();
  updateFileLabel(null);
};

newButton.addEventListener("click", () => {
  resetEditor();
});

openButton.addEventListener("click", async () => {
  const selected = await open({
    multiple: false,
    filters: [{ name: "Text", extensions: ["txt", "md", "json", "log"] }]
  });

  if (!selected || Array.isArray(selected)) {
    return;
  }

  const contents = await readTextFile(selected);
  editor.value = contents;
  currentPath = selected;
  updateCharCount();
  await updateFileLabel(selected);
});

saveButton.addEventListener("click", async () => {
  if (!currentPath) {
    saveAsButton.click();
    return;
  }

  await writeTextFile(currentPath, editor.value);
  await updateFileLabel(currentPath);
});

saveAsButton.addEventListener("click", async () => {
  const selected = await save({
    filters: [{ name: "Text", extensions: ["txt", "md"] }]
  });

  if (!selected) {
    return;
  }

  await writeTextFile(selected, editor.value);
  currentPath = selected;
  await updateFileLabel(selected);
});

editor.addEventListener("input", updateCharCount);

updateCharCount();
updateFileLabel(null);
