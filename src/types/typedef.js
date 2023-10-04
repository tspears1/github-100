/**
 * @typedef {Object} CommitData
 * @property {string} url - The url of the commit.
 * @property {string} author - The login of the author of the commit.
 * @property {string} date - The date of the commit.
 * @property {string} message - The message of the commit.
 * @property {string} sha - The sha of the commit.
 */

/**
 * @typedef {Object} CommitSearchParams
 * @property {number} [deadline] - The number of minutes to search commits before. Default: 1440 (24 hours).
 * @property {'author-date' | 'committer-date'} [sort] - The sort field. One of author-date or committer-date. Default: results are sorted by best match.
 * @property {'asc' | 'desc'} [order] - The sort order if sort parameter is provided. One of asc or desc. Default: desc
 * @property {number} [per_page] - Results per page (max 100). Default: 30
 * @property {number} [page] - Page number of the results to fetch. Default: 1
 */

/**
 * @typedef {Object} RepositoryData
 * @property {number} id - The id of the repository.
 * @property {string} name - The name of the repository.
 * @property {string} owner - The login of the owner of the repository.
 * @property {number} stars - The number of stars of the repository.
 * @property {string} url - The url of the repository.
 * @property {string[]} topics - The topics of the repository.
 * @property {string} description - The description of the repository.
 * @property {string} avatar - The avatar url of the owner of the repository.
 * @property {string} fullname - The full name of the repository in the format of owner/name.
 * @property {number} index - The index of the repository.
 */

/**
 * @typedef {Object} RepositorySearchParams
 * @property {string} [q] - The search keywords, as well as any qualifiers.
 * @property {'stars' | 'forks' | 'help-wanted-issues' | 'updated'} [sort] - The sort field. One of stars, forks, or updated. Default: results are sorted by best match.
 * @property {'asc' | 'desc'} [order] - The sort order if sort parameter is provided. One of asc or desc. Default: desc
 * @property {number} [per_page] - Results per page (max 100). Default: 30
 * @property {number} [page] - Page number of the results to fetch. Default: 1
 */