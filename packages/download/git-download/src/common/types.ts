export interface GitRepoConfig {
  owner: string;
  repo: string;
  path: string;
}

export interface DownloadConfig extends GitRepoConfig {
  ouputPath?: string;
}

export interface GitFile {
  path: string;
  download_url: string;
}
