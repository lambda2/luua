
const route = (
  pageName: string[],
  query?: any,
  asName?: string[]
): {
  href: {
    pathname: string,
    query: any
  },
  as: string
} => {
  const generateAs = () => {
    if (!query) {
      return pageName
    }
    return pageName.map((e: string) => {
      return e.match(/\[[\w]+\]/) ? query[e.replace(/[\[\]]*/g, '')] : e
    })
  }
  const as = asName || generateAs()
  
  return {
    href: {
      query,
      pathname: ['', ...pageName].join('/'),
    },
    as: ['', ...as].join('/')
  }
}


const explore = {
  index: () => route(['explore']),
  missions: {
    index: () => route(['explore', 'missions'], { })
  },
  workspace: {
    index: () => route(['explore', 'workspaces'])
  }
}

const manage = {
  index: () => route(['manage']),
  workspace: {
    index: () => route(['manage', 'workspaces']),
    new: () => route(['manage', 'workspaces', 'new']),
    show: (workspace_id: string | number) => route(['manage', '[workspace_id]'], { workspace_id }),
    edit: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'edit'], { workspace_id }),
    members: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'members'], { workspace_id }),
    invitations: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'invitations'], { workspace_id }),
    categories: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'categories'], { workspace_id }),
    requests: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'requests'], { workspace_id }),
    candidates: {
      index: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'candidates'], { workspace_id }),
      new: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'candidates', 'new'], { workspace_id }),
      show: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'candidates', '[id]'], { workspace_id, id }),
      edit: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'candidates', '[id]', 'edit'], { workspace_id, id }),
    },
    contributors: {
      index: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'contributors'], { workspace_id }),
      new: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'contributors', 'new'], { workspace_id }),
      show: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'contributors', '[id]'], { workspace_id, id }),
      edit: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'contributors', '[id]', 'edit'], { workspace_id, id }),
    },
    missions: {
      index: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'missions'], { workspace_id }),
      new: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'missions', 'new'], { workspace_id }),
      show: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'missions', '[id]'], { workspace_id, id }),
      discussion: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'missions', '[id]', 'discussion'], { workspace_id, id }),
      edit: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'missions', '[id]', 'edit'], { workspace_id, id }),
    },
    discussions: {
      category: {
        index: (workspace_id: string | number, category: string | number) => route(['manage', '[workspace_id]', 'discussions', 'c', '[category]'], { workspace_id, category }),
      },
      index: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'discussions'], { workspace_id }),
      new: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'discussions', 'new'], { workspace_id }),
      show: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'discussions', '[id]'], { workspace_id, id }),
      edit: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'discussions', '[id]', 'edit'], { workspace_id, id }),
    },
    polls: {
      index: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'polls'], { workspace_id }),
      new: (workspace_id: string | number) => route(['manage', '[workspace_id]', 'polls', 'new'], { workspace_id }),
      show: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'polls', '[id]'], { workspace_id, id }),
      edit: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'polls', '[id]', 'edit'], { workspace_id, id }),
    }
  }
}

export const ROUTES = {
  index: () => route([]),
  users: {
    show: (username: string) => route(['users', '[username]'], { username }),
    edit: () => route(['profile', 'edit']),
    login: () => route(['profile', 'login']),
    profile: () => route(['profile']),
    notifications: () => route(['profile', 'notifications']),
    signup: () => route(['profile', 'signup']),
    skills: () => route(['profile', 'skills']),
  },
  manage,
  explore
}


export default ROUTES