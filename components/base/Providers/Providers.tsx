export type ProviderType = ({
  children,
}: {
  children: React.ReactNode;
}) => JSX.Element;

export interface PropsType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export type ProviderItemType = [ProviderType, PropsType?];

interface AppProvidersPropsType {
  providers: ProviderItemType[];
  children: React.ReactNode;
}

export const AppProviders = ({
  providers = [],
  children,
}: AppProvidersPropsType) => {
  return (
    <>
      {providers.reduce((acc, [Component, props]) => {
        return <Component {...props}>{acc}</Component>;
      }, children)}
    </>
  );
};

export default AppProviders;
