import axios from "axios"

export interface ICreateSubredditRequest {
  name: string
  description: string
}

interface IGetSubredditsResponse {
  subreddits: ISubreddit[]
  hasMore: boolean
}

export interface ICreateSubredditResponse extends ISubreddit {}

interface ISubreddit {
  id: string
  name: string
  description: string
  createdAt: Date
}

export class SubredditRepository {
  public static async getSubreddits(
    page = 0,
    limit = 0
  ): Promise<IGetSubredditsResponse> {
    const data = await axios.get<IGetSubredditsResponse>(
      `http://localhost:5000/subreddit?page=${page}&limit=${limit}`
    )

    return {
      subreddits: data.data.subreddits.map((subreddit) => ({
        id: subreddit.id,
        createdAt: subreddit.createdAt,
        description: subreddit.description,
        name: subreddit.name,
      })),
      hasMore: data.data.hasMore,
    }
  }

  public static async createSubreddit(
    subreddit: ICreateSubredditRequest
  ): Promise<ISubreddit> {
    const { data } = await axios.post<ICreateSubredditResponse>(
      `http://localhost:5000/subreddit`,
      subreddit
    )

    return {
      name: data.name,
      description: data.description,
      id: data.id,
      createdAt: data.createdAt,
    }
  }
}
