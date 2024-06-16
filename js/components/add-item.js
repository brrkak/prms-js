import { validatePrice, validateRequired, toHidden, toShow } from "../../js/util.js";
import { store, addNewHistory } from "../../js/store.js";
import { renderHistoryList } from "../../js/components/history-list.js";
import { renderCurrentAsset } from "../../js/components/current-asset.js";

const $addItemButton = document.querySelector(".add-item-button");
const $addItemDetail = document.querySelector(".add-item-detail");
const $addItemDetailButton = document.querySelector(".item-submit-button");
const $addItemCategory = document.querySelector("#item-category");
const $addItemPrice = document.querySelector("#item-price");
const $addItemDescription = document.querySelector("#item-description");

export function initAddItem() {
  renderAddItemButton();
  addItemEditEventListener();
}

function renderAddItemButton() {
  if (store.isFirstEdit) return;
  toShow($addItemButton);
}

function addItemEditEventListener() {
  $addItemButton.addEventListener("click", function (event) {
    toHidden(event.target);
    toShow($addItemDetail);
  });

  $addItemDetailButton.addEventListener("click", function (event) {
    if (
      !validateRequired({
        category: $addItemCategory.value,
        description: $addItemDescription.value,
        price: $addItemPrice.value,
      })
    )
      return alert("필수항목이 누락되었습니다.");
    if (!validatePrice(store.currentFunds, $addItemPrice.value))
      return alert("현재 자산 이상의 금액을 작성하셨습니다.");

    const newHistory = {
      createAt: new Date(), 
      id: Date.now(),
      description: $addItemDescription.value,
      category: $addItemCategory.value,
      amount: Number($addItemPrice.value),
      fundsAtTheTime: store.currentFunds - Number($addItemPrice.value),
    };
    const isSuccess = addNewHistory(newHistory);
    if (!isSuccess) {
      alert("소비내역 저장에 실패했습니다.");
      return;
    }
    console.log(newHistory.id);
    toHidden($addItemDetail);
    toShow($addItemButton);
    initAddItemInput();

    reRender();
  });
}

function reRender() {
  renderCurrentAsset();
  renderHistoryList();
}

function initAddItemInput() {
  $addItemCategory.value = "";
  $addItemDescription.value = "";
  $addItemPrice.value = "";
}
