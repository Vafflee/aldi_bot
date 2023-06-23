import { MyContext } from "../../types";

export async function sendMeme(ctx: MyContext) {
  try {
    const subreddit = "pikabu";
    const meme = await fetchRandomMeme(subreddit);
    // console.log(meme)
    if (meme.type === "image")
      ctx.replyWithPhoto(meme.image, {
        caption: meme.caption,
      });
    else if (meme.type === "gif")
      ctx.replyWithVideo(meme.image, {
        caption: meme.caption,
      });
  } catch (err) {
    console.error(err);
    ctx.reply("Что-то пошло не так, попробуйте позже");
  }
}
async function fetchRandomMeme(subreddit: string) {
  const memes = await fetch(
    "https://www.reddit.com/r/" + subreddit + "/hot/.json?limit=100"
  )
    .then((res) => res.json())
    .then((json) => json.data.children.map((ch: JsonDataChildren) => ch.data))
    .then((memesData) => {
      return memesData.map((memeData: RedditMemeData) => {
        return {
          image: memeData.url,
          caption: memeData.title,
          postLink: memeData.permalink,
          category: memeData.link_flair_text,
          type: memeData.post_hint,
          nsfw: memeData.over_18,
        };
      });
    })
    .then((memes) =>
      memes.filter(
        (meme: Meme) =>
          meme.type === "image" && !meme.nsfw && meme.category !== "Чёрный юмор"
      )
    )
    .then((memes) =>
      memes.map((meme: Meme) => {
        if (meme.image.endsWith(".gif")) meme.type = "gif";
        return meme;
      })
    );
  return memes[Math.floor(Math.random() * memes.length)];
}

type JsonDataChildren = {
  data: RedditMemeData;
};

type RedditMemeData = {
  url: string;
  title: string;
  permalink: string;
  link_flair_text: string;
  post_hint: string;
  over_18: boolean;
};

type Meme = {
  image: string;
  caption: string;
  postLink: string;
  category: string;
  type: string;
  nsfw: boolean;
};
