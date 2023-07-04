import { GitRepoConfig } from "@/common/index.js";
import { gitHttp } from "./base.js";

export async function getRepoContents(conf: GitRepoConfig):Promise<any> {
  const { repo, owner, path = '' } = conf;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  return await gitHttp.get(url).catch((err) => {
    console.log(err.toJSON())
    return Promise.reject(new Error(err.message))
  })
}
