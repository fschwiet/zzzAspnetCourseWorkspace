import React from 'react'
import { Message } from 'semantic-ui-react'

interface Props {
  errors: string[]
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {errors && <Message.List>
        {errors.map((e, i) => (
          <Message.Item key={i}>{e}</Message.Item>
        ))}
      </Message.List>}
    </Message>
  )
}

export function ValidationError(props: { error: string | null | undefined }) {
  return (
    <Message error>
      {props.error && <Message.List>
        <Message.Item>{props.error}</Message.Item>
      </Message.List>}
    </Message>
  )
}