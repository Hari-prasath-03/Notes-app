// Text area auto resize
export const autoGrow = (textarea) => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};

// Seting boundry to the note
export const setNewOffset = (card, mouseMoveDir) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetRight = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetRight < 0 ? 0 : offsetRight,
  };
};

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 99;

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) card.style.zIndex = selectedCard.style.zIndex - 1;
  });
};
