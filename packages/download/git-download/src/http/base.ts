import axios from "axios"

function createGitAxiosInstance(){
    return axios.create({
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: "Bearer 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",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    });
}
export const gitHttp = createGitAxiosInstance()
