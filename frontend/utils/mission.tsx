import { destroy } from "api/mission"
import Router from "next/router"
import ROUTES from "routes/routes"


const onDestroy = async (mission: BaseMission, token: string) => {
  await destroy(mission, token)
  Router.push(
    ROUTES.manage.workspace.missions.index(mission.workspace_id).href,
    ROUTES.manage.workspace.missions.index(mission.workspace_id).as
  )
}

export {
  onDestroy
}