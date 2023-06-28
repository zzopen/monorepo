import axios from "axios";
function createGitAxiosInstance() {
    return axios.create({
        baseURL: "./",
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: "Bearer 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",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    });
}
export const gitHttp = createGitAxiosInstance();
function createStreamAxiosInstance() {
    return axios.create({
        responseType: "stream"
    });
}
export const streamHttp = createStreamAxiosInstance();
//# sourceMappingURL=base.js.map