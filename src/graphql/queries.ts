/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      contents
      image
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
      comments {
        items {
          id
          postID
          content
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          post {
            id
            title
            contents
            image
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          owner
        }
        nextToken
        startedAt
      }
      votes {
        items {
          id
          vote
          postID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          post {
            id
            title
            contents
            image
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        contents
        image
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        comments {
          items {
            id
            postID
            content
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          nextToken
          startedAt
        }
        votes {
          items {
            id
            vote
            postID
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        contents
        image
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        comments {
          items {
            id
            postID
            content
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          nextToken
          startedAt
        }
        votes {
          items {
            id
            vote
            postID
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postID
      content
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      post {
        id
        title
        contents
        image
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        comments {
          items {
            id
            postID
            content
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          nextToken
          startedAt
        }
        votes {
          items {
            id
            vote
            postID
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          nextToken
          startedAt
        }
      }
      owner
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        content
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        post {
          id
          title
          contents
          image
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
          comments {
            nextToken
            startedAt
          }
          votes {
            nextToken
            startedAt
          }
        }
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        postID
        content
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        post {
          id
          title
          contents
          image
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
          comments {
            nextToken
            startedAt
          }
          votes {
            nextToken
            startedAt
          }
        }
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getVote = /* GraphQL */ `
  query GetVote($id: ID!) {
    getVote(id: $id) {
      id
      vote
      postID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      post {
        id
        title
        contents
        image
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        comments {
          items {
            id
            postID
            content
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          nextToken
          startedAt
        }
        votes {
          items {
            id
            vote
            postID
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          nextToken
          startedAt
        }
      }
      owner
    }
  }
`;
export const listVotes = /* GraphQL */ `
  query ListVotes(
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        vote
        postID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        post {
          id
          title
          contents
          image
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
          comments {
            nextToken
            startedAt
          }
          votes {
            nextToken
            startedAt
          }
        }
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncVotes = /* GraphQL */ `
  query SyncVotes(
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncVotes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        vote
        postID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        post {
          id
          title
          contents
          image
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
          comments {
            nextToken
            startedAt
          }
          votes {
            nextToken
            startedAt
          }
        }
        owner
      }
      nextToken
      startedAt
    }
  }
`;
