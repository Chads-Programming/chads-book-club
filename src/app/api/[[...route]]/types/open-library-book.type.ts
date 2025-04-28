export interface OpenLibraryBook {
  author_name: string[]
  cover_i: number
  first_publish_year: number
  key: string
  title: string
  ratings_average: number
}

export interface OpenLibraryBookGetResponse {
  title: string
  key: string
  authors: Array<{
    author: {
      key: string
    }
    type: {
      key: string
    }
  }>
  type: {
    key: string
  }
  first_publish_date: string
  covers: Array<number>
  first_sentence: {
    type: string
    value: string
  }
  excerpts: Array<{
    excerpt: string
  }>
  description: {
    type: string
    value: string
  }
  links: Array<{
    title: string
    url: string
    type: {
      key: string
    }
  }>
  subject_places: Array<string>
  subject_people: Array<string>
  subject_times: Array<string>
  subjects: Array<string>
  lc_classifications: Array<string>
  dewey_number: Array<string>
  latest_revision: number
  revision: number
  created: {
    type: string
    value: string
  }
  last_modified: {
    type: string
    value: string
  }
}

export interface OpenLibrarySearchResponse {
  numFound: number
  start: number
  numFoundExact: boolean
  num_found: number
  documentation_url: string
  q: string
  offset: null
  docs: OpenLibraryBook[]
}

export interface OpenLibraryBookRatings {
  average: 4.210682492581602
  count: 1011
  sortable: 4.1361366705572715
}

export interface OpenLibraryBookRatingsResponse {
  summary: OpenLibraryBookRatings
  counts: {
    "1": 106
    "2": 34
    "3": 62
    "4": 148
    "5": 661
  }
}
export interface OpenLibraryAuthorResponse {
  photos: Array<number>
  key: string
  bio: {
    type: string
    value: string
  }
  remote_ids: {
    viaf: string
    goodreads: string
    amazon: string
    librarything: string
    isni: string
    wikidata: string
  }
  source_records: Array<string>
  name: string
  type: {
    key: string
  }
  alternate_names: Array<string>
  birth_date: string
  latest_revision: number
  revision: number
  created: {
    type: string
    value: string
  }
  last_modified: {
    type: string
    value: string
  }
}
