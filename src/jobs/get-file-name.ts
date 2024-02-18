import { ScheduledJobArgs, ScheduledJobConfig } from '@/types'

export default async ({ container }: ScheduledJobArgs) => {
  return container
}

export const config: ScheduledJobConfig = {
  name: 'job-example-name',
  schedule: '23 14 * * *',
  data: {},
}
