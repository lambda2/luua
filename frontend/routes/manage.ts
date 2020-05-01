import { SingletonRouter } from "next/router"

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
      edit: (workspace_id: string | number, id: string | number) => route(['manage', '[workspace_id]', 'missions', '[id]', 'edit'], { workspace_id, id }),
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