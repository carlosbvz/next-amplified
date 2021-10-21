/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateVote = /* GraphQL */ `
  subscription OnCreateVote {
    onCreateVote {
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
export const onUpdateVote = /* GraphQL */ `
  subscription OnUpdateVote {
    onUpdateVote {
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
export const onDeleteVote = /* GraphQL */ `
  subscription OnDeleteVote {
    onDeleteVote {
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
