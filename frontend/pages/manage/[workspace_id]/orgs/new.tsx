import React from 'react'
import { withAuthSync } from '../../../../utils/auth'
import OrgnForm from '../../../../components/OrgForm/OrgForm'

const NewOrg = (props: any) => {

  return (
    <>
      <h1>Create an organization</h1>

      <OrgnForm />
      <style jsx>{`
      `}</style>
    </>
  )
}

export default withAuthSync(NewOrg)