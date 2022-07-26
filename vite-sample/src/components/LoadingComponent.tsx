import { FontSizes, Spinner, SpinnerSize, Stack } from "@fluentui/react";

export const LoadingComponent = () => {

  return (
    <Stack horizontal horizontalAlign="center" verticalAlign="center" style={{ height: 300 }}>
      <Spinner
        size={SpinnerSize.large}
        styles={{ label: { fontSize: '28px' }, circle: { fontSizes: FontSizes.mega } }}
        label="please wait. authentication in progress..."
        ariaLive="assertive"
        labelPosition="right"
      ></Spinner>
    </Stack>)
}