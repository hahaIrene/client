import { IOrg } from '@/stores/types/api/org'
import { PlanCodeMap } from '@/stores/types/api/plan'
import React from 'react'

const OrgPlanChip = ({ org }: { org: IOrg }) => {
  return <>{PlanCodeMap[org.currentPlan.plan.code].title}</>
}

export default OrgPlanChip
