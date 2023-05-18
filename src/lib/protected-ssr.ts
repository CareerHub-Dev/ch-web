import { PreviewData, GetServerSideProps } from "next/types";
import { type UserRole } from "./schemas/UserRole";
import { type SessionData } from "./schemas/SessionData";
import { ParsedUrlQuery } from "querystring";
import sessionMiddleware from "./middleware/sessionMiddleware";

type BaseProps = { [key: string]: any };

type ProtectedSsrOptions<
    P extends BaseProps = BaseProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
> = {
    allowedRoles: UserRole[];
    getProps: GetServerSidePropsWithSession<P, Q, D>;
};

type BoxedSessionData = { session: SessionData };

export function protectedSsr<
    P extends BaseProps = BaseProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
>(
    options: ProtectedSsrOptions<P, Q, D>
): GetServerSideProps<P & BoxedSessionData, Q, D>;

export function protectedSsr<
    P extends BaseProps = BaseProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
>(
    options: Omit<ProtectedSsrOptions<P, Q, D>, "getProps">
): GetServerSideProps<BoxedSessionData, Q, D>;

export function protectedSsr<
    P extends BaseProps = BaseProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
>(
    options:
        | ProtectedSsrOptions<P, Q, D>
        | Omit<ProtectedSsrOptions<P, Q, D>, "getProps">
): GetServerSideProps<(P & BoxedSessionData) | BoxedSessionData, Q, D> {
    return async function _getProtectedServerSideProps(context) {
        const { allowedRoles } = options;
        const session = sessionMiddleware(context.req.cookies, allowedRoles);

        if ("error" in session) {
            return { notFound: true };
        }

        if ("getProps" in options) {
            const otherProps = await options.getProps({ ...context, session });

            if ("props" in otherProps) {
                const props = otherProps.props;

                if (props instanceof Promise) {
                    return props.then((resolvedProps) => ({
                        props: { ...resolvedProps, session },
                    }));
                } else {
                    return {
                        props: { ...props, session },
                    };
                }
            }
            return otherProps;
        }

        return { props: { session } };
    };
}
