import React, { useContext } from 'react';
import Select from 'react-select';
import UserContext from 'contexts/UserContext';
import { getHeaders, fetch } from 'utils/http';
import { useQuery } from 'react-query'

declare interface Props {
  regions: Region[]
  value?: number
  onChange: (id: number) => void
  name?: string
  isDisabled?: boolean
}

const RegionSelect = ({
  value,
  regions,
  onChange,
  ...props
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const headers = getHeaders(currentUser && currentUser.jwt || '');

  const getRegions = (opts: any) =>
    fetch<Region[]>('/api/regions', { headers, ...opts })

  const { status, data, error } = useQuery(['regions'], getRegions)

  const selected = data && data.filter((r: Region) => r.id === value)[0]
  const label = selected && selected.name

  return (
    <div>
      {data && <Select
        options={(data || []).map((e: Region) => ({ value: e.id, label: e.name }))}
        value={value ? { value, label } : null}
        onChange={(option: any) => {
          console.log("Change ->", option);
          onChange(option.value)
        }}
        {...props}
      />}
    </div>
  )
}


export default RegionSelect