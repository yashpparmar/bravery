const getInitials = (name: string): string | undefined => {
  let initials;
  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;

  if (nameLength > 1) {
    initials = nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else return;

  return initials.toUpperCase();
};

export const getRandomColor = (): string => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

type TUrlToObject = (imageFile: File | null, url: string) => Promise<File>;
const urlToObject: TUrlToObject = async (imageFile, url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  imageFile = new File([blob], "avatar", {type: blob.type});
  return imageFile;
};

interface ICreateImageFromInitials {
  (size: number, name: string | null | undefined, color: string): Promise<File | undefined>;
}
export const createImageFromInitials: ICreateImageFromInitials = async (size, name, color) => {
  if (name == null) return;
  const initials = getInitials(name);
  if (!initials) return;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  canvas.width = canvas.height = size;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}50`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Roboto`;
  context.fillText(initials, size / 2, size / 2);

  const url = canvas.toDataURL();
  const imageFile = null;
  return await urlToObject(imageFile, url);
};
