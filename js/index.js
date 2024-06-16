import { initStore } from "../js/store.js";
import { initHistoryList } from "../js/components/history-list.js";
import { initCurrentAsset } from "../js/components/current-asset.js";
import { initAddItem } from "../js/components/add-item.js";

function init() {
  initStore();
  
  initCurrentAsset();
  initAddItem();
  initHistoryList();
}

init();
