import { Spinner, ISpinnerProps } from 'native-base'

export function Loading({ ...props }: ISpinnerProps) {
  return <Spinner color="green.500" {...props} />
}
