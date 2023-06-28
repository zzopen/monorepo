import { gitHttp } from "./base.js";
export async function getRepoContents(conf) {
    const { repo, owner, path = '' } = conf;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    return await gitHttp.get(url);
}
//# sourceMappingURL=api.js.map