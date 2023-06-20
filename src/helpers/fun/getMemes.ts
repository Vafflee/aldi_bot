import axios from "axios";
import { JSDOM } from "jsdom";

export async function getMemes() {
  const data = (
    await axios.get(
      "https://www.reddit.com/r/Pikabu/search?q=flair%3A%D0%9C%D0%B5%D0%BC&restrict_sr=1&sort=new"
    )
  ).data;
  const dom = new JSDOM(data, {});
  const images: string[] = [];
  dom.window.document
    .querySelectorAll('div[data-testid="post-container"]')
    .forEach((post) => {
      const image = post.querySelector(
        "div > div > div:nth-child(2) > div:nth-child(2) > div > a"
      );
      if (image) images.push(image.getAttribute("href"));
    });
  // console.log(images)
  return images;
}
